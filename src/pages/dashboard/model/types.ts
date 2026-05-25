export type GenderData = {
  male: number;
  female: number;
  others: number;
};

export type DashboardStats = {
  populationByGender: GenderData;
  totalHouseholds: number;
  ageGroup16Plus: number;
  literate: number;
  jobless: number;
  totalPopulation: number;
};

export type DashboardResponse = {
  data: DashboardStats;
  timestamp: string;
};

