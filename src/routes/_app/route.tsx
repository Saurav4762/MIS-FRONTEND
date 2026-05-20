import { Breadcrumbs, SidebarNavMenu } from "@components/navigation";
import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/_app")({
  notFoundComponent: () => <div>404 - Page Not Found from app</div>,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen h-dvh overflow-hidden bg-(--mis-color-ink-50) text-(--mis-color-ink-900)">
      <SidebarNavMenu />
      <main className="min-w-0 flex-1 px-6 flex flex-col pt-6 space-y-6.5 overflow-y-auto">
        <div className="pb-6 pt-0.5">
          <Breadcrumbs />
        </div>
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
