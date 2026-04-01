import { SectionHeader, SectionTable, type TableColumn } from "@shared/ui/MasterSetupHeader";
import { mockSurveyOptions, type SurveyOption } from "../lib";

const surveyOptionsColumns: TableColumn<SurveyOption>[] = [
  {
    key: "referenceName",
    label: "Reference Name",
    render: (_, row) => (
      <div className="space-y-1">
        <div className="font-semibold text-white">{row.referenceName}</div>
        <div className="text-sm text-slate-400">{row.reference}</div>
      </div>
    ),
  },
  {
    key: "displayLabel",
    label: "Display Label",
  },
  {
    key: "listSize",
    label: "List Size",
    render: (size) => (
      <div className="text-slate-300">{size} Items</div>
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

export function MasterSetupSurveyOptionsPage() {
  const handleAddOption = () => {
    console.log("Add new survey option");
  };

  return (
    <section className="space-y-6">
      <SectionHeader
        title="survey options"
        description="Configure dynamic lists and dropdown values for data collection sheets."
        buttonLabel="Add New List"
        onAddClick={handleAddOption}
      />

      <SectionTable<SurveyOption>
        columns={surveyOptionsColumns}
        data={mockSurveyOptions}
        onRowAction={(option) => console.log("Edit option:", option)}
      />
    </section>
  );
}
