// import { useHouseholdStore } from "@entities/household/model";
// import { selectHouseholdById } from "@entities/household/model/household-store";
import {
  useCaseDraftStore,
  useCaseTreeStore,
  useCaseUiStore,
} from "@entities/case";
import { HouseholdFormNavigation } from "@pages/data-collection-form-draft-household-profile-navigation";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/data-collection/forms/drafts/$caseId/household-profile/$householdId",
)({
  beforeLoad: ({ params }) => {
    const { caseId } = params;

    useCaseDraftStore.getState().hydrate();

    void useCaseTreeStore.getState().hydrateCaseTree(caseId);

    useCaseUiStore.getState().setActiveCaseId(caseId);

    const currentDraft = useCaseDraftStore.getState().getCaseById(caseId);

    if (!currentDraft) {
      useCaseUiStore.getState().setActiveCaseId(null);
      throw redirect({ to: "/data-collection/forms/drafts" });
    }

    void useCaseTreeStore.getState().hydrateCaseTree(caseId);
    

    return {
      breadcrumb: `Household Profile - ${params.caseId}`,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <aside className="w-full row-start-2 overflow-y-hidden">
        <HouseholdFormNavigation />
      </aside>

      <div className="col-start-2 row-span-2 overflow-auto">
        <Outlet />
      </div>
    </>
  );
}
