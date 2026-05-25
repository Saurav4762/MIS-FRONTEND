import { createFileRoute } from "@tanstack/react-router";
import { PublicDashboardPage } from "@pages/public-dashboard/ui/PublicDashboardPage";

export const Route = createFileRoute("/public/$municipalityId")({
    component: RouteComponent,
});

function RouteComponent() {
    const { municipalityId } = Route.useParams();
    return <PublicDashboardPage municipalityId={municipalityId} />;
}