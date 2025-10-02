import type { ReactNode } from "react";
import SearchBar from "../forms/SearchBar";
import FilterPanel from "../forms/FilterPanel";
import StatsPanel from "../features/StatsPanel";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { FrameworkService } from "../../services/FrameworkService";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  children?: ReactNode;
}

/**
 * Simplified Sidebar component using context to reduce props drilling
 * Focuses on UI rendering while business logic is handled by context
 */
export default function Sidebar({ isOpen, onToggle, children }: SidebarProps) {
  const {
    currentFramework,
    totalQuestions,
    completed,
    bookmarked,
    mode,
    onModeChange,
    onSearchChange,
    questions,
    selectedCategory,
    selectedDifficulty,
    onCategoryChange,
    onDifficultyChange,
    onResetProgress,
    currentIndex,
    totalFiltered,
    onJumpToQuestion,
    questionList,
  } = useSidebarContext();

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed left-4 top-4 z-50 rounded-lg bg-white p-2 shadow-lg dark:bg-gray-800 lg:hidden"
        aria-label="Toggle sidebar"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-80 transform overflow-y-auto border-r border-gray-200 bg-white transition-transform duration-300 dark:border-gray-800 dark:bg-gray-900 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
              {FrameworkService.getDisplayName(currentFramework)}
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {totalQuestions} Senior-Level Questions
            </p>
          </div>

          {/* Stats */}
          <div className="mb-6">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Progress
            </h2>
            <StatsPanel total={totalQuestions} completed={completed} bookmarked={bookmarked} />
          </div>

          {/* Practice Mode */}
          <div className="mb-6">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Practice Mode
            </h2>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onModeChange("sequential")}
                className={`rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                  mode === "sequential"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                📚 Sequential
              </button>
              <button
                onClick={() => onModeChange("random")}
                className={`rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                  mode === "random"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                🎲 Random
              </button>
              <button
                onClick={() => onModeChange("bookmarked")}
                disabled={bookmarked === 0}
                className={`rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                  mode === "bookmarked"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                ⭐ Bookmarked ({bookmarked})
              </button>
            </div>
          </div>

          {/* Children (e.g., Framework Switcher) */}
          {children}

          {/* Search */}
          <div className="mb-6">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Search
            </h2>
            <SearchBar onSearch={onSearchChange} onClear={() => onSearchChange("")} />
          </div>

          {/* Filters */}
          <div className="mb-6">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Filters
            </h2>
            <FilterPanel
              questions={questions}
              selectedCategory={selectedCategory}
              selectedDifficulty={selectedDifficulty}
              onCategoryChange={onCategoryChange}
              onDifficultyChange={onDifficultyChange}
            />
          </div>

          {/* Question Navigator */}
          <div className="mb-6">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Navigation
            </h2>
            <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
              {totalFiltered} question{totalFiltered !== 1 ? "s" : ""}
            </div>
            <select
              aria-label="Jump to question"
              value={currentIndex}
              onChange={(e) => onJumpToQuestion(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            >
              {questionList.map((q, i) => (
                <option key={q.id} value={i}>
                  Q{i + 1}: {q.question.slice(0, 40)}...
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="border-t border-gray-200 pt-6 dark:border-gray-800">
            <button
              onClick={onResetProgress}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Reset Progress
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-600">
            <p>v1.0.0</p>
            <p className="mt-1">
              <a
                href="https://github.com/htirawi/angular-interview-prep"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                View on GitHub →
              </a>
            </p>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}
    </>
  );
}
