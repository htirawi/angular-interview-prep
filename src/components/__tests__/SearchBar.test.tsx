import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import SearchBar from "../SearchBar";

describe("SearchBar", () => {
  it("renders search input with placeholder", () => {
    const mockSearch = vi.fn();
    const mockClear = vi.fn();
    render(<SearchBar onSearch={mockSearch} onClear={mockClear} />);
    
    expect(
      screen.getByPlaceholderText(/search questions, topics, tags/i)
    ).toBeInTheDocument();
  });

  it("calls onSearch after debounce delay", async () => {
    const mockSearch = vi.fn();
    const mockClear = vi.fn();
    render(<SearchBar onSearch={mockSearch} onClear={mockClear} />);
    
    const input = screen.getByPlaceholderText(/search questions, topics, tags/i);
    fireEvent.change(input, { target: { value: "signals" } });
    
    // Should not call immediately
    expect(mockSearch).not.toHaveBeenCalled();
    
    // Should call after debounce (300ms)
    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith("signals");
    }, { timeout: 500 });
  });

  it("calls onClear when input is cleared", async () => {
    const mockSearch = vi.fn();
    const mockClear = vi.fn();
    render(<SearchBar onSearch={mockSearch} onClear={mockClear} />);
    
    const input = screen.getByPlaceholderText(/search questions, topics, tags/i);
    
    // Type something
    fireEvent.change(input, { target: { value: "test" } });
    await waitFor(() => expect(mockSearch).toHaveBeenCalled());
    
    // Clear it
    fireEvent.change(input, { target: { value: "" } });
    await waitFor(() => expect(mockClear).toHaveBeenCalled());
  });

  it("shows clear button when text is entered", () => {
    const mockSearch = vi.fn();
    const mockClear = vi.fn();
    render(<SearchBar onSearch={mockSearch} onClear={mockClear} />);
    
    const input = screen.getByPlaceholderText(/search questions, topics, tags/i);
    
    // No clear button initially
    expect(screen.queryByLabelText(/clear search/i)).not.toBeInTheDocument();
    
    // Type something
    fireEvent.change(input, { target: { value: "rxjs" } });
    
    // Clear button appears
    expect(screen.getByLabelText(/clear search/i)).toBeInTheDocument();
  });

  it("clears input when clear button is clicked", () => {
    const mockSearch = vi.fn();
    const mockClear = vi.fn();
    render(<SearchBar onSearch={mockSearch} onClear={mockClear} />);
    
    const input = screen.getByPlaceholderText(/search questions, topics, tags/i) as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: "test" } });
    expect(input.value).toBe("test");
    
    const clearButton = screen.getByLabelText(/clear search/i);
    fireEvent.click(clearButton);
    
    expect(input.value).toBe("");
  });
});

