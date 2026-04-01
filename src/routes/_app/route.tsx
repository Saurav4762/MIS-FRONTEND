import { Breadcrumbs, SidebarNavMenu } from "@components/navigation";
import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/_app")({
  notFoundComponent: () => <div>404 - Page Not Found from app</div>,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen bg-[#020816] text-white">
      <SidebarNavMenu />
      <main className="min-w-0 flex-1 p-6 space-y-6.5">
        <div className="pb-6 pt-0.5">
          <Breadcrumbs />
        </div>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
