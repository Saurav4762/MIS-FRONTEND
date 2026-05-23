type SectionProps = {
  number: number;
  title: string;
  titleNe: string;
  children: React.ReactNode;
};

export default function Section({
  number,
  title,
  titleNe,
  children,
}: SectionProps) {
  return (
    <section className="mx-auto px-17 md:px-16 space-y-6 ">
      <div className="flex gap-4 items-start">
        <h3 className="text-xs font-medium text-pri-500 uppercase tracking-wide pb-2">
          Section {number.toString().padStart(2, "0")}: {title}
        </h3>
        <p className="text-xs text-ink-400">( {titleNe} )</p>
      </div>
      <div className="">{children}</div>
    </section>
  );
}
