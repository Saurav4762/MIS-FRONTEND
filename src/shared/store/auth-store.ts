import { create } from "zustand";

const isTokenValid = (token: string | null): boolean => {
	if (!token) return false;
	try {
		const payload = JSON.parse(atob(token.split(".")[1]));
		return Date.now() < payload.exp * 1000;
	} catch {
		return false;
	}
};

type AuthState = {
	token: string | null;
	isAuthenticated: boolean;
	login: (token: string) => void;
	logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => {
	const token = localStorage.getItem("accessToken");
	const valid = isTokenValid(token);

	if (!valid && token) {
		localStorage.removeItem("accessToken");
	}

	return {
		token: valid ? token : null,
		isAuthenticated: valid,

		login: (token: string) => {
			localStorage.setItem("accessToken", token);
			set({ token, isAuthenticated: true });
		},

		logout: () => {
			localStorage.removeItem("accessToken");
			set({ token: null, isAuthenticated: false });
			window.location.href = "/Login";
		},
	};
});