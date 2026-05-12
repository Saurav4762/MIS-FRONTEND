import type { LucideIcon } from "lucide-react";

type SidebarNavItemProps = {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  onClick?: () => void;
};

export function SidebarNavItem({
  label,
  icon: Icon,
  active = false,
  onClick,
}: SidebarNavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-tiny text-left font-medium transition-colors cursor-pointer",
        active
          ? "bg-pri-500 text-ink-50"
          : "bg-transparent text-ink-600 hover:bg-pri-50 hover:text-pri-700",
      ].join(" ")}
    >
      <Icon strokeWidth={1.85} className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}
