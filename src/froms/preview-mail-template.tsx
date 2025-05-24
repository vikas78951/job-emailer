"use client";

import { useTemplateStore } from "@/src/stores/templateStore";
import { useUserStore } from "@/src/stores/userStore";
import { Card, CardContent } from "@/src/components/ui/card";
import React from "react";

function interpolate(template: string, data: Record<string, unknown>) {
  return template.replace(/{{(.*?)}}/g, (_, key) => {
    const value = key
      .trim()
      .split(".")
      .reduce((obj: unknown, k: string) => {
        if (obj && typeof obj === "object" && k in obj) {
          return (obj as Record<string, unknown>)[k];
        }
        return undefined;
      }, data);
    return value ?? `[${key}]`;
  });
}

const PreviewTemplate = () => {
  const { template } = useTemplateStore();
  const { user } = useUserStore();

  // Mock company and email data
  const company = {
    name: "Acme Corp",
    hr_name: "Alice",
    email: "alice@acme.com",
  };

  const email = {
    subject: template.subject,
    mailid: company.email,
  };

  const mailingData = {
    user: user ?? {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      designation: "Developer",
      linkedinUrl: "https://linkedin.com/in/john",
    },
    company,
    email,
  };

  const renderedSubject = interpolate(template.subject, mailingData);
  const renderedBody = interpolate(template.body, mailingData);

  return (
    <div className="h-full">
      <h1 className="text-foreground/80 p-2">Preview</h1>
      <Card className="w-full h-full">
        <CardContent className="space-y-2">
          <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
            <strong>To:</strong> {email.mailid}
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
