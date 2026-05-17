import HealthForm from "@pages/data-collection-form-draft-household-profile-health";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/data-collection/forms/drafts/$surveyId/household-profile/health",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <HealthForm />;
}
