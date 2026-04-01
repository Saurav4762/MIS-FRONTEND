import { MasterSetupTolesPage } from "@pages/master-setup-toles";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/master-setup/toles")({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      breadcrumb: "Toles",
    };
  },
});

function RouteComponent() {
  return <MasterSetupTolesPage />;
}
