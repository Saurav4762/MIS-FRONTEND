import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/data-collection/forms/drafts")({
  beforeLoad: () => ({
    breadcrumb: "Drafts",
  }),
});
