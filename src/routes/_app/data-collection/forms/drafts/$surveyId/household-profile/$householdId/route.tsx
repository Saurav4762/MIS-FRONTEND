import { useHouseholdStore } from "@entities/household/model";
import { selectHouseholdById } from "@entities/household/model/household-store";
import { useCaseDraftStore, useCaseTreeStore, useCaseUiStore } from "@entities/case";
import { HouseholdFormNavigation } from "@pages/data-collection-form-draft-household-profile-navigation";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/data-collection/forms/drafts/$surveyId/household-profile/$householdId",
)({
  beforeLoad: ({ params }) => {
    const { surveyId, householdId } = params;

    useCaseDraftStore.getState().hydrate();
    void useCaseTreeStore.getState().hydrateCaseTree(surveyId);
    useCaseUiStore.getState().setActiveCaseId(surveyId);
    const currentDraft = useCaseDraftStore.getState().getCaseById(surveyId);
    if (!currentDraft) {
      useCaseUiStore.getState().setActiveCaseId(null);
      throw redirect({ to: "/data-collection/forms/drafts" });
    }

    const household = selectHouseholdById(
      surveyId,
      householdId,
    )(useHouseholdStore.getState());
    if (!household) {
      throw redirect({
        to: `/data-collection/forms/drafts/$surveyId`,
        params: { surveyId },
      });
    }

    const householdStore = useHouseholdStore.getState();
    householdStore.loadSurveyHouseholds(surveyId);

    return {
      breadcrumb: `Household Profile - ${params.surveyId}`,
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
