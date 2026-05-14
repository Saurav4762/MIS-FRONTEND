import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/data-collection")({
  beforeLoad: () => ({
    breadcrumb: "Data Collection",
  }),
});
