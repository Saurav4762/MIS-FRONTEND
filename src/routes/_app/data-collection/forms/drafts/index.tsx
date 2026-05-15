import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/data-collection/forms/drafts/")({
  beforeLoad: () => ({
    breadcrumb: "Drafts",
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/data-collection/forms/drafts/"!</div>;
}
