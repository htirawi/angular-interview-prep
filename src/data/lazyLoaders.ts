/**
 * Lazy Data Loaders - Load large data files only when needed
 * This reduces initial bundle size and improves loading performance
 */

import { PerformanceService } from "../services/PerformanceService";

// Lazy loading function for large data files
export const loadFrameworkData = async (framework: string) => {
  return await PerformanceService.measureAsync(`load_framework_${framework}`, async () => {
    switch (framework.toLowerCase()) {
      case "angular": {
        const { default: angularData } = await import("./angular-enhanced");
        PerformanceService.trackDataLoad(`angular_enhanced`, 0, angularData.length);
        return angularData;
      }
      case "react": {
        const { default: reactData } = await import("./react-enhanced");
        PerformanceService.trackDataLoad(`react_enhanced`, 0, reactData.length);
        return reactData;
      }
      case "nextjs": {
        const { default: nextjsData } = await import("./nextjs-enhanced");
        PerformanceService.trackDataLoad(`nextjs_enhanced`, 0, nextjsData.length);
        return nextjsData;
      }
      case "redux": {
        const { default: reduxData } = await import("./redux");
        PerformanceService.trackDataLoad(`redux`, 0, reduxData.length);
        return reduxData;
      }
      case "random": {
        const { default: randomData } = await import("./random-enhanced");
        PerformanceService.trackDataLoad(`random_enhanced`, 0, randomData.length);
        return randomData;
      }
      default:
        throw new Error(`Framework ${framework} not found`);
    }
  });
};

// Lazy loading for interactive quiz data
export const loadInteractiveQuizData = async () => {
  return await PerformanceService.measureAsync("load_interactive_quiz_data", async () => {
    const { ANGULAR_ENHANCED_QUESTIONS } = await import("./enhanced-interactive-quiz-complete");
    PerformanceService.trackDataLoad(
      "interactive_quiz",
      0,
      Object.keys(ANGULAR_ENHANCED_QUESTIONS).length
    );
    return ANGULAR_ENHANCED_QUESTIONS;
  });
};

// Lazy loading for basic question data (smaller files)
export const loadBasicQuestions = async () => {
  return await PerformanceService.measureAsync("load_basic_questions", async () => {
    const { QUESTIONS } = await import("./questions");
    PerformanceService.trackDataLoad("basic_questions", 0, QUESTIONS.length);
    return QUESTIONS;
  });
};
