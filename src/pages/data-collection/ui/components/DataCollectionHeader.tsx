import { useState } from "react";
import { Input } from "@shared/ui/Input";
import { Button } from "@shared/ui/Button";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import NewSurveyModal from "./NewSurveyModel";

export default function DataCollectionHeader() {
  const navigate = useNavigate();
  const [isNewSurveyModalOpen, setIsNewSurveyModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 max-w-2xl">
          <div className="relative border-field border-solid rounded-field border-ink-200 bg-white p-0.5 h-min">
            <span className="absolute inset-y-0 left-3 flex items-center text-ink-400">
              <Search className="h-5 w-5" />
            </span>
            <Input placeholder="Search records..." className="pl-8 py-2" />
          </div>
        </div>

        <div>
          <Button
            variant="primary"
            className="text-white cursor-pointer flex gap-4 h-auto p-2.5 px-4"
            size="sm"
            onClick={() => setIsNewSurveyModalOpen(true)}
          >
            <span>
              <Plus className="h-3 w-3 stroke-3" />
            </span>
            <span>Add New</span>
          </Button>
        </div>
      </div>

      <NewSurveyModal
        isOpen={isNewSurveyModalOpen}
        onClose={() => setIsNewSurveyModalOpen(false)}
        onCreateDraft={() => {
          navigate({ to: "/data-collection/forms/drafts" });
        }}
      />
    </>
  );
}
