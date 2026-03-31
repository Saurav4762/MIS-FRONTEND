import { Outlet } from "@tanstack/react-router";
import { AppShell } from "@widgets/layout";
import SidebarNavMenu from "@widgets/navigation";
import { Breadcrumb } from "./Breadcrumb";

export function AppLayoutPage() {
  return (
    <AppShell sidebar={<SidebarNavMenu />} breadcrumbs={<Breadcrumb />}>
      <Outlet />
    </AppShell>
  );
}