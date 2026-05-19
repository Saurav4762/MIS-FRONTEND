import { useCaseDraftStore, useCaseUiStore } from "@entities/case";
import Forms from "@pages/data-collection-form-draft-navigation/ui/Forms";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/data-collection/forms/drafts/$caseId",
)({
  component: RouteComponent,
  beforeLoad: async ({ params }) => {
    await useCaseDraftStore.getState().hydrate();
    useCaseUiStore.getState().setActiveCaseId(params.caseId);

    const draft = useCaseDraftStore.getState().getCaseById(params.caseId);

    if (!draft) {
      useCaseUiStore.getState().setActiveCaseId(null);
      throw redirect({ to: "/data-collection/forms/drafts" });
    }

    useCaseDraftStore.getState().setActiveCase(params.caseId);

    return { breadcrumb: draft.name || "Draft Details" };
  },
});

function RouteComponent() {
  return (
    <div className="grid grid-cols-[min-content_1fr] grid-rows-[min-content_1fr] h-full gap-6">
      <Forms />
      <Outlet />
    </div>
  );
}
