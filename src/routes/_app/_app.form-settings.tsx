import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_app/form-settings")({
  component: RouteComponent,
  staticData: {
    breadcrumb: "Form Settings",
  },
});

function RouteComponent() {
  return <div>Hello "/_app/_app/form-settings"!</div>;
}
