import FacilityPage from "@pages/data-collection-form-draft-household-profile-facility";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/data-collection/forms/drafts/$caseId/household-profile/$householdId/facilities",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <FacilityPage />;
}
