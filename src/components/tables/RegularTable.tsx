import type { RegularTableProps } from "../../types";

/**
 * Regular table component for standard markdown tables
 * Features:
 * - Clean, minimal design
 * - Header highlighting
 * - Hover effects
 * - Responsive layout
 * - Dark mode support
 */
export function RegularTable({ rows }: RegularTableProps) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex border-b border-gray-200 dark:border-gray-700 ${
            row.isHeader
              ? "bg-gray-50 font-semibold dark:bg-gray-800"
              : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
          }`}
        >
          {row.cells.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`flex-1 border-r border-gray-200 p-3 text-sm last:border-r-0 dark:border-gray-700 ${
                row.isHeader
                  ? "font-semibold text-gray-900 dark:text-white"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
