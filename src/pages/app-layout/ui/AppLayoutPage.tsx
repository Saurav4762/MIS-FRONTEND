import SidebarNavMenu from "@widgets/navigation";
import { Breadcrumb } from "./Breadcrumb";

type AppLayoutPageProps = {
  children: React.ReactNode;
};

export function AppLayoutPage({ children }: AppLayoutPageProps) {
  return (
    <div className="flex min-h-screen bg-[#020816] text-white">
      <SidebarNavMenu />

      <main className="min-w-0 flex-1 p-6 space-y-6.5">
        <div className="pb-6 pt-0.5">
          <Breadcrumb />
        </div>
        {children}
      </main>
    </div>
  );
}
