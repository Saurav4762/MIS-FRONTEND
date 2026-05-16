import { del, get, keys, set } from "idb-keyval";
import { isSurveyFormKey, surveyFormKey } from "../model/survey-storage-keys";
import type { FormPath, FormPathSegment } from "../model/types";

export async function loadSurveyForm<T>(
  surveyId: string,
  ...path: FormPath
): Promise<T | null> {
  const value = await get<T>(surveyFormKey(surveyId, ...path));
  return value ?? null;
}

/** Path segment(s) first, data last: saveSurveyForm(id, "house-profile", data) */
export async function saveSurveyForm<T>(
  surveyId: string,
  ...args: [...FormPathSegment[], T]
): Promise<void> {
  if (args.length < 2) {
    throw new Error(
      "saveSurveyForm requires at least one path segment and form data",
    );
  }

  const data = args[args.length - 1] as T;
  const path = args.slice(0, -1) as FormPathSegment[];
  await set(surveyFormKey(surveyId, ...path), data);
}

export async function deleteSurveyForm(
  surveyId: string,
  ...path: FormPathSegment[]
): Promise<void> {
  await del(surveyFormKey(surveyId, ...path));
}

/** Removes every form blob for this survey (any depth). Meta registry is untouched. */
export async function deleteAllSurveyForms(surveyId: string): Promise<void> {
  const allKeys = await keys();
  const surveyKeys = allKeys.filter(
    (key): key is string =>
      typeof key === "string" && isSurveyFormKey(key, surveyId),
  );

  await Promise.all(surveyKeys.map((key) => del(key)));
}
