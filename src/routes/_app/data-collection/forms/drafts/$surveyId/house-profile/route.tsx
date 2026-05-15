import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/data-collection/forms/drafts/$surveyId/house-profile",
)({
  beforeLoad: ({ params }) => ({
    breadcrumb: `House Profile - ${params.surveyId}`,
  }),
});
