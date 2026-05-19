import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/data-collection/forms/drafts/$caseId/household-profile/$householdId/facilities',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello
      "/_app/data-collection/forms/drafts/$surveyId/household-profile/facilities"!
    </div>
  )
}
