import type { CaseTreeNode } from "../model/types";
import { useCaseTreeStore } from "@entities/case";

export const applyTemplate = async (caseId: string, nodes: CaseTreeNode[]) => {
  const upsert = useCaseTreeStore.getState().upsertNode;
  for (const node of nodes) {
    await upsert(caseId, node);
  }
};
