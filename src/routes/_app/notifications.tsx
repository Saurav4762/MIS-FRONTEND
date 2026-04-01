import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/notifications")({
  component: RouteComponent,
  beforeLoad: async () => {
    return {
      breadcrumb: "Notifications",
    };
  }
});

function RouteComponent() {
  return <div>Hello "/_app/_app/notifications"!</div>;
}
