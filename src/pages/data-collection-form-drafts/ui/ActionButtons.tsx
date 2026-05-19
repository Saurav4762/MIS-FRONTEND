import { Button } from "@shared/ui/Button";
import { ButtonLink } from "@shared/ui/ButtonLink";
import { ArrowRight, Trash2 } from "lucide-react";

export default function ActionButtons({
  onDelete,
  draftId,
}: {
  onEdit?: () => void;
  onDelete?: () => void;
  draftId: string;
}) {
  return (
    <div className="flex items-center gap-3 justify-center">
      <Button
        onClick={onDelete}
        aria-label="delete"
        variant={"danger"}
        size={"sm"}
        className="bg-transparent text-ink-800 hover:text-error-600 hover:bg-error-50 rounded cursor-pointer"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
      <ButtonLink
        to="/data-collection/forms/drafts/$caseId"
        params={{ caseId: draftId }}
        variant={"ghost"}
        size={"sm"}
        className="h-auto"
        icon={<ArrowRight className="h-3.5 w-3.5" />}
      ></ButtonLink>
    </div>
  );
}
