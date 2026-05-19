import EconomyFormPage from "@pages/data-collection-form-draft-household-profile-economy";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/data-collection/forms/drafts/$caseId/household-profile/$householdId/economic",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <EconomyFormPage />;
}
