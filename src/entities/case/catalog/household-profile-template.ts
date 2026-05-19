import type { CaseTreeNode } from "../model/types";
import { createCategoryNode, createFormNode } from "./categories";

export const HOUSEHOLD_PROFILE_CATEGORY_ID = (householdId: string) => `household:${householdId}:profile`;

export const createResidenceNodeId = (householdId: string) => `household:${householdId}:residence`;
export const RESIDENCE_FORM_KEY = "household-profile.residence";

export const householdProfileTemplate = (householdId: string): CaseTreeNode[] => {
  const categoryId = HOUSEHOLD_PROFILE_CATEGORY_ID(householdId);
  const residenceNodeId = createResidenceNodeId(householdId);

  const category = createCategoryNode(categoryId, "Household Profile");
  const residenceForm = createFormNode(residenceNodeId, "Residence", RESIDENCE_FORM_KEY);

  category.childrenIds = [residenceNodeId];

  return [category, residenceForm];
};
