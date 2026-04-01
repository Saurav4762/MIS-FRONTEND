import { MasterSetupWardsPage } from "@pages/master-setup-wards";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/master-setup/wards")({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      breadcrumb: "Wards",
    };
  },
});

function RouteComponent() {
  return (
    <div>
      <MasterSetupWardsPage />
    </div>
  );
}
