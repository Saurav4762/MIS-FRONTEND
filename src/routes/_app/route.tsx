import { createFileRoute } from "@tanstack/react-router";
import { AppLayoutPage } from "@pages/app-layout";

export const Route = createFileRoute("/_app")({
  notFoundComponent: () => <div>404 - Page Not Found from app</div>,
  component: RouteComponent,
});

function RouteComponent() {
  return <AppLayoutPage />;
}
