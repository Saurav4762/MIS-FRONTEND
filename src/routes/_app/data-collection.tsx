import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/data-collection")({
  component: RouteComponent,
  staticData: {
    breadcrumb: "Data Collection",
  },
});

function RouteComponent() {
  return <div>Hello "/_app/app/data-collection"!</div>;
}
