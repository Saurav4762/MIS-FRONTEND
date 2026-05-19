import { useCallback, useEffect, useState } from "react";
import { NotebookPen } from "lucide-react";
import { Button } from "@shared/ui/Button";
import { FormField, Input } from "@shared/ui/Input";

export interface NewHouseholdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateHousehold?: (householdName: string) => void;
}

export default function NewHouseholdModal({
  isOpen,
  onClose,
  onCreateHousehold,
}: NewHouseholdModalProps) {
  const [householdName, setHouseholdName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleClose = useCallback(() => {
    setHouseholdName("");
    setError(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = householdName.trim();

    if (!trimmed) {
      setError("Household name is required.");
      return;
    }

    onCreateHousehold?.(trimmed);
    handleClose();
  };

  return (
    <div
      className="mis-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
      role="presentation"
      onClick={handleClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-survey-modal-title"
        className="flex w-full max-w-[480px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_rgba(15,23,42,0.15)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col items-center p-8 pb-0 text-center">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-pri-50 text-pri-600">
            <NotebookPen className="h-7 w-7" strokeWidth={1.75} />
          </div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-ink-500">
            Household Management
          </p>
          <h2
            id="new-survey-modal-title"
            className="text-2xl font-extrabold leading-tight text-ink-900"
          >
            Create Household
          </h2>
          <p className="mt-3 text-center text-md leading-relaxed text-ink-500">
            Enter a name to start building your household profile.
          </p>
        </div>

        <form onSubmit={(e) => handleSubmit(e)} className="p-8">
          <FormField label="Household Name" required errorText={error ?? undefined}>
            <Input
              id="household_name"
              name="household_name"
              value={householdName}
              onChange={(event) => {
                setHouseholdName(event.target.value);
                if (error) {
                  setError(null);
                }
              }}
              placeholder="e.g., Ward 4 Infrastructure Survey"
              className="h-field border-[1.5px] border-ink-300 px-field-px py-field-py"
              hasError={Boolean(error)}
              autoFocus
            />
          </FormField>

          <div className="mt-6 flex flex-row-reverse gap-3">
            <Button type="submit" variant="primary" block className="flex-1">
              Create Household
            </Button>
            <Button
              type="button"
              variant="ghost"
              block
              className="flex-1 text-ink-800 hover:bg-ink-100"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
