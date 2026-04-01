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
        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-left font-medium transition-colors",
        active
          ? "bg-[#4f65f8] text-white"
          : "bg-transparent text-[#98b5e3] hover:bg-[#0f1a2f] hover:text-[#cbe2ff]",
      ].join(" ")}
    >
      <Icon strokeWidth={1.85} className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}
