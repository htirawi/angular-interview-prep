import "@testing-library/jest-dom";

// Mock scrollTo which is not implemented in jsdom
Element.prototype.scrollTo = vi.fn();
window.scrollTo = vi.fn();

// Mock matchMedia which is not implemented in jsdom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
