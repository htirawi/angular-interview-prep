import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App routing", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders landing page by default", () => {
    render(<App />);
    expect(screen.getByText(/Interview Prep Platform/i)).toBeInTheDocument();

    // Check that learning modes are shown
    expect(screen.getByText("Study Mode")).toBeInTheDocument();
    expect(screen.getByText("Quiz Mode")).toBeInTheDocument();
  });

  it.skip("shows framework cards", () => {
    // TODO: Update test to match current UI - now shows Study Mode and Quiz Mode instead of framework cards
    render(<App />);
    // Check that framework selection cards exist
    const angularCard = screen.getByRole("button", {
      name: /Angular.*227.*Senior-Level Questions/i,
    });
    expect(angularCard).toBeInTheDocument();
  });
});
