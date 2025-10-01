import { QUESTION_SETS } from "../data";
import type { FrameworkId } from "../types";
import { FrameworkIcon } from "./icons/FrameworkIcon";
import type { FrameworkSwitcherProps } from "../types";

export default function FrameworkSwitcher({
  currentFramework,
  onSwitch,
  onOpenModal,
}: FrameworkSwitcherProps) {
  const current = QUESTION_SETS.find((s) => s.id === currentFramework);

  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Framework</h3>
        <button
          onClick={onOpenModal}
          className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          aria-label="Change framework"
        >
          Change
        </button>
      </div>

      {/* Current Framework Display */}
      <div className="mb-3 flex items-center gap-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-3 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="flex items-center justify-center">
          <FrameworkIcon framework={current?.icon || "angular"} size={32} />
        </div>
        <div className="flex-1">
          <div className="font-bold text-gray-900 dark:text-white">{current?.name}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">{current?.count} questions</div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Quick Switch Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {QUESTION_SETS.map((set) => {
          const isCurrent = set.id === currentFramework;
          return (
            <button
              key={set.id}
              onClick={() => onSwitch(set.id)}
              disabled={isCurrent}
              className={`flex flex-col items-center gap-1 rounded-lg border p-2 text-center transition-all ${
                isCurrent
                  ? "cursor-default border-blue-500 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20"
                  : "border-gray-200 hover:scale-105 hover:border-blue-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-blue-600 dark:hover:bg-gray-700"
              }`}
              title={set.name}
              aria-label={`Switch to ${set.name}`}
              aria-pressed={isCurrent}
            >
              <FrameworkIcon framework={set.icon} size={20} />
              <div
                className={`text-[10px] font-medium ${
                  isCurrent
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {set.name.split(" ")[0]}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
