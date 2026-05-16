import { useSurveyDraftStore } from "@entities/survey/model/survey-draft-store";
import Forms from "@pages/data-collection-form-draft-navigation/ui/Forms";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute(
  "/_app/data-collection/forms/drafts/$surveyId",
)({
  component: RouteComponent,
  beforeLoad: async ({ params }) => {
    await useSurveyDraftStore.getState().hydrate();

    const currDraft = useSurveyDraftStore
      .getState()
      .getDraftById(params.surveyId);

    return {
      breadcrumb: `${currDraft?.name || "Draft Details"}`,
    };
  },
});

function RouteComponent() {
  const hydrate = useSurveyDraftStore((state) => state.hydrate);
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <div className="grid grid-cols-[min-content_1fr] grid-rows-[min-content_1fr] h-full gap-6">
      <Forms />
      <Outlet />
    </div>
  );
}
