import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_app/reports")({
  component: RouteComponent,
  staticData: {
    breadcrumb: "Reports",
  },
});

function RouteComponent() {
  return <div>Hello "/_app/_app/reports"!</div>;
}
