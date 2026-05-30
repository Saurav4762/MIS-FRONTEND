import { createFileRoute } from "@tanstack/react-router";
import { PublicDashboardPage } from "@pages/public-dashboard/ui/PublicDashboardPage";

export const Route = createFileRoute("/public/")({
    component: PublicDashboardPage,
});