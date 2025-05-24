import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, X, Check } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import type { Company } from "@/src/types/definition";

export const companyColumn: ColumnDef<Company>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    meta: { hideWhenNoUser: true },
  },
  {
    accessorKey: "name",
    header: () => <div className="">Company Name</div>,
    cell: ({ row }) => {
      console.log("row ", row);
      return <div className="font-medium">{row.getValue("name")}</div>;
    },
    meta: { hideWhenNoUser: false },
  },
  {
    accessorKey: "contactPerson",
    header: "Contact",
    cell: ({ row }) => <div>{row.getValue("contactPerson") || ""}</div>,
    meta: { hideWhenNoUser: false },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase px-3">{row.getValue("email")}</div>
    ),
    meta: { hideWhenNoUser: false },
  },
  {
    accessorKey: "industry",
    header: "Industry",
    cell: ({ row }) => <div>{row.getValue("industry") || "—"}</div>,
    meta: { hideWhenNoUser: true },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("status") ? (
          <Check className="text-foreground" size="16" />
        ) : (
          <X className="text-foreground/80" size="16" />
        )}
      </div>
    ),
    meta: { hideWhenNoUser: true },
  },
  {
    id: "actions",
    header: () => <div className="">Action</div>,
    cell: ({ row }) => {
      const email = row.getValue("email");
      return <Button onClick={() => alert(email)}>Send</Button>;
    },
    meta: { hideWhenNoUser: true },
  },
];
