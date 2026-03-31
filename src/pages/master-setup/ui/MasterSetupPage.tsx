import { useMasterSetupSummary } from "../../../features/master-setups";
import { SetupCard } from "./SetupCard";

export function MasterSetupPage() {
  const { data, isLoading } = useMasterSetupSummary();

  if (isLoading) {
    return <div className="text-slate-400">Loading master setup data...</div>;
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-100">
          Master Setup
        </h1>
        <p className="mt-2 text-slate-400">
          For pre-configured system data. Manage core organizational structures
          and reporting timelines below.
        </p>
      </div>

      {data && (
        <div className="grid gap-6 md:grid-cols-3">
          <SetupCard
            title="Wards"
            count={data.wardCount}
            status="Active Wards"
            description="Manage administrative ward boundaries and their respective populations."
            buttonLabel="Manage Wards"
            icon="📍"
            section="wards"
          />

          <SetupCard
            title="Toles"
            count={data.toleCount}
            description="Define and categorize local neighborhoods and tole structures within each ward."
            buttonLabel="Manage Toles"
            icon="🏘️"
            section="toles"
          />

          <SetupCard
            title="Departments"
            count={data.departmentCount}
            description="Organize municipal departments like Health, Education, and Infrastructure."
            buttonLabel="Manage Departments"
            icon="🏛️"
            section="departments"
          />

          <SetupCard
            title="Programs"
            count={data.programCount}
            status="Active Programs"
            description="Track municipal initiatives, social programs, and development campaigns."
            buttonLabel="Manage Programs"
            icon="📊"
            section="programs"
          />

          <SetupCard
            title="Fiscal Years"
            status={`Current: ${data.currentFiscalYear}`}
            description="Set up financial calendars, reporting periods, and yearly rollover rules."
            buttonLabel="Manage Fiscal Years"
            icon="📅"
            section="fiscal-years"
          />

          <SetupCard
            title="Survey Options"
            status="Custom Fields & Lists"
            description="Configure dynamic dropdowns (e.g., custom local locations, road types) for data collection forms."
            buttonLabel="Manage Options"
            icon="📋"
            section="survey-options"
          />
        </div>
      )}
    </section>
  );
}
