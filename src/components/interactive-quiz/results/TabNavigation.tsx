/**
 * Tab Navigation Component for Quiz Results
 */

import type { TabNavigationProps } from "../../../types/quiz-results";

export function TabNavigation({ selectedTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="mb-6 flex justify-center">
      <div className="rounded-xl bg-gray-100 p-1 dark:bg-gray-700">
        <button
          onClick={() => onTabChange("overview")}
          className={`rounded-lg px-6 py-2 font-medium transition-all ${
            selectedTab === "overview"
              ? "bg-white text-gray-900 shadow-sm dark:bg-gray-600 dark:text-white"
              : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => onTabChange("analysis")}
          className={`rounded-lg px-6 py-2 font-medium transition-all ${
            selectedTab === "analysis"
              ? "bg-white text-gray-900 shadow-sm dark:bg-gray-600 dark:text-white"
              : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          }`}
        >
          Detailed Analysis
        </button>
      </div>
    </div>
  );
}
