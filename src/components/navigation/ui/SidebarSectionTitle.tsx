type SidebarSectionTitleProps = {
  title: string;
};

export function SidebarSectionTitle({ title }: SidebarSectionTitleProps) {
  return (
    <h3 className="pl-3 text-tiny font-medium tracking-[0.15em] text-ink-800/75 uppercase">
      {title}
    </h3>
  );
}
