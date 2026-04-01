import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/review-approval")({
  component: RouteComponent,
  beforeLoad: async () => {
    return {
      breadcrumb: "Review Approval",
    };
  }
});

function RouteComponent() {
  return <div>Hello "/_app/_app/review-approval"!</div>;
}
