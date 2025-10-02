import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import QuizProgress from "../QuizProgress";

describe("QuizProgress", () => {
  it("renders progress with current and total questions", () => {
    render(<QuizProgress current={5} total={30} progress={16.67} />);

    expect(screen.getByText("Progress")).toBeInTheDocument();
    expect(screen.getByText("5 / 30")).toBeInTheDocument();
    expect(screen.getByText("17% complete")).toBeInTheDocument();
  });

  it("renders progress bar with correct width", () => {
    render(<QuizProgress current={10} total={20} progress={50} />);

    // Check if progress percentage is displayed
    expect(screen.getByText("50% complete")).toBeInTheDocument();
  });

  it("shows 0% when no progress", () => {
    render(<QuizProgress current={1} total={10} progress={0} />);

    expect(screen.getByText("0% complete")).toBeInTheDocument();
  });

  it("shows 100% when completed", () => {
    render(<QuizProgress current={10} total={10} progress={100} />);

    expect(screen.getByText("100% complete")).toBeInTheDocument();
  });

  it("rounds progress percentage correctly", () => {
    render(<QuizProgress current={3} total={10} progress={33.333} />);

    expect(screen.getByText("33% complete")).toBeInTheDocument();
  });
});
