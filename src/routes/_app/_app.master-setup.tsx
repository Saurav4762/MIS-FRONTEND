import { createFileRoute } from "@tanstack/react-router";
import { useMasterSetupCards } from "@features/master-setups";
import MasterSetup from "@widgets/master-setups/ui/MasterSetup";

export const Route = createFileRoute("/_app/_app/master-setup")({
  component: RouteComponent,
  staticData: {
    breadcrumb: "Master Setup",
  },
});

function RouteComponent() {
  const { cards, isLoading, isError } = useMasterSetupCards();

  return <MasterSetup cards={cards} isLoading={isLoading} isError={isError} />;
}
