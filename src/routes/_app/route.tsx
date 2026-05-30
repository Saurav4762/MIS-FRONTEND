import { Breadcrumbs, SidebarNavMenu } from "@components/navigation";
import { createFileRoute, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuthStore } from "@shared/store/auth-store";
import { useIdleTimeout } from "@shared/hooks/useIdleTimeout";

export const Route = createFileRoute("/_app")({
    beforeLoad: async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) throw redirect({ to: "/Login" });
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            if (Date.now() > payload.exp * 1000) {
                localStorage.removeItem("accessToken");
                throw redirect({ to: "/Login" });
            }
        } catch {
            localStorage.removeItem("accessToken");
            throw redirect({ to: "/Login" });
        }
        return { breadcrumb: "Dashboard" };
    },
    notFoundComponent: () => <div>404 - Page Not Found</div>,
    component: RouteComponent,
});

function RouteComponent() {
    const navigate = useNavigate();
    const logout = useAuthStore((s) => s.logout);
    const [showIdleModal, setShowIdleModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useIdleTimeout(() => {
        setShowIdleModal(true);
    }, 5 * 60 * 1000);

    const handleIdleLogout = () => {
        setShowIdleModal(false);
        logout();
    };

    const handleLogoutConfirm = () => {
        setShowLogoutModal(false);
        logout();
    };

    return (
        <div className="flex min-h-screen bg-ink-50 text-ink-900 overflow-hidden h-dvh">
            <SidebarNavMenu onLogoutRequest={() => setShowLogoutModal(true)} />
            <main className="min-w-0 flex-1 p-6 space-y-6.5 overflow-y-scroll">
                <div className="pb-6 pt-0.5">
                    <Breadcrumbs />
                </div>
                <div>
                    <Outlet />
                </div>
            </main>

            {/* Idle Timeout Modal */}
            {showIdleModal && (
                <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(15,23,42,0.42)", fontFamily: "Nunito, sans-serif" }}>
                    <div style={{ backgroundColor: "#ffffff", borderRadius: "20px", padding: "32px", width: "100%", maxWidth: "400px", boxShadow: "0 12px 28px rgba(15,23,42,0.08)", border: "1px solid #e2e8f0" }}>
                        <p style={{ color: "#64748b", fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 8px" }}>Session Expired</p>
                        <h2 style={{ color: "#0f172a", fontSize: "24px", fontWeight: 600, margin: "0 0 8px", letterSpacing: "-0.01em" }}>You've been inactive</h2>
                        <p style={{ color: "#64748b", fontSize: "15px", margin: "0 0 24px" }}>You were logged out automatically after 5 minutes of inactivity.</p>
                        <button
                            onClick={handleIdleLogout}
                            style={{ width: "100%", height: "44px", backgroundColor: "#0ea5e9", color: "#ffffff", fontSize: "15px", fontWeight: 700, borderRadius: "10px", border: "none", cursor: "pointer", fontFamily: "Nunito, sans-serif" }}
                        >
                            Sign In Again
                        </button>
                    </div>
                </div>
            )}

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(15,23,42,0.42)", fontFamily: "Nunito, sans-serif" }}>
                    <div style={{ backgroundColor: "#ffffff", borderRadius: "20px", padding: "32px", width: "100%", maxWidth: "400px", boxShadow: "0 12px 28px rgba(15,23,42,0.08)", border: "1px solid #e2e8f0" }}>
                        <p style={{ color: "#64748b", fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 8px" }}>Confirm</p>
                        <h2 style={{ color: "#0f172a", fontSize: "24px", fontWeight: 600, margin: "0 0 8px", letterSpacing: "-0.01em" }}>Sign out?</h2>
                        <p style={{ color: "#64748b", fontSize: "15px", margin: "0 0 24px" }}>Are you sure you want to exit the dashboard and sign out of your account?</p>
                        <div style={{ display: "flex", gap: "12px" }}>
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                style={{ flex: 1, height: "44px", backgroundColor: "#ffffff", color: "#334155", fontSize: "15px", fontWeight: 700, borderRadius: "10px", border: "1px solid #e2e8f0", cursor: "pointer", fontFamily: "Nunito, sans-serif" }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogoutConfirm}
                                style={{ flex: 1, height: "44px", backgroundColor: "#ef4444", color: "#ffffff", fontSize: "15px", fontWeight: 700, borderRadius: "10px", border: "none", cursor: "pointer", fontFamily: "Nunito, sans-serif" }}
                            >
                                Yes, Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}