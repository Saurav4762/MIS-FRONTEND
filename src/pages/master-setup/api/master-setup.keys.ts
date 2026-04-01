export const masterSetupKeys = {
  all: ["master-setup"] as const,
  summary: () => [...masterSetupKeys.all, "summary"] as const,
};
