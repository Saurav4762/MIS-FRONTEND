import { useCaseTreeStore, useFormDraftStore } from "@entities/case";
import { HOUSEHOLD_PROFILE_HOUSEHOLD_RESIDENCE_KEY } from "@entities/case/model/keys";
import ResidenceFormPage from "@pages/data-collection-form-draft-household-profile-residence";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/data-collection/forms/drafts/$caseId/household-profile/$householdId/residence",
)({
  beforeLoad: async ({ params }) => {
    const { caseId, householdId } = params;

    // Get the current tree
    const tree = useCaseTreeStore.getState().treesByCaseId[caseId];
    const householdProfileNode = tree?.nodesById["household-profile"];

    // Check if i am valid child of household-profile
    const householdNode = tree?.nodesById[householdId];
    if (
      !householdNode ||
      !householdProfileNode.childrenIds.includes(householdId)
    ) {
      throw redirect({
        to: "/data-collection/forms/drafts/$caseId/household-profile",
        params: { caseId },
      });
    }

    await useCaseTreeStore.getState().upsertNode(caseId, {
      id: HOUSEHOLD_PROFILE_HOUSEHOLD_RESIDENCE_KEY(householdId),
      parentId: householdId,
      type: "form",
      title: "Residence",
      childrenIds: [],
    });

    useFormDraftStore
      .getState()
      .setActiveDraftKey(
        caseId,
        HOUSEHOLD_PROFILE_HOUSEHOLD_RESIDENCE_KEY(householdId),
      );

    await useFormDraftStore
      .getState()
      .loadDraftValues(
        caseId,
        HOUSEHOLD_PROFILE_HOUSEHOLD_RESIDENCE_KEY(householdId),
      );
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <ResidenceFormPage />;
}
