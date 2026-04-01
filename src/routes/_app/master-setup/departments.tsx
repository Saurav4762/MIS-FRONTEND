import { MasterSetupDepartmentsPage } from "@pages/master-setup-departments";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/master-setup/departments")({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      breadcrumb: "Departments",
    };
  },
});

function RouteComponent() {
  return <MasterSetupDepartmentsPage />;
}
