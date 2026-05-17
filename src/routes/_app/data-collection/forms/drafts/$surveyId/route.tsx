import { useSurveyDraftStore } from "@entities/survey/model/survey-draft-store";
import Forms from "@pages/data-collection-form-draft-navigation/ui/Forms";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/data-collection/forms/drafts/$surveyId",
)({
  component: RouteComponent,
  beforeLoad: async ({ params }) => {
    await useSurveyDraftStore.getState().hydrate();

    const draft = useSurveyDraftStore.getState().getDraftById(params.surveyId);

    if (!draft) {
      useSurveyDraftStore.getState().setActiveDraft(null);
      throw redirect({
        to: "/data-collection/forms/drafts",
      });
    }

    useSurveyDraftStore.getState().setActiveDraft(params.surveyId);

    return {
      breadcrumb: draft.name || "Draft Details",
    };
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
