import { create } from "zustand";
import { del, get as idbGet, set as idbSet } from "idb-keyval";
import type { CaseNodeId, CaseTreeNode, CaseTreeSnapshot } from "./types";
import { caseTreeKey } from "./case-storage-keys";

type CaseTreeState = {
  treesByCaseId: Record<string, CaseTreeSnapshot>;
  loadedCaseIds: Record<string, boolean>;
  activeCaseId: string | null;
  hydrateCaseTree: (caseId: string) => Promise<void>;
  ensureCaseTree: (caseId: string) => CaseTreeSnapshot;
  setActiveCaseId: (caseId: string | null) => void;
  upsertNode: (caseId: string, node: CaseTreeNode) => Promise<CaseTreeSnapshot>;
  updateNode: (
    caseId: string,
    nodeId: CaseNodeId,
    partial: Partial<Omit<CaseTreeNode, "id" | "childrenIds">>,
  ) => Promise<CaseTreeSnapshot>;
  moveNode: (
    caseId: string,
    nodeId: CaseNodeId,
    nextParentId: CaseNodeId | null,
    nextIndex?: number,
  ) => Promise<CaseTreeSnapshot>;
  removeNode: (caseId: string, nodeId: CaseNodeId) => Promise<CaseTreeSnapshot>;
  clearCaseTree: (caseId: string) => Promise<void>;
};

const nowIso = () => new Date().toISOString();

const createEmptyTree = (caseId: string): CaseTreeSnapshot => ({
  caseId,
  nodesById: {},
  updatedAt: nowIso(),
  version: 1,
});

const cloneTree = (tree: CaseTreeSnapshot): CaseTreeSnapshot => ({
  ...tree,
  nodesById: Object.fromEntries(
    Object.entries(tree.nodesById).map(([nodeId, node]) => [
      nodeId,
      { ...node, childrenIds: [...node.childrenIds] },
    ]),
  ),
});

const insertAt = (items: string[], item: string, index?: number): string[] => {
  const nextItems = items.filter((currentItem) => currentItem !== item);
  if (index === undefined || index < 0 || index >= nextItems.length) {
    nextItems.push(item);
    return nextItems;
  }
  nextItems.splice(index, 0, item);
  return nextItems;
};

const isAncestor = (
  tree: CaseTreeSnapshot,
  ancestorId: CaseNodeId,
  nodeId: CaseNodeId | null,
): boolean => {
  if (!nodeId) return false;

  let currentId: CaseNodeId | undefined = nodeId;
  while (currentId) {
    if (currentId === ancestorId) return true;
    currentId = tree.nodesById[currentId]?.parentId;
  }

  return false;
};

const detachFromParent = (
  tree: CaseTreeSnapshot,
  nodeId: CaseNodeId,
  parentId: CaseNodeId | null | undefined,
): void => {
  if (!parentId) return;

  const parent = tree.nodesById[parentId];
  if (!parent) return;
  parent.childrenIds = parent.childrenIds.filter((currentId) => currentId !== nodeId);
};

const attachToParent = (
  tree: CaseTreeSnapshot,
  nodeId: CaseNodeId,
  parentId: CaseNodeId | null | undefined,
  nextIndex?: number,
): void => {
  if (!parentId) return;

  const parent = tree.nodesById[parentId];
  if (!parent) return;
  parent.childrenIds = insertAt(parent.childrenIds, nodeId, nextIndex);
};

export const useCaseTreeStore = create<CaseTreeState>((set, getState) => ({
  treesByCaseId: {},
  loadedCaseIds: {},
  activeCaseId: null,

  hydrateCaseTree: async (caseId) => {
    const storedTree = (await idbGet<CaseTreeSnapshot>(caseTreeKey(caseId))) ?? null;
    const tree = storedTree ?? createEmptyTree(caseId);

    set((state) => ({
      treesByCaseId: { ...state.treesByCaseId, [caseId]: tree },
      loadedCaseIds: { ...state.loadedCaseIds, [caseId]: true },
    }));
  },

  ensureCaseTree: (caseId) => {
    const currentTree = getState().treesByCaseId[caseId];
    if (currentTree) return currentTree;

    const tree = createEmptyTree(caseId);
    set((state) => ({
      treesByCaseId: { ...state.treesByCaseId, [caseId]: tree },
    }));
    return tree;
  },

  setActiveCaseId: (caseId) => set({ activeCaseId: caseId }),

  upsertNode: async (caseId, node) => {
    const currentTree = cloneTree(getState().ensureCaseTree(caseId));
    const previousNode = currentTree.nodesById[node.id] ?? null;

    if (previousNode && previousNode.parentId !== node.parentId) {
      detachFromParent(currentTree, node.id, previousNode.parentId);
    }

    const normalizedNode: CaseTreeNode = {
      ...node,
      childrenIds: [...new Set(node.childrenIds)],
    };

    currentTree.nodesById[node.id] = normalizedNode;
    if (!normalizedNode.parentId) {
      // root behavior: nothing special in this simplified model
    } else {
      attachToParent(currentTree, node.id, normalizedNode.parentId);
    }

    currentTree.updatedAt = nowIso();
    await idbSet(caseTreeKey(caseId), currentTree);
    set((state) => ({
      treesByCaseId: { ...state.treesByCaseId, [caseId]: currentTree },
      loadedCaseIds: { ...state.loadedCaseIds, [caseId]: true },
    }));

    return currentTree;
  },

  updateNode: async (caseId, nodeId, partial) => {
    const currentTree = cloneTree(getState().ensureCaseTree(caseId));
    const node = currentTree.nodesById[nodeId];
    if (!node) return currentTree;

    currentTree.nodesById[nodeId] = { ...node, ...partial };
    currentTree.updatedAt = nowIso();
    await idbSet(caseTreeKey(caseId), currentTree);
    set((state) => ({
      treesByCaseId: { ...state.treesByCaseId, [caseId]: currentTree },
      loadedCaseIds: { ...state.loadedCaseIds, [caseId]: true },
    }));
    return currentTree;
  },

  moveNode: async (caseId, nodeId, nextParentId, nextIndex) => {
    const currentTree = cloneTree(getState().ensureCaseTree(caseId));
    const node = currentTree.nodesById[nodeId];
    if (!node) return currentTree;
    if (nextParentId === nodeId || isAncestor(currentTree, nodeId, nextParentId)) {
      return currentTree;
    }

    detachFromParent(currentTree, nodeId, node.parentId);
    const movedNode: CaseTreeNode = {
      ...node,
      parentId: nextParentId ?? undefined,
    };
    currentTree.nodesById[nodeId] = movedNode;
    attachToParent(currentTree, nodeId, nextParentId, nextIndex);
    currentTree.updatedAt = nowIso();

    await idbSet(caseTreeKey(caseId), currentTree);
    set((state) => ({
      treesByCaseId: { ...state.treesByCaseId, [caseId]: currentTree },
      loadedCaseIds: { ...state.loadedCaseIds, [caseId]: true },
    }));

    return currentTree;
  },

  removeNode: async (caseId, nodeId) => {
    const currentTree = cloneTree(getState().ensureCaseTree(caseId));
    const node = currentTree.nodesById[nodeId];
    if (!node) return currentTree;

    const queue = [nodeId];
    const idsToDelete: string[] = [];
    while (queue.length > 0) {
      const currentId = queue.shift();
      if (!currentId) continue;
      idsToDelete.push(currentId);
      const currentNode = currentTree.nodesById[currentId];
      currentNode?.childrenIds.forEach((childId) => queue.push(childId));
    }

    detachFromParent(currentTree, nodeId, node.parentId);
    idsToDelete.forEach((currentId) => {
      delete currentTree.nodesById[currentId];
    });

    currentTree.updatedAt = nowIso();
    await idbSet(caseTreeKey(caseId), currentTree);
    set((state) => ({
      treesByCaseId: { ...state.treesByCaseId, [caseId]: currentTree },
      loadedCaseIds: { ...state.loadedCaseIds, [caseId]: true },
    }));

    return currentTree;
  },

  clearCaseTree: async (caseId) => {
    await del(caseTreeKey(caseId));
    set((state) => {
      const nextTrees = { ...state.treesByCaseId };
      const nextLoaded = { ...state.loadedCaseIds };
      delete nextTrees[caseId];
      delete nextLoaded[caseId];

      return {
        treesByCaseId: nextTrees,
        loadedCaseIds: nextLoaded,
      };
    });
  },
}));

export const selectCaseTree =
  (caseId: string) => (state: CaseTreeState) => state.treesByCaseId[caseId] ?? null;

export const selectCaseTreeNode =
  (caseId: string, nodeId: CaseNodeId) => (state: CaseTreeState) =>
    state.treesByCaseId[caseId]?.nodesById[nodeId] ?? null;

export const selectCaseTreeChildren =
  (caseId: string, nodeId: CaseNodeId) => (state: CaseTreeState) =>
    state.treesByCaseId[caseId]?.nodesById[nodeId]?.childrenIds ?? [];
