import { useMemo } from "react";
import type { FilterPanelProps } from "@/types/ui";

export default function FilterPanel({
  questions,
  selectedCategory,
  selectedDifficulty,
  onCategoryChange,
  onDifficultyChange,
}: FilterPanelProps) {
  const categories = useMemo(() => {
    const cats = new Set(questions.map((q) => q.category).filter(Boolean));
    return Array.from(cats).sort();
  }, [questions]);

  return (
    <div className="flex flex-wrap gap-3">
      <div className="min-w-[200px] flex-1">
        <label
          htmlFor="category-filter"
          className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300"
        >
          Category
        </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        >
          <option value="">All Categories</option>
          {categories.map((cat: string) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="min-w-[200px] flex-1">
        <label
          htmlFor="difficulty-filter"
          className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300"
        >
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
