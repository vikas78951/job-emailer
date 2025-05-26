import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, X, Check } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import type { Company } from "@/src/types/definition";
import { useMailQueueStore } from "@/src/stores/mailQueue";
import { useUserStore } from "../stores/userStore";
export function useCompanyColumns() {
  const { addToQueue } = useMailQueueStore();
  const { user } = useUserStore();

  const companyColumn: ColumnDef<Company>[] = [
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
        return <div className="font-medium">{row.getValue("name")}</div>;
      },
      meta: { hideWhenNoUser: false },
    },
    {
      accessorKey: "contactPerson",
      header: "Contact",
      cell: ({ row }) => <div>{row.getValue("contactPerson") || "—"}</div>,
      meta: { hideWhenNoUser: false },
    },
    {
      accessorKey: "number",
      header: "Number",
      cell: ({ row }) => <div>{row.getValue("number") || "—"}</div>,
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
      cell: ({ row }) => {
        const company = row.original;
        const sent = company.sent || [];
        const alreadySent =
          user && sent.some((entry) => entry.userEmail === user.email);

        return (
          <div className="capitalize">
            {alreadySent ? (
              <Check className="text-foreground" size="16" />
            ) : (
              <X className="text-foreground/80" size="16" />
            )}
          </div>
        );
      },
      meta: { hideWhenNoUser: true },
    },
    {
      id: "actions",
      header: () => <div className="">Action</div>,
      cell: ({ row }) => {
        return (
          <>
            <Button
              onClick={() => {
                const company = row.original;
                addToQueue({
                  id: company.id,
                  name: company.name,
                  email: company.email,
                  industry: company.industry || "",
                  contactPerson: company.contactPerson || "",
                });
              }}
            >
              Send
            </Button>
          </>
        );
      },
      meta: { hideWhenNoUser: true },
    },
  ];

  return companyColumn;
}
