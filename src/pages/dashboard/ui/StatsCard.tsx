import cn from "@shared/lib";

interface StatsCardProps {
  title: string;
  value: number;
  format?: "number" | "percentage";
  icon?: React.ReactNode;
  className?: string;
}

export function StatsCard({
  title,
  value,
  format = "number",
  icon,
  className,
}: StatsCardProps) {
  const formattedValue =
    format === "percentage" ? `${value}%` : value.toLocaleString();

  return (
    <div
      className={cn(
        "rounded-lg border border-[#1a2742] bg-[#081428] p-6",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-100">
            {formattedValue}
          </p>
        </div>
        {icon && <div className="text-slate-500">{icon}</div>}
      </div>
    </div>
  );
}

