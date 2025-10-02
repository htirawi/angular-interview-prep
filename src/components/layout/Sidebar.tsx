import type { ReactNode } from "react";
import SearchBar from "../forms/SearchBar";
import FilterPanel from "../forms/FilterPanel";
import StatsPanel from "../features/StatsPanel";
import { FrameworkIcon } from "../common/icons/FrameworkIcon";
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
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                <FrameworkIcon framework={currentFramework} size={20} />
              </div>
              <div className="flex-1">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                  {FrameworkService.getDisplayName(currentFramework)}
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Interview Prep</p>
              </div>
            </div>
            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-3 dark:from-blue-900/20 dark:to-purple-900/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {totalQuestions} Questions
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Senior-Level Content</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    {Math.round((completed / totalQuestions) * 100)}% Complete
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {completed}/{totalQuestions}
                  </p>
                </div>
              </div>
            </div>
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
          <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
            <div className="text-center text-xs text-gray-500 dark:text-gray-600">
              <div className="mb-2 flex items-center justify-center gap-2">
                <div className="h-1 w-1 rounded-full bg-blue-500"></div>
                <div className="h-1 w-1 rounded-full bg-purple-500"></div>
                <div className="h-1 w-1 rounded-full bg-pink-500"></div>
              </div>
              <p className="font-medium text-gray-700 dark:text-gray-300">v1.0.0</p>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                Crafted with ❤️ by{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Hussein Tirawi
                </span>
              </p>
              <p className="mt-1 text-gray-500 dark:text-gray-500">© 2024 All rights reserved</p>
              <div className="mt-2">
                <a
                  href="https://github.com/htirawi/angular-interview-prep"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                >
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
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
