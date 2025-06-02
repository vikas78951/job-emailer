import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { Company } from "../types/definition";

type CompanyInput = Omit<Company, "id">;

interface CompanyStore {
  companies: Company[];
  isLoading: boolean;
  fetchCompanies: () => Promise<void>;
  addCompany: (newCompany: Company) => void;
  addCompanyWithJson: (JSON: CompanyInput[]) => void;
  updateCompanySentStatus: (companyId: string, userEmail: string) => void;
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
      addCompanyWithJson: async (jsonCompanies: CompanyInput[]) => {
        try {
          const res = await fetch("/api/companies/bulk", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ companies: jsonCompanies }),
          });

          const json = await res.json();

          if (!json.success) {
            throw new Error(json.message || "Bulk add failed");
          }

          set((state) => ({
            companies: [...state.companies, ...json.companies],
          }));
        } catch (err) {
          console.error("Error in addCompanyWithJson:", err);
          throw err;
        }
      },

      updateCompanySentStatus: (companyId: string, userEmail: string) =>
        set((state) => {
          return {
            companies: state.companies.map((company) => {
              if (company.id !== companyId) return company;

              const updatedSent = [
                ...(company.sent?.filter(
                  (entry) => entry.userEmail !== userEmail
                ) ?? []),
                {
                  userEmail,
                  sentAt: new Date().toISOString(),
                },
              ];

              return { ...company, sent: updatedSent };
            }),
          };
        }),
      clearCompanies: () => set({ companies: [] }),
    }),
    {
      name: "company-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
