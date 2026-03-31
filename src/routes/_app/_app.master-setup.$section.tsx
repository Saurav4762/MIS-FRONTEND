import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_app/master-setup/$section')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/_app/master-setup/$section"!</div>
}
