import { SectionHeader, SectionTable, type TableColumn } from "../../shared";
import { mockFiscalYears, type FiscalYear } from "../lib";

const fiscalYearsColumns: TableColumn<FiscalYear>[] = [
  {
    key: "fiscalYear",
    label: "Fiscal Year",
  },
  {
    key: "startDate",
    label: "Start Date",
  },
  {
    key: "endDate",
    label: "End Date",
  },
  {
    key: "budget",
    label: "Budget",
  },
  {
    key: "completedProjects",
    label: "Projects Progress",
    render: (_, row) => (
      <div className="text-slate-300">
        {row.completedProjects}/{row.totalProjects} completed
      </div>
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
            : status === "Completed"
              ? "bg-green-900/30 text-green-300"
              : "bg-slate-700/30 text-slate-300"
        }`}
      >
        {String(status)}
      </span>
    ),
  },
];

export function FiscalYearsPage() {
  const handleAddFiscalYear = () => {
    console.log("Add new fiscal year");
  };

  return (
    <section className="space-y-6">
      <SectionHeader
        title="fiscal-years"
        description="Manage municipal fiscal years and budgets."
        buttonLabel="Add New Fiscal Year"
        onAddClick={handleAddFiscalYear}
      />

      <SectionTable<FiscalYear>
        columns={fiscalYearsColumns}
        data={mockFiscalYears}
        onRowAction={(fiscalYear) => console.log("Edit fiscal year:", fiscalYear)}
      />
    </section>
  );
}
