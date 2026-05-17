import type { ReactNode } from "react";

type HealthSectionProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function HealthSection({
  title,
  subtitle,
  children,
}: HealthSectionProps) {
  return (
    <section className="space-y-6">
      <h3 className="border-b border-ink-200 pb-2 text-[10px] font-bold uppercase tracking-widest text-ink-400">
        {title}
        <span className="ml-1 text-[11px] font-normal normal-case text-ink-500">
          ({subtitle})
        </span>
      </h3>
      {children}
    </section>
  );
}
