
type AppShellProps = {
  sidebar: React.ReactNode;
  breadcrumbs: React.ReactNode;
  children: React.ReactNode;
};

export function AppShell({ sidebar, breadcrumbs, children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-[#020816] text-white">
      {sidebar}

      <main className="min-w-0 flex-1 p-6 space-y-6.5">
        <div className="pb-6 pt-0.5">
          {breadcrumbs}
        </div>
        {children}
      </main>
    </div>
  );
}
