import { create } from "zustand";
import type { Household } from "./types";
import { assertCaseId as assertSurveyId } from "@entities/case/model/case-storage-keys";
import {
  createEmptySnapshot,
  deleteSurveySnapshot,
  nowHouseholdName,
  readSurveySnapshot,
  writeSurveySnapshot,
} from "../lib/household-storage";

interface HouseholdSurveySnapshot {
  households: Household[];
  expandedHouseholdId: string | null;
}

interface HouseholdState {
  surveys: Record<string, HouseholdSurveySnapshot>;
  loadedSurveyIds: Record<string, boolean>;

  loadSurveyHouseholds: (surveyId: string) => Promise<void>;
  getHouseholds: (surveyId: string) => Household[];
  getExpandedHouseholdId: (surveyId: string) => string | null;
  setHouseholds: (surveyId: string, households: Household[]) => Promise<void>;
  addHousehold: (surveyId: string, name?: string) => Promise<string>;
  updateHousehold: (
    surveyId: string,
    householdId: string,
    partial: Partial<Pick<Household, "name" | "members">>,
  ) => Promise<void>;
  deleteHousehold: (surveyId: string, householdId: string) => Promise<void>;
  setExpandedHouseholdId: (
    surveyId: string,
    householdId: string | null,
  ) => Promise<void>;
  // toggleExpandedHouseholdId: (
  //   surveyId: string,
  //   householdId: string,
  // ) => Promise<void>;
  clearSurveyHouseholds: (surveyId: string) => Promise<void>;
}

const EMPTY_HOUSEHOLDS: Household[] = [];

export const useHouseholdStore = create<HouseholdState>((set, get) => ({
  surveys: {},
  loadedSurveyIds: {},

  loadSurveyHouseholds: async (surveyId) => {
    assertSurveyId(surveyId);
    const snapshot = await readSurveySnapshot(surveyId);
    set((state) => ({
      surveys: { ...state.surveys, [surveyId]: snapshot },
      loadedSurveyIds: { ...state.loadedSurveyIds, [surveyId]: true },
    }));
  },

  getHouseholds: (surveyId) => {
    assertSurveyId(surveyId);
    return get().surveys[surveyId]?.households ?? EMPTY_HOUSEHOLDS;
  },

  getExpandedHouseholdId: (surveyId) => {
    assertSurveyId(surveyId);
    return get().surveys[surveyId]?.expandedHouseholdId ?? null;
  },

  setHouseholds: async (surveyId, households) => {
    assertSurveyId(surveyId);

    const currentHouseholds = get().surveys[surveyId] ?? createEmptySnapshot();

    const snapshot = {
      ...currentHouseholds,
      households,
    };
    set((state) => ({
      surveys: { ...state.surveys, [surveyId]: snapshot },
      loadedSurveyIds: { ...state.loadedSurveyIds, [surveyId]: true },
    }));
    await writeSurveySnapshot(surveyId, snapshot);
  },

  addHousehold: async (surveyId, name) => {
    assertSurveyId(surveyId);

    // Ensure survey is loaded before adding household
    const isLoaded = get().loadedSurveyIds[surveyId];

    if (!isLoaded) {
      await get().loadSurveyHouseholds(surveyId);
    }

    const currentHouseholdsSnapshot =
      get().surveys[surveyId] ?? createEmptySnapshot();

    const id = crypto.randomUUID();

    const households = [
      ...currentHouseholdsSnapshot.households,
      {
        id,
        name:
          name?.trim() ||
          nowHouseholdName(currentHouseholdsSnapshot.households),
        members: [],
      },
    ];

    const nextSnapshot = { ...currentHouseholdsSnapshot, households };
    await writeSurveySnapshot(surveyId, nextSnapshot);
    set((state) => ({
      surveys: { ...state.surveys, [surveyId]: nextSnapshot },
      loadedSurveyIds: { ...state.loadedSurveyIds, [surveyId]: true },
    }));
    return id;
  },

  updateHousehold: async (surveyId, householdId, partial) => {
    assertSurveyId(surveyId);
    if (!get().loadedSurveyIds[surveyId]) {
      await get().loadSurveyHouseholds(surveyId);
    }

    const currentHouseholdsSnapshot =
      get().surveys[surveyId] ?? createEmptySnapshot();
    const households = currentHouseholdsSnapshot.households.map((household) =>
      household.id === householdId ? { ...household, ...partial } : household,
    );
    const nextSnapshot = { ...currentHouseholdsSnapshot, households };

    await writeSurveySnapshot(surveyId, nextSnapshot);
    set((state) => ({
      surveys: { ...state.surveys, [surveyId]: nextSnapshot },
      loadedSurveyIds: { ...state.loadedSurveyIds, [surveyId]: true },
    }));
  },

  deleteHousehold: async (surveyId, householdId) => {
    assertSurveyId(surveyId);
    if (!get().loadedSurveyIds[surveyId]) {
      await get().loadSurveyHouseholds(surveyId);
    }

    const currentHouseholdsSnapshot =
      get().surveys[surveyId] ?? createEmptySnapshot();
    const households = currentHouseholdsSnapshot.households.filter(
      (household) => household.id !== householdId,
    );
    const nextSnapshot = {
      ...currentHouseholdsSnapshot,
      households,
      expandedHouseholdId:
        currentHouseholdsSnapshot.expandedHouseholdId === householdId
          ? null
          : currentHouseholdsSnapshot.expandedHouseholdId,
    };

    await writeSurveySnapshot(surveyId, nextSnapshot);
    set((state) => ({
      surveys: { ...state.surveys, [surveyId]: nextSnapshot },
      loadedSurveyIds: { ...state.loadedSurveyIds, [surveyId]: true },
    }));
  },

  setExpandedHouseholdId: async (surveyId, householdId) => {
    assertSurveyId(surveyId);
    if (!get().loadedSurveyIds[surveyId]) {
      await get().loadSurveyHouseholds(surveyId);
    }

    const currentHouseholdsSnapshot =
      get().surveys[surveyId] ?? createEmptySnapshot();
    const nextSnapshot = {
      ...currentHouseholdsSnapshot,
      expandedHouseholdId: householdId,
    };

    set((state) => ({
      surveys: { ...state.surveys, [surveyId]: nextSnapshot },
      loadedSurveyIds: { ...state.loadedSurveyIds, [surveyId]: true },
    }));
    await writeSurveySnapshot(surveyId, nextSnapshot);
  },

  clearSurveyHouseholds: async (surveyId) => {
    assertSurveyId(surveyId);
    await deleteSurveySnapshot(surveyId);
    set((state) => {
      const nextSurveys = { ...state.surveys };
      const nextLoaded = { ...state.loadedSurveyIds };
      delete nextSurveys[surveyId];
      delete nextLoaded[surveyId];
      return {
        surveys: nextSurveys,
        loadedSurveyIds: nextLoaded,
      };
    });
  },
}));

export const selectHouseholdsBySurveyId =
  (surveyId: string) => (state: HouseholdState) =>
    state.surveys[surveyId]?.households ?? EMPTY_HOUSEHOLDS;

export const selectHouseholdById =
  (surveyId: string, householdId: string) =>
  (state: HouseholdState): Household | undefined =>
    state.surveys[surveyId]?.households.find(
      (household) => household.id === householdId,
    );

export const selectExpandedHouseholdIdBySurveyId =
  (surveyId: string) => (state: HouseholdState) =>
    state.surveys[surveyId]?.expandedHouseholdId ?? null;
