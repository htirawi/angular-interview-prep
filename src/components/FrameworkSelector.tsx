import { useState, useEffect } from "react";
import { QUESTION_SETS } from "../data";
import type { FrameworkId } from "../types";

interface FrameworkSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (framework: FrameworkId) => void;
  currentFramework?: FrameworkId;
}

export default function FrameworkSelector({
  isOpen,
  onClose,
  onSelect,
  currentFramework,
}: FrameworkSelectorProps) {
  const [selectedFramework, setSelectedFramework] = useState<FrameworkId>(
    currentFramework || "angular"
  );

  useEffect(() => {
    if (currentFramework) {
      setSelectedFramework(currentFramework);
    }
  }, [currentFramework]);

  const handleSelect = (framework: FrameworkId) => {
    setSelectedFramework(framework);
  };

  const handleConfirm = () => {
    onSelect(selectedFramework);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-4xl rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              What are you preparing for?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Choose your framework to start your interview preparation journey
            </p>
          </div>

          {/* Framework Grid */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {QUESTION_SETS.map((set) => {
              const isSelected = selectedFramework === set.id;
              return (
                <button
                  key={set.id}
                  onClick={() => handleSelect(set.id)}
                  className={`group relative overflow-hidden rounded-xl border-2 p-6 text-left transition-all duration-300 ${
                    isSelected
                      ? "scale-105 border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg dark:from-blue-900/20 dark:to-purple-900/20"
                      : "border-gray-200 bg-white hover:scale-105 hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600"
                  }`}
                  aria-pressed={isSelected}
                >
                  {/* Selected indicator */}
                  {isSelected && (
                    <div className="absolute right-3 top-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="mb-4 text-5xl">{set.icon}</div>

                  {/* Name */}
                  <h3
                    className={`mb-2 text-xl font-bold ${
                      isSelected
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {set.name}
                  </h3>

                  {/* Count */}
                  <p className="text-sm text-gray-600 dark:text-gray-400">{set.count} questions</p>

                  {/* Hover effect */}
                  <div
                    className={`absolute inset-0 -z-10 bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-0 transition-opacity duration-300 ${
                      isSelected ? "opacity-100" : "group-hover:opacity-100"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="rounded-lg px-6 py-2.5 font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-2.5 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              Start Learning
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
