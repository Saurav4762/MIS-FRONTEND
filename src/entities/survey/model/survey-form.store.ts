import { create } from "zustand";
import {
  loadSurveyForm,
  saveSurveyForm,
  deleteSurveyForm,
  deleteAllSurveyForms,
} from "../lib/survey-form-storage";
// import { formPathToString } from "./form-path";
import type { FormPath } from "./types";
import { surveyFormKey } from "./survey-storage-keys";

type CacheKey = string;

// /** Build a stable cache key matching idb key pattern */
// const makeKey = (surveyId: string, path: FormPath) =>
//   `${surveyId}:${formPathToString(path)}`;

interface SurveyFormState {
  cache: Record<CacheKey, unknown>;

  loadForm: <T = unknown>(
    surveyId: string,
    path: FormPath,
  ) => Promise<T | null>;

  saveForm: <T = unknown>(
    surveyId: string,
    path: FormPath,
    data: T,
  ) => Promise<void>;
  deleteForm: (surveyId: string, path: FormPath) => Promise<void>;
  clearSurveyCache: (surveyId: string) => void;
  deleteAllFormsForSurvey: (surveyId: string) => Promise<void>;
}

export const useSurveyFormStore = create<SurveyFormState>((set, get) => ({
  cache: {},

  loadForm: async <T = unknown>(
    surveyId: string,
    path: FormPath,
  ): Promise<T | null> => {
    // Make key
    const key = surveyFormKey(surveyId, ...path);

    // Try cache first
    const cached = get().cache[key];
    if (cached !== undefined) return Promise.resolve(cached as T);

    // Fallback to IndexedDB
    const value = await loadSurveyForm<T>(surveyId, ...path);

    // Cache loaded value (including null) for next time
    set((s) => ({ cache: { ...s.cache, [key]: value } }));
    return value;
  },

  saveForm: async <T = unknown>(
    surveyId: string,
    path: FormPath,
    data: T
  ) => {
    // Make key
    const key = surveyFormKey(surveyId, ...path);

    // Save to IndexedDB
    await saveSurveyForm(surveyId, ...path, data);

    // Cache for future access
    set((s) => ({ cache: { ...s.cache, [key]: data } }));
  },

  deleteForm: async (surveyId, path) => {
    // Make key
    const key = surveyFormKey(surveyId, ...path);

    // Delete from IndexedDB
    await deleteSurveyForm(surveyId, ...path);

    // Remove from cache
    set((s) => {
      const next = { ...s.cache };
      delete next[key];
      return { cache: next };
    });
  },

  clearSurveyCache: (surveyId) =>
    // Remove all cache entries for this survey (keys start with "surveyId:")
    set((s) => {
      const next: Record<string, unknown> = {};
      for (const k of Object.keys(s.cache)) {
        if (!k.startsWith(`${surveyId}:`)) next[k] = s.cache[k];
      }
      return { cache: next };
    }),

  deleteAllFormsForSurvey: async (surveyId) => {
    await deleteAllSurveyForms(surveyId);
    get().clearSurveyCache(surveyId);
  },
}));
