import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginPage } from "@pages/login";

export const Route = createFileRoute("/Login")({
    beforeLoad: () => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            throw redirect({ to: "/dashboard" }); // already logged in
        }
    },
    component: LoginPage,
});