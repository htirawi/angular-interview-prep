import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider, useTheme } from "../ThemeContext";

// Mock component to test the context
const TestComponent = () => {
  const { isDarkMode, setDarkMode } = useTheme();
  return (
    <div>
      <span data-testid="is-dark">{isDarkMode ? "true" : "false"}</span>
      <button onClick={() => setDarkMode(!isDarkMode)}>Toggle Theme</button>
    </div>
  );
};

describe("ThemeContext", () => {
  it("provides default theme context values", () => {
    const mockValue = {
      isDarkMode: false,
      setDarkMode: () => {},
      toggleDarkMode: () => {},
    };

    render(
      <ThemeProvider value={mockValue}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("is-dark")).toHaveTextContent("false");
  });

  it("provides context with dark theme", () => {
    // Mock localStorage and matchMedia
    const localStorageMock = {
      getItem: vi.fn(() => "true"),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };
    Object.defineProperty(window, "localStorage", { value: localStorageMock });

    const matchMediaMock = vi.fn(() => ({
      matches: false,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));
    Object.defineProperty(window, "matchMedia", { value: matchMediaMock });

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("is-dark")).toHaveTextContent("true");
  });

  it("throws error when used outside provider", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useTheme must be used within a ThemeProvider");

    consoleSpy.mockRestore();
  });
});
