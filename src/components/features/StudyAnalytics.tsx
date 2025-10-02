import { useStudyAnalytics } from "@hooks/useStudyAnalytics";

interface StudyAnalyticsProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Study Analytics Dashboard
 * Shows comprehensive study statistics and performance metrics
 */
export function StudyAnalytics({ isOpen, onClose }: StudyAnalyticsProps) {
  const { stats, formatDuration, getDifficultyPerformance } = useStudyAnalytics();

  if (!isOpen) return null;

  const difficultyStats = {
    Easy: getDifficultyPerformance("Easy"),
    Medium: getDifficultyPerformance("Medium"),
    Hard: getDifficultyPerformance("Hard"),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="mx-4 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-800">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Study Analytics</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Overall Stats */}
          <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-4 dark:from-blue-900/20 dark:to-blue-800/20">
            <h3 className="mb-3 text-lg font-semibold text-blue-900 dark:text-blue-300">
              Overall Progress
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-blue-700 dark:text-blue-400">Total Sessions:</span>
                <span className="font-semibold text-blue-900 dark:text-blue-300">
                  {stats.totalSessions}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700 dark:text-blue-400">Study Time:</span>
                <span className="font-semibold text-blue-900 dark:text-blue-300">
                  {formatDuration(stats.totalStudyTime)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700 dark:text-blue-400">Questions Answered:</span>
                <span className="font-semibold text-blue-900 dark:text-blue-300">
                  {stats.totalQuestionsAnswered}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700 dark:text-blue-400">Average Accuracy:</span>
                <span className="font-semibold text-blue-900 dark:text-blue-300">
                  {stats.averageAccuracy.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Streaks */}
          <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-4 dark:from-green-900/20 dark:to-green-800/20">
            <h3 className="mb-3 text-lg font-semibold text-green-900 dark:text-green-300">
              Study Streaks
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-green-700 dark:text-green-400">Current Streak:</span>
                <span className="font-semibold text-green-900 dark:text-green-300">
                  {stats.currentStreak} days
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700 dark:text-green-400">Longest Streak:</span>
                <span className="font-semibold text-green-900 dark:text-green-300">
                  {stats.longestStreak} days
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700 dark:text-green-400">Frameworks Studied:</span>
                <span className="font-semibold text-green-900 dark:text-green-300">
                  {stats.frameworksStudied.size}
                </span>
              </div>
            </div>
          </div>

          {/* Difficulty Breakdown */}
          <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-4 dark:from-purple-900/20 dark:to-purple-800/20">
            <h3 className="mb-3 text-lg font-semibold text-purple-900 dark:text-purple-300">
              Difficulty Performance
            </h3>
            <div className="space-y-3">
              {Object.entries(difficultyStats).map(([difficulty, perf]) => (
                <div key={difficulty} className="flex items-center justify-between">
                  <span className="text-sm text-purple-700 dark:text-purple-400">
                    {difficulty}:
                  </span>
                  <div className="text-right">
                    <div className="font-semibold text-purple-900 dark:text-purple-300">
                      {perf.accuracy.toFixed(1)}%
                    </div>
                    <div className="text-xs text-purple-600 dark:text-purple-500">
                      {perf.correct}/{perf.attempted}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
          <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {stats.lastStudyDate ? (
              <p>Last study session: {new Date(stats.lastStudyDate).toLocaleDateString()}</p>
            ) : (
              <p>No study sessions yet</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 transition-colors hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudyAnalytics;
