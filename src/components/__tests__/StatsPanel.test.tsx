import { render, screen } from "@testing-library/react";
import StatsPanel from "../StatsPanel";

describe("StatsPanel", () => {
  it("displays completed count", () => {
    render(<StatsPanel total={100} completed={25} bookmarked={10} />);
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("displays progress percentage", () => {
    render(<StatsPanel total={100} completed={50} bookmarked={10} />);
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByText("Progress")).toBeInTheDocument();
  });

  it("displays bookmarked count", () => {
    render(<StatsPanel total={100} completed={25} bookmarked={15} />);
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("Bookmarked")).toBeInTheDocument();
  });

  it("calculates percentage correctly", () => {
    render(<StatsPanel total={100} completed={33} bookmarked={5} />);
    // 33/100 = 33%
    expect(screen.getByText("33%")).toBeInTheDocument();
  });

  it("handles zero completed", () => {
    render(<StatsPanel total={100} completed={0} bookmarked={0} />);
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("handles 100% completion", () => {
    render(<StatsPanel total={100} completed={100} bookmarked={10} />);
    expect(screen.getByText("100%")).toBeInTheDocument();
  });
});

