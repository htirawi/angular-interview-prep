import { useState } from "react";
import type { RegularTableProps } from "@/types/ui";

/**
 * Helper function to render text with bold formatting
 */
function renderBoldText(text: string): React.JSX.Element {
  if (!text.includes("**")) {
    return <span>{text}</span>;
  }

  const parts = text.split("**");
  return (
    <span>
      {parts.map((part, i) => {
        if (i % 2 === 1) {
          return (
            <strong key={i} className="font-bold text-gray-900 dark:text-white">
              {part}
            </strong>
          );
        }
        return part;
      })}
    </span>
  );
}

/**
 * Enhanced regular table component for standard markdown tables
 * Features:
 * - Professional table design with clear visual hierarchy
 * - Bold headers with distinct styling
 * - Enhanced readability with proper spacing
 * - Hover effects and smooth transitions
 * - Responsive layout with horizontal scroll
 * - Dark mode support
 * - Expert UI/UX design principles
 */
export function RegularTable({ rows }: RegularTableProps) {
  if (rows.length === 0) return null;

  return (
    <div className="my-8 overflow-x-auto">
      <div className="min-w-full rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`group border-b border-gray-200 transition-all duration-200 last:border-b-0 dark:border-gray-700 ${
              row.isHeader
                ? "bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
                : "hover:bg-gray-50/80 dark:hover:bg-gray-800/60"
            }`}
          >
            <div className="flex">
              {row.cells.map((cell, cellIndex) => {
                // Determine if this is the first column (usually contains the main identifier)
                const isFirstColumn = cellIndex === 0;

                return (
                  <div
                    key={cellIndex}
                    className={`flex-1 border-r border-gray-200 px-4 py-4 last:border-r-0 dark:border-gray-700 ${
                      row.isHeader
                        ? "text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-white"
                        : isFirstColumn
                          ? "text-sm font-semibold text-gray-900 dark:text-gray-100"
                          : "text-sm text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {/* Enhanced cell content with better formatting */}
                    <div className="leading-relaxed">
                      {row.isHeader ? (
                        <span className="inline-flex items-center gap-2">
                          {renderBoldText(cell)}
                          {cellIndex === 0 && (
                            <div className="h-1 w-1 rounded-full bg-blue-500"></div>
                          )}
                        </span>
                      ) : (
                        renderBoldText(cell)
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Table footer with subtle info */}
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        <span className="inline-flex items-center gap-1">
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Table with {rows.length} row{rows.length !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}
