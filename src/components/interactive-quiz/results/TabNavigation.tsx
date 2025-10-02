/**
 * Tab Navigation Component for Quiz Results
 */

import type { TabNavigationProps } from "../../../types/quiz-results";

export function TabNavigation({ selectedTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="mb-4 flex justify-center sm:mb-6">
      <div className="flex w-full max-w-md rounded-xl bg-gray-100 p-1 dark:bg-gray-700 sm:w-auto">
        <button
          onClick={() => onTabChange("overview")}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 sm:flex-none sm:px-6 ${
            selectedTab === "overview"
              ? "bg-white text-gray-900 shadow-sm dark:bg-gray-600 dark:text-white"
              : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <span className="text-lg">📊</span>
            <span className="hidden sm:inline">Overview</span>
            <span className="sm:hidden">Overview</span>
          </span>
        </button>
        <button
          onClick={() => onTabChange("analysis")}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 sm:flex-none sm:px-6 ${
            selectedTab === "analysis"
              ? "bg-white text-gray-900 shadow-sm dark:bg-gray-600 dark:text-white"
              : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <span className="text-lg">🔍</span>
            <span className="hidden sm:inline">Detailed Analysis</span>
            <span className="sm:hidden">Analysis</span>
          </span>
        </button>
      </div>
    </div>
  );
}
