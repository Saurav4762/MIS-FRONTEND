import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/master-setup')({
  beforeLoad: () => ({
    breadcrumb: "Master Setup",
  }),
})

