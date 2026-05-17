import { useEffect, useState } from "react";
import HouseholdItem from "./HouseholdItem";
import { Button } from "@shared/ui/Button";
import { Plus } from "lucide-react";
import { useSurveyDraftStore } from "@entities/survey";
import { useHouseholdStore } from "@entities/household/model/household-store";
import type { Household } from "@entities/household/model/types";
import { redirect } from "@tanstack/react-router";

const EMPTY_HOUSEHOLDS: Household[] = [];

export default function HouseholdProfileNavigation() {
  const activeDraftId = useSurveyDraftStore((s) => s.activeDraftId);
  if (!activeDraftId) {
    throw redirect({ to: "/data-collection/forms/drafts" });
  }

  // local UI state for expansion only (keeps the existing UI behavior)
  const [expandedHouseholdId, setExpandedHouseholdId] = useState<string | null>(
    "household-1",
  );

  // households are stored per-survey in the global store
  const surveyId = activeDraftId;
  const households = useHouseholdStore(
    (s) => s.surveys[surveyId]?.households ?? EMPTY_HOUSEHOLDS,
  );
  const isSurveyLoaded = useHouseholdStore((s) => s.loadedSurveyIds[surveyId]);

  const loadHouseholds = useHouseholdStore((s) => s.loadSurveyHouseholds);
  const addHouseholdAction = useHouseholdStore((s) => s.addHousehold);
  const deleteHouseholdAction = useHouseholdStore((s) => s.deleteHousehold);

  const deleteHousehold = async (householdId: string) => {
    if (!surveyId) return;
    await deleteHouseholdAction(surveyId, householdId);
    if (expandedHouseholdId === householdId) {
      setExpandedHouseholdId(null);
    }
  };

  const addHousehold = async () => {
    if (!surveyId) return;
    const id = await addHouseholdAction(surveyId);
    // optionally expand the newly added household
    setExpandedHouseholdId(id);
  };

  useEffect(() => {
    if (!surveyId || isSurveyLoaded) return;
    loadHouseholds(surveyId);
  }, [surveyId, isSurveyLoaded, loadHouseholds]);

  return (
    <div className="w-full max-w-md rounded-lg border h-full overflow-hidden flex flex-col border-gray-200 bg-white shadow-sm">
      <h2 className="p-4 border-b border-ink-200 text-xs font-semibold text-gray-600 uppercase tracking-wide">
        Household List
      </h2>
      <div className="flex-1 overflow-y-scroll">
        {households?.map((household, index) => (
          <HouseholdItem
            householdName={household.name}
            index={index}
            key={household.id}
            onDelete={() => deleteHousehold(household.id)}
          />
        ))}
      </div>

      {/* Add Household Button */}
      <div className="p-4 border-t-2 border-ink-100">
        <Button variant="primary" size="sm" block onClick={addHousehold}>
          <span>
            <Plus />
          </span>
          <span>Add Household</span>
        </Button>
      </div>
    </div>
  );
}
