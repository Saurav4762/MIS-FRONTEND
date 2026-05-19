import type { CaseTreeNode } from "../model/types";
import { createCategoryNode, createFormNode } from "./categories";

export const createInstituteNodeId = (instituteId: string) => `institute:${instituteId}:profile`;
export const INSTITUTE_BASIC_FORM_KEY = "institute-profile.basic";

export const instituteProfileTemplate = (instituteId: string): CaseTreeNode[] => {
  const categoryId = createInstituteNodeId(instituteId);
  const basicFormId = `${categoryId}:basic`;

  const category = createCategoryNode(categoryId, "Institute Profile");
  const basicForm = createFormNode(basicFormId, "Basic Info", INSTITUTE_BASIC_FORM_KEY);

  category.childrenIds = [basicFormId];

  return [category, basicForm];
};
