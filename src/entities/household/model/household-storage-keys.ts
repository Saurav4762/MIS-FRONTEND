import { surveyDraftKey } from "@entities/survey/model/survey-storage-keys";

export function householdsMetaKey(surveyId: string): string {
  return `${surveyDraftKey(surveyId)}:households-meta`;
}

// export const householdKeyPrefix = (surveyId: string, householdId: string) => {
//   assertSurveyId(surveyId);
//   return `mis:survey:${surveyId}:household:${householdId}:`;
// };

// export function householdKey(
//   surveyId: string,
//   householdId: string,
//   ...segments: string[]
// ): string {
//   assertSurveyId(surveyId);
//   const tail = segments.filter(Boolean).join("/");
//   return `${householdKeyPrefix(surveyId, householdId)}${tail}`;
// }

// export function isHouseholdKey(
//   key: string,
//   surveyId: string,
//   householdId?: string,
// ): boolean {
//   assertSurveyId(surveyId);
//   const prefix = householdId
//     ? householdKeyPrefix(surveyId, householdId)
//     : `mis:survey:${surveyId}:household:`;
//   return key.startsWith(prefix);
// }
