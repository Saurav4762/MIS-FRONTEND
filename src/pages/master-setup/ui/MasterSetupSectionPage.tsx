import type { MasterSetupSection } from "../lib/routes";
import {
  WardsPage,
  TolesPage,
  DepartmentsPage,
  ProgramsPage,
  FiscalYearsPage,
  SurveyOptionsPage,
} from "../sections";

interface MasterSetupSectionPageProps {
  section: MasterSetupSection;
}

const sectionComponentMap: Record<MasterSetupSection, React.ComponentType> = {
  wards: WardsPage,
  toles: TolesPage,
  departments: DepartmentsPage,
  programs: ProgramsPage,
  "fiscal-years": FiscalYearsPage,
  "survey-options": SurveyOptionsPage,
};

export function MasterSetupSectionPage({
  section,
}: MasterSetupSectionPageProps) {
  const SectionComponent = sectionComponentMap[section];

  if (!SectionComponent) {
    return (
      <section className="space-y-6">
        <div className="text-red-400">Unknown section: {section}</div>
      </section>
    );
  }

  return <SectionComponent />;
}
