interface SurveyOption {
  id: number;
  referenceName: string;
  reference: "system reference" | "survey specific";
  displayLabel: string;
  listSize: number;
  status: "Active" | "Inactive";
}

export const mockSurveyOptions: SurveyOption[] = [
  {
    id: 1,
    referenceName: "prop_type",
    reference: "system reference",
    displayLabel: "Property Types",
    listSize: 4,
    status: "Active",
  },
  {
    id: 2,
    referenceName: "road_category",
    reference: "system reference",
    displayLabel: "Road Categories",
    listSize: 3,
    status: "Active",
  },
  {
    id: 3,
    referenceName: "custom_toles",
    reference: "survey specific",
    displayLabel: "Local Toles Option",
    listSize: 8,
    status: "Active",
  },
  {
    id: 4,
    referenceName: "crop_types",
    reference: "survey specific",
    displayLabel: "Crop Types",
    listSize: 12,
    status: "Active",
  },
  {
    id: 5,
    referenceName: "religions",
    reference: "survey specific",
    displayLabel: "Religions",
    listSize: 5,
    status: "Active",
  },
];

export type { SurveyOption };
