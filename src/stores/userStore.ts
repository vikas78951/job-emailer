import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  designation: string;
  linkedinUrl: string;
};

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-store",
    }
  )
);
