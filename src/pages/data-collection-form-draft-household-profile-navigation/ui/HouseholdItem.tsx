import { Button } from "@shared/ui/Button/Button";
import { ButtonLink } from "@shared/ui/ButtonLink";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { FAMILY_SECTIONS } from "../model";

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
