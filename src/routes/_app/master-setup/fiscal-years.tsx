import { MasterSetupFiscalYearsPage } from '@pages/master-setup-fiscal-years'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/master-setup/fiscal-years')({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      breadcrumb: 'Fiscal Year',
    }
  }
})

function RouteComponent() {
  return <MasterSetupFiscalYearsPage />
}
