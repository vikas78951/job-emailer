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
import {
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
} from "@/src/components/ui/tabs";

export function AddCompany() {
  const [open, setOpen] = React.useState(false);
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
          <DialogTitle className="text-left">Company Detail</DialogTitle>
        </DialogHeader>
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Tabs defaultValue="form">
            <TabsList className="my-4  ">
              <TabsTrigger value="form">Add with Form</TabsTrigger>
              <TabsTrigger value="json">Add with Json</TabsTrigger>
            </TabsList>
            <TabsContent value="form">
              <AddCompanyForm />
            </TabsContent>
            <TabsContent value="json">
              <AddCompanyJson />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
