export const dashboardKeys = {
  all: ["dashboard"] as const,
  stats: () => [...dashboardKeys.all, "stats"] as const,
  wards: () => [...dashboardKeys.all, "wards"] as const,
};