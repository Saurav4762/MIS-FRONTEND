import { Pen, Trash2 } from "lucide-react";

export default function ActionButtons({
  onEdit,
  onDelete,
}: {
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="flex items-center gap-3 justify-end">
      <button
        onClick={onEdit}
        aria-label="edit"
        className="p-1  text-ink-600 hover:text-ink-800 hover:bg-ink-100 rounded cursor-pointer"
      >
        <Pen className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={onDelete}
        aria-label="delete"
        className="p-1 text-ink-800 hover:text-error-600 hover:bg-error-50 rounded cursor-pointer"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
