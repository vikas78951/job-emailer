

"use client";
import React from "react";
import { Button } from "@/src/components/ui/button";
import { Loader } from "lucide-react";
import { useCompanyStore } from "@/src/stores/companyStore";
import { cn } from "@/src/lib/utils";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";



function AddCompanyForm({ className }: React.ComponentProps<"form">) {
  const addCompany = useCompanyStore((s) => s.addCompany);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [industry, setIndustry] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addCompany({
        id: "",
        name: name === "" ? "Hr Team" : name,
        email,
        contactPerson,
        number,
        industry,
      });
      setName("");
      setEmail("");
      setContactPerson("");
      setIndustry("");
      setNumber("");
      toast.success(name + " added");
    } catch (err) {
      console.error(err);
      alert("Failed to add company");
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
        <Label className="text-foreground/80" htmlFor="username">
          Company name
        </Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Company Name"
        />
      </div>
      <div className="grid gap-2">
        <Label className="text-foreground/80" htmlFor="email">
          Contact Person
        </Label>
        <Input
          value={contactPerson}
          onChange={(e) => setContactPerson(e.target.value)}
          placeholder="HR/Contact Person"
        />
      </div>

      <div className="grid gap-2">
        <Label className="text-foreground/80" htmlFor="email">
          HR email
        </Label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="HR Email"
        />
      </div>

      <div className="grid gap-2">
        <Label className="text-foreground/80" htmlFor="email">
          Contact Number
        </Label>
        <Input
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="9876542242"
        />
      </div>

      <div className="grid gap-2">
        <Label className="text-foreground/80" htmlFor="email">
          Industry
        </Label>
        <Input
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          placeholder="Industry (e.g., Fintech)"
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading && <Loader size={16} className="animate-spin mr-2" />}
        Add company
      </Button>
    </form>
  );
}

export default AddCompanyForm