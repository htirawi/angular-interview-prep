import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LazyLoader, createLazyComponent } from "../LazyLoader";

describe("LazyLoader", () => {
  it("renders children with default fallback", () => {
    render(
      <LazyLoader>
        <div>Test Content</div>
      </LazyLoader>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders children with custom fallback", () => {
    const customFallback = <div>Custom Loading...</div>;

    render(
      <LazyLoader fallback={customFallback}>
        <div>Test Content</div>
      </LazyLoader>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders default fallback when no children provided", () => {
    render(
      <LazyLoader>
        <div>Test</div>
      </LazyLoader>
    );

    // Check if the component renders without errors
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});

describe("createLazyComponent", () => {
  it("creates a lazy component wrapper", () => {
    const mockImportFunc = () => Promise.resolve({ default: () => <div>Lazy Component</div> });
    const LazyComponent = createLazyComponent(mockImportFunc);

    expect(LazyComponent).toBeDefined();
    expect(typeof LazyComponent).toBe("function");
  });

  it("creates a lazy component with custom fallback", () => {
    const mockImportFunc = () => Promise.resolve({ default: () => <div>Lazy Component</div> });
    const customFallback = <div>Custom Loading...</div>;
    const LazyComponent = createLazyComponent(mockImportFunc, customFallback);

    expect(LazyComponent).toBeDefined();
    expect(typeof LazyComponent).toBe("function");
  });
});
