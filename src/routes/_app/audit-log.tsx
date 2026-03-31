import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/audit-log")({
  component: RouteComponent,
  beforeLoad: async () => {
    return {
      breadcrumb: "Audit Log",
    };
  },
});

function RouteComponent() {
  return <div>Hello "/_app/_app/audit-log"!</div>;
}
