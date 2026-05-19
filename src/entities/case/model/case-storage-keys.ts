export function assertCaseId(caseId: string): void {
  if (!caseId || typeof caseId !== "string") {
    throw new Error("caseId must be a non-empty string");
  }
  if (caseId.includes(":") || caseId.includes("/")) {
    throw new Error("caseId contains invalid characters");
  }
}

export const CASE_DRAFTS_META_KEY = "mis-case-drafts-meta";

export const CASE_TREE_PREFIX = "mis-case-tree";
export const CASE_FORM_PREFIX = "mis-case-form";

export function caseMetaKey(caseId: string): string {
  assertCaseId(caseId);
  return `mis:case:${caseId}:meta`;
}

export function caseTreeKey(caseId: string): string {
  assertCaseId(caseId);
  return `mis:case:${caseId}:tree`;
}

export function caseFormDraftKey(draftId: string, nodeId: string): string {
  assertCaseId(draftId);

  if (!nodeId || typeof nodeId !== "string") {
    throw new Error("nodeId must be a non-empty string");
  }

  return `mis:case:${draftId}:node:${nodeId}:form`;
}
