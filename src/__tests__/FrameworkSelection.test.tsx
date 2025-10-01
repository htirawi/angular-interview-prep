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

  it("shows all 4 framework options", () => {
    renderWithRouter();
    expect(screen.getByText("Angular")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Redux")).toBeInTheDocument();
  });

  it("shows question counts", () => {
    renderWithRouter();
    const counts = screen.getAllByText("100");
    expect(counts.length).toBeGreaterThanOrEqual(3); // 3 frameworks with 100 questions
    const angularCount = screen.getByText("115"); // Angular has 115 questions
    expect(angularCount).toBeInTheDocument();
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
      name: /Angular.*115.*Senior-Level Questions/i,
    });
    expect(angularCard).toBeInTheDocument();
    expect(angularCard).not.toBeDisabled();
  });
});
