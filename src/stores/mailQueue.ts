// src/stores/mailQueue.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Company } from '../types/definition';

type MailQueueItem = {
  company: Company;
  status: "queued" | "sending" | "sent" | "failed";
};

type MailQueueStore = {
  queue: MailQueueItem[];
  addToQueue: (company: MailQueueItem["company"]) => void;
  updateStatus: (companyId: string, status: MailQueueItem["status"]) => void;
  resetQueue: () => void;
};

export const useMailQueueStore = create<MailQueueStore>()(
  persist(
    (set, get) => ({
      queue: [],
      addToQueue: (company) => {
        const existing = get().queue.find((q) => q.company.id === company.id);
         if (existing && existing.status !== 'failed' && existing.status !== 'sent') return;
        set((state) => ({
          queue: [...state.queue, { company, status: 'queued' }],
        }));
      },
      updateStatus: (companyId, status) =>
        set((state) => ({
          queue: state.queue.map((item) =>
            item.company.id === companyId ? { ...item, status } : item
          ),
        })),
      resetQueue: () => set({ queue: [] }),
    }),
    {
      name: 'mail-queue', 
    }
  )
);
