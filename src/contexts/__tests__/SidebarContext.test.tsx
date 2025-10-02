import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SidebarProvider, useSidebarContext } from "../SidebarContext";

// Mock component to test the context
const TestComponent = () => {
  const { isOpen, toggleSidebar } = useSidebarContext();
  return (
    <div>
      <span data-testid="is-open">{isOpen.toString()}</span>
      <button onClick={toggleSidebar}>Toggle</button>
    </div>
  );
};

describe("SidebarContext", () => {
  it("provides default context values", () => {
    const mockValue = {
      isOpen: false,
      toggleSidebar: () => {},
    };

    render(
      <SidebarProvider value={mockValue}>
        <TestComponent />
      </SidebarProvider>
    );

    expect(screen.getByTestId("is-open")).toHaveTextContent("false");
  });

  it("provides context with open state", () => {
    const mockValue = {
      isOpen: true,
      toggleSidebar: () => {},
    };

    render(
      <SidebarProvider value={mockValue}>
        <TestComponent />
      </SidebarProvider>
    );

    expect(screen.getByTestId("is-open")).toHaveTextContent("true");
  });

  it("throws error when used outside provider", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useSidebarContext must be used within a SidebarProvider");

    consoleSpy.mockRestore();
  });
});
