export interface HouseholdMember {
  id: string;
  name: string;
}

export interface Household {
  id: string;
  name: string;
  members: HouseholdMember[];
}

export interface HouseholdSurveySnapshot {
  households: Household[];
  expandedHouseholdId: string | null;
}
