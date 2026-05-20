import { useCaseTreeStore } from "@entities/case";
import { HOUSEHOLD_PROFILE_KEY } from "@entities/case/model/keys";
import { HouseholdFormNavigation } from "@pages/data-collection-form-draft-household-profile-navigation";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/data-collection/forms/drafts/$caseId/household-profile/",
)({
  beforeLoad: ({ params }) => {
    const { caseId } = params;

    const currentTree = useCaseTreeStore.getState().treesByCaseId[caseId];

    const householdProfileNode = currentTree.nodesById[HOUSEHOLD_PROFILE_KEY];
    if (!householdProfileNode) {
      useCaseTreeStore.getState().upsertNode(caseId, {
        id: HOUSEHOLD_PROFILE_KEY,
        title: `Household Profile`,
        type: "category",
        parentId: caseId,
        childrenIds: [],
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <aside className="w-64 row-start-2">
        <HouseholdFormNavigation />
      </aside>
      <main className="row-start-1 col-start-2 row-span-2">
        <Outlet />
      </main>
    </>
  );
}
