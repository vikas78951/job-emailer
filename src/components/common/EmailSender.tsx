"use client";

import { useEffect } from "react";
import { useMailQueueStore } from "@/src/stores/mailQueue";
import { useUserStore } from "@/src/stores/userStore";
import { useTemplateStore } from "@/src/stores/templateStore";
import { toast } from "sonner";
import { interpolate } from "@/src/lib/utils";
import { useCompanyStore } from "@/src/stores/companyStore";

export default function EmailSender() {
  const { queue, updateStatus } = useMailQueueStore();
  const user = useUserStore((state) => state.user);
  const template = useTemplateStore((state) => state.template);
  const { updateCompany } = useCompanyStore();

  useEffect(() => {
    const nextItem = queue.find(
      (item) => item.status === "queued" 
    );
    console.log('nextItem',nextItem)
    if (!nextItem || !user || !template) return;

    const sendMail = async () => {
      updateStatus(nextItem.company.id, "sending");

      const body = {
        user,
        company: nextItem.company,
        template: {
          subject: interpolate(template.subject, {
            user,
            company: nextItem.company,
            template,
          }),
          body: interpolate(template.body, {
            user,
            company: nextItem.company,
            template,
          }),
        },
      };

      try {
        toast.loading(`Sending mail to ${nextItem.company.name}`);
        const res = await fetch("/api/sendEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!res.ok) throw new Error("Failed to send");

        updateStatus(nextItem.company.id, "sent");
        // updateCompany({
        //   ...nextItem.company,
        //   sent: [
        //     ...(nextItem.company.sent ?? []),
        //     {
        //       userEmail: user.email,
        //       sentAt: new Date().toISOString(),
        //     },
        //   ],
        // });
        toast.success(`Sent mail to ${nextItem.company.name}`);
           toast.dismiss()
      } catch (err) {
        updateStatus(nextItem.company.id, "failed");
        toast.error(
          ` Error : ${(err as Error).message}  ${nextItem.company.name}`
        );
        toast.dismiss()
      }
    };

    const timer = setTimeout(sendMail, 500);
    return () => clearTimeout(timer);
  }, [queue]);

  return null;
}
