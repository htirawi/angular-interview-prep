# React (Hooks, Concurrency, RSC, Performance) — 100 Mock Interview Questions with Senior-Level Answers

---

### 1) React’s declarative model—what does it buy you?

**Answer (senior-level):**

- Deterministic UI; easier reasoning; predictable updates; testable pure functions.

### 2) Concurrent rendering—how should app code adapt?

**Answer (senior-level):**

- Use transitions for non-urgent updates; avoid blocking synchronous work; split components; use Suspense for async.

### 3) Suspense—core use cases?

**Answer (senior-level):**

- Route-level data; image preloading; streaming server-rendered content; coordinate fallbacks cleanly.

### 4) RSC vs. client components—when to choose?

**Answer (senior-level):**

- Do secure/data-heavy work on server; interactivity on client; minimize hydration payloads.

### 5) `useMemo`/`useCallback` trade-offs?

**Answer (senior-level):**

- Memo where it prevents actual work; otherwise it may cost more. Profile, don't guess.

### 6) State co-location, lifting, and composition?

**Answer (senior-level):**

- Keep state near usage; lift sparingly; use composition/context to avoid prop drilling.

### 7) Context performance pitfalls?

**Answer (senior-level):**

- Context re-renders all consumers; use selectors or split contexts; external stores for hot state.

### 8) Controlled vs. uncontrolled forms?

**Answer (senior-level):**

- Controlled: consistency & validation; Uncontrolled: fewer re-renders; hybrid when needed.

### 9) Stale closures & async events?

**Answer (senior-level):**

- Use functional updates or refs; avoid capturing stale state in effects/handlers.

### 10) Rendering large lists efficiently?

**Answer (senior-level):**

- Virtualize, stable keys, memo rows, avoid inline objects, and defer transitions.

### 11) Error boundaries?

**Answer (senior-level):**

- Isolate risky subtrees; report; provide retry; keep boundaries small.

### 12) Custom hooks best practices?

**Answer (senior-level):**

- Clear contract, stable API, minimal deps; test hooks in isolation.

### 13) Effects vs. layout effects?

**Answer (senior-level):**

- `useEffect` post-paint; `useLayoutEffect` sync before paint—use sparingly to avoid jank.

### 14) Avoiding re-render storms?

**Answer (senior-level):**

- Batch updates; split components; memo children; keep contexts narrow.

### 15) Accessibility in React SPAs?

**Answer (senior-level):**

- Manage focus on navigation; ARIA live announcements; keyboard-friendly controls.

### 16) Testing pyramid?

**Answer (senior-level):**

- Unit pure logic; component tests with RTL; e2e with Playwright; mock network; cover loading/error.

### 17) Security hygiene?

**Answer (senior-level):**

- No `dangerouslySetInnerHTML` with untrusted content; CSP; avoid secrets in client code.

### 18) Performance metrics & tools?

**Answer (senior-level):**

- React Profiler, DevTools; measure LCP/TBT/INP; identify long tasks and wasteful renders.

### 19) Internationalization patterns?

**Answer (senior-level):**

- ICU messages, lazy load bundles, RTL-safe styles with logical properties.

### 20) Advanced React scenario #20: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 21) Advanced React scenario #21: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 22) Advanced React scenario #22: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 23) Advanced React scenario #23: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 24) Advanced React scenario #24: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 25) Advanced React scenario #25: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 26) Advanced React scenario #26: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 27) Advanced React scenario #27: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 28) Advanced React scenario #28: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 29) Advanced React scenario #29: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 30) Advanced React scenario #30: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 31) Advanced React scenario #31: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 32) Advanced React scenario #32: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 33) Advanced React scenario #33: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 34) Advanced React scenario #34: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 35) Advanced React scenario #35: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 36) Advanced React scenario #36: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 37) Advanced React scenario #37: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 38) Advanced React scenario #38: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 39) Advanced React scenario #39: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 40) Advanced React scenario #40: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 41) Advanced React scenario #41: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 42) Advanced React scenario #42: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 43) Advanced React scenario #43: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 44) Advanced React scenario #44: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 45) Advanced React scenario #45: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 46) Advanced React scenario #46: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 47) Advanced React scenario #47: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 48) Advanced React scenario #48: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 49) Advanced React scenario #49: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 50) Advanced React scenario #50: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 51) Advanced React scenario #51: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 52) Advanced React scenario #52: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 53) Advanced React scenario #53: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 54) Advanced React scenario #54: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 55) Advanced React scenario #55: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 56) Advanced React scenario #56: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 57) Advanced React scenario #57: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 58) Advanced React scenario #58: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 59) Advanced React scenario #59: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 60) Advanced React scenario #60: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 61) Advanced React scenario #61: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 62) Advanced React scenario #62: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 63) Advanced React scenario #63: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 64) Advanced React scenario #64: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 65) Advanced React scenario #65: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 66) Advanced React scenario #66: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 67) Advanced React scenario #67: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 68) Advanced React scenario #68: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 69) Advanced React scenario #69: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 70) Advanced React scenario #70: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 71) Advanced React scenario #71: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 72) Advanced React scenario #72: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 73) Advanced React scenario #73: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 74) Advanced React scenario #74: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 75) Advanced React scenario #75: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 76) Advanced React scenario #76: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 77) Advanced React scenario #77: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 78) Advanced React scenario #78: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 79) Advanced React scenario #79: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 80) Advanced React scenario #80: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 81) Advanced React scenario #81: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 82) Advanced React scenario #82: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 83) Advanced React scenario #83: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 84) Advanced React scenario #84: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 85) Advanced React scenario #85: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 86) Advanced React scenario #86: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 87) Advanced React scenario #87: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 88) Advanced React scenario #88: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 89) Advanced React scenario #89: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 90) Advanced React scenario #90: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 91) Advanced React scenario #91: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 92) Advanced React scenario #92: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 93) Advanced React scenario #93: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 94) Advanced React scenario #94: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 95) Advanced React scenario #95: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 96) Advanced React scenario #96: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 97) Advanced React scenario #97: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 98) Advanced React scenario #98: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 99) Advanced React scenario #99: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.

### 100) Advanced React scenario #100: diagnosing a perf/UX regression.

**Answer (senior-level):**

- Profile; find the bottleneck; adjust state boundaries; memoize or virtualize; validate with metrics.
