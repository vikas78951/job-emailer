"use client";

import React from "react";
import { useTemplateStore } from "@/src/stores/templateStore";
import { useUserStore } from "@/src/stores/userStore";
import { Card, CardContent } from "@/src/components/ui/card";
import { interpolate } from "@/src/lib/utils";

const PreviewTemplate = () => {
  const { template } = useTemplateStore();
  const user = useUserStore((s) =>s.user);

  const defaultUser = {
  firstName: "John",
  lastName: "Doe",
};


  const company = {
    name: "Acme Corp",
    contactPerson: "Alice",
    email: "alice@acme.com",
    industry: "IT",
  };

  const mailingData = {
    user : user || defaultUser,
    company,
    template,
  };

  const renderedSubject = interpolate(template.subject, mailingData);
  const renderedBody = interpolate(template.body, mailingData);

  return (
    <div className="h-full lg:w-1/2">
      <h1 className="text-foreground/80 p-2">Preview</h1>
      <Card className="w-full h-full">
        <CardContent className="space-y-2">
          <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
            <strong>To:</strong> {mailingData.company.email}
            {"\n"}
            <strong>Subject:</strong> {renderedSubject}
            {"\n\n"}
            {renderedBody}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreviewTemplate;
