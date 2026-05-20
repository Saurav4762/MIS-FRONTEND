import { Button } from "@shared/ui/Button/Button";
import { ButtonLink } from "@shared/ui/ButtonLink";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { FAMILY_SECTIONS } from "../model";

type HouseholdItemProps = {
  householdId: string;
  caseId: string;
  householdName: string;
  index: number;
  onDelete: () => void;
};

export default function HouseholdItem({
  householdId,
  householdName,
  index,
  caseId,
  onDelete,
}: HouseholdItemProps) {
  console.log("Rendering keys", { householdId, caseId });
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
      {/* Household Header */}
      <div className="flex max-w-full overflow-hidden group hover:bg-ink-100">
        <Button
          onClick={() => toggleExpand()}
          size="sm"
          variant="ghost"
          className="max-w-full group flex flex-1 items-center justify-between rounded-none"
        >
          <div className="flex items-center gap-3 flex-1">
            {isExpanded ? (
              <ChevronDown className="h-5 w-5 text-pri-700 shrink-0" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-400 shrink-0" />
            )}
            <span className="font-semibold w-full text-pri-700 flex gap-3 text-left">
              <span>{index + 1}.</span>
              <span className="flex-1 w-1 overflow-hidden text-ellipsis">{householdName}</span>
            </span>
          </div>
        </Button>

        {/* Delete Button */}
        <div className="p-2 group">
          <Button
            onClick={(e) => handleDelete(e)}
            variant="ghost"
            size="sm"
            block={false}
            className="hover:bg-red-50 group-hover:opacity-100 opacity-0 transition-all rounded-md group"
            aria-label={`Delete ${householdName}`}
          >
            <X className="h-3 w-3 text-gray-400 group-hover:text-red-600" />
          </Button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-gray-200 pl-5">
          <ul className="border-l-2 border-ink-100 pl-0">
            {FAMILY_SECTIONS.map((section) => (
              <li key={section.id} className="">
                <ButtonLink
                  to={section.link}
                  params={{
                    caseId: caseId,
                    householdId: householdId,
                  }}
                  align="left"
                  block={true}
                  className="rounded-none"
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
  );
}
