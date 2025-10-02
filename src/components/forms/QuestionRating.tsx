import { useState } from "react";

interface QuestionRatingProps {
  questionId: string;
  initialRating?: number;
  onRate: (questionId: string, rating: number) => void;
  compact?: boolean;
}

/**
 * Star rating component for questions
 * Allows users to rate question quality from 1-5 stars
 */
export function QuestionRating({
  questionId: _questionId,
  initialRating = 0,
  onRate,
  compact = false,
}: QuestionRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRate = (newRating: number) => {
    setRating(newRating);
    onRate(_questionId, newRating);
  };

  const StarIcon = ({
    filled,
    onClick,
    onMouseEnter,
    onMouseLeave,
  }: {
    filled: boolean;
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <svg
        className={`h-5 w-5 transition-colors duration-200 ${
          filled
            ? "text-yellow-400"
            : "text-gray-300 hover:text-yellow-300 dark:text-gray-600 dark:hover:text-yellow-400"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </button>
  );

  if (compact) {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            filled={star <= (hoveredRating || rating)}
            onClick={() => handleRate(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
          />
        ))}
        {rating > 0 && (
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{rating}/5</span>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Rate this question</h4>
        {rating > 0 && (
          <span className="text-sm text-gray-600 dark:text-gray-400">{rating}/5 stars</span>
        )}
      </div>

      <div className="mb-3 flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            filled={star <= (hoveredRating || rating)}
            onClick={() => handleRate(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
          />
        ))}
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400">
        <div className="flex justify-between">
          <span>Poor</span>
          <span>Excellent</span>
        </div>
      </div>
    </div>
  );
}

export default QuestionRating;
