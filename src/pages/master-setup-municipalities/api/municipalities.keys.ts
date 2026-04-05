export const municipalitiesKeys = {
  all: ["municipalities"] as const,
  list: () => [...municipalitiesKeys.all, "list"] as const,
  detail: (id: string) => [...municipalitiesKeys.all, "detail", id] as const,
};
