import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    // Always show public dashboard first
    throw redirect({
      to: "/public/$municipalityId",
      params: { municipalityId: "9e725b30-d809-4448-a3ce-a98eac07dd06" }
    });
  },
});