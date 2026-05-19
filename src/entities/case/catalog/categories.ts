import type { CaseTreeNode } from "../model/types";

export const createCategoryNode = (id: string, title: string): CaseTreeNode => ({
  id,
  title,
  type: "category",
  childrenIds: [],
});

export const createFormNode = (id: string, title: string, formKey: string): CaseTreeNode => ({
  id,
  title,
  type: "form",
  childrenIds: [],
  formKey,
});

