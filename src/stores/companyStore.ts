import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Company = {
  id: string;
  name: string;
  email: string;
  status: boolean;
};

interface CompanyStore {
  companies: Company[];
  isLoading: boolean;
  fetchCompanies: () => Promise<void>;
  addCompany: (newCompany: Company) => void;
  updateCompany: (updated: Company) => void;
  clearCompanies: () => void;
}

export const useCompanyStore = create<CompanyStore>()(
  persist(
    (set, get) => ({
      companies: [],
      isLoading: false,
      fetchCompanies: async () => {
        if (get().companies.length > 0) return;
        set({ isLoading: true });
        try {
          const res = await fetch("/api/companies");
          const json = await res.json();
          if (json.success) {
            set({ companies: json.companies });
          }
        } catch (err) {
          console.error("Error fetching companies:", err);
        } finally {
          set({ isLoading: false });
        }
      },
      addCompany: (newCompany) =>
        set((state) => ({ companies: [...state.companies, newCompany] })),
      updateCompany: (updated) =>
        set((state) => ({
          companies: state.companies.map((c) =>
            c.id === updated.id ? updated : c
          ),
        })),
      clearCompanies: () => set({ companies: [] }),
    }),
    {
      name: "company-store",
      storage: typeof window !== "undefined" ? localStorage : undefined,
    }
  )
);
