import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FrameworkSelection from "../pages/FrameworkSelection";

const renderWithRouter = () => {
  return render(
    <BrowserRouter>
      <FrameworkSelection />
    </BrowserRouter>
  );
};

describe("FrameworkSelection Landing Page", () => {
  it("renders main title", () => {
    renderWithRouter();
    expect(screen.getByText(/Interview Prep Platform/i)).toBeInTheDocument();
  });

  it("shows all 5 framework options", () => {
    renderWithRouter();
    expect(screen.getByText("Angular")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Redux")).toBeInTheDocument();
    expect(screen.getByText("Random")).toBeInTheDocument();
  });

  it("shows question counts", () => {
    renderWithRouter();
    const counts = screen.getAllByText("100");
    expect(counts.length).toBeGreaterThanOrEqual(1); // 1 framework with 100 questions (Redux)
    const angularCount = screen.getByText("217"); // Angular has 217 questions
    expect(angularCount).toBeInTheDocument();
    const reactCount = screen.getByText("80"); // React has 80 questions
    expect(reactCount).toBeInTheDocument();
    const nextjsCount = screen.getByText("50"); // Next.js has 50 questions
    expect(nextjsCount).toBeInTheDocument();
    const randomCount = screen.getByText("52"); // Random has 52 questions
    expect(randomCount).toBeInTheDocument();
  });

  it("shows feature highlights", () => {
    renderWithRouter();
    expect(screen.getByText(/Track Progress/i)).toBeInTheDocument();
    expect(screen.getByText(/Practice Modes/i)).toBeInTheDocument();
    expect(screen.getByText(/Expert Answers/i)).toBeInTheDocument();
  });

  it("framework cards are clickable", () => {
    renderWithRouter();
    const angularCard = screen.getByRole("button", {
      name: /Angular.*217.*Senior-Level Questions/i,
    });
    expect(angularCard).toBeInTheDocument();
    expect(angularCard).not.toBeDisabled();
  });
});
