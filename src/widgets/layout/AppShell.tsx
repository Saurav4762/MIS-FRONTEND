import { Outlet } from "@tanstack/react-router";
import Breadcrumb from "@widgets/breadcrumbs";
import SidebarNavMenu from "@widgets/navigation";

export function AppShell() {
  return (
    <div className="flex min-h-screen bg-[#020816] text-white">
      <SidebarNavMenu />

      <main className="min-w-0 flex-1 p-6 space-y-6.5">
        <div className="pb-6">
          <Breadcrumb />
        </div>
        <Outlet />
      </main>
    </div>
  );
}
