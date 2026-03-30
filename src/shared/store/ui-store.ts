import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UiState {
  // State
  theme: "light" | "dark" | "system";
  isSidebarOpen: boolean;

  // Actions
  setTheme: (theme: "light" | "dark" | "system") => void;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
}

export const useUiStore = create<UiState>()(
  // The persist middleware automatically saves this to localStorage!
  persist(
    (set) => ({
      theme: "system",
      isSidebarOpen: true,

      setTheme: (theme) => set({ theme }),
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
    }),
    {
      name: "app-ui-storage", // Key used in localStorage
      storage: createJSONStorage(() => localStorage),
      // Optionally pick which fields to persist (e.g., maybe you don't want to persist the sidebar state)
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);
