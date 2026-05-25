import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw redirect({ to: "/Login" });
    }
    throw redirect({ to: "/dashboard" });
  },
});