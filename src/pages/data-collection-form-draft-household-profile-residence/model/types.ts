export type ResidenceFormValues = {
  ownershipStatus: string;
  housingType: string;
  roofMaterial: string;
  floorMaterial: string;
  waterSource: string;
  toiletFacility: string;
  electricityAccess: string;
  internetAccess: string;
  roomCount: string;
  remarks: string;
};

export type ResidenceFormSectionId =
  | "tenure"
  | "dwelling"
  | "utilities"
  | "notes";