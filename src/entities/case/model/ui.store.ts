import { create } from "zustand";
import type { CaseDraftId, CaseNodeId } from "./types";

type UiState = {
  activeCaseId: CaseDraftId | null;
  activeNodeId: CaseNodeId | null;
  expandedNodeIds: Record<CaseNodeId, boolean>;
  setActiveCaseId: (caseId: CaseDraftId | null) => void;
  setActiveNodeId: (nodeId: CaseNodeId | null) => void;
  toggleExpandedNode: (nodeId: CaseNodeId) => void;
};

export const useCaseUiStore = create<UiState>((set) => ({
  activeCaseId: null,
  activeNodeId: null,
  expandedNodeIds: {},
  setActiveCaseId: (caseId) => set({ activeCaseId: caseId }),
  setActiveNodeId: (nodeId) => set({ activeNodeId: nodeId }),
  toggleExpandedNode: (nodeId) =>
    set((state) => ({
      expandedNodeIds: {
        ...state.expandedNodeIds,
        [nodeId]: !state.expandedNodeIds[nodeId],
      },
    })),
}));
