import { ChevronLeft, Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@shared/ui/Button";

interface SectionHeaderProps {
  title: string;
  description: string;
  buttonLabel: string;
  onAddClick?: () => void;
}

export function SectionHeader({
  title,
  description,
  buttonLabel,
  onAddClick,
}: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between">
      <div className="flex items-center gap-4">
        <Link
          to="/master-setup"
          className="rounded-lg border border-[var(--mis-color-ink-300)] bg-[var(--mis-color-white)] p-2 text-[var(--mis-color-ink-600)] transition-colors hover:bg-[var(--mis-color-ink-50)]"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--mis-color-ink-900)] capitalize">
            {title}
          </h1>
          <p className="mt-2 text-[var(--mis-color-ink-600)]">{description}</p>
        </div>
      </div>
      <Button
        onClick={onAddClick}
      >
        <Plus className="h-4 w-4" />
        {buttonLabel}
      </Button>
    </div>
  );
}
