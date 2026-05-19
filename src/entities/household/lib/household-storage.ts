import { assertCaseId as assertSurveyId } from "@entities/case/model/case-storage-keys";
import type { Household, HouseholdSurveySnapshot } from "../model/types";
import { householdsMetaKey } from "../model/household-storage-keys";
import { del, get, set } from "idb-keyval";

export const createEmptySnapshot = (): HouseholdSurveySnapshot => ({
  households: [],
  expandedHouseholdId: null,
});

export const nowHouseholdName = (households: Household[]) =>
  `Household ${households.length + 1}`;

export const readSurveySnapshot = async (
  surveyId: string,
): Promise<HouseholdSurveySnapshot> => {
  assertSurveyId(surveyId);
  const snapshot =
    (await get<HouseholdSurveySnapshot>(householdsMetaKey(surveyId))) ?? null;
  return snapshot ?? createEmptySnapshot();
};

export const writeSurveySnapshot = async (
  surveyId: string,
  snapshot: HouseholdSurveySnapshot,
): Promise<void> => {
  assertSurveyId(surveyId);
  await set(householdsMetaKey(surveyId), snapshot);
};

export const deleteSurveySnapshot = async (surveyId: string): Promise<void> => {
  assertSurveyId(surveyId);
  await del(householdsMetaKey(surveyId));
};

export const clearSurveySnapshot = async (surveyId: string): Promise<void> => {
  assertSurveyId(surveyId);
  await set(householdsMetaKey(surveyId), createEmptySnapshot());
};
