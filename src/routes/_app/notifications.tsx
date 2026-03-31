import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/notifications")({
  component: RouteComponent,
  staticData: {
    breadcrumb: "Notifications",
  },
});

function RouteComponent() {
  return <div>Hello "/_app/_app/notifications"!</div>;
}
