export const municipalitiesKeys = {
	all: ["municipalities"] as const,

	list: () => [...municipalitiesKeys.all, "list"] as const,
	search: (keyword: string) =>
		[...municipalitiesKeys.all, ...municipalitiesKeys.list(), keyword] as const,
};
