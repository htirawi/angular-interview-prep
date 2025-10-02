import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SidebarProvider, useSidebarContext } from "../SidebarContext";

// Mock component to test the context
const TestComponent = () => {
  const context = useSidebarContext();
  return (
    <div>
      <span data-testid="framework">{context.currentFramework}</span>
      <span data-testid="total">{context.totalQuestions}</span>
    </div>
  );
};

describe("SidebarContext", () => {
  it("provides default context values", () => {
    const mockValue = {
      currentFramework: "react" as const,
      totalQuestions: 10,
      completed: 5,
      bookmarked: 2,
      mode: "sequential" as const,
      onModeChange: () => {},
      searchQuery: "",
      onSearchChange: () => {},
      questions: [],
      selectedCategory: "",
      selectedDifficulty: "",
      onCategoryChange: () => {},
      onDifficultyChange: () => {},
      onResetProgress: () => {},
      currentIndex: 0,
      totalFiltered: 10,
      onJumpToQuestion: () => {},
      questionList: [],
    };

    render(
      <SidebarProvider value={mockValue}>
        <TestComponent />
      </SidebarProvider>
    );

    expect(screen.getByTestId("framework")).toHaveTextContent("react");
    expect(screen.getByTestId("total")).toHaveTextContent("10");
  });

  it("provides context with different values", () => {
    const mockValue = {
      currentFramework: "angular" as const,
      totalQuestions: 20,
      completed: 10,
      bookmarked: 5,
      mode: "random" as const,
      onModeChange: () => {},
      searchQuery: "test",
      onSearchChange: () => {},
      questions: [],
      selectedCategory: "hooks",
      selectedDifficulty: "easy",
      onCategoryChange: () => {},
      onDifficultyChange: () => {},
      onResetProgress: () => {},
      currentIndex: 5,
      totalFiltered: 15,
      onJumpToQuestion: () => {},
      questionList: [],
    };

    render(
      <SidebarProvider value={mockValue}>
        <TestComponent />
      </SidebarProvider>
    );

    expect(screen.getByTestId("framework")).toHaveTextContent("angular");
    expect(screen.getByTestId("total")).toHaveTextContent("20");
  });

  it("throws error when used outside provider", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useSidebarContext must be used within a SidebarProvider");

    consoleSpy.mockRestore();
  });
});
