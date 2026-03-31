import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/users-roles")({
  component: RouteComponent,
  staticData: {
    breadcrumb: "User Roles",
  },
});

function RouteComponent() {
  return <div>Hello "/_app/_app/user-roles"!</div>;
}
