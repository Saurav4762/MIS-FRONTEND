import { assertFormPathDepth, formPathToString } from "./form-path";
import type { FormPath } from "./types";

export const SURVEY_DRAFTS_META_KEY = "mis-survey-drafts-meta";

export const surveyFormKeyPrefix = (surveyId: string) =>
  `mis:survey:${surveyId}:`;

/**
 * Build an IndexedDB key for form data.
 * Segment count = depth: 1 → level 2, 2 → level 3, 3 → level 4.
 *
 * @example surveyFormKey(id, "house-profile")
 * @example surveyFormKey(id, "household-profile", "family", "member-details")
 */
export function surveyFormKey(
  surveyId: string,
  ...segments: FormPath
): string {
  assertFormPathDepth(segments);
  return `${surveyFormKeyPrefix(surveyId)}${formPathToString(segments)}`;
}

/** True if a key belongs to this survey's form blobs (not the meta registry key) */
export function isSurveyFormKey(key: string, surveyId: string): boolean {
  return key.startsWith(surveyFormKeyPrefix(surveyId));
}
