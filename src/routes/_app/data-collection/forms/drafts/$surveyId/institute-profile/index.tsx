import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/data-collection/forms/drafts/$surveyId/institute-profile/",
)({
  beforeLoad: ({ params }) => ({
    breadcrumb: `Institute Profile - ${params.surveyId}`,
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <aside className="w-56 row-start-2 overflow-y-scroll">
        <p>Side navbar</p>
      </aside>
      <main className="row-start-1 col-start-2 row-span-2 overflow-y-scroll">
        <div>Form</div>
        <div>Form</div>
        <div>Form</div>
        <div>Form</div>
        <div>Form</div>
        <div>Form</div>
        <div>Form</div>
      </main>
    </>
  );
}
