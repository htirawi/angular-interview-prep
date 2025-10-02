import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import QuizQuestionCard from "../QuizQuestionCard";

const mockQuestion = {
  id: 1,
  question: "What is React?",
  answer: "A JavaScript library",
  category: "React",
  difficulty: "intermediate" as const,
  tags: ["React", "JavaScript"],
};

const defaultProps = {
  question: mockQuestion,
  questionNumber: 1,
  totalQuestions: 10,
  mode: "practice" as const,
  onAnswerSubmit: vi.fn(),
  onNext: vi.fn(),
  onPrevious: vi.fn(),
  canGoNext: true,
  canGoPrevious: false,
  onComplete: vi.fn(),
};

describe("QuizQuestionCard", () => {
  it("renders question card", () => {
    render(<QuizQuestionCard {...defaultProps} />);
    expect(screen.getByText("What is React?")).toBeInTheDocument();
  });

  it("renders question number and total", () => {
    render(<QuizQuestionCard {...defaultProps} />);
    expect(screen.getByText("Question 1 of 10")).toBeInTheDocument();
  });

  it("renders answer input", () => {
    render(<QuizQuestionCard {...defaultProps} />);
    expect(screen.getByPlaceholderText("Type your answer here...")).toBeInTheDocument();
  });

  it("renders navigation buttons", () => {
    render(<QuizQuestionCard {...defaultProps} />);
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });
});
