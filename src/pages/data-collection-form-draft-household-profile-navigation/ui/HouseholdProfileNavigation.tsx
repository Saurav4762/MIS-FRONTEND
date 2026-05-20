import { Button } from "@shared/ui/Button";
import { Plus } from "lucide-react";
import { useCaseDraftStore, useCaseTreeStore } from "@entities/case";

import { redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import NewHouseholdModal from "./NewHouseholdModel";
import HouseholdItem from "./HouseholdItem";

export default function HouseholdProfileNavigation() {
  const [newHouseholdModalOpen, setIsNewHouseholdModalOpen] = useState(false);
  const activeCaseId = useCaseDraftStore((s) => s.activeCaseId);

  const upsertNode = useCaseTreeStore((s) => s.upsertNode);
  const hydrateCaseTree = useCaseTreeStore((s) => s.hydrateCaseTree);
  const removeNode = useCaseTreeStore((s) => s.removeNode);

  if (!activeCaseId) {
    throw redirect({ to: "/data-collection/forms/drafts" });
    return null;
  }

  const nodesById = useCaseTreeStore(
    (s) => s.treesByCaseId[activeCaseId]?.nodesById,
  );
  const treeLoaded = useCaseTreeStore((s) => s.loadedCaseIds[activeCaseId]);

  useEffect(() => {
    if (!activeCaseId) return;

    // If tree not loaded yet, hydrate it first to avoid creating nodes
    // that might overwrite persisted data.
    if (!treeLoaded) {
      void hydrateCaseTree(activeCaseId);
      return;
    }

    // Only create household-profile when the tree is loaded and the node is missing.

    if (!nodesById || !nodesById["household-profile"]) {
      // upsertNode returns a promise; ensure we await to persist correctly
      (async () => {
        await upsertNode(activeCaseId, {
          id: "household-profile",
          parentId: activeCaseId,
          type: "category",
          title: "Household Profile",
          childrenIds: [],
        });
      })();
    }
  }, [activeCaseId, upsertNode, nodesById, treeLoaded, hydrateCaseTree]);

  async function onCreateHousehold(householdName: string) {
    if (!activeCaseId) {
      throw redirect({ to: "/data-collection/forms/drafts" });
    }
    if (!nodesById["household-profile"]) {
      await upsertNode(activeCaseId!, {
        id: "household-profile",
        parentId: activeCaseId,
        type: "category",
        title: "Household Profile",
        childrenIds: [],
      });
    }

    // Create a new household category node and navigate later from selection
    const newNodeId = `household-${Date.now()}`;
    await upsertNode(activeCaseId!, {
      id: newNodeId,
      parentId: "household-profile",
      type: "category",
      title: householdName,
      childrenIds: [],
    });
  }

  async function deleteHousehold(householdId: string) {
    await removeNode(activeCaseId!, householdId);
  }

  const householdIds = Object.values(nodesById ?? {})
    .filter((node) => node.parentId === "household-profile")
    .map((node) => node.id);

  return (
    <div className="w-full rounded-lg border h-full overflow-hidden flex flex-col border-gray-200 bg-white shadow-sm">
      <h2 className="p-4 border-b border-ink-200 text-xs font-semibold text-gray-600 uppercase tracking-wide">
        Household List
      </h2>
      <div className="flex-1 overflow-y-auto">
        {householdIds.map((id, index) => {
          const household = nodesById[id];
          if (!household) return null;
          return (
            <HouseholdItem
              householdName={household.title}
              index={index}
              key={household.id}
              householdId={household.id}
              caseId={activeCaseId}
              onDelete={() => deleteHousehold(household.id)}
            />
          );
        })}
      </div>

      {/* Add Household Button */}
      <div className="p-4 border-t-2 border-ink-100">
        <Button
          variant="primary"
          size="sm"
          block
          onClick={() => setIsNewHouseholdModalOpen(true)}
        >
          <span>
            <Plus />
          </span>
          <span>Add Household</span>
        </Button>
      </div>
      <NewHouseholdModal
        isOpen={newHouseholdModalOpen}
        onClose={() => setIsNewHouseholdModalOpen(false)}
        onCreateHousehold={onCreateHousehold}
      />
    </div>
  );
}
