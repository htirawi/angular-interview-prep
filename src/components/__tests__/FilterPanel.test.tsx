import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import FilterPanel from "../FilterPanel";
import type { QA } from "../../data/questions";

const mockQuestions: QA[] = [
  {
    id: 1,
    question: "Test 1",
    answer: "Answer 1",
    category: "Architecture",
    difficulty: "intermediate",
    tags: ["test"],
  },
  {
    id: 2,
    question: "Test 2",
    answer: "Answer 2",
    category: "RxJS",
    difficulty: "advanced",
    tags: ["test"],
  },
  {
    id: 3,
    question: "Test 3",
    answer: "Answer 3",
    category: "Architecture",
    difficulty: "expert",
    tags: ["test"],
  },
];

describe("FilterPanel", () => {
  it("renders category filter", () => {
    const mockCategoryChange = vi.fn();
    const mockDifficultyChange = vi.fn();
    
    render(
      <FilterPanel
        questions={mockQuestions}
        selectedCategory=""
        selectedDifficulty=""
        onCategoryChange={mockCategoryChange}
        onDifficultyChange={mockDifficultyChange}
      />
    );
    
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
  });

  it("renders difficulty filter", () => {
    const mockCategoryChange = vi.fn();
    const mockDifficultyChange = vi.fn();
    
    render(
      <FilterPanel
        questions={mockQuestions}
        selectedCategory=""
        selectedDifficulty=""
        onCategoryChange={mockCategoryChange}
        onDifficultyChange={mockDifficultyChange}
      />
    );
    
    expect(screen.getByLabelText(/difficulty/i)).toBeInTheDocument();
  });

  it("displays unique categories from questions", () => {
    const mockCategoryChange = vi.fn();
    const mockDifficultyChange = vi.fn();
    
    render(
      <FilterPanel
        questions={mockQuestions}
        selectedCategory=""
        selectedDifficulty=""
        onCategoryChange={mockCategoryChange}
        onDifficultyChange={mockDifficultyChange}
      />
    );
    
    const categorySelect = screen.getByLabelText(/category/i);
    expect(categorySelect).toBeInTheDocument();
    // Should have "All Categories" + 2 unique categories
    expect(categorySelect.querySelectorAll("option").length).toBeGreaterThanOrEqual(3);
  });

  it("calls onCategoryChange when category is selected", () => {
    const mockCategoryChange = vi.fn();
    const mockDifficultyChange = vi.fn();
    
    render(
      <FilterPanel
        questions={mockQuestions}
        selectedCategory=""
        selectedDifficulty=""
        onCategoryChange={mockCategoryChange}
        onDifficultyChange={mockDifficultyChange}
      />
    );
    
    const categorySelect = screen.getByLabelText(/category/i);
    fireEvent.change(categorySelect, { target: { value: "Architecture" } });
    
    expect(mockCategoryChange).toHaveBeenCalledWith("Architecture");
  });

  it("calls onDifficultyChange when difficulty is selected", () => {
    const mockCategoryChange = vi.fn();
    const mockDifficultyChange = vi.fn();
    
    render(
      <FilterPanel
        questions={mockQuestions}
        selectedCategory=""
        selectedDifficulty=""
        onCategoryChange={mockCategoryChange}
        onDifficultyChange={mockDifficultyChange}
      />
    );
    
    const difficultySelect = screen.getByLabelText(/difficulty/i);
    fireEvent.change(difficultySelect, { target: { value: "advanced" } });
    
    expect(mockDifficultyChange).toHaveBeenCalledWith("advanced");
  });

  it("reflects selected category", () => {
    const mockCategoryChange = vi.fn();
    const mockDifficultyChange = vi.fn();
    
    render(
      <FilterPanel
        questions={mockQuestions}
        selectedCategory="Architecture"
        selectedDifficulty=""
        onCategoryChange={mockCategoryChange}
        onDifficultyChange={mockDifficultyChange}
      />
    );
    
    const categorySelect = screen.getByLabelText(/category/i) as HTMLSelectElement;
    expect(categorySelect.value).toBe("Architecture");
  });

  it("reflects selected difficulty", () => {
    const mockCategoryChange = vi.fn();
    const mockDifficultyChange = vi.fn();
    
    render(
      <FilterPanel
        questions={mockQuestions}
        selectedCategory=""
        selectedDifficulty="advanced"
        onCategoryChange={mockCategoryChange}
        onDifficultyChange={mockDifficultyChange}
      />
    );
    
    const difficultySelect = screen.getByLabelText(/difficulty/i) as HTMLSelectElement;
    expect(difficultySelect.value).toBe("advanced");
  });
});

