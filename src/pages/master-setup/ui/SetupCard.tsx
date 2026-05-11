import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import type { MasterSetupSectionPageId } from "../model/types";

import { masterSetupSectionUrlMap } from "../model/types";

interface SetupCardProps {
  title: string;
  count?: number;
  status?: string;
  description: string;
  buttonLabel: string;
  icon: LucideIcon;
  // the full path
  section: MasterSetupSectionPageId;
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
    <div className="flex flex-col rounded-lg border border-(--mis-color-ink-200) bg-(--mis-color-white) p-6">
      <div className="flex items-start gap-4">
        <div className="text-3xl">
          <Icon size={28} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-(--mis-color-ink-900)">{title}</h3>
          {count !== undefined && (
            <p className="text-sm text-(--mis-color-ink-600)">
              {count} {status || ""}
            </p>
          )}
          {status && count === undefined && (
            <p className="text-sm text-(--mis-color-ink-600)">{status}</p>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm text-(--mis-color-ink-600)">{description}</p>

      <Link
        to={masterSetupSectionUrlMap[section]}
        className="mt-6 rounded-md bg-(--mis-color-pri-500) px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-(--mis-color-pri-600)"
      >
        {buttonLabel}
      </Link>
    </div>
  );
}
