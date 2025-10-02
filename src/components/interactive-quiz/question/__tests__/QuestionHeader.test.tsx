import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { QuestionHeader } from "../QuestionHeader";

const mockQuestion = {
  id: "1",
  question: "What is React?",
  type: "multiple-choice" as const,
  difficulty: "easy" as const,
  points: 1,
  options: [
    { id: "a", text: "A JavaScript library", isCorrect: true },
    { id: "b", text: "A programming language", isCorrect: false },
  ],
  explanation: "React is a JavaScript library for building user interfaces.",
  category: "React",
  tags: ["React", "JavaScript"],
};

describe("QuestionHeader", () => {
  it("renders question number and total", () => {
    render(<QuestionHeader questionNumber={5} totalQuestions={30} question={mockQuestion} />);

    expect(screen.getByText("Question 5 of 30")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders difficulty badge with correct color", () => {
    render(<QuestionHeader questionNumber={1} totalQuestions={10} question={mockQuestion} />);

    expect(screen.getByText("🟢 EASY")).toBeInTheDocument();
  });

  it("renders question type badge", () => {
    render(<QuestionHeader questionNumber={1} totalQuestions={10} question={mockQuestion} />);

    expect(screen.getByText("🔘 MULTIPLE CHOICE")).toBeInTheDocument();
  });

  it("renders points badge", () => {
    render(<QuestionHeader questionNumber={1} totalQuestions={10} question={mockQuestion} />);

    expect(screen.getByText("1pt")).toBeInTheDocument();
  });

  it("renders bookmark button when onToggleBookmark is provided", () => {
    const onToggleBookmark = vi.fn();

    render(
      <QuestionHeader
        questionNumber={1}
        totalQuestions={10}
        question={mockQuestion}
        onToggleBookmark={onToggleBookmark}
      />
    );

    const bookmarkButton = screen.getByTitle("Bookmark question");
    expect(bookmarkButton).toBeInTheDocument();
  });

  it("calls onToggleBookmark when bookmark button is clicked", () => {
    const onToggleBookmark = vi.fn();

    render(
      <QuestionHeader
        questionNumber={1}
        totalQuestions={10}
        question={mockQuestion}
        onToggleBookmark={onToggleBookmark}
      />
    );

    const bookmarkButton = screen.getByTitle("Bookmark question");
    fireEvent.click(bookmarkButton);

    expect(onToggleBookmark).toHaveBeenCalled();
  });

  it("shows bookmarked state when isBookmarked is true", () => {
    const onToggleBookmark = vi.fn();

    render(
      <QuestionHeader
        questionNumber={1}
        totalQuestions={10}
        question={mockQuestion}
        isBookmarked={true}
        onToggleBookmark={onToggleBookmark}
      />
    );

    const bookmarkButton = screen.getByTitle("Remove bookmark");
    expect(bookmarkButton).toBeInTheDocument();
  });

  it("renders different difficulty badges correctly", () => {
    const mediumQuestion = {
      ...mockQuestion,
      difficulty: "medium" as const,
      explanation: "React is a JavaScript library for building user interfaces.",
      category: "React",
      tags: ["React", "JavaScript"],
    };
    const hardQuestion = {
      ...mockQuestion,
      difficulty: "hard" as const,
      explanation: "React is a JavaScript library for building user interfaces.",
      category: "React",
      tags: ["React", "JavaScript"],
    };

    const { rerender } = render(
      <QuestionHeader questionNumber={1} totalQuestions={10} question={mediumQuestion} />
    );

    expect(screen.getByText("🟡 MEDIUM")).toBeInTheDocument();

    rerender(<QuestionHeader questionNumber={1} totalQuestions={10} question={hardQuestion} />);

    expect(screen.getByText("🔴 HARD")).toBeInTheDocument();
  });

  it("renders different question type badges correctly", () => {
    const fillBlankQuestion = {
      ...mockQuestion,
      type: "fill-blank" as const,
      explanation: "React is a JavaScript library for building user interfaces.",
      category: "React",
      tags: ["React", "JavaScript"],
    };
    const checkboxQuestion = {
      ...mockQuestion,
      type: "multiple-checkbox" as const,
      explanation: "React is a JavaScript library for building user interfaces.",
      category: "React",
      tags: ["React", "JavaScript"],
    };

    const { rerender } = render(
      <QuestionHeader questionNumber={1} totalQuestions={10} question={fillBlankQuestion} />
    );

    expect(screen.getByText("✏️ FILL BLANK")).toBeInTheDocument();

    rerender(<QuestionHeader questionNumber={1} totalQuestions={10} question={checkboxQuestion} />);

    expect(screen.getByText("☑️ MULTIPLE CHECKBOX")).toBeInTheDocument();
  });

  it("renders multiple points correctly", () => {
    const multiPointQuestion = {
      ...mockQuestion,
      points: 5,
      explanation: "React is a JavaScript library for building user interfaces.",
      category: "React",
      tags: ["React", "JavaScript"],
    };

    render(<QuestionHeader questionNumber={1} totalQuestions={10} question={multiPointQuestion} />);

    expect(screen.getByText("5pts")).toBeInTheDocument();
  });
});
