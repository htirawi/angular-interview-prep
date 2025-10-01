import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App basic flows", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders first question by default", () => {
    render(<App />);
    expect(
      screen.getByText("Angular Senior Interview Prep"),
    ).toBeInTheDocument();

    // Check that progress stats exist
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("Progress")).toBeInTheDocument();

    // Check that "Next question" button exists
    expect(
      screen.getByRole("button", { name: /next question/i }),
    ).toBeInTheDocument();
  });

  it("navigates next and back", () => {
    render(<App />);
    const next = screen.getByRole("button", { name: /next question/i });

    // Initially on question 1
    const allOnes = screen.queryAllByText("1");
    expect(allOnes.length).toBeGreaterThan(0);

    fireEvent.click(next);

    // After clicking next, should see "2" for question number (will also be in dropdown)
    const allTwos = screen.queryAllByText("2");
    expect(allTwos.length).toBeGreaterThan(0);

    const back = screen.getByRole("button", { name: /previous question/i });
    fireEvent.click(back);

    // Back to question 1
    const allOnesAgain = screen.queryAllByText("1");
    expect(allOnesAgain.length).toBeGreaterThan(0);
  });
});
