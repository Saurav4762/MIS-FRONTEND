import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { idbPersistStorage } from "@shared/lib/idb-persist-storage";
import { deleteAllSurveyForms } from "../lib/survey-form-storage";
import { formPathToString } from "./form-path";
import { SURVEY_DRAFTS_META_KEY } from "./survey-storage-keys";
import type {
  FormPath,
  FormProgressMeta,
  SurveyDraft,
  SurveyDraftId,
} from "./types";

interface SurveyDraftState {
  drafts: SurveyDraft[];
  activeDraftId: SurveyDraftId | null;
  hydrated: boolean;
  hydrate: () => Promise<void>;

  createDraft: (name: string) => SurveyDraftId;
  setActiveDraft: (id: SurveyDraftId | null) => void;
  updateDraft: (
    id: SurveyDraftId,
    partial: Partial<Pick<SurveyDraft, "name" | "formProgress" | "status">>,
  ) => void;
  markFormSaved: (id: SurveyDraftId, path: FormPath) => void;
  removeDraft: (id: SurveyDraftId) => Promise<void>;
  getDraftById: (id: SurveyDraftId) => SurveyDraft | undefined;
}

const nowIso = () => new Date().toISOString();

export const useSurveyDraftStore = create<SurveyDraftState>()(
  persist(
    (set, get) => ({
      drafts: [],
      activeDraftId: null,
      hydrated: false,
      hydrate: async () => {
        await useSurveyDraftStore.persist.rehydrate();
        set({ hydrated: true });
      },

      createDraft: (name) => {
        const id = crypto.randomUUID();
        const timestamp = nowIso();
        const draft: SurveyDraft = {
          id,
          name: name.trim(),
          createdAt: timestamp,
          updatedAt: timestamp,
          status: "draft",
        };

        set((state) => ({
          drafts: [...state.drafts, draft],
          activeDraftId: id,
        }));

        return id;
      },

      setActiveDraft: (id) => set({ activeDraftId: id }),

      updateDraft: (id, partial) => {
        set((state) => ({
          drafts: state.drafts.map((draft) =>
            draft.id === id
              ? { ...draft, ...partial, updatedAt: nowIso() }
              : draft,
          ),
        }));
      },

      markFormSaved: (id, path) => {
        const pathKey = formPathToString(path);
        const meta: FormProgressMeta = { savedAt: nowIso() };
        set((state) => ({
          drafts: state.drafts.map((draft) =>
            draft.id === id
              ? {
                  ...draft,
                  updatedAt: nowIso(),
                  formProgress: { ...draft.formProgress, [pathKey]: meta },
                }
              : draft,
          ),
        }));
      },
      removeDraft: async (id) => {
        await deleteAllSurveyForms(id);
        set((state) => ({
          drafts: state.drafts.filter((draft) => draft.id !== id),
          activeDraftId:
            state.activeDraftId === id ? null : state.activeDraftId,
        }));
      },

      getDraftById: (id) => get().drafts.find((draft) => draft.id === id),
    }),
    {
      name: SURVEY_DRAFTS_META_KEY,
      storage: createJSONStorage(() => idbPersistStorage),
      partialize: (state) => ({
        drafts: state.drafts,
        activeDraftId: state.activeDraftId,
      }),
    },
  ),
);

export const selectActiveDraft = (state: SurveyDraftState) =>
  state.drafts.find((draft) => draft.id === state.activeDraftId);

export const selectDraftById =
  (id: SurveyDraftId) => (state: SurveyDraftState) =>
    state.drafts.find((draft) => draft.id === id);
