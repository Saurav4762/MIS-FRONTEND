import type { CaseTreeNode } from "../model/types";
import { createCategoryNode, createFormNode } from "./categories";

export const createHouseNodeId = (houseId: string) => `house:${houseId}:profile`;
export const HOUSE_BASIC_FORM_KEY = "house-profile.basic";

export const houseProfileTemplate = (houseId: string): CaseTreeNode[] => {
  const categoryId = createHouseNodeId(houseId);
  const basicFormId = `${categoryId}:basic`;

  const category = createCategoryNode(categoryId, "House Profile");
  const basicForm = createFormNode(basicFormId, "Basic Info", HOUSE_BASIC_FORM_KEY);

  category.childrenIds = [basicFormId];

  return [category, basicForm];
};
