import ResidenceFormPage from "@pages/data-collection-form-draft-household-profile-residence";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/data-collection/forms/drafts/$surveyId/household-profile/residence",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <ResidenceFormPage />;
}
