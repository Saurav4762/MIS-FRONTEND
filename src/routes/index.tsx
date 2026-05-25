import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ location }) => {
    throw redirect({
      to: "/public/$municipalityId",
      params: { municipalityId: "9e725b30-d809-4448-a3ce-a98eac07dd06" }
    });
  },
});