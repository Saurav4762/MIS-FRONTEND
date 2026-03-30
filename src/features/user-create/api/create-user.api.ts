import { http } from "@shared/api/http";
import type { User } from "@entities/users";
import type { CreateUser } from "../model/CreateUserInput";

export const createUserApi = async (payload: CreateUser) => {
  const { data } = await http.post<User>("/users", payload);
  return data;
};
