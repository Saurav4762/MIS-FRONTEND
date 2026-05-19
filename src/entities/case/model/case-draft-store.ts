import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { idbPersistStorage } from "@shared/lib/idb-persist-storage";
import { CASE_DRAFTS_META_KEY } from "./case-storage-keys";
import type { CaseDraft, CaseDraftId } from "./types";

interface CaseDraftState {
  draftsById: Record<CaseDraftId, CaseDraft>;
  draftIds: CaseDraftId[];
  activeCaseId: CaseDraftId | null;
  hydrated: boolean;
  hydrate: () => Promise<void>;

  createCase: (name: string) => CaseDraftId;
  setActiveCase: (id: CaseDraftId | null) => void;
  updateCase: (
    id: CaseDraftId,
    partial: Partial<Pick<CaseDraft, "name" | "status">>,
  ) => void;
  removeCase: (id: CaseDraftId) => Promise<void>;
  getCaseById: (id: CaseDraftId) => CaseDraft | undefined;
}

const nowIso = () => new Date().toISOString();

export const useCaseDraftStore = create<CaseDraftState>()(
  persist(
    (set, get) => ({
      draftsById: {},
      draftIds: [],
      activeCaseId: null,
      hydrated: false,
      hydrate: async () => {
        await useCaseDraftStore.persist.rehydrate();
        set({ hydrated: true });
      },

      createCase: (name) => {
        const id = crypto.randomUUID();
        const timestamp = nowIso();
        const draft: CaseDraft = {
          id,
          name: name.trim(),
          createdAt: timestamp,
          updatedAt: timestamp,
          status: "draft",
        };

        set((state) => ({
          draftsById: { ...state.draftsById, [id]: draft },
          draftIds: [...state.draftIds, id],
          activeCaseId: id,
        }));
        return id;
      },

      setActiveCase: (id) => set({ activeCaseId: id }),

      updateCase: (id, partial) => {
        const updatedAt = nowIso();
        set((state) => ({
          draftsById: state.draftsById[id]
            ? {
                ...state.draftsById,
                [id]: { ...state.draftsById[id], ...partial, updatedAt },
              }
            : state.draftsById,
        }));
      },

      removeCase: async (id) => {
        set((state) => ({
          draftsById: Object.fromEntries(
            Object.entries(state.draftsById).filter(
              ([draftId]) => draftId !== id,
            ),
          ),
          draftIds: state.draftIds.filter((draftId) => draftId !== id),
          activeCaseId: state.activeCaseId === id ? null : state.activeCaseId,
        }));
      },

      getCaseById: (id) => get().draftsById[id],
    }),
    {
      name: CASE_DRAFTS_META_KEY,
      storage: createJSONStorage(() => idbPersistStorage),
      partialize: (state) => ({
        draftIds: state.draftIds,
        draftsById: state.draftsById,
        activeCaseId: state.activeCaseId,
      }),
    },
  ),
);

export const selectActiveCase = (state: CaseDraftState) =>
  state.activeCaseId ? state.draftsById[state.activeCaseId] : undefined;

export const selectCaseById = (id: CaseDraftId) => (state: CaseDraftState) =>
  state.draftsById[id];
