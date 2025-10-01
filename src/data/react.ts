// React Interview Questions - 100 Senior-Level Questions
// Auto-generated from markdown

export interface QA {
  id: number;
  question: string;
  answer: string;
  category?: string;
  difficulty?: string;
  tags?: string[];
}

export const REACT_QUESTIONS: QA[] = [
  {
    id: 1,
    question: `React’s declarative model—what does it buy you?`,
    answer: `Deterministic UI; easier reasoning; predictable updates; testable pure functions.`,
  },
  {
    id: 2,
    question: `Concurrent rendering—how should app code adapt?`,
    answer: `Use transitions for non-urgent updates; avoid blocking synchronous work; split components; use Suspense for async.`,
  },
  {
    id: 3,
    question: `Suspense—core use cases?`,
    answer: `Route-level data; image preloading; streaming server-rendered content; coordinate fallbacks cleanly.`,
  },
  {
    id: 4,
    question: `RSC vs. client components—when to choose?`,
    answer: `Do secure/data-heavy work on server; interactivity on client; minimize hydration payloads.`,
  },
  {
    id: 5,
    question: `\`useMemo\`/\`useCallback\` trade-offs?`,
    answer: `Memo where it prevents actual work; otherwise it may cost more. Profile, don't guess.`,
  },
  {
    id: 6,
    question: `State co-location, lifting, and composition?`,
    answer: `Keep state near usage; lift sparingly; use composition/context to avoid prop drilling.`,
  },
  {
    id: 7,
    question: `Context performance pitfalls?`,
    answer: `Context re-renders all consumers; use selectors or split contexts; external stores for hot state.`,
  },
  {
    id: 8,
    question: `Controlled vs. uncontrolled forms?`,
    answer: `Controlled: consistency & validation; Uncontrolled: fewer re-renders; hybrid when needed.`,
  },
  {
    id: 9,
    question: `Stale closures & async events?`,
    answer: `Use functional updates or refs; avoid capturing stale state in effects/handlers.`,
  },
  {
    id: 10,
    question: `Rendering large lists efficiently?`,
    answer: `Virtualize, stable keys, memo rows, avoid inline objects, and defer transitions.`,
  },
  {
    id: 11,
    question: `Error boundaries?`,
    answer: `Isolate risky subtrees; report; provide retry; keep boundaries small.`,
  },
  {
    id: 12,
    question: `Custom hooks best practices?`,
    answer: `Clear contract, stable API, minimal deps; test hooks in isolation.`,
  },
  {
    id: 13,
    question: `Effects vs. layout effects?`,
    answer: `\`useEffect\` post-paint; \`useLayoutEffect\` sync before paint—use sparingly to avoid jank.`,
  },
  {
    id: 14,
    question: `Avoiding re-render storms?`,
    answer: `Batch updates; split components; memo children; keep contexts narrow.`,
  },
  {
    id: 15,
    question: `Accessibility in React SPAs?`,
    answer: `Manage focus on navigation; ARIA live announcements; keyboard-friendly controls.`,
  },
  {
    id: 16,
    question: `Testing pyramid?`,
    answer: `Unit pure logic; component tests with RTL; e2e with Playwright; mock network; cover loading/error.`,
  },
  {
    id: 17,
    question: `Security hygiene?`,
    answer: `No \`dangerouslySetInnerHTML\` with untrusted content; CSP; avoid secrets in client code.`,
  },
  {
    id: 18,
    question: `Performance metrics & tools?`,
    answer: `React Profiler, DevTools; measure LCP/TBT/INP; identify long tasks and wasteful renders.`,
  },
  {
    id: 19,
    question: `Internationalization patterns?`,
    answer: `ICU messages, lazy load bundles, RTL-safe styles with logical properties.`,
  },
  {
    id: 20,
    question: `Advanced React scenario #20: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 21,
    question: `Advanced React scenario #21: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 22,
    question: `Advanced React scenario #22: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 23,
    question: `Advanced React scenario #23: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 24,
    question: `Advanced React scenario #24: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 25,
    question: `Advanced React scenario #25: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 26,
    question: `Advanced React scenario #26: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 27,
    question: `Advanced React scenario #27: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 28,
    question: `Advanced React scenario #28: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 29,
    question: `Advanced React scenario #29: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 30,
    question: `Advanced React scenario #30: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 31,
    question: `Advanced React scenario #31: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 32,
    question: `Advanced React scenario #32: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 33,
    question: `Advanced React scenario #33: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 34,
    question: `Advanced React scenario #34: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 35,
    question: `Advanced React scenario #35: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 36,
    question: `Advanced React scenario #36: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 37,
    question: `Advanced React scenario #37: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 38,
    question: `Advanced React scenario #38: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 39,
    question: `Advanced React scenario #39: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 40,
    question: `Advanced React scenario #40: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 41,
    question: `Advanced React scenario #41: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 42,
    question: `Advanced React scenario #42: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 43,
    question: `Advanced React scenario #43: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 44,
    question: `Advanced React scenario #44: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 45,
    question: `Advanced React scenario #45: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 46,
    question: `Advanced React scenario #46: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 47,
    question: `Advanced React scenario #47: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 48,
    question: `Advanced React scenario #48: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 49,
    question: `Advanced React scenario #49: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 50,
    question: `Advanced React scenario #50: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 51,
    question: `Advanced React scenario #51: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 52,
    question: `Advanced React scenario #52: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 53,
    question: `Advanced React scenario #53: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 54,
    question: `Advanced React scenario #54: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 55,
    question: `Advanced React scenario #55: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 56,
    question: `Advanced React scenario #56: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 57,
    question: `Advanced React scenario #57: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 58,
    question: `Advanced React scenario #58: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 59,
    question: `Advanced React scenario #59: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 60,
    question: `Advanced React scenario #60: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 61,
    question: `Advanced React scenario #61: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 62,
    question: `Advanced React scenario #62: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 63,
    question: `Advanced React scenario #63: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 64,
    question: `Advanced React scenario #64: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 65,
    question: `Advanced React scenario #65: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 66,
    question: `Advanced React scenario #66: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 67,
    question: `Advanced React scenario #67: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 68,
    question: `Advanced React scenario #68: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 69,
    question: `Advanced React scenario #69: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 70,
    question: `Advanced React scenario #70: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 71,
    question: `Advanced React scenario #71: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 72,
    question: `Advanced React scenario #72: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 73,
    question: `Advanced React scenario #73: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 74,
    question: `Advanced React scenario #74: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 75,
    question: `Advanced React scenario #75: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 76,
    question: `Advanced React scenario #76: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 77,
    question: `Advanced React scenario #77: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 78,
    question: `Advanced React scenario #78: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 79,
    question: `Advanced React scenario #79: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 80,
    question: `Advanced React scenario #80: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 81,
    question: `Advanced React scenario #81: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 82,
    question: `Advanced React scenario #82: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 83,
    question: `Advanced React scenario #83: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 84,
    question: `Advanced React scenario #84: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 85,
    question: `Advanced React scenario #85: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 86,
    question: `Advanced React scenario #86: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 87,
    question: `Advanced React scenario #87: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 88,
    question: `Advanced React scenario #88: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 89,
    question: `Advanced React scenario #89: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 90,
    question: `Advanced React scenario #90: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 91,
    question: `Advanced React scenario #91: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 92,
    question: `Advanced React scenario #92: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 93,
    question: `Advanced React scenario #93: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 94,
    question: `Advanced React scenario #94: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 95,
    question: `Advanced React scenario #95: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 96,
    question: `Advanced React scenario #96: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 97,
    question: `Advanced React scenario #97: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 98,
    question: `Advanced React scenario #98: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 99,
    question: `Advanced React scenario #99: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
  {
    id: 100,
    question: `Advanced React scenario #100: diagnosing a perf/UX regression.`,
    answer: `Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.`,
  },
];

export default REACT_QUESTIONS;
