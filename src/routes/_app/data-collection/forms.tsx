import { createFileRoute } from "@tanstack/react-router";
import Form from "@pages/data-collection-forms";

export const Route = createFileRoute("/_app/data-collection/forms")({
  beforeLoad: () => ({
    breadcrumb: "Forms",
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Form />
    </div>
  );
}
