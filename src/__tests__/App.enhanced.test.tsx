import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import InterviewPage from "../pages/InterviewPage";

// Helper to render InterviewPage with routing
const renderInterviewPage = (framework = "angular") => {
  return render(
    <MemoryRouter initialEntries={[`/${framework}`]}>
      <Routes>
        <Route path="/:framework" element={<InterviewPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("Enhanced App Features", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("Stats Panel", () => {
    it("displays initial stats", () => {
      renderInterviewPage();
      expect(screen.getByText("Completed")).toBeInTheDocument();
      expect(screen.getAllByText("Progress").length).toBeGreaterThan(0);
      expect(screen.getByText("Bookmarked")).toBeInTheDocument();
    });

    it("shows 0% progress initially", () => {
      renderInterviewPage();
      expect(screen.getByText("0%")).toBeInTheDocument();
    });
  });

  describe("Practice Modes", () => {
    it("has Sequential mode selected by default", () => {
      renderInterviewPage();
      const sequentialButton = screen.getByText("📚 Sequential");
      expect(sequentialButton).toHaveClass("bg-blue-600");
    });

    it("can switch to Random mode", () => {
      renderInterviewPage();
      const randomButton = screen.getByText(/🎲 Random/);
      fireEvent.click(randomButton);
      expect(randomButton).toHaveClass("bg-blue-600");
    });

    it("Bookmarked mode is disabled when no bookmarks", () => {
      renderInterviewPage();
      const bookmarkedButton = screen.getByText(/⭐ Bookmarked/);
      expect(bookmarkedButton).toBeDisabled();
    });
  });

  describe("Search Functionality", () => {
    it("renders search input", () => {
      renderInterviewPage();
      expect(screen.getByPlaceholderText(/search questions, topics, tags/i)).toBeInTheDocument();
    });

    it("search input is accessible", () => {
      renderInterviewPage();
      const searchInput = screen.getByLabelText(/search questions/i);
      expect(searchInput).toBeInTheDocument();
    });
  });

  describe("Filter Functionality", () => {
    it("renders category filter", () => {
      renderInterviewPage();
      expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    });

    it("renders difficulty filter", () => {
      renderInterviewPage();
      expect(screen.getByLabelText(/difficulty/i)).toBeInTheDocument();
    });

    it("category filter has 'All Categories' option", () => {
      renderInterviewPage();
      const categorySelect = screen.getByLabelText(/category/i);
      expect(categorySelect).toHaveTextContent(/all categories/i);
    });

    it("difficulty filter has 'All Levels' option", () => {
      renderInterviewPage();
      const difficultySelect = screen.getByLabelText(/difficulty/i);
      expect(difficultySelect).toHaveTextContent(/all levels/i);
    });
  });

  describe("Reset Progress", () => {
    it("has reset progress button", () => {
      renderInterviewPage();
      expect(screen.getByText(/reset progress/i)).toBeInTheDocument();
    });
  });

  describe("Question Card Enhancements", () => {
    it("displays bookmark button", () => {
      renderInterviewPage();
      // Look for the bookmark button by aria-label
      const bookmarkButton = screen.getByLabelText(/bookmark question/i);
      expect(bookmarkButton).toBeInTheDocument();
    });

    it("displays category badge", () => {
      renderInterviewPage();
      // Categories should be displayed as badges
      const badges = screen.queryAllByText(/Architecture|RxJS|Forms|Routing/i);
      expect(badges.length).toBeGreaterThan(0);
    });
  });

  describe("Navigation", () => {
    it("shows question count in sidebar", () => {
      renderInterviewPage();
      // Now shows in multiple places (header + framework switcher)
      const questionCounts = screen.getAllByText(/\d+ question/i);
      expect(questionCounts.length).toBeGreaterThan(0);
    });

    it("has question selector dropdown", () => {
      renderInterviewPage();
      const selector = screen.getByLabelText(/jump to question/i);
      expect(selector).toBeInTheDocument();
    });

    it("can navigate using next button", () => {
      renderInterviewPage();
      const nextButton = screen.getByRole("button", { name: /next question/i });

      // Check navigation exists
      expect(nextButton).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /previous question/i })).toBeInTheDocument();

      // Click next
      fireEvent.click(nextButton);

      // Should still have navigation buttons
      expect(screen.getByRole("button", { name: /next question/i })).toBeInTheDocument();
    });
  });

  describe("Responsive Design", () => {
    it("renders main title in sidebar", () => {
      renderInterviewPage();
      expect(screen.getByText("Angular Interview Prep")).toBeInTheDocument();
    });

    it("renders subtitle in sidebar", () => {
      renderInterviewPage();
      expect(screen.getByText(/100 senior-level questions/i)).toBeInTheDocument();
    });
  });

  describe("Keyboard Shortcuts", () => {
    it("has navigation buttons accessible via keyboard", () => {
      renderInterviewPage();
      // Check that navigation buttons exist which are keyboard accessible
      expect(screen.getByRole("button", { name: /next question/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /previous question/i })).toBeInTheDocument();
    });
  });
});
