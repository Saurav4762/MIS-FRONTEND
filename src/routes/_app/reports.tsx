import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/reports")({
  component: RouteComponent,
  beforeLoad: async () => {
    return {
      breadcrumb: "Reports",
    };
  }
});

function RouteComponent() {
  return <div>Hello "/_app/_app/reports"!</div>;
}
