import { get } from "idb-keyval";
import type { SurveyDraft } from "./types";

export function assertSurveyId(surveyId: string): void {
  if (!surveyId || typeof surveyId !== "string") {
    throw new Error("surveyId must be a non-empty string");
  }
  // Prevent characters that would break our key format
  if (surveyId.includes(":") || surveyId.includes("/")) {
    throw new Error("surveyId contains invalid characters");
  }
}

export const SURVEY_DRAFTS_META_KEY = "mis-survey-drafts-meta";

export function surveyDraftKey(surveyId: string): string {
  assertSurveyId(surveyId);
  return `mis:survey:${surveyId}:draft`;
}

export function isSurveyDraftKey(key: string, surveyId: string): boolean {
  assertSurveyId(surveyId);
  const prefix = `mis:survey:${surveyId}:draft`;
  return key.startsWith(prefix);
}

type SurveyDraftsMeta = {
  drafts?: Pick<SurveyDraft, "id">[];
  activeDraftId?: string | null;
};

export async function surveyDraftExists(draftId: string): Promise<boolean> {
  assertSurveyId(draftId);

  const meta = (await get<SurveyDraftsMeta>(SURVEY_DRAFTS_META_KEY)) ?? null;
  if (!meta?.drafts?.length) return false;

  return meta.drafts.some((draft) => draft.id === draftId);
}
