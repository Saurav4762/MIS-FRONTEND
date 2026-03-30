import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_app/bulk-import")({
  component: RouteComponent,
  staticData: {
    breadcrumb: "Bulk Import",
  },
});

function RouteComponent() {
  return <div>Hello "/_app/_app/bulk-import"!</div>;
}
