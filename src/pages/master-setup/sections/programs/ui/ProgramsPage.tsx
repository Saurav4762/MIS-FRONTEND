import { SectionHeader, SectionTable, type TableColumn } from "../../shared";
import { mockPrograms, type Program } from "../lib";

const programsColumns: TableColumn<Program>[] = [
  {
    key: "programName",
    label: "Program Name",
    render: (_, row) => (
      <div className="space-y-1">
        <div className="font-semibold text-white">{row.programName}</div>
        <div className="text-sm text-slate-400">{row.description}</div>
      </div>
    ),
  },
  {
    key: "programCode",
    label: "Code",
  },
  {
    key: "department",
    label: "Department",
  },
  {
    key: "startYear",
    label: "Start Year",
  },
  {
    key: "beneficiaries",
    label: "Beneficiaries",
    render: (beneficiaries) => (
      <div className="text-slate-300">{Number(beneficiaries).toLocaleString()}</div>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (status) => (
      <span
        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
          status === "Active"
            ? "bg-blue-900/30 text-blue-300"
            : status === "Planned"
              ? "bg-amber-900/30 text-amber-300"
              : "bg-slate-700/30 text-slate-300"
        }`}
      >
        {String(status)}
      </span>
    ),
  },
];

export function ProgramsPage() {
  const handleAddProgram = () => {
    console.log("Add new program");
  };

  return (
    <section className="space-y-6">
      <SectionHeader
        title="programs"
        description="Track municipal programs and initiatives."
        buttonLabel="Add New Program"
        onAddClick={handleAddProgram}
      />

      <SectionTable<Program>
        columns={programsColumns}
        data={mockPrograms}
        onRowAction={(program) => console.log("Edit program:", program)}
      />
    </section>
  );
}
