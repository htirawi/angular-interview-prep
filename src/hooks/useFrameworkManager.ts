import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QUESTION_SETS } from "../data";
import { enrichQuestions } from "../utils/questionMetadata";
import { QuestionService } from "../services/QuestionService";
import type { FrameworkId, Question } from "../types";

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

  // State for lazy-loaded questions
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lazy load questions for selected framework
  useEffect(() => {
    const loadQuestions = async () => {
      if (!selectedFramework) return;

      setIsLoading(true);
      setError(null);

      try {
        const loadedQuestions = await QuestionService.loadFrameworkQuestions(selectedFramework);
        setQuestions(loadedQuestions);
      } catch (err) {
        console.error(`Failed to load questions for ${selectedFramework}:`, err);
        setError(err instanceof Error ? err.message : "Failed to load questions");
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, [selectedFramework]);

  const enrichedQuestions = useMemo(() => enrichQuestions(questions), [questions]);

  return {
    selectedFramework,
    isValidFramework,
    enrichedQuestions,
    navigate,
    isLoading,
    error,
  };
}
