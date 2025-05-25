"use client";

import { useMailQueueStore } from "@/src/stores/mailQueue";
import { Badge } from "@/src/components/ui/badge";

export default function LogsPage() {
  const { queue } = useMailQueueStore();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Mail Logs</h1>
      <ul className="space-y-2">
        {queue.length === 0 ? (
          <p>No queued mails</p>
        ) : (
          queue.map((item,index) => (
            <li
              key={item.company.id + index}
              className="p-4 border rounded-md shadow-sm flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{item.company.name}</div>
                <div className="text-sm text-muted-foreground">
                  {item.company.email}
                </div>
              </div>
              <Badge
                variant={
                  item.status === "sent"
                    ? "default"
                    : item.status === "failed"
                    ? "destructive"
                    : item.status === "sending"
                    ? "secondary"
                    : "outline"
                }
              >
                {item.status}
              </Badge>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
