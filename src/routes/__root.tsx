import type { RouteContext } from "@shared/config";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRouteWithContext<RouteContext>()({
  component: () => (
    <div className="min-h-screen bg-(--mis-color-white) text-(--mis-color-ink-900)">
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </div>
  ),

  // Global 404
  notFoundComponent: () => <div>404 - Page Not Found</div>,
});
