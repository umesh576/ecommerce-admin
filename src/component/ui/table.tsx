/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface IProps {
  columns: any[];
  data: any[];
}

function Table({ columns, data }: IProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  console.log(
    "🚀 ~ Table ~ data:",
    data,
    table.getHeaderGroups(),
    table.getRowModel().rows
  );

  return (
    <div className="border border-gray-300 shadow-md mx-10 rounded-md min-h-[400px] overflow-hidden mt-10">
      <table className="w-full flex-1 tracking-wider">
        <thead className="border-b border-gray-300 bg-orange-500 text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="py-3 px-4 text-left border-r border-gray-200 last:border-r-0"
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="min-h-[400px]">
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={`${
                rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
              } border-b border-gray-200 last:border-b-0`}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  className="py-3 px-4 text-left border-r border-gray-200 last:border-r-0"
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
    </div>
  );
}

export default Table;
