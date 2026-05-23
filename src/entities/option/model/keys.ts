export const optionListKeys = {
  all: ["master-setup", "options-lists"] as const,
};

export const optionItemKeys = {
  all: ["master-setup", "survey-options", "option-items"] as const,

  lists: () => [...optionItemKeys.all, "list"] as const,
  byOptionList: (optionListId: string) =>
    [...optionItemKeys.lists(), optionListId] as const,
  detail: (id: string) => [...optionItemKeys.all, "detail", id] as const,
};
