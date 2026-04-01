import { MasterSetupSurveyOptionsPage } from "@pages/master-setup-survey-options";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/master-setup/survey-options")({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      breadcrumb: "Survey Options",
    };
  },
});

function RouteComponent() {
  return <MasterSetupSurveyOptionsPage />;
}
