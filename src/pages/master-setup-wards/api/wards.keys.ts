export const wardsKeys = {
  all: ["wards"] as const,

  list: () => [...wardsKeys.all, "list"] as const,
  byMunicipality: (municipalityId: string) =>
    [...wardsKeys.list(), municipalityId] as const,
  detail: (id: string) => [...wardsKeys.all, "detail", id] as const,
};
