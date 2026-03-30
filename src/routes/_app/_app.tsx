import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@widgets/layout/AppShell";

export const Route = createFileRoute("/_app/_app")({
  notFoundComponent: () => <div>404 - Page Not Found from app</div>,
  component: RouteComponent,
});

function RouteComponent() {
  return <AppShell />;
}
