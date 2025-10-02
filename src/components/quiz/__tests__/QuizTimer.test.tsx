import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import QuizTimer from "../QuizTimer";

describe("QuizTimer", () => {
  it("renders timer component", () => {
    const startTime = new Date();
    render(<QuizTimer startTime={startTime} />);

    // Check if timer container is rendered
    expect(screen.getByText("0:00")).toBeInTheDocument();
  });

  it("renders timer with time limit", () => {
    const startTime = new Date();
    render(<QuizTimer startTime={startTime} timeLimit={10} />);

    // Check if timer container is rendered
    expect(screen.getByText("0:00")).toBeInTheDocument();
  });

  it("renders timer with onTimeUp callback", () => {
    const startTime = new Date();
    const onTimeUp = () => {};
    render(<QuizTimer startTime={startTime} timeLimit={10} onTimeUp={onTimeUp} />);

    // Check if timer container is rendered
    expect(screen.getByText("0:00")).toBeInTheDocument();
  });

  it("renders timer when completed", () => {
    const startTime = new Date();
    render(<QuizTimer startTime={startTime} timeLimit={10} isCompleted={true} />);

    // Check if timer container is rendered
    expect(screen.getByText("0:00")).toBeInTheDocument();
  });

  it("renders timer with all props", () => {
    const startTime = new Date();
    const onTimeUp = () => {};
    render(
      <QuizTimer startTime={startTime} timeLimit={10} onTimeUp={onTimeUp} isCompleted={false} />
    );

    // Check if timer container is rendered
    expect(screen.getByText("0:00")).toBeInTheDocument();
  });
});
