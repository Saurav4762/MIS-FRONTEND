import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/settings")({
  component: RouteComponent,
  staticData: {
    breadcrumb: "Settings",
  },
});

function RouteComponent() {
  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-semibold tracking-tight text-[var(--mis-color-ink-900)]">
        Settings
      </h2>
      <div className="h-90 rounded-2xl border border-[var(--mis-color-ink-200)] bg-[var(--mis-color-white)] p-6 text-[var(--mis-color-ink-600)]">
        Settings module placeholder.
      </div>
    </section>
  );
}
