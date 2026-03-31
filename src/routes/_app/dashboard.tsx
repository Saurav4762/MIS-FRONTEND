import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@pages/dashboard";

export const Route = createFileRoute("/_app/dashboard")({
  component: RouteComponent,
  staticData: {
    breadcrumb: "Dashboard",
  },
});

function RouteComponent() {
  return <DashboardPage />;
}
