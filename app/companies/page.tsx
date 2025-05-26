"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Send } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Skeleton } from "@/src/components/ui/skeleton";
import { useCompanyColumns } from "@/src/lib/columns";
import { useMailQueueStore } from "@/src/stores/mailQueue";
import { toast } from "sonner";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import Wrapper from "@/src/components/ui/wrapper";
import { useState } from "react";
import { useCompanyStore } from "@/src/stores/companyStore";
import { AddCompany } from "@/src/components/company/add-company";
import { useUserStore } from "@/src/stores/userStore";
import Link from "next/link";

type CompanyColumnMeta = {
  hideWhenNoUser?: boolean;
};

export default function Companytable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { companies, fetchCompanies, isLoading } = useCompanyStore();
  const user = useUserStore((state) => state.user);
  const companyColumn = useCompanyColumns();
  const { addToQueue } = useMailQueueStore();
  const visibleColumns = companyColumn.filter(
    (col) => !((col.meta as CompanyColumnMeta)?.hideWhenNoUser && !user)
  );

  const table = useReactTable({
    data: companies,
    columns: visibleColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleAdd = () => {
    const rows = table.getFilteredRowModel().rows;

    rows.forEach(({ original: company }) => {
      addToQueue({
        id: company.id,
        name: company.name,
        email: company.email,
        industry: company.industry || "",
        contactPerson: company.contactPerson || "",
      });
    });

    toast.success(`Queued ${rows.length} companies`);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-2 my-10 ">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-6 w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <Wrapper>
        <div>
          {!user && (
            <p className="text-sm text-red-600">
              Add your detail to use feature.{" "}
              <Link href={"/user"} className="text-blue-600 underline">
                add details.
              </Link>
            </p>
          )}
        </div>
        <div className="flex justify-between py-4">
          <Input
            placeholder="Filter companies..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="flex gap-x-2">
            {user && table.getSelectedRowModel().rows.length > 0 && (
              <Button variant="outline" onClick={handleAdd}>
                Send Mail <Send />
              </Button>
            )}

            <AddCompany />
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={companyColumn.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
