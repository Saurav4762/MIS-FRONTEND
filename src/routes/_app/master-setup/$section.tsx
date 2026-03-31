import { createFileRoute } from "@tanstack/react-router";
import { MasterSetupSectionPage } from "@pages/master-setup/ui";
import {
  type MasterSetupSection,
  masterSetupSectionSchema,
} from "@pages/master-setup/lib/routes";

interface MasterSetupSectionParams {
  section: MasterSetupSection;
}

function RouteComponent() {
  const { section } = Route.useParams() as MasterSetupSectionParams;

  return <MasterSetupSectionPage section={section} />;
}

export const Route = createFileRoute(
  "/_app/master-setup/$section",
)<MasterSetupSectionParams>({
  params: {
    parse: (params) => ({
      section: masterSetupSectionSchema.parse(params.section),
    }),
    stringify: (params) => ({ section: params.section }),
  },
  errorComponent: () => <div>Invalid section</div>,
  component: RouteComponent,
  beforeLoad: ({ params }) => ({
    breadcrumb: params.section,
  }),
});
