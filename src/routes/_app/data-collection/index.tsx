import { createFileRoute } from "@tanstack/react-router";
import DataCollection from "@pages/data-collection";

export const Route = createFileRoute("/_app/data-collection/")({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: "Data Collection",
  }),
});

function RouteComponent() {
  return (
    <div>
      <DataCollection />
    </div>
  );
}
