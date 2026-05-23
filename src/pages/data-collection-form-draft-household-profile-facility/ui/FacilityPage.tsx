import Form from "./Form";
import Header from "./Header";
export default function FacilityPage() {
  return (
    <section className="flex h-full flex-col overflow-hidden rounded-xl border border-ink-200 bg-white shadow-sm">
      <Header />
      <Form />
    </section>
  );
}
