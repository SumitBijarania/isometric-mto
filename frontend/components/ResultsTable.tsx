"use client";

import { MTOItem } from "@/lib/types";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<MTOItem>();

const columns = [
  columnHelper.accessor("item_no", { header: "Item" }),
  columnHelper.accessor("category", { header: "Category" }),
  columnHelper.accessor("description", { header: "Description" }),
  columnHelper.accessor("size_nps", { header: "Size" }),
  columnHelper.accessor("schedule_rating", { header: "Sch/Rating" }),
  columnHelper.accessor("material_spec", { header: "Material" }),
  columnHelper.accessor("end_type", { header: "End" }),
  columnHelper.accessor("quantity", { header: "Qty" }),
  columnHelper.accessor("unit", { header: "Unit" }),
  columnHelper.accessor("length_m", { header: "Length (m)" }),
  columnHelper.accessor("remarks", { header: "Remarks" }),
];

export default function ResultsTable({ items }: { items: MTOItem[] }) {
  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 text-sm text-gray-700">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}