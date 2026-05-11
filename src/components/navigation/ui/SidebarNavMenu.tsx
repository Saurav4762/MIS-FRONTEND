import { Search } from "lucide-react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { SidebarNavItem } from "./SidebarNavItem";
import { SidebarSectionTitle } from "./SidebarSectionTitle";
import { sidebarGroups } from "../model/sidebar-items";

export default function SidebarNavMenu() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="flex h-screen w-65 shrink-0 flex-col border-r border-[var(--mis-color-ink-200)] bg-linear-to-b from-[var(--mis-color-ink-50)] to-[var(--mis-color-white)] px-5 py-6 overflow-y-scroll custom-scrollbar space-y-6">
      <div className="flex items-center gap-4 px-1">
        <div className="grid px-1 py-1.5 text-tiny place-items-center rounded-md bg-[var(--mis-color-pri-500)] font-bold text-white">
          BM
        </div>
        <h1 className="text-sm font-semibold text-[var(--mis-color-ink-900)]">Bhadrapur MIS</h1>
      </div>

      <div>
        <label className="group flex items-center gap-3 rounded-lg border border-[var(--mis-color-ink-300)] bg-[var(--mis-color-white)] px-4 py-2.5 text-[var(--mis-color-ink-500)] transition-colors focus-within:border-[var(--mis-color-pri-500)]">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search modules..."
            className="w-full border-none bg-transparent text-xs text-[var(--mis-color-ink-700)] placeholder:text-[var(--mis-color-ink-500)] focus:outline-none"
          />
        </label>
      </div>

      <div className="flex-1 space-y-8">
        {sidebarGroups.map((group) => (
          <section key={group.title} className="space-y-4">
            <SidebarSectionTitle title={group.title} />
            <div className="space-y-1">
              {group.items.map((item) => {
                const active =
                  pathname === item.path ||
                  pathname.startsWith(`${item.path}/`);

                return (
                  <SidebarNavItem
                    key={item.label}
                    label={item.label}
                    icon={item.icon}
                    active={active}
                    onClick={() => navigate({ to: item.path })}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </aside>
  );
}
