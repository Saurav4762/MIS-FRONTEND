import type { EconomyFormSectionProps } from "../model";

export default function EconomyFormSection({
  title,
  subtitle,
  children,
}: EconomyFormSectionProps) {
  return (
    <section className="space-y-8">
      <div className="border-b border-ink-200 pb-3">
        <h2 className="text-sm font-bold text-ink-900">{title}</h2>
        <p className="mt-1 text-[11px] font-bold uppercase tracking-tight text-ink-400">
          {subtitle}
        </p>
      </div>
      {children}
    </section>
  );
}
