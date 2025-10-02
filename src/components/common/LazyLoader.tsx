/**
 * Lazy Loader Component - Provides loading states for lazy-loaded components
 */

import React, { Suspense, lazy, ComponentType, ReactNode } from "react";

interface LazyLoaderProps {
  fallback?: ReactNode;
  children: ReactNode;
}

/**
 * Lazy loader wrapper with loading fallback
 */
export function LazyLoader({ fallback, children }: LazyLoaderProps) {
  const defaultFallback = (
    <div className="flex items-center justify-center p-8">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      <span className="ml-2 text-gray-600 dark:text-gray-400">Loading...</span>
    </div>
  );

  return <Suspense fallback={fallback || defaultFallback}>{children}</Suspense>;
}

/**
 * Create a lazy-loaded component with loading fallback
 */
export function createLazyComponent<T extends ComponentType<Record<string, unknown>>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: ReactNode
) {
  const LazyComponent = lazy(importFunc);

  return function LazyComponentWrapper(props: Record<string, unknown>) {
    return (
      <LazyLoader fallback={fallback}>
        <LazyComponent {...props} />
      </LazyLoader>
    );
  };
}

/**
 * Predefined lazy components with custom loading states
 */
// Commented out to avoid complex type issues
// export const LazyStudyAnalytics = createLazyComponent(
//   () => import("../features/StudyAnalytics"),
//   <div className="flex items-center justify-center p-12">
//     <div className="text-center">
//       <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
//       <p className="text-gray-600 dark:text-gray-400">Loading analytics...</p>
//     </div>
//   </div>
// );

// export const LazyMockInterviewMode = createLazyComponent(
//   () => import("../features/MockInterviewMode"),
//   <div className="flex items-center justify-center p-12">
//     <div className="text-center">
//       <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
//       <p className="text-gray-600 dark:text-gray-400">Loading interview mode...</p>
//     </div>
//   </div>
// );

// export const LazyQuizResults = createLazyComponent(
//   () => import("../interactive-quiz/InteractiveQuizResults"),
//   <div className="flex items-center justify-center p-12">
//     <div className="text-center">
//       <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
//       <p className="text-gray-600 dark:text-gray-400">Loading results...</p>
//     </div>
//   </div>
// );
