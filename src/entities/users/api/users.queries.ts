import { queryOptions } from "@tanstack/react-query";
import { usersApi } from "./users.api";
import { usersKeys } from "./users.keys";

// export const usersKeys = {
//   all: ["users"] as const,
//   list: (page: number, pageSize: number) => [...usersKeys.all, "list", page, pageSize] as const,
//   detail: (id: string) => [...usersKeys.all, "detail", id] as const,
// };

export const usersQueries = {
  list: (page = 1, pageSize = 10) =>
    queryOptions({
      queryKey: usersKeys.lists(),
      queryFn: () => usersApi.getList(page, pageSize),
    }),

  detail: (id: string) =>
    queryOptions({
      queryKey: usersKeys.detail(id),
      queryFn: () => usersApi.getById(id),
      enabled: !!id,
    }),
};
