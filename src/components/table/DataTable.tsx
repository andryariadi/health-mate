"use client";

import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // console.log({ columns, data }, "<---ditable");

  return (
    <div className="rounded-md border data-table">
      <Table className="b-emerald-800 shad-table">
        <TableHeader className="bg-dark-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="b-amber-600 shad-table-row-header">
              {headerGroup.headers.map((header) => {
                return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="b-violet-500 shad-table-row">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="table-actions">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="shad-gray-btn">
          <MdKeyboardDoubleArrowLeft size={20} />
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="shad-gray-btn">
          <MdKeyboardDoubleArrowRight size={20} />
        </Button>
      </div>
    </div>
  );
}
