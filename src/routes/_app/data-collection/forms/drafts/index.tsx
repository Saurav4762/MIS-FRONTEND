import DraftsTable from "@pages/data-collection-form-drafts/ui/DraftsTable";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/data-collection/forms/drafts/")({
  beforeLoad: () => ({
    breadcrumb: "Drafts",
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Drafts</h1>
      <p className="mb-6 text-ink-500">Manage your survey drafts here.</p>
      <div className="w-full bg-white shadow-sm rounded-lg">
        <DraftsTable />
      </div>
    </div>
  );
}
