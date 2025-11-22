"use client";

import { useTemplateStore } from "@/src/stores/templateStore";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";

const MailTemplate = () => {
  const { template, updateTemplate, resetTemplate } = useTemplateStore();

  return (
    <div className="h-full lg:w-1/2">
      <h1 className="text-foreground/80 p-2">Template</h1>
      <Card className="w-full h-full">
        <CardContent className="space-y-4">
          <div className="flex ">
            <span className="min-w-20 mr-2 pt-1">Subject : </span>
            <Input
              placeholder="Subject"
              value={template.subject}
              onChange={(e) => updateTemplate({ subject: e.target.value })}
            />
          </div>
          <div className="flex ">
            <span className="min-w-20 mr-2 pt-1">Body : </span>
            <Textarea
              placeholder="Email Body"
              value={template.body}
              onChange={(e) => updateTemplate({ body: e.target.value })}
              rows={14}
            />
          </div>
          <div>
            <span className="min-w-20 mr-2 pt-1">Use dynamic keyword : </span>
            <span className="mx-2">{"{{company.contactPerson}}"}</span>
            <span className="mx-2">{"{{company.name}}"}</span>
            <span className="mx-2">{"{{user.firstName}}"}</span>
            <span className="mx-2">{"{{user.lastName}}"}</span>
            <span className="mx-2">{"{{user.email}}"}</span>
            <span className="mx-2">{"{{user.designation}}"}</span>
            <span className="mx-2">{"{{user.address}}"}</span>
            <span className="mx-2">{"{{user.number}}"}</span>
            <span className="mx-2">{"{{user.linkedin}}"}</span>
            <span className="mx-2">{"{{user.github}}"}</span>
            <span className="mx-2">{"{{user.portfolio}}"}</span>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button variant="secondary" onClick={resetTemplate}>
            Reset to Default
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MailTemplate;
