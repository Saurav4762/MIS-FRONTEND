import HealthFormHeader from "./HealthFormHeader";
import HealthFormBody from "./HealthFormBody";

export default function HealthForm() {
  return (
    <section className="relative flex flex-col h-full rounded-xl overflow-y-hidden overflow-x-hidden border border-ink-200 bg-white shadow-sm">
      <HealthFormHeader />
      <HealthFormBody />
    </section>
  );
}
