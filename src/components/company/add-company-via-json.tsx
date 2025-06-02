"use client";

import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Loader } from "lucide-react";
import { useCompanyStore } from "@/src/stores/companyStore";
import { cn } from "@/src/lib/utils";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";

export const SingleCompanySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email"),
  contactPerson: z.string().optional(),
  number: z.string().optional(),
  industry: z.string().optional(),
});

export const CompanyJsonArraySchema = z.array(SingleCompanySchema);

const sample = [
  {
    name: "Company ",
    email: "company@example.com",
    contactPerson: "Cimpany Name",
    number: "+91-9876543210",
    industry: "Tech",
  }
];

function AddCompanyJson({ className }: React.ComponentProps<"form">) {
  const addCompanyWithJson = useCompanyStore((s) => s.addCompanyWithJson);
  const [json, setJson] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const parsed = JSON.parse(json);
      const companies = CompanyJsonArraySchema.parse(parsed);

      await addCompanyWithJson(companies);

      setJson("");
      toast.success("Companies added successfully");
    } catch (err) {
      console.error(err);
      if (err instanceof SyntaxError) {
        toast.error("Invalid JSON format");
      } else if (err instanceof z.ZodError) {
        const errorMessages = err.errors.map((e) => e.message).join(", ");
        toast.error(`Validation Error: ${errorMessages}`);
      } else {
        toast.error("Failed to add companies");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={cn("grid items-start gap-4", className)}
      onSubmit={handleSubmit}
    >
      <div className="grid gap-2">
        <Label className="text-foreground/80" htmlFor="company-json">
          Paste your json here
        </Label>
        <Textarea
          id="company-json"
          value={json}
          onChange={(e) => setJson(e.target.value)}
          placeholder={JSON.stringify(sample)}
          className="max-h-[400px]"
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading && <Loader size={16} className="animate-spin mr-2" />}
        Add company
      </Button>
    </form>
  );
}

export default AddCompanyJson;
