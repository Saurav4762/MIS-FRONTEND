import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_app/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-semibold tracking-tight text-slate-100">
        Dashboard Overview
      </h2>
      <div className="h-90 rounded-2xl border border-[#1a2742] bg-[#081428] p-6 text-slate-400">
        Middle and right panel are intentionally left blank for now.
      </div>
    </section>
  );
}
