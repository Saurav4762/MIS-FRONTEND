import { useCaseDraftStore } from "@entities/case";
import ActionButtons from "./ActionButtons";
import { formatDate } from "../lib/date";
import { Input } from "@shared/ui/Input/Input";
import { Button } from "@shared/ui/Button/Button";
import NewSurveyModal from "./NewSurveyDraftModel";
import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";

export default function DraftsTable() {
  // Load drafts from state management
  const navigate = useNavigate();

  // const drafts = useCaseDraftStore((state) =>
  //   state.draftIds.map((draftId) => state.draftsById[draftId]).filter(Boolean),
  // );

  const draftIds = useCaseDraftStore((state) => state.draftIds);

  const draftsById = useCaseDraftStore((state) => state.draftsById);

  const drafts = useMemo(
    () => draftIds.map((id) => draftsById[id]).filter(Boolean),
    [draftIds, draftsById],
  );

  const createCase = useCaseDraftStore((state) => state.createCase);

  const onCreateDraft = (draftName: string) => {
    const draftId = createCase(draftName);
    navigate({ to: `/data-collection/forms/drafts/${draftId}` });
  };

  const [isNewSurveyModalOpen, setIsNewSurveyModalOpen] = useState(false);

  return (
    <div className="w-full overflow-auto">
      <div className="flex items-start justify-between gap-4 p-6">
        <div className="flex-1 max-w-2xl">
          <div className="relative border-field border-solid rounded-field border-ink-200 bg-white p-0.5 h-min">
            <span className="absolute inset-y-0 left-3 flex items-center text-ink-400">
              <Search className="h-5 w-5" />
            </span>
            <Input placeholder="Search records..." className="pl-8 py-2" />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Button
            variant="primary"
            className="text-white cursor-pointer flex gap-4 h-auto p-2.5 px-4"
            size="sm"
            onClick={() => setIsNewSurveyModalOpen(true)}
          >
            <span>
              <Plus className="h-3 w-3 stroke-3" />
            </span>
            <span>Start new draft</span>
          </Button>
        </div>
      </div>

      <NewSurveyModal
        isOpen={isNewSurveyModalOpen}
        onClose={() => setIsNewSurveyModalOpen(false)}
        onCreateDraft={onCreateDraft}
      />

      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="bg-ink-50 text-left text-sm font-semibold text-ink-500">
            <th className="w-1/2 px-6 pl-6 py-3.5">Draft Name</th>
            <th className="w-1/4 px-4 py-3.5 text-center">Created At</th>
            <th className="w-1/4 px-4 py-3.5 text-center">Updated At</th>
            <th className="w-1/4 px-4 py-3.5 text-center">Status</th>
            <th className="w-1/4 px-4 pr-6 py-3.5 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {drafts.length !== 0 &&
            drafts.map((draft) => (
              <tr
                className="border-t border-ink-200 hover:bg-ink-50 cursor-pointer"
                key={draft.id}
                onClick={() =>
                  navigate({ to: `/data-collection/forms/drafts/${draft.id}` })
                }
              >
                <td className="px-4 pl-6 py-3.5">
                  <div className="text-ink-900 font-medium">{draft.name}</div>
                </td>
                <td className="px-4 py-3.5">{formatDate(draft.createdAt)}</td>

                <td className="px-4 py-3.5">{formatDate(draft.updatedAt)}</td>
                <td className="px-4 py-3.5 text-center">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {draft.status}
                  </span>
                </td>
                <td className="px-4 pr-6 py-3.5 text-center">
                  <ActionButtons
                    onEdit={() => {}}
                    onDelete={() => {}}
                    draftId={draft.id}
                  />
                </td>
              </tr>
            ))}
          {drafts.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-6 text-ink-500">
                No drafts available. Create a new draft to get started!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
