import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/bulk-import")({
  component: RouteComponent,
  beforeLoad: async () => {
    return {
      breadcrumb: "Bulk Import",
    };
  },
});

function RouteComponent() {
  return <div>Hello "/_app/_app/bulk-import"!</div>;
}
