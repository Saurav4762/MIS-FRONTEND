import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginPage } from "../pages/login/ui/LoginPage";

export const Route = createFileRoute("/Login")({
    beforeLoad: () => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            throw redirect({ to: "/dashboard" }); // 👈 already logged in → go to dashboard
        }
    },
    component: LoginPage,
});