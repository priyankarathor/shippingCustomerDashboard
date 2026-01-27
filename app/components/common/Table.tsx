"use client";

import { ReactNode } from "react";

interface Column {
  key: string;
  label: string;
  className?: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
  renderRow?: (row: any, index: number) => ReactNode;
  emptyIcon?: ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
}

export default function Table({
  columns,
  data,
  renderRow,
  emptyIcon,
  emptyTitle = "No data found",
  emptyDescription = "Please change filters and retry.",
}: TableProps) {
  return (
    <div className="bg-white rounded-2xl border overflow-hidden">
      {/* Header */}
      <div
        className={`grid`}
        style={{
          gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
        }}
      >
        {columns.map((col) => (
          <div
            key={col.key}
            className={`px-6 py-4 text-sm font-medium text-gray-700 border-b ${col.className || ""}`}
          >
            {col.label}
          </div>
        ))}
      </div>

      {/* Body */}
      {data.length > 0 && renderRow ? (
        <div>{data.map(renderRow)}</div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[350px] text-center px-4">
          {emptyIcon}
          <p className="text-xl font-semibold text-blue-600 mb-1">
            {emptyTitle}
          </p>
          <p className="text-sm text-gray-500">{emptyDescription}</p>
        </div>
      )}
    </div>
  );
}
