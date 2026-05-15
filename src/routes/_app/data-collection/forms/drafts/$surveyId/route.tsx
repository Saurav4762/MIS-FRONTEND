import Forms from "@pages/data-collection-form-draft-navigation/ui/Forms";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/data-collection/forms/drafts/$surveyId",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid grid-cols-[min-content_1fr] grid-rows-[min-content_1fr] h-full gap-6">
      <Forms />
      <Outlet />
    </div>
  );
}
