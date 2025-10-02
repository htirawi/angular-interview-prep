/**
 * Quiz Progress Component - Shows quiz progress with beautiful animations
 */

interface QuizProgressProps {
  current: number;
  total: number;
  progress: number;
}

export default function QuizProgress({ current, total, progress }: QuizProgressProps) {
  return (
    <div className="w-full">
      <div className="mb-1.5 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 sm:mb-2 sm:text-sm">
        <span>Progress</span>
        <span className="font-medium">
          {current} / {total}
        </span>
      </div>

      <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 sm:h-4">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div className="h-full animate-pulse bg-gradient-to-r from-blue-400 to-purple-500 opacity-60" />
        </div>

        {/* Progress indicator with enhanced visibility */}
        <div
          className="absolute top-0 h-full w-1 bg-white shadow-lg transition-all duration-700 ease-out sm:w-1.5"
          style={{ left: `${progress}%` }}
        />

        {/* Progress glow effect */}
        <div
          className="absolute top-0 h-full w-2 bg-white/30 blur-sm transition-all duration-700 ease-out sm:w-3"
          style={{ left: `${progress}%` }}
        />
      </div>

      <div className="mt-1.5 text-right text-xs text-gray-500 dark:text-gray-500 sm:mt-2">
        {Math.round(progress)}% complete
      </div>
    </div>
  );
}
