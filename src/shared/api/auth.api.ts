import { http } from "./http";

export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    accessToken: string;
    expiresAtUtc: string;
};

export const authApi = {
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        const response = await http.post<LoginResponse>("/auth", credentials);
        return response.data;
    },
};