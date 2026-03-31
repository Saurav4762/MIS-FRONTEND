import { Link } from "@tanstack/react-router";
import type { MasterSetupSection } from "../lib/routes";
import type { LucideIcon } from "lucide-react";

interface SetupCardProps {
  title: string;
  count?: number;
  status?: string;
  description: string;
  buttonLabel: string;
  icon: LucideIcon;
  section: MasterSetupSection;
}

export function SetupCard({
  title,
  count,
  status,
  description,
  buttonLabel,
  icon: Icon,
  section,
}: SetupCardProps) {
  return (
    <div className="flex flex-col rounded-lg border border-[#1a2742] bg-[#081428] p-6">
      <div className="flex items-start gap-4">
        <div className="text-3xl"><Icon size={28} /></div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
          {count !== undefined && (
            <p className="text-sm text-slate-400">
              {count} {status || ""}
            </p>
          )}
          {status && count === undefined && (
            <p className="text-sm text-slate-400">{status}</p>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-400">{description}</p>

      <Link
        to="/master-setup/$section"
        params={{ section }}
        className="mt-6 rounded-md text-center text-sm bg-slate-700 px-4 py-2 font-medium text-slate-100 transition-colors hover:bg-slate-600"
      >
        {buttonLabel}
      </Link>
    </div>
  );
}
