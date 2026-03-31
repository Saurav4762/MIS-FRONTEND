import { createFileRoute, Outlet } from "@tanstack/react-router";
import Breadcrumb from "@widgets/breadcrumbs";
import { AppShell } from "@widgets/layout";
import SidebarNavMenu from "@widgets/navigation";

export const Route = createFileRoute("/_app/_app")({
  notFoundComponent: () => <div>404 - Page Not Found from app</div>,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppShell sidebar={<SidebarNavMenu />} breadcrumbs={<Breadcrumb />}>
      <Outlet />
    </AppShell>
  );
}
