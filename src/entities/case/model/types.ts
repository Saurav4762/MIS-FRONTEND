export type CaseDraftId = string;

export interface CaseDraft {
  id: CaseDraftId;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: "draft" | "archived";
}

export type CaseNodeId = string;

export type CaseNodeType = "case" | "category" | "form";

export interface CaseTreeNode {
  id: CaseNodeId;
  title: string;
  type: CaseNodeType;
  parentId?: CaseNodeId;
  childrenIds: CaseNodeId[];
}

export interface CaseTreeSnapshot {
  caseId: CaseDraftId;
  nodesById: Record<CaseNodeId, CaseTreeNode>;
  updatedAt: string;
  version: number;
}

export interface FormDraft {
  draftId: CaseDraftId;
  nodeId: CaseNodeId;
  values: unknown;
  updatedAt: string;
}

export interface FormDraftMeta {
  draftId: CaseDraftId;
  nodeId: CaseNodeId;
  updatedAt: string;
}

export interface UiSelectionState {
  activeCaseId: CaseDraftId | null;
  activeNodeId: CaseNodeId | null;
  expandedNodeIds: Record<CaseNodeId, boolean>;
}
