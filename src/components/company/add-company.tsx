"use client";
import React from "react";
import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import { useMediaQuery } from "@/src/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";

import AddCompanyJson from "./add-company-via-json";
import AddCompanyForm from "./add-company-via-form";

export function AddCompany() {
  const [open, setOpen] = React.useState(false);
  const [withJson, setWithJson] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Add Company <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`sm:max-w-[425px] gap-0 ${
          !isDesktop &&
          "max-h-[400px] max-w-[300px] overflow-scroll scroll-p-[20px]"
        }`}
      >
        <DialogHeader className="mb-3">
          <DialogTitle>Company Detail</DialogTitle>
        </DialogHeader>
        <>
          <div className="flex justify-between">
            <Button
              className="ml-auto"
              variant={"ghost"}
              onClick={() => setWithJson(!withJson)}
            >
              {withJson ? "Add with Form" : "Add with JSON"}
            </Button>
          </div>
          {withJson ? <AddCompanyJson /> : <AddCompanyForm />}
        </>
      </DialogContent>
    </Dialog>
  );
}
