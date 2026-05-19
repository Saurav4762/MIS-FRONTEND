import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/data-collection/forms/drafts/$caseId/house-profile",
)({
  beforeLoad: ({ params }) => ({
    breadcrumb: `House Profile - ${params.surveyId}`,
  }),
});
