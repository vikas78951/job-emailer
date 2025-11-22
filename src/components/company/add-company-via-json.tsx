"use client";

import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Copy, Loader } from "lucide-react";
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

function AddCompanyJson({ className }: React.ComponentProps<"form">) {
  const addCompanyWithJson = useCompanyStore((s) => s.addCompanyWithJson);
  const [json, setJson] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const companies = CompanyJsonArraySchema.parse(json);
      await addCompanyWithJson(companies);
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
  const handleCopyClick = async () => {
    const data = [
      {
        name: "Company",
        email: "company@example.com",
        contactPerson: "Company Name",
        number: "+91-9876543210",
        industry: "Tech",
      },
    ];

    try {
      await navigator.clipboard.writeText(JSON.stringify(data));
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy data", { description: String(err) });
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
          placeholder={""}
          className="h-100 max-h-[280px]"
        />
         <Button className="p-0 mt-2" variant="outline" type="button" onClick={handleCopyClick}>
            Copy Sample
            <Copy />
          </Button>
      </div>

      <Button type="submit" disabled={loading}>
        {loading && <Loader size={16} className="animate-spin mr-2" />}
        Add company
      </Button>
    </form>
  );
}

export default AddCompanyJson;
