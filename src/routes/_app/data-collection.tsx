import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/data-collection")({
  component: RouteComponent,
  beforeLoad: async () => {
    return {
      breadcrumb: "Data Collection",
    };
  }
});

function RouteComponent() {
  return <div>Hello "/_app/app/data-collection"!</div>;
}
