import { caseMetaKey } from "@entities/case/model/case-storage-keys";

export function householdsMetaKey(surveyId: string): string {
  return `${caseMetaKey(surveyId)}:households-meta`;
}
