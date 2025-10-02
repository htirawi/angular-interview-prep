import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { QuestionContent } from "../QuestionContent";

const mockQuestion = {
  id: "1",
  question: "What is React?",
  type: "multiple-choice" as const,
  difficulty: "easy" as const,
  points: 1,
  options: [
    { id: "a", text: "A JavaScript library", isCorrect: true },
    { id: "b", text: "A programming language", isCorrect: false },
    { id: "c", text: "A database", isCorrect: false },
    { id: "d", text: "An operating system", isCorrect: false },
  ],
  explanation: "React is a JavaScript library for building user interfaces.",
  category: "React",
  tags: ["React", "JavaScript"],
};

describe("QuestionContent", () => {
  it("renders multiple choice question with options", () => {
    const onAnswerChange = vi.fn();

    render(
      <QuestionContent question={mockQuestion} userAnswer="" onAnswerChange={onAnswerChange} />
    );

    expect(screen.getByText("What is React?")).toBeInTheDocument();
    expect(screen.getByText("A JavaScript library")).toBeInTheDocument();
    expect(screen.getByText("A programming language")).toBeInTheDocument();
    expect(screen.getByText("A database")).toBeInTheDocument();
    expect(screen.getByText("An operating system")).toBeInTheDocument();
  });

  it("calls onAnswerChange when option is selected", () => {
    const onAnswerChange = vi.fn();

    render(
      <QuestionContent question={mockQuestion} userAnswer="" onAnswerChange={onAnswerChange} />
    );

    const option = screen.getByLabelText("Select option: A JavaScript library");
    fireEvent.click(option);

    expect(onAnswerChange).toHaveBeenCalledWith("a");
  });

  it("shows selected option with checkmark", () => {
    const onAnswerChange = vi.fn();

    render(
      <QuestionContent question={mockQuestion} userAnswer="a" onAnswerChange={onAnswerChange} />
    );

    const option = screen.getByLabelText("Select option: A JavaScript library");
    expect(option).toBeChecked();
  });

  it("renders fill-blank question type", () => {
    const fillBlankQuestion = {
      ...mockQuestion,
      type: "fill-blank" as const,
      options: undefined,
      explanation: "React is a JavaScript library for building user interfaces.",
      category: "React",
      tags: ["React", "JavaScript"],
    };

    const onAnswerChange = vi.fn();

    render(
      <QuestionContent question={fillBlankQuestion} userAnswer="" onAnswerChange={onAnswerChange} />
    );

    expect(screen.getByPlaceholderText("Enter your answer...")).toBeInTheDocument();
  });

  it("calls onAnswerChange when typing in fill-blank input", () => {
    const fillBlankQuestion = {
      ...mockQuestion,
      type: "fill-blank" as const,
      options: undefined,
      explanation: "React is a JavaScript library for building user interfaces.",
      category: "React",
      tags: ["React", "JavaScript"],
    };

    const onAnswerChange = vi.fn();

    render(
      <QuestionContent question={fillBlankQuestion} userAnswer="" onAnswerChange={onAnswerChange} />
    );

    const input = screen.getByPlaceholderText("Enter your answer...");
    fireEvent.change(input, { target: { value: "React is a library" } });

    expect(onAnswerChange).toHaveBeenCalledWith("React is a library");
  });

  it("renders multiple-checkbox question type", () => {
    const checkboxQuestion = {
      ...mockQuestion,
      type: "multiple-checkbox" as const,
      explanation: "React is a JavaScript library for building user interfaces.",
      category: "React",
      tags: ["React", "JavaScript"],
    };

    const onAnswerChange = vi.fn();

    render(
      <QuestionContent
        question={checkboxQuestion}
        userAnswer={[]}
        onAnswerChange={onAnswerChange}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(4);
  });

  it("handles multiple checkbox selections", () => {
    const checkboxQuestion = {
      ...mockQuestion,
      type: "multiple-checkbox" as const,
      explanation: "React is a JavaScript library for building user interfaces.",
      category: "React",
      tags: ["React", "JavaScript"],
    };

    const onAnswerChange = vi.fn();

    render(
      <QuestionContent
        question={checkboxQuestion}
        userAnswer={["a"]}
        onAnswerChange={onAnswerChange}
      />
    );

    const firstCheckbox = screen.getByLabelText("Select option: A JavaScript library");
    const secondCheckbox = screen.getByLabelText("Select option: A programming language");

    expect(firstCheckbox).toBeChecked();
    expect(secondCheckbox).not.toBeChecked();

    fireEvent.click(secondCheckbox);
    expect(onAnswerChange).toHaveBeenCalledWith(["a", "b"]);
  });
});
