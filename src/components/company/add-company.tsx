"use client";
import React from "react";
import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import { useCompanyStore } from "@/src/stores/companyStore";
import { cn } from "@/src/lib/utils";
import { useMediaQuery } from "@/src/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/src/components/ui/drawer";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useState } from "react";

export function AddCompany() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            Add Company <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] ">
          <DialogHeader className="mb-3">
            <DialogTitle>Company Detail</DialogTitle>
          </DialogHeader>
          <AddCompanyForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          Add Company <Plus />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Company Detail</DrawerTitle>
        </DrawerHeader>
        <AddCompanyForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function AddCompanyForm({ className }: React.ComponentProps<"form">) {
  const addCompany = useCompanyStore((s) => s.addCompany);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [industry, setIndustry] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCompany({
        id: "",
        name,
        email,
        contactPerson,
        industry,
      });
      setName("");
      setEmail("");
      setContactPerson("");
      setIndustry("");
    } catch (err) {
      console.error(err);
      alert("Failed to add company");
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
          Industry
        </Label>
        <Input
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          placeholder="Industry (e.g., Fintech)"
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

      <Button type="submit">Add company</Button>
    </form>
  );
}
