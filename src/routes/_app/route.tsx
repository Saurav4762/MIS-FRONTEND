import { Breadcrumbs, SidebarNavMenu } from "@components/navigation";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
    beforeLoad: async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            throw redirect({ to: "/Login" });
        }

        // Check if token is expired
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const expiry = payload.exp * 1000;
            if (Date.now() > expiry) {
                localStorage.removeItem("accessToken");
                throw redirect({ to: "/Login" });
            }
        } catch {
            localStorage.removeItem("accessToken");
            throw redirect({ to: "/Login" });
        }

        return { breadcrumb: "Dashboard" };
    },
    notFoundComponent: () => <div>404 - Page Not Found from app</div>,
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="flex min-h-screen bg-[#020816] text-white overflow-hidden h-dvh">
            <SidebarNavMenu />
            <main className="min-w-0 flex-1 p-6 space-y-6.5 overflow-y-scroll">
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