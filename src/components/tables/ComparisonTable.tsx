import { useState } from "react";
import type { ComparisonTableProps } from "../../types";

/**
 * Enhanced comparison table component with brilliant UI/UX
 * Features:
 * - Gradient headers with animated elements
 * - Interactive hover effects
 * - Color-coded indicators
 * - Professional typography and spacing
 * - Dark mode support
 */
export function ComparisonTable({ rows }: ComparisonTableProps) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-gray-700">
      {/* Table Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 px-8 py-6 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
        <div className="grid grid-cols-3 gap-8">
          <div className="text-center">
            <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Feature
            </div>
            <div className="mx-auto h-1 w-12 rounded-full bg-gradient-to-r from-gray-400 to-gray-600"></div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-100 to-blue-200 px-4 py-2 text-sm font-bold text-blue-900 shadow-sm dark:from-blue-900/40 dark:to-blue-800/40 dark:text-blue-300">
              <div className="h-3 w-3 rounded-full bg-blue-500 shadow-sm"></div>
              Reactive Forms
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-400"></div>
            </div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-purple-100 to-purple-200 px-4 py-2 text-sm font-bold text-purple-900 shadow-sm dark:from-purple-900/40 dark:to-purple-800/40 dark:text-purple-300">
              <div className="h-3 w-3 rounded-full bg-purple-500 shadow-sm"></div>
              Template-Driven Forms
              <div className="h-2 w-2 animate-pulse rounded-full bg-purple-400"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Body with Enhanced Styling */}
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {rows.map((row, index) => (
          <div
            key={index}
            className={`group grid grid-cols-3 gap-8 px-8 py-5 transition-all duration-300 ${
              hoveredRow === index
                ? "bg-gradient-to-r from-blue-50/50 to-purple-50/50 shadow-sm dark:from-blue-950/10 dark:to-purple-950/10"
                : "hover:bg-gray-50/50 dark:hover:bg-gray-800/30"
            }`}
            onMouseEnter={() => setHoveredRow(index)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            {/* Feature Column */}
            <div className="flex items-center">
              <div className="flex items-center gap-3">
                <div
                  className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                    hoveredRow === index ? "bg-blue-500" : "bg-gray-400"
                  }`}
                ></div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  {row.feature}
                </div>
              </div>
            </div>

            {/* Reactive Forms Column */}
            <div className="flex items-center">
              <div className="flex items-center gap-3">
                <div
                  className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                    hoveredRow === index ? "bg-blue-500" : "bg-blue-300"
                  }`}
                ></div>
                <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {row.reactive}
                </div>
              </div>
            </div>

            {/* Template-Driven Forms Column */}
            <div className="flex items-center">
              <div className="flex items-center gap-3">
                <div
                  className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                    hoveredRow === index ? "bg-purple-500" : "bg-purple-300"
                  }`}
                ></div>
                <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {row.template}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Footer with Statistics */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-4 dark:from-gray-800/50 dark:to-gray-900/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              {rows.length} key differences
            </span>
            <span className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              Comprehensive analysis
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium">Expert Comparison</span>
          </div>
        </div>
      </div>
    </div>
  );
}
