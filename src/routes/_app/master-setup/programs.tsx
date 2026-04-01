import { MasterSetupProgramsPage } from "@pages/master-setup-programs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/master-setup/programs")({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      breadcrumb: "Programs",
    };
  }
});

function RouteComponent() {
  return <MasterSetupProgramsPage />;
}
