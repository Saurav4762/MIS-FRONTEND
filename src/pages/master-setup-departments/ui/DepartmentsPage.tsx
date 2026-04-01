import { SectionHeader, SectionTable, type TableColumn } from "@shared/ui/MasterSetupHeader";
import { mockDepartments, type Department } from "../lib";

const departmentsColumns: TableColumn<Department>[] = [
  {
    key: "departmentName",
    label: "Department Name",
    render: (_, row) => (
      <div className="space-y-1">
        <div className="font-semibold text-white">{row.departmentName}</div>
        <div className="text-sm text-slate-400">{row.description}</div>
      </div>
    ),
  },
  {
    key: "departmentCode",
    label: "Code",
  },
  {
    key: "headName",
    label: "Department Head",
    render: (_, row) => (
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-slate-100">
          {row.headInitials}
        </div>
        <div className="font-medium text-white">{row.headName}</div>
      </div>
    ),
  },
  {
    key: "budget",
    label: "Budget",
  },
  {
    key: "status",
    label: "Status",
    render: (status) => (
      <span
        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
          status === "Active"
            ? "bg-blue-900/30 text-blue-300"
            : "bg-slate-700/30 text-slate-300"
        }`}
      >
        {String(status)}
      </span>
    ),
  },
];

export function MasterSetupDepartmentsPage() {
  const handleAddDepartment = () => {
    console.log("Add new department");
  };

  return (
    <section className="space-y-6">
      <SectionHeader
        title="departments"
        description="Organize municipal departments and divisions."
        buttonLabel="Add New Department"
        onAddClick={handleAddDepartment}
      />

      <SectionTable<Department>
        columns={departmentsColumns}
        data={mockDepartments}
        onRowAction={(department) => console.log("Edit department:", department)}
      />
    </section>
  );
}
