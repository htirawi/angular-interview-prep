/**
 * Enhanced Testing Utilities
 * Provides comprehensive testing helpers and mocks
 */

import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import type { ReactElement } from 'react';

// Custom render function with providers
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <BrowserRouter>
        {children}
      </BrowserRouter>
    );
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

// Mock implementations
export const mockQuestionRepository = {
  getAll: vi.fn(),
  getById: vi.fn(),
  search: vi.fn(),
  getByCategory: vi.fn(),
  getByDifficulty: vi.fn(),
  getRandom: vi.fn(),
  clearCache: vi.fn(),
  getCacheSize: vi.fn(),
};

export const mockAuthManager = {
  login: vi.fn(),
  logout: vi.fn(),
  refreshToken: vi.fn(),
  isAuthenticated: vi.fn(),
  getCurrentUser: vi.fn(),
  hasPermission: vi.fn(),
  isTokenExpired: vi.fn(),
  checkAuthStatus: vi.fn(),
};

export const mockCommandHistory = {
  execute: vi.fn(),
  undo: vi.fn(),
  redo: vi.fn(),
  canUndo: vi.fn(),
  canRedo: vi.fn(),
  clearHistory: vi.fn(),
  getHistorySize: vi.fn(),
};

export const mockAppStateManager = {
  subscribe: vi.fn(),
  unsubscribe: vi.fn(),
  getState: vi.fn(),
  updateState: vi.fn(),
  setCurrentFramework: vi.fn(),
  setCurrentQuestionId: vi.fn(),
  toggleBookmark: vi.fn(),
  toggleCompletion: vi.fn(),
  setSearchQuery: vi.fn(),
  setSelectedCategory: vi.fn(),
  setSelectedDifficulty: vi.fn(),
  setPracticeMode: vi.fn(),
};

// Test data factories
export function createMockQuestion(overrides: Partial<any> = {}) {
  return {
    id: 1,
    question: 'What is React?',
    answer: 'React is a JavaScript library for building user interfaces.',
    category: 'React Basics',
    difficulty: 'intermediate',
    tags: ['react', 'javascript'],
    ...overrides,
  };
}

export function createMockUser(overrides: Partial<any> = {}) {
  return {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'user',
    permissions: ['read'],
    lastLogin: new Date(),
    isActive: true,
    ...overrides,
  };
}

export function createMockToken(overrides: Partial<any> = {}) {
  return {
    accessToken: 'mock_token',
    refreshToken: 'mock_refresh_token',
    expiresAt: new Date(Date.now() + 3600000),
    tokenType: 'Bearer',
    ...overrides,
  };
}

// Test environment setup
export function setupTestEnvironment() {
  // Mock localStorage
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    length: 0,
    key: vi.fn((index: number) => Object.keys(store)[index] || null)
  };
  
  const store: Record<string, string> = {};
  
  localStorageMock.getItem = vi.fn((key: string) => store[key] || null);
  localStorageMock.setItem = vi.fn((key: string, value: string) => {
    store[key] = value;
  });
  localStorageMock.removeItem = vi.fn((key: string) => {
    delete store[key];
  });
  localStorageMock.clear = vi.fn(() => {
    Object.keys(store).forEach(key => delete store[key]);
  });
  localStorageMock.key = vi.fn((index: number) => Object.keys(store)[index] || null);
  
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true
  });

  // Mock sessionStorage
  Object.defineProperty(window, 'sessionStorage', {
    value: localStorageMock,
    writable: true
  });

  // Mock performance API
  Object.defineProperty(window, 'performance', {
    value: {
      now: vi.fn(() => Date.now()),
      getEntriesByType: vi.fn(() => []),
      mark: vi.fn(),
      measure: vi.fn(),
    },
    writable: true
  });

  // Mock fetch
  global.fetch = vi.fn();
}

// Mock fetch
export const mockFetch = (response: unknown, status = 200) => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(response),
      text: () => Promise.resolve(JSON.stringify(response)),
      headers: new Headers(),
      url: '',
      redirected: false,
      statusText: 'OK',
      type: 'basic',
      body: null,
      bodyUsed: false,
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      blob: () => Promise.resolve(new Blob()),
      formData: () => Promise.resolve(new FormData()),
      clone: () => mockFetch(response, status)()
    })
  ) as unknown;
};

// Performance testing utilities
export const measurePerformance = async (fn: () => Promise<void> | void) => {
  const start = performance.now();
  await fn();
  const end = performance.now();
  return end - start;
};

// Accessibility testing helpers
export function expectToBeAccessible(element: HTMLElement) {
  // Basic accessibility checks
  expect(element).toBeInTheDocument();
  
  // Check for proper ARIA attributes
  const hasAriaLabel = element.hasAttribute('aria-label') || 
                      element.hasAttribute('aria-labelledby') ||
                      element.textContent?.trim();
  expect(hasAriaLabel).toBeTruthy();
  
  // Check for keyboard navigation
  const isFocusable = element.tabIndex >= 0 || 
                     element.tagName === 'BUTTON' ||
                     element.tagName === 'A' ||
                     element.tagName === 'INPUT' ||
                     element.tagName === 'SELECT' ||
                     element.tagName === 'TEXTAREA';
  
  if (isFocusable) {
    expect(element).toBeVisible();
  }
}

// Mock IntersectionObserver
export function mockIntersectionObserver() {
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  });
  window.IntersectionObserver = mockIntersectionObserver;
  return mockIntersectionObserver;
}

// Mock ResizeObserver
export function mockResizeObserver() {
  const mockResizeObserver = vi.fn();
  mockResizeObserver.mockReturnValue({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  });
  window.ResizeObserver = mockResizeObserver;
  return mockResizeObserver;
}

// Mock matchMedia
export function mockMatchMedia() {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

// Cleanup utilities
export function cleanupMocks() {
  vi.clearAllMocks();
  vi.resetAllMocks();
  vi.restoreAllMocks();
}

// Test data generators
export function generateMockQuestions(count: number) {
  return Array.from({ length: count }, (_, i) => 
    createMockQuestion({
      id: i + 1,
      question: `Question ${i + 1}`,
      answer: `Answer ${i + 1}`,
    })
  );
}

export function generateMockUsers(count: number) {
  return Array.from({ length: count }, (_, i) => 
    createMockUser({
      id: `${i + 1}`,
      email: `user${i + 1}@example.com`,
      name: `User ${i + 1}`,
    })
  );
}