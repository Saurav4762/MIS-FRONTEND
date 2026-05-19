import { HouseholdFormNavigation } from "@pages/data-collection-form-draft-household-profile-navigation";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/data-collection/forms/drafts/$surveyId/household-profile/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <aside className="w-56 row-start-2 overflow-y-scroll">
        <HouseholdFormNavigation />
      </aside>
      <main className="row-start-1 col-start-2 row-span-2 overflow-y-scroll">
        <Outlet />
      </main>
    </>
  );
}
