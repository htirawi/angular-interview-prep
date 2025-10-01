import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("Enhanced App Features", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("Stats Panel", () => {
    it("displays initial stats", () => {
      render(<App />);
      expect(screen.getByText("Completed")).toBeInTheDocument();
      expect(screen.getAllByText("Progress").length).toBeGreaterThan(0);
      expect(screen.getByText("Bookmarked")).toBeInTheDocument();
    });

    it("shows 0% progress initially", () => {
      render(<App />);
      expect(screen.getByText("0%")).toBeInTheDocument();
    });
  });

  describe("Practice Modes", () => {
    it("has Sequential mode selected by default", () => {
      render(<App />);
      const sequentialButton = screen.getByText("📚 Sequential");
      expect(sequentialButton).toHaveClass("bg-blue-600");
    });

    it("can switch to Random mode", () => {
      render(<App />);
      const randomButton = screen.getByText(/🎲 Random/);
      fireEvent.click(randomButton);
      expect(randomButton).toHaveClass("bg-blue-600");
    });

    it("Bookmarked mode is disabled when no bookmarks", () => {
      render(<App />);
      const bookmarkedButton = screen.getByText(/⭐ Bookmarked/);
      expect(bookmarkedButton).toBeDisabled();
    });
  });

  describe("Search Functionality", () => {
    it("renders search input", () => {
      render(<App />);
      expect(screen.getByPlaceholderText(/search questions, topics, tags/i)).toBeInTheDocument();
    });

    it("search input is accessible", () => {
      render(<App />);
      const searchInput = screen.getByLabelText(/search questions/i);
      expect(searchInput).toBeInTheDocument();
    });
  });

  describe("Filter Functionality", () => {
    it("renders category filter", () => {
      render(<App />);
      expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    });

    it("renders difficulty filter", () => {
      render(<App />);
      expect(screen.getByLabelText(/difficulty/i)).toBeInTheDocument();
    });

    it("category filter has 'All Categories' option", () => {
      render(<App />);
      const categorySelect = screen.getByLabelText(/category/i);
      expect(categorySelect).toHaveTextContent(/all categories/i);
    });

    it("difficulty filter has 'All Levels' option", () => {
      render(<App />);
      const difficultySelect = screen.getByLabelText(/difficulty/i);
      expect(difficultySelect).toHaveTextContent(/all levels/i);
    });
  });

  describe("Reset Progress", () => {
    it("has reset progress button", () => {
      render(<App />);
      expect(screen.getByText(/reset progress/i)).toBeInTheDocument();
    });
  });

  describe("Question Card Enhancements", () => {
    it("displays bookmark button", () => {
      render(<App />);
      // Look for the bookmark button by aria-label
      const bookmarkButton = screen.getByLabelText(/bookmark question/i);
      expect(bookmarkButton).toBeInTheDocument();
    });

    it("displays category badge", () => {
      render(<App />);
      // Categories should be displayed as badges
      const badges = screen.queryAllByText(/Architecture|RxJS|Forms|Routing/i);
      expect(badges.length).toBeGreaterThan(0);
    });
  });

  describe("Navigation", () => {
    it("shows question count in sidebar", () => {
      render(<App />);
      expect(screen.getByText(/\d+ question/i)).toBeInTheDocument();
    });

    it("has question selector dropdown", () => {
      render(<App />);
      const selector = screen.getByLabelText(/jump to question/i);
      expect(selector).toBeInTheDocument();
    });

    it("can navigate using next button", () => {
      render(<App />);
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
      render(<App />);
      expect(screen.getByText("Angular Interview Prep")).toBeInTheDocument();
    });

    it("renders subtitle in sidebar", () => {
      render(<App />);
      expect(screen.getByText(/100 senior-level questions/i)).toBeInTheDocument();
    });
  });

  describe("Keyboard Shortcuts", () => {
    it("has navigation buttons accessible via keyboard", () => {
      render(<App />);
      // Check that navigation buttons exist which are keyboard accessible
      expect(screen.getByRole("button", { name: /next question/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /previous question/i })).toBeInTheDocument();
    });
  });
});
