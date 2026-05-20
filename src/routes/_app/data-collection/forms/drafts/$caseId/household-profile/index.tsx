import { HouseholdFormNavigation } from "@pages/data-collection-form-draft-household-profile-navigation";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/data-collection/forms/drafts/$caseId/household-profile/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <aside className="w-64 row-start-2">
        <HouseholdFormNavigation />
      </aside>
      <main className="row-start-1 col-start-2 row-span-2">
        <Outlet />
      </main>
    </>
  );
}
