import { AppShell } from "@widgets/layout";
import SidebarNavMenu from "@widgets/navigation";
import { Breadcrumb } from "./Breadcrumb";

type AppLayoutPageProps = {
  children: React.ReactNode;
};

export function AppLayoutPage({ children }: AppLayoutPageProps) {
  return (
    <AppShell sidebar={<SidebarNavMenu />} breadcrumbs={<Breadcrumb />}>
      {children}
    </AppShell>
  );
}
