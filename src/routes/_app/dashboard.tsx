import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@pages/dashboard";

export const Route = createFileRoute("/_app/dashboard")({
  component: RouteComponent,
  beforeLoad: async () => {
    return {
      breadcrumb: "Dashboard",
    };
  },
});

function RouteComponent() {
  return <DashboardPage />;
}
