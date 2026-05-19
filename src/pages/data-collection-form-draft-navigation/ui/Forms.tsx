import { ButtonLink } from "@shared/ui/ButtonLink";
import {
  Home as House,
  Users as Family,
  Building2 as Institute,
} from "lucide-react";

export default function Forms() {
  // check whether the draft exists or not

  return (
    <aside className="w-64 space-y-2 rounded-lg border border-ink-200 bg-white p-4 shadow-xs">
      <ButtonLink
        to="/data-collection/forms/drafts/$caseId/house-profile"
        variant="ghost"
        size="sm"
        align="left"
        block={true}
        icon={<House className="h-4 w-4" />}
      >
        <span className="text-sm font-semibold">House Profile</span>
      </ButtonLink>

      <ButtonLink
        to="/data-collection/forms/drafts/$caseId/household-profile"
        variant="ghost"
        size="sm"
        align="left"
        block={true}
        icon={<Family className="h-4 w-4" />}
      >
        <span className="text-sm font-semibold">Household Profile</span>
      </ButtonLink>

      <ButtonLink
        to="/data-collection/forms/drafts/$caseId/institute-profile"
        variant="ghost"
        size="sm"
        align="left"
        block={true}
        icon={<Institute className="h-4 w-4" />}
      >
        <span className="text-sm font-semibold">Institute Profile</span>
      </ButtonLink>
    </aside>
  );
}
