import { SectionHeader, SectionTable, type TableColumn } from "@shared/ui/MasterSetupHeader";
import { mockWards, type Ward } from "../lib";

const wardsColumns: TableColumn<Ward>[] = [
  {
    key: "wardNumber",
    label: "Ward Number",
  },
  {
    key: "wardName",
    label: "Ward Name",
    render: (_, row) => (
      <div className="space-y-1">
        <div className="font-semibold text-white">{row.wardName}</div>
        <div className="text-sm text-slate-400">{row.wardDistrict}</div>
      </div>
    ),
  },
  {
    key: "tolesCount",
    label: "Toles Count",
  },
  {
    key: "representative",
    label: "Representative",
    render: (_, row) => (
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-slate-100">
          {row.representative.initials}
        </div>
        <div className="font-medium text-white">{row.representative.name}</div>
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
            : "bg-slate-700/30 text-slate-300"
        }`}
      >
        {String(status)}
      </span>
    ),
  },
];

export function MasterSetupWardsPage() {
  const handleAddWard = () => {
    console.log("Add new ward");
  };

  return (
    <section className="space-y-6">
      <SectionHeader
        title="wards"
        description="Configure administrative ward boundaries and details."
        buttonLabel="Add New Ward"
        onAddClick={handleAddWard}
      />

      <SectionTable<Ward>
        columns={wardsColumns}
        data={mockWards}
        onRowAction={(ward) => console.log("Edit ward:", ward)}
      />
    </section>
  );
}
