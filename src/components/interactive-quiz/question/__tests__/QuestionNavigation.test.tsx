import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { QuestionNavigation } from "../QuestionNavigation";

describe("QuestionNavigation", () => {
  it("renders navigation buttons", () => {
    const onNext = vi.fn();
    const onPrevious = vi.fn();

    render(
      <QuestionNavigation
        questionNumber={5}
        totalQuestions={30}
        canGoNext={true}
        canGoPrevious={true}
        canComplete={false}
        onNext={onNext}
        onPrevious={onPrevious}
        onComplete={vi.fn()}
      />
    );

    expect(screen.getByText("Prev")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("calls onPrevious when previous button is clicked", () => {
    const onPrevious = vi.fn();

    render(
      <QuestionNavigation
        questionNumber={5}
        totalQuestions={30}
        canGoNext={true}
        canGoPrevious={true}
        canComplete={false}
        onNext={vi.fn()}
        onPrevious={onPrevious}
        onComplete={vi.fn()}
      />
    );

    const prevButton = screen.getByText("Prev");
    fireEvent.click(prevButton);

    expect(onPrevious).toHaveBeenCalled();
  });

  it("calls onNext when next button is clicked", () => {
    const onNext = vi.fn();

    render(
      <QuestionNavigation
        questionNumber={5}
        totalQuestions={30}
        canGoNext={true}
        canGoPrevious={true}
        canComplete={false}
        onNext={onNext}
        onPrevious={vi.fn()}
        onComplete={vi.fn()}
      />
    );

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(onNext).toHaveBeenCalled();
  });

  it("disables previous button when canGoPrevious is false", () => {
    render(
      <QuestionNavigation
        questionNumber={1}
        totalQuestions={30}
        canGoNext={true}
        canGoPrevious={false}
        canComplete={false}
        onNext={vi.fn()}
        onPrevious={vi.fn()}
        onComplete={vi.fn()}
      />
    );

    const prevButton = screen.getByText("Prev").closest("button");
    expect(prevButton).toBeDisabled();
  });

  it("disables next button when canGoNext is false", () => {
    render(
      <QuestionNavigation
        questionNumber={5}
        totalQuestions={30}
        canGoNext={false}
        canGoPrevious={true}
        canComplete={false}
        onNext={vi.fn()}
        onPrevious={vi.fn()}
        onComplete={vi.fn()}
      />
    );

    const nextButton = screen.getByText("Next").closest("button");
    expect(nextButton).toBeDisabled();
  });

  it("shows complete button on last question", () => {
    const onComplete = vi.fn();

    render(
      <QuestionNavigation
        questionNumber={30}
        totalQuestions={30}
        canGoNext={false}
        canGoPrevious={true}
        canComplete={true}
        onNext={vi.fn()}
        onPrevious={vi.fn()}
        onComplete={onComplete}
      />
    );

    expect(screen.getByText("Complete Quiz")).toBeInTheDocument();
    expect(screen.queryByText("Next")).not.toBeInTheDocument();
  });

  it("calls onComplete when complete button is clicked", () => {
    const onComplete = vi.fn();

    render(
      <QuestionNavigation
        questionNumber={30}
        totalQuestions={30}
        canGoNext={false}
        canGoPrevious={true}
        canComplete={true}
        onNext={vi.fn()}
        onPrevious={vi.fn()}
        onComplete={onComplete}
      />
    );

    const completeButton = screen.getByText("Complete Quiz");
    fireEvent.click(completeButton);

    expect(onComplete).toHaveBeenCalled();
  });

  it("disables complete button when canComplete is false", () => {
    render(
      <QuestionNavigation
        questionNumber={30}
        totalQuestions={30}
        canGoNext={false}
        canGoPrevious={true}
        canComplete={false}
        onNext={vi.fn()}
        onPrevious={vi.fn()}
        onComplete={vi.fn()}
      />
    );

    const completeButton = screen.getByText("Complete Quiz").closest("button");
    expect(completeButton).toBeDisabled();
  });

  it("shows mobile hint on mobile", () => {
    render(
      <QuestionNavigation
        questionNumber={5}
        totalQuestions={30}
        canGoNext={true}
        canGoPrevious={true}
        canComplete={false}
        onNext={vi.fn()}
        onPrevious={vi.fn()}
        onComplete={vi.fn()}
      />
    );

    expect(screen.getByText("💡 Swipe left/right or tap buttons to navigate")).toBeInTheDocument();
  });

  it("shows friendly reminder when answer is required", () => {
    render(
      <QuestionNavigation
        questionNumber={5}
        totalQuestions={30}
        canGoNext={false}
        canGoPrevious={true}
        canComplete={false}
        onNext={vi.fn()}
        onPrevious={vi.fn()}
        onComplete={vi.fn()}
      />
    );

    // Should show a friendly reminder message
    expect(
      screen.getByText(
        /Unicorns believe in you|Pick your answer|Houston, we need an answer|Answer is floating away|No trophy for skipping|Don't be shy|Every answer is art|Roll the dice|Coffee break's over|Luck favors the bold|Pick an answer|Make a choice|Feed me an answer/
      )
    ).toBeInTheDocument();
  });

  it("shows final question message on last question", () => {
    render(
      <QuestionNavigation
        questionNumber={30}
        totalQuestions={30}
        canGoNext={false}
        canGoPrevious={true}
        canComplete={false}
        onNext={vi.fn()}
        onPrevious={vi.fn()}
        onComplete={vi.fn()}
      />
    );

    // Should show a final question message
    expect(
      screen.getByText(
        /Make it count|Trophy waiting|Launch sequence|Roll the dice|Coffee break's over|Luck favors the bold|Last question|Almost there|Final boss|Gold medal answer/
      )
    ).toBeInTheDocument();
  });
});
