import { create } from "zustand";

type AuthState = {
	token: string | null;
	isAuthenticated: boolean;
	login: (token: string) => void;
	logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
	token: localStorage.getItem("accessToken"),
	isAuthenticated: !!localStorage.getItem("accessToken"),

	login: (token: string) => {
		localStorage.setItem("accessToken", token);
		set({ token, isAuthenticated: true });
	},

	logout: () => {
		localStorage.removeItem("accessToken");
		set({ token: null, isAuthenticated: false });
		window.location.href="/login";
	},
}));