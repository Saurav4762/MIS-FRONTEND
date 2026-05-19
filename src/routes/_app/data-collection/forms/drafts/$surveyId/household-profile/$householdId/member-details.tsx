import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/data-collection/forms/drafts/$surveyId/household-profile/$householdId/member-details',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello
      "/_app/data-collection/forms/drafts/$surveyId/household-profile/member-details"!
    </div>
  )
}
