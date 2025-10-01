import "@testing-library/jest-dom";

// Mock scrollTo which is not implemented in jsdom
Element.prototype.scrollTo = vi.fn();
