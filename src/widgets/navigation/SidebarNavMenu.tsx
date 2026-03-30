import { Search } from "lucide-react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { SidebarNavItem } from "./components/SidebarNavItem";
import { SidebarSectionTitle } from "./components/SidebarSectionTitle";
import { sidebarGroups } from "./model/sidebar-items";

export function SidebarNavMenu() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="flex h-screen w-65 shrink-0 flex-col border-r border-[#1a2742] bg-linear-to-b from-[#070f1f] to-[#040a16] px-5 py-6 overflow-y-scroll custom-scrollbar space-y-6">
      <div className="flex items-center gap-4 px-1">
        <div className="grid px-1 py-1.5 text-tiny place-items-center rounded-md bg-[#4f65f8] font-bold text-white">
          BM
        </div>
        <h1 className="text-sm font-semibold text-white">Bhadrapur MIS</h1>
      </div>

      <div>
        <label className="group flex items-center gap-3 rounded-lg border border-[#1a2742] bg-[#071327] px-4 py-2.5 text-[#94b3dc] transition-colors focus-within:border-[#3f62ff]">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search modules..."
            className="w-full border-none bg-transparent text-xs text-[#cde1ff] placeholder:text-[#6f89af] focus:outline-none"
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
