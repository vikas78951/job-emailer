// src/stores/templateStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Template {
  subject: string;
  body: string;
}

interface TemplateStore {
  template: Template;
  updateTemplate: (data: Partial<Template>) => void;
  resetTemplate: () => void;
}

const defaultTemplate: Template = {
  subject: "Follow-up: Meeting to discuss your job opening",
  body: `
To: {{email.mailid}}
Subject: {{email.subject}}

Hi '{{company.hr_name}}',To: {{email.mailid}}
Subject: {{email.subject}}

Let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share.

It's crucial that we align on our next steps to ensure the project's success. Please come prepared with any questions or insights you may have.

Looking forward to our meeting!

Best regards,
{{user.firstName}} {{user.lastName}}
`.trim(),
};

export const useTemplateStore = create<TemplateStore>()(
  persist(
    (set) => ({
      template: defaultTemplate,
      updateTemplate: (data) =>
        set((state) => ({
          template: { ...state.template, ...data },
        })),
      resetTemplate: () => set({ template: defaultTemplate }),
    }),
    {
      name: "email-template", 
    }
  )
);
