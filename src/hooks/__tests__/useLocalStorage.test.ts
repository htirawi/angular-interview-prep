import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns initial value when no stored value exists", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "initial"));
    expect(result.current[0]).toBe("initial");
  });

  it("stores value in localStorage when updated", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "initial"));
    
    act(() => {
      result.current[1]("new-value");
    });
    
    expect(result.current[0]).toBe("new-value");
    expect(localStorage.getItem("test-key")).toBe(JSON.stringify("new-value"));
  });

  it("retrieves existing value from localStorage", () => {
    localStorage.setItem("test-key", JSON.stringify("stored-value"));
    
    const { result } = renderHook(() => useLocalStorage("test-key", "initial"));
    expect(result.current[0]).toBe("stored-value");
  });

  it("handles complex objects", () => {
    const complexObject = { id: 1, name: "test", nested: { value: 42 } };
    const { result } = renderHook(() => useLocalStorage("test-key", complexObject));
    
    act(() => {
      result.current[1]({ ...complexObject, name: "updated" });
    });
    
    expect(result.current[0].name).toBe("updated");
    expect(result.current[0].nested.value).toBe(42);
  });

  it("handles arrays", () => {
    const { result } = renderHook(() => useLocalStorage<number[]>("test-key", []));
    
    act(() => {
      result.current[1]([1, 2, 3]);
    });
    
    expect(result.current[0]).toEqual([1, 2, 3]);
  });

  it("handles Set objects", () => {
    const { result } = renderHook(() => useLocalStorage<Set<number>>("test-key", new Set()));
    
    act(() => {
      const newSet = new Set([1, 2, 3]);
      result.current[1](newSet);
    });
    
    expect(result.current[0]).toBeInstanceOf(Set);
    expect(result.current[0].has(2)).toBe(true);
  });

  it("handles corrupted localStorage data gracefully", () => {
    localStorage.setItem("test-key", "invalid-json{");
    
    const { result } = renderHook(() => useLocalStorage("test-key", "fallback"));
    expect(result.current[0]).toBe("fallback");
  });

  it("uses different storage keys independently", () => {
    const { result: result1 } = renderHook(() => useLocalStorage("key1", "value1"));
    const { result: result2 } = renderHook(() => useLocalStorage("key2", "value2"));
    
    act(() => {
      result1.current[1]("updated1");
    });
    
    act(() => {
      result2.current[1]("updated2");
    });
    
    expect(result1.current[0]).toBe("updated1");
    expect(result2.current[0]).toBe("updated2");
  });

  it("handles function updates", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", 0));
    
    act(() => {
      result.current[1]((prev) => prev + 1);
    });
    
    expect(result.current[0]).toBe(1);
    
    act(() => {
      result.current[1]((prev) => prev + 1);
    });
    
    expect(result.current[0]).toBe(2);
  });
});

