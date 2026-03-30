import { http } from "@shared/api/http";
import type { User } from "@entities/users/model/types";

export const usersApi = {
  getList: async (page = 1, pageSize = 10) => {
    const { data } = await http.get<User[]>("/users", {
      params: { page, pageSize },
    });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await http.get<User>(`/users/${id}`);
    return data;
  },
};
