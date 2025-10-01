import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { REDUX_QUESTIONS, QUESTION_SETS } from "../data";
import { ANGULAR_ENHANCED_QUESTIONS } from "../data/angular-enhanced";
import { REACT_ENHANCED_QUESTIONS } from "../data/react-enhanced";
import { NEXTJS_ENHANCED_QUESTIONS } from "../data/nextjs-enhanced";
import { RANDOM_ENHANCED_QUESTIONS } from "../data/random-enhanced";
import { enrichQuestions } from "../utils/questionMetadata";
import type { FrameworkId } from "../types";

/**
 * Custom hook for managing framework-related logic
 * Handles framework validation, question loading, and navigation
 */
export function useFrameworkManager() {
  const { framework } = useParams<{ framework: FrameworkId }>();
  const navigate = useNavigate();

  // Validate framework from URL
  const selectedFramework = framework || "angular";
  const isValidFramework = QUESTION_SETS.some((set) => set.id === selectedFramework);

  // Redirect to home if invalid framework
  useEffect(() => {
    if (!isValidFramework) {
      navigate("/");
    }
  }, [isValidFramework, navigate]);

  // Update browser tab title based on framework
  useEffect(() => {
    const getFrameworkTitle = (framework: FrameworkId): string => {
      switch (framework) {
        case "angular":
          return "Angular Senior Interview Prep";
        case "react":
          return "React Senior Interview Prep";
        case "nextjs":
          return "Next.js Senior Interview Prep";
        case "redux":
          return "Redux Senior Interview Prep";
        case "random":
          return "Random Topics Interview Prep";
        default:
          return "Senior Interview Prep";
      }
    };

    document.title = getFrameworkTitle(selectedFramework);
  }, [selectedFramework]);

  // Get questions for selected framework
  const allFrameworkQuestions = useMemo(() => {
    switch (selectedFramework) {
      case "angular":
        return ANGULAR_ENHANCED_QUESTIONS;
      case "nextjs":
        return NEXTJS_ENHANCED_QUESTIONS;
      case "react":
        return REACT_ENHANCED_QUESTIONS;
      case "redux":
        return REDUX_QUESTIONS;
      case "random":
        return RANDOM_ENHANCED_QUESTIONS;
      default:
        return ANGULAR_ENHANCED_QUESTIONS;
    }
  }, [selectedFramework]);

  const enrichedQuestions = useMemo(
    () => enrichQuestions(allFrameworkQuestions),
    [allFrameworkQuestions]
  );

  return {
    selectedFramework,
    isValidFramework,
    enrichedQuestions,
    navigate,
  };
}
