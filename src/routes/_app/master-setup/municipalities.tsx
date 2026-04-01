import { MasterSetupMunicipalityEditPage } from '@pages/master-setup-municipality'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/master-setup/municipalities')({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      breadcrumb: 'Municipalities',
    }
  }
})

function RouteComponent() {
  return <MasterSetupMunicipalityEditPage />
}
