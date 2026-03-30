import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_app/form-settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/_app/form-settings"!</div>;
}
