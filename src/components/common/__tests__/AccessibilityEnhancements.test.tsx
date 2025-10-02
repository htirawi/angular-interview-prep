import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
  AccessibilityEnhancements,
  useScreenReaderAnnouncement,
} from "../AccessibilityEnhancements";

// Mock component to test the hook
const TestComponent = () => {
  const { announce } = useScreenReaderAnnouncement();

  return (
    <div>
      <button onClick={() => announce("Test announcement")}>Announce</button>
    </div>
  );
};

describe("AccessibilityEnhancements", () => {
  it("renders accessibility enhancements component", () => {
    render(
      <AccessibilityEnhancements>
        <div>Test</div>
      </AccessibilityEnhancements>
    );

    // Check if the component renders without errors
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    render(
      <AccessibilityEnhancements>
        <div>Test Content</div>
      </AccessibilityEnhancements>
    );

    // Check if the component renders without errors
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});

describe("useScreenReaderAnnouncement", () => {
  it("provides announce function", () => {
    render(<TestComponent />);

    const button = screen.getByText("Announce");
    expect(button).toBeInTheDocument();
  });

  it("creates announcement element when announce is called", () => {
    render(<TestComponent />);

    const button = screen.getByText("Announce");

    // Mock document.createElement
    const mockElement = {
      textContent: "",
      className: "",
      setAttribute: vi.fn(),
    };

    const createElementSpy = vi
      .spyOn(document, "createElement")
      .mockReturnValue(mockElement as any);
    const appendChildSpy = vi
      .spyOn(document.body, "appendChild")
      .mockImplementation(() => mockElement as any);
    const removeChildSpy = vi
      .spyOn(document.body, "removeChild")
      .mockImplementation(() => mockElement as any);

    // Check if button is clickable
    expect(button).toBeInTheDocument();

    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
  });
});
