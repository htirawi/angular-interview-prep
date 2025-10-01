type Props = {
  total: number;
  completed: number;
  bookmarked: number;
};

export default function StatsPanel({ total, completed, bookmarked }: Props) {
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="grid grid-cols-3 gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {completed}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">Completed</div>
      </div>
      <div className="border-x border-gray-200 text-center dark:border-gray-700">
        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
          {percentage}%
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">Progress</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
          {bookmarked}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">Bookmarked</div>
      </div>
    </div>
  );
}

