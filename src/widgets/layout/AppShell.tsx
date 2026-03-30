import { Outlet } from "@tanstack/react-router";
import { SidebarNavMenu } from "@widgets/navigation/SidebarNavMenu";

export function AppShell() {
  return (
    <div className="flex min-h-screen bg-[#020816] text-white">
      <SidebarNavMenu />

      <main className="min-w-0 flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
