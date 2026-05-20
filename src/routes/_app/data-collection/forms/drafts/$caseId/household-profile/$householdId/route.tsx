import { HouseholdFormNavigation } from "@pages/data-collection-form-draft-household-profile-navigation";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/data-collection/forms/drafts/$caseId/household-profile/$householdId",
)({
  beforeLoad: ({ params }) => {
    return {
      breadcrumb: `Household Profile - ${params.caseId}`,
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
