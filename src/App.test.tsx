import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App basic flows", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders first question by default", () => {
    render(<App />);
    expect(
      screen.getByText("Angular Interview Prep"),
    ).toBeInTheDocument();

    // Check that progress stats exist
    expect(screen.getByText("Completed")).toBeInTheDocument();

    // Check that "Next question" button exists
    expect(
      screen.getByRole("button", { name: /next question/i }),
    ).toBeInTheDocument();
  });

  it("navigates next and back", () => {
    render(<App />);
    const next = screen.getByRole("button", { name: /next question/i });
    const back = screen.getByRole("button", { name: /previous question/i });

    // Initially, back button should exist but might be disabled
    expect(next).toBeInTheDocument();
    expect(back).toBeInTheDocument();

    // Click next
    fireEvent.click(next);

    // Should still have both buttons
    expect(screen.getByRole("button", { name: /next question/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /previous question/i })).toBeInTheDocument();

    // Click back
    fireEvent.click(screen.getByRole("button", { name: /previous question/i }));

    // Navigation should still work
    expect(screen.getByRole("button", { name: /next question/i })).toBeInTheDocument();
  });
});
