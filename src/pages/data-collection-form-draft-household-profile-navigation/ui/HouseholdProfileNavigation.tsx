import { useState } from "react";
import HouseholdItem from "./HouseholdItem";
import { Button } from "@shared/ui/Button";
import { Plus } from "lucide-react";

interface FamilyMember {
  id: string;
  name: string;
}

interface Family {
  id: string;
  name: string;
  members: FamilyMember[];
}

// const INITIAL_FAMILIES: Family[] = [
//   {
//     id: "family-1",
//     name: "Family 1",
//     members: [{ id: "member-1", name: "John Doe" }],
//   },
//   {
//     id: "family-2",
//     name: "Family 2",
//     members: [{ id: "member-2", name: "Jane Smith" }],
//   },
//   {
//     id: "family-3",
//     name: "Family 3",
//     members: [{ id: "member-3", name: "Bob Johnson" }],
//   },
// ];

export default function HouseholdProfileNavigation() {
  const [families, setFamilies] = useState<Family[]>();
  const [expandedFamilyId, setExpandedFamilyId] = useState<string | null>(
    "family-1",
  );

  const deleteFamily = (familyId: string) => {
    setFamilies(families?.filter((f) => f.id !== familyId));
    if (expandedFamilyId === familyId) {
      setExpandedFamilyId(null);
    }
  };

  const addFamily = () => {
    const newFamilyId = `family-${Date.now()}`;
    const newFamilyIndex = families ? families.length + 1 : 1;
    const newFamily: Family = {
      id: newFamilyId,
      name: `Family ${newFamilyIndex}`,
      members: [],
    };
    setFamilies([...(families || []), newFamily]);
  };

  return (
    <div className="w-full max-w-md rounded-lg border h-full overflow-hidden flex flex-col border-gray-200 bg-white shadow-sm">
      <h2 className="mb-6 p-4 border-b border-ink-200 text-xs font-semibold text-gray-600 uppercase tracking-wide">
        Form list
      </h2>
      <div className="flex-1 overflow-y-scroll">
        {families?.map((family, index) => (
          <HouseholdItem
            familyName={family.name}
            index={index}
            key={family.id}
            onDelete={() => deleteFamily(family.id)}
          />
        ))}
      </div>

      {/* Add Family Button */}
      <div className="p-4 border-t-2 border-ink-100">
        <Button variant="primary" size="sm" block onClick={addFamily}>
          <span>
            <Plus />
          </span>
          <span>Add Family</span>
        </Button>
      </div>
    </div>
  );
}
