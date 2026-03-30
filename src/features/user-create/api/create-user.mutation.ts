import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersKeys } from "@entities/users"; // Import keys to invalidate cache
import { createUserApi } from "./create-user.api";
import type { CreateUser } from "@features/user-create/model/CreateUserInput";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUser) => createUserApi(payload),
    onSuccess: () => {
      // Refresh the users list when a new user is successfully created
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
    onError: () => {},
    onSettled: () => {},
    meta: {
      errorMessage: "Failed to create user. Please check your inputs.",
    },
  });
};
