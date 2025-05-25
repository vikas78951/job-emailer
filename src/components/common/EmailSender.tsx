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
    console.log("present queue =>", queue);
    const nextItem = queue.find(
      (item) => item.status === "queued" || item.status === "failed"
    );

    if (!nextItem || !user || !template) return;
    console.info("sending mail to :", nextItem.company.name);

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

      console.log("body =>", body);
      try {
        const res = await fetch("/api/sendEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!res.ok) throw new Error("Failed to send");

        updateStatus(nextItem.company.id, "sent");
        updateCompany({
          ...nextItem.company,
          sent: [
            ...(nextItem.company.sent ?? []),
            {
              userEmail: user.email,
              sentAt: new Date().toISOString(),  
            },
          ],
        });
        toast.success(`Sent mail to ${nextItem.company.name}`);
      } catch (err) {
        updateStatus(nextItem.company.id, "failed");
        toast.error(`Failed to send to ${nextItem.company.name}`);
        console.log(`${(err as Error).message}`);
      }
    };

    const timer = setTimeout(sendMail, 500);
    return () => clearTimeout(timer);
  }, [queue]);

  return null;
}
