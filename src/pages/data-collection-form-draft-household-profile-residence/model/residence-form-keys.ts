import type { CaseTreeNode } from "@entities/case";
import type { ResidenceFormValues } from "./types";

export const RESIDENCE_FORM_TITLE = "Residence";
export const RESIDENCE_FORM_NODE_TYPE: CaseTreeNode["type"] = "form";
export const RESIDENCE_FORM_KEY = "household-profile.residence";

export const RESIDENCE_FIELD_KEYS = {
  ownershipStatus: "ownershipStatus",
  housingType: "housingType",
  roofMaterial: "roofMaterial",
  floorMaterial: "floorMaterial",
  waterSource: "waterSource",
  toiletFacility: "toiletFacility",
  electricityAccess: "electricityAccess",
  internetAccess: "internetAccess",
  roomCount: "roomCount",
  remarks: "remarks",
} as const;

export const RESIDENCE_FORM_DEFAULT_VALUES: ResidenceFormValues = {
  ownershipStatus: "",
  housingType: "",
  roofMaterial: "",
  floorMaterial: "",
  waterSource: "",
  toiletFacility: "",
  electricityAccess: "",
  internetAccess: "",
  roomCount: "",
  remarks: "",
};

export const createResidenceNodeId = (householdId: string) =>
  `household:${householdId}:residence`;

export const createResidenceFormNode = (
  householdId: string,
): CaseTreeNode => ({
  id: createResidenceNodeId(householdId),
  title: RESIDENCE_FORM_TITLE,
  type: RESIDENCE_FORM_NODE_TYPE,
  childrenIds: [],
  formKey: RESIDENCE_FORM_KEY,
});