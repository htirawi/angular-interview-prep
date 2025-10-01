import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App routing", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders landing page by default", () => {
    render(<App />);
    expect(screen.getByText(/Interview Prep Platform/i)).toBeInTheDocument();

    // Check that all frameworks are shown
    expect(screen.getByText("Angular")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Redux")).toBeInTheDocument();
  });

  it("shows framework cards", () => {
    render(<App />);
    // Check that framework selection cards exist
    const angularCard = screen.getByRole("button", {
      name: /Angular.*100.*Senior-Level Questions/i,
    });
    expect(angularCard).toBeInTheDocument();
  });
});
