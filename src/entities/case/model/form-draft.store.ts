import { create } from "zustand";
import { del, get as idbGet, set as idbSet } from "idb-keyval";
import { caseFormDraftKey } from "./case-storage-keys";
import type { FormDraft, FormDraftMeta, CaseNodeId, CaseDraftId } from "./types";

type DraftKey = `${CaseDraftId}:${CaseNodeId}`;

type FormDraftState = {
  // Draft key
  draftMetaByKey: Record<DraftKey, FormDraftMeta>;


  cachedValuesByKey: Record<DraftKey, unknown>;
  loadedDraftKeys: Record<DraftKey, true>;
  activeDraftKey: DraftKey | null;
  setActiveDraftKey: (draftId: CaseDraftId, nodeId: CaseNodeId) => void;
  loadDraftValues: (draftId: CaseDraftId, nodeId: CaseNodeId) => Promise<unknown>;
  saveDraftValues: (draftId: CaseDraftId, nodeId: CaseNodeId, values: unknown) => Promise<FormDraft>;
  clearDraftValues: (draftId: CaseDraftId, nodeId: CaseNodeId) => Promise<void>;
  getCachedDraftValues: (draftId: CaseDraftId, nodeId: CaseNodeId) => unknown | undefined;
  getDraftMeta: (draftId: CaseDraftId, nodeId: CaseNodeId) => FormDraftMeta | undefined;
};

const nowIso = () => new Date().toISOString();

const toDraftKey = (draftId: CaseDraftId, nodeId: CaseNodeId): DraftKey => `${draftId}:${nodeId}`;

export const useFormDraftStore = create<FormDraftState>((set, getState) => ({
  draftMetaByKey: {},
  cachedValuesByKey: {},
  loadedDraftKeys: {},
  activeDraftKey: null,

  setActiveDraftKey: (draftId, nodeId) => set({ activeDraftKey: toDraftKey(draftId, nodeId) }),

  loadDraftValues: async (draftId, nodeId) => {
    const draftKey = toDraftKey(draftId, nodeId);
    const cachedValues = getState().cachedValuesByKey[draftKey];
    if (cachedValues !== undefined) return cachedValues;

    const storedValues = (await idbGet<unknown>(caseFormDraftKey(draftId, nodeId))) ?? null;
    if (storedValues !== null) {
      set((state) => ({
        cachedValuesByKey: { ...state.cachedValuesByKey, [draftKey]: storedValues },
        loadedDraftKeys: { ...state.loadedDraftKeys, [draftKey]: true },
        draftMetaByKey: {
          ...state.draftMetaByKey,
          [draftKey]: {
            draftId,
            nodeId,
            updatedAt: state.draftMetaByKey[draftKey]?.updatedAt ?? nowIso(),
          },
        },
      }));
      return storedValues;
    }

    set((state) => ({ loadedDraftKeys: { ...state.loadedDraftKeys, [draftKey]: true } }));
    return undefined;
  },

  saveDraftValues: async (draftId, nodeId, values) => {
    const draftKey = toDraftKey(draftId, nodeId);
    const updatedAt = nowIso();
    await idbSet(caseFormDraftKey(draftId, nodeId), values);

    set((state) => ({
      cachedValuesByKey: { ...state.cachedValuesByKey, [draftKey]: values },
      loadedDraftKeys: { ...state.loadedDraftKeys, [draftKey]: true },
      draftMetaByKey: { ...state.draftMetaByKey, [draftKey]: { draftId, nodeId, updatedAt } },
    }));

    return { draftId, nodeId, values, updatedAt };
  },

  clearDraftValues: async (draftId, nodeId) => {
    const draftKey = toDraftKey(draftId, nodeId);
    await del(caseFormDraftKey(draftId, nodeId));
    set((state) => {
      const nextMeta = { ...state.draftMetaByKey };
      const nextValues = { ...state.cachedValuesByKey };
      const nextLoaded = { ...state.loadedDraftKeys };
      delete nextMeta[draftKey];
      delete nextValues[draftKey];
      delete nextLoaded[draftKey];

      return { draftMetaByKey: nextMeta, cachedValuesByKey: nextValues, loadedDraftKeys: nextLoaded };
    });
  },

  getCachedDraftValues: (draftId, nodeId) => getState().cachedValuesByKey[toDraftKey(draftId, nodeId)],

  getDraftMeta: (draftId, nodeId) => getState().draftMetaByKey[toDraftKey(draftId, nodeId)],
}));

export const selectDraftMeta = (draftId: CaseDraftId, nodeId: CaseNodeId) => (state: FormDraftState) =>
  state.draftMetaByKey[toDraftKey(draftId, nodeId)];

export const selectCachedDraftValues = (draftId: CaseDraftId, nodeId: CaseNodeId) => (state: FormDraftState) =>
  state.cachedValuesByKey[toDraftKey(draftId, nodeId)];
