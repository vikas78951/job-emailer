import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { Company } from "../types/definition";
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
      isLoading: true,
      fetchCompanies: async () => {
        if (get().companies.length > 0) return;
        set({ isLoading: true });
        try {
          const res = await fetch("/api/companies");
          const json = await res.json();
          if (json.success) {
            const filtered = (json.companies ?? []).filter(Boolean);
            set({ companies: filtered });
          } else {
            set({ companies: [] });
          }
        } catch (err) {
          console.error("Error fetching companies:", err);
        } finally {
          set({ isLoading: false });
        }
      },
      addCompany: async (newCompany) => {
        const res = await fetch("/api/companies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCompany),
        });

        const json = await res.json();
        if (json.success) {
          set((state) => ({
            companies: [...state.companies, json.companies],
          }));
        } else {
          throw new Error(json.message || "Failed to add company");
        }
      },
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
      storage: createJSONStorage(() => localStorage),
    }
  )
);
