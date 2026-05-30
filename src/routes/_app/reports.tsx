import { createFileRoute } from "@tanstack/react-router";
import { ReportsPage } from "@pages/reports/ui/ReportsPage";

export const Route = createFileRoute("/_app/reports")({
  component: ReportsPage,
  beforeLoad: async () => {
    return {
      breadcrumb: "Reports",
    };
  },
});
