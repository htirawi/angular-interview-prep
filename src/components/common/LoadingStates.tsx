interface LoadingStatesProps {
  type?: "skeleton" | "spinner" | "dots" | "pulse";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Loading States Component
 * Provides various loading animations and skeleton screens
 */
export function LoadingStates({
  type = "skeleton",
  size = "md",
  className = "",
}: LoadingStatesProps) {
  const sizeClasses = {
    sm: "h-4",
    md: "h-6",
    lg: "h-8",
  };

  if (type === "spinner") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div
          className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]} w-${sizeClasses[size].replace("h-", "w-")}`}
        ></div>
      </div>
    );
  }

  if (type === "dots") {
    return (
      <div className={`flex items-center justify-center space-x-1 ${className}`}>
        <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600"></div>
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
    );
  }

  if (type === "pulse") {
    return (
      <div className={`animate-pulse rounded bg-gray-300 ${sizeClasses[size]} ${className}`}></div>
    );
  }

  // Default skeleton
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full bg-gray-300"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-gray-300"></div>
            <div className="h-4 w-1/2 rounded bg-gray-300"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 rounded bg-gray-300"></div>
          <div className="h-4 w-5/6 rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}

/**
 * Question Card Skeleton Loader
 */
export function QuestionCardSkeleton() {
  return (
    <div className="mx-auto max-w-6xl">
      {/* Progress Bar Skeleton */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <div className="h-6 w-32 animate-pulse rounded bg-gray-300"></div>
          <div className="h-6 w-20 animate-pulse rounded bg-gray-300"></div>
        </div>
        <div className="h-3 w-full rounded-full bg-gray-200">
          <div className="h-3 w-1/4 animate-pulse rounded-full bg-gray-300"></div>
        </div>
      </div>

      {/* Question Card Skeleton */}
      <div className="rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
        {/* Header Skeleton */}
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-6 w-16 animate-pulse rounded-full bg-gray-300"></div>
              <div className="h-6 w-20 animate-pulse rounded-full bg-gray-300"></div>
              <div className="h-6 w-24 animate-pulse rounded-full bg-gray-300"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 animate-pulse rounded-lg bg-gray-300"></div>
              <div className="h-8 w-8 animate-pulse rounded-lg bg-gray-300"></div>
            </div>
          </div>
        </div>

        {/* Question Content Skeleton */}
        <div className="px-8 py-10">
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded bg-gray-300"></div>
            <div className="space-y-2">
              <div className="h-4 animate-pulse rounded bg-gray-300"></div>
              <div className="h-4 w-5/6 animate-pulse rounded bg-gray-300"></div>
              <div className="h-4 w-4/6 animate-pulse rounded bg-gray-300"></div>
            </div>
            <div className="h-12 w-48 animate-pulse rounded bg-gray-300"></div>
          </div>
        </div>

        {/* Navigation Footer Skeleton */}
        <div className="border-t border-gray-200 bg-gray-50 px-8 py-6 dark:border-gray-700 dark:bg-gray-900/50">
          <div className="flex items-center justify-between">
            <div className="h-10 w-24 animate-pulse rounded-xl bg-gray-300"></div>
            <div className="h-10 w-20 animate-pulse rounded-xl bg-gray-300"></div>
            <div className="h-10 w-24 animate-pulse rounded-xl bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Table Skeleton Loader
 */
export function TableSkeleton() {
  return (
    <div className="my-8 overflow-x-auto">
      <div className="min-w-full rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
        {/* Header Skeleton */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="flex">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex-1 border-r border-gray-200 px-4 py-4 last:border-r-0 dark:border-gray-700"
              >
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Rows Skeleton */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex border-b border-gray-200 last:border-b-0 dark:border-gray-700"
          >
            {[1, 2, 3, 4].map((j) => (
              <div
                key={j}
                className="flex-1 border-r border-gray-200 px-4 py-4 last:border-r-0 dark:border-gray-700"
              >
                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-300"></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
