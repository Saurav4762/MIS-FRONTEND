import { ChevronLeft, Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";

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
          className="rounded-lg border border-[#1a2742] bg-[#081428] p-2 hover:bg-[#0a1a33] transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-slate-400" />
        </Link>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-100 capitalize">
            {title}
          </h1>
          <p className="mt-2 text-slate-400">{description}</p>
        </div>
      </div>
      <button
        onClick={onAddClick}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 transition-colors"
      >
        <Plus className="h-4 w-4" />
        {buttonLabel}
      </button>
    </div>
  );
}
