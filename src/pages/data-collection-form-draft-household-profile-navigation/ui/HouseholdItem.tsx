import { Button } from "@shared/ui/Button/Button";
import { ButtonLink } from "@shared/ui/ButtonLink";
import type { LinkProps } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { useState } from "react";

interface FamilySection {
  id: string;
  label: string;
  link: LinkProps["to"];
}

const FAMILY_SECTIONS: FamilySection[] = [
  {
    id: "member-details",
    label: "Member Details",
    link: "/data-collection/forms/drafts/$surveyId/household-profile/member-details",
  },
  {
    id: "social-cultural",
    label: "Social / Cultural",
    link: "/data-collection/forms/drafts/$surveyId/household-profile/social-cultural",
  },
  {
    id: "residence",
    label: "Residence",
    link: "/data-collection/forms/drafts/$surveyId/household-profile/residence",
  },
  {
    id: "economic",
    label: "Economic",
    link: "/data-collection/forms/drafts/$surveyId/household-profile/economic",
  },
  {
    id: "facilities",
    label: "Facilities",
    link: "/data-collection/forms/drafts/$surveyId/household-profile/facilities",
  },
  {
    id: "health",
    label: "Health",
    link: "/data-collection/forms/drafts/$surveyId/household-profile/health",
  },
  {
    id: "agriculture",
    label: "Agriculture",
    link: "/data-collection/forms/drafts/$surveyId/household-profile/agriculture",
  },
  {
    id: "livestock",
    label: "Livestock",
    link: "/data-collection/forms/drafts/$surveyId/household-profile/livestock",
  },
  {
    id: "decision-making",
    label: "Decision Making",
    link: "/data-collection/forms/drafts/$surveyId/household-profile/decision-making",
  },
  {
    id: "disaster",
    label: "Disaster",
    link: "/data-collection/forms/drafts/$surveyId/household-profile/disaster",
  },
  {
    id: "collector",
    label: "Collector",
    link: "/data-collection/forms/drafts/$surveyId/household-profile",
  },
];

type HouseholdItemProps = {
  key: string;
  familyName: string;
  index: number;
  // onToggle: () => void;
  onDelete: () => void;
};

export default function HouseholdItem({
  key,
  familyName,
  index,
  // onToggle,
  onDelete,
}: HouseholdItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onDelete();
  };
  return (
    <div>
      <div key={key}>
        {/* Family Header */}
        <Button
          onClick={() => toggleExpand()}
          size="sm"
          variant="ghost"
          className="w-full group flex items-center justify-between rounded-none"
        >
          <div className="flex items-center gap-3 flex-1">
            {isExpanded ? (
              <ChevronDown className="h-5 w-5 text-pri-700 shrink-0" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-400 shrink-0" />
            )}
            <span className="font-semibold text-pri-700 flex gap-3 text-left">
              <span>{index + 1}.</span>
              <span>{familyName}</span>
            </span>
          </div>

          {/* Delete Button */}
          <Button
            onClick={(e) => handleDelete(e)}
            variant="ghost"
            size="sm"
            block={false}
            className="hover:bg-red-50 group-hover:opacity-100 opacity-0 transition-all rounded-md group"
            aria-label={`Delete ${familyName}`}
          >
            <X className="h-3 w-3 text-gray-400 group-hover:text-red-600" />
          </Button>
        </Button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-gray-200 pl-5">
            <ul className="space-y-2 border-l-2 border-ink-100 pl-2">
              {FAMILY_SECTIONS.map((section) => (
                <li key={section.id} className="">
                  <ButtonLink
                    to={section.link}
                    align="left"
                    block={true}
                    variant={"text"}
                    size="text"
                    isActive={false}
                  >
                    {section.label}
                  </ButtonLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
