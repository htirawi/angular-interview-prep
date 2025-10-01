import { useMemo } from "react";
import type { QA } from "../data/questions";

type Props = {
  questions: QA[];
  selectedCategory: string;
  selectedDifficulty: string;
  onCategoryChange: (category: string) => void;
  onDifficultyChange: (difficulty: string) => void;
};

export default function FilterPanel({
  questions,
  selectedCategory,
  selectedDifficulty,
  onCategoryChange,
  onDifficultyChange,
}: Props) {
  const categories = useMemo(() => {
    const cats = new Set(questions.map((q) => q.category).filter(Boolean));
    return Array.from(cats).sort();
  }, [questions]);

  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex-1 min-w-[200px]">
        <label htmlFor="category-filter" className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
          Category
        </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1 min-w-[200px]">
        <label htmlFor="difficulty-filter" className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
          Difficulty
        </label>
        <select
          id="difficulty-filter"
          value={selectedDifficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        >
          <option value="">All Levels</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="expert">Expert</option>
        </select>
      </div>
    </div>
  );
}

