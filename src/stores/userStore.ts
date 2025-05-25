import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Extend the User type to include attachments
export type User = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  number?: string;  
  address?: string; 
  designation: string;
  linkedinUrl: string;
  github?: string;
  portfolio?: string;
  certification?: string;
  attachments?: Attachment[];
};

export type Attachment = {
  name: string;
  size: number;
  type: string;
  base64?: string;
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
      storage: createJSONStorage(() => localStorage),
    }
  )
);
