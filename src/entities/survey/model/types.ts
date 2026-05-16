export type SurveyDraftId = string;

/** URL-safe slug for one level in the form tree (e.g. "house-profile", "member-details") */
export type FormPathSegment = string;

/**
 * Variable-depth form path: 1 segment = level 2, 2 = level 3, 3 = level 4.
 * Length is enforced at runtime by assertFormPathDepth (1–3 segments).
 */
export type FormPath = readonly FormPathSegment[];

/** Top-level survey categories (level 2) */
export const SURVEY_CATEGORIES = [
  "house-profile",
  "household-profile",
  "institute-profile",
] as const;

export type SurveyCategory = (typeof SURVEY_CATEGORIES)[number];

/** Household sub-forms (typically level 4 under a group such as "family") */
export const HOUSEHOLD_SUB_FORMS = [
  "member-details",
  "social-cultural",
  "residence",
  "economic",
  "facilities",
  "health",
  "agriculture",
  "livestock",
  "decision-making",
  "disaster",
] as const;

export type HouseholdSubForm = (typeof HOUSEHOLD_SUB_FORMS)[number];

export interface FormProgressMeta {
  savedAt: string;
}

export interface SurveyDraft {
  id: SurveyDraftId;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: "draft";
  /** Keys are slash paths, e.g. "household-profile/family/member-details" */
  formProgress?: Record<string, FormProgressMeta>;
}