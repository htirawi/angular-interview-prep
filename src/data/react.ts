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
    question: "What does 'UI is a function of state' imply?",
    answer:
      "Render is deterministic—given state/props, React computes the same UI; side effects live outside render.",
  },
  {
    id: 2,
    question: "How do transitions help responsiveness?",
    answer:
      "They mark updates as non-urgent so React can keep input handlers and urgent updates snappy.",
  },
  {
    id: 3,
    question: "useEffect vs useLayoutEffect difference.",
    answer:
      "useEffect runs after paint; useLayoutEffect runs before paint for synchronous DOM reads/writes.",
  },
  {
    id: 4,
    question: "Common stale closure causes.",
    answer:
      "Handlers capture old values; fix with functional updates, refs, or correct deps in effects.",
  },
  {
    id: 5,
    question: "Suspense benefits for data UIs.",
    answer:
      "Coordinates async loading with fallbacks and enables streaming without spinner waterfalls.",
  },
  {
    id: 6,
    question: "When to use useReducer.",
    answer:
      "When state transitions are complex or event-driven; keeps logic explicit and testable.",
  },
  {
    id: 7,
    question: "Context performance pitfalls.",
    answer:
      "Provider updates re-render all consumers; split contexts or use selector-based consumption.",
  },
  {
    id: 8,
    question: "Keys in lists—why required.",
    answer:
      "They guide reconciliation; missing/unstable keys can move state between items incorrectly.",
  },
  {
    id: 9,
    question: "Hydration mismatch causes.",
    answer:
      "Non-deterministic markup, time/date, random IDs; fix by gating with effects or server generating deterministic output.",
  },
  {
    id: 10,
    question: "StrictMode double-invoke handling.",
    answer: "Make effects idempotent and cleanly cancel; avoid side effects in render.",
  },
  {
    id: 11,
    question: "Refs vs state.",
    answer: "Refs hold mutable values without re-render; state triggers re-renders and drives UI.",
  },
  {
    id: 12,
    question: "useDeferredValue use case.",
    answer: "Defer expensive derived computations behind fast input updates.",
  },
  {
    id: 13,
    question: "Designing a reusable custom hook.",
    answer: "Single responsibility, stable return identity, clear contract and error semantics.",
  },
  {
    id: 14,
    question: "What are portals for?",
    answer:
      "Render children elsewhere in the DOM (modals, tooltips) while retaining React ownership.",
  },
  {
    id: 15,
    question: "What do error boundaries catch?",
    answer: "Render/lifecycle errors of descendants; not async or event errors unless re-thrown.",
  },
  {
    id: 16,
    question: "Large list performance tips.",
    answer: "Window/virtualize, memo row components, stable keys, avoid inline lambdas/objects.",
  },
  {
    id: 17,
    question: "Testing with RTL principles.",
    answer:
      "Test behavior and roles/labels, not implementation details or snapshots of whole trees.",
  },
  {
    id: 18,
    question: "Event batching behavior.",
    answer:
      "React batches setState calls in the same tick; use flushSync sparingly to force sync work.",
  },
  {
    id: 19,
    question: "Compound components pattern.",
    answer: "Expose subcomponents and share state via context; ergonomic APIs with composition.",
  },
  {
    id: 20,
    question: "Why controlled inputs can lag.",
    answer:
      "Every keystroke re-renders; fix with debounce, useDeferredValue, or uncontrolled inputs.",
  },
  {
    id: 21,
    question: "Isolating expensive children.",
    answer: "Wrap with memo and pass stable props; consider moving state closer to the child.",
  },
  {
    id: 22,
    question: "Animation without jank.",
    answer: "Use CSS transitions for simple cases; transform/opacity; batch DOM reads/writes.",
  },
  {
    id: 23,
    question: "Benefits of Server Components conceptually.",
    answer: "Smaller client bundles, secure data access; hydrate only interactive islands.",
  },
  {
    id: 24,
    question: "Composition over inheritance reasoning.",
    answer: "Keeps APIs small, flexible, and testable; avoids rigid hierarchies.",
  },
  {
    id: 25,
    question: "useId purpose.",
    answer: "Stable IDs across SSR/CSR to link labels and inputs without mismatch.",
  },
  {
    id: 26,
    question: "Avoiding prop drilling without overusing context.",
    answer: "Colocate state, use composition, limited context, or an external store for hot state.",
  },
  {
    id: 27,
    question: "Sharing logic between unrelated components.",
    answer: "Custom hooks or utility modules; avoid complex HOCs when hooks suffice.",
  },
  {
    id: 28,
    question: "Inline object/array prop issues.",
    answer: "They break memoization due to new identities each render; hoist constants or memoize.",
  },
  {
    id: 29,
    question: "When to split a component.",
    answer: "Different update rates or responsibilities; improves readability and performance.",
  },
  {
    id: 30,
    question: "Safe use of dangerouslySetInnerHTML.",
    answer: "Only with sanitized content; prefer libraries that escape; enforce CSP.",
  },
  {
    id: 31,
    question: "A11y focus management on navigation.",
    answer: "Move focus to main heading; announce changes; maintain tab order.",
  },
  {
    id: 32,
    question: "Forms: library vs hand-rolled.",
    answer:
      "Libraries handle validation/errors easily; hand-rolled for small forms and full control.",
  },
  {
    id: 33,
    question: "Responsive image strategies.",
    answer: "Use srcset/sizes and aspect ratios; lazy load below the fold.",
  },
  {
    id: 34,
    question: "Choosing external store over context.",
    answer:
      "For large, frequently updated, cross-cutting state where context re-renders are costly.",
  },
  {
    id: 35,
    question: "Preventing async effect leaks.",
    answer: "Use AbortController or mounted refs; cleanup on unmount; guard state updates.",
  },
  {
    id: 36,
    question: "useImperativeHandle responsibly.",
    answer: "Expose minimal imperative API (focus/scroll); avoid leaking internal state.",
  },
  {
    id: 37,
    question: "Infinite scroll pattern.",
    answer: "IntersectionObserver sentinel, cursor pagination, appended lists with stable keys.",
  },
  {
    id: 38,
    question: "Selector hooks for perf.",
    answer: "Return primitive/stable values; memoize derived results to avoid unnecessary renders.",
  },
  {
    id: 39,
    question: "Reconciliation explained.",
    answer: "Diffs element trees between renders; keys instruct React which nodes persist or move.",
  },
  {
    id: 40,
    question: "Suspense anti-patterns.",
    answer: "Wrapping whole app in a single boundary, or throwing promises from deep client code.",
  },
  {
    id: 41,
    question: "Dynamic imports pattern.",
    answer: "Code-split large components and show Suspense fallback; prefetch on intent (hover).",
  },
  {
    id: 42,
    question: "Improving INP.",
    answer: "Break up long tasks, defer non-urgent work with transitions, and avoid heavy sync JS.",
  },
  {
    id: 43,
    question: "Avoiding global mutable singletons.",
    answer: "They break SSR determinism and caching; use providers or DI patterns.",
  },
  {
    id: 44,
    question: "Effect dependency reasoning.",
    answer:
      "List all closure values used; stabilize callbacks or values to keep arrays minimal and correct.",
  },
  {
    id: 45,
    question: "CSS-in-JS performance notes.",
    answer: "Runtime styles can add cost; prefer static extraction or utility CSS for hot paths.",
  },
  {
    id: 46,
    question: "Decomposing complex layouts.",
    answer: "Extract independent regions, presentational components, and compose with small props.",
  },
  {
    id: 47,
    question: "Testing hooks directly.",
    answer: "Mount a test component or use hook testing utilities; assert contract, not internals.",
  },
  {
    id: 48,
    question: "Avoid zombie children on route swaps.",
    answer: "Key route containers to force unmount; cleanup effects to release resources.",
  },
  {
    id: 49,
    question: "useSyncExternalStore purpose.",
    answer: "Provides consistent snapshots for external stores in concurrent rendering.",
  },
  {
    id: 50,
    question: "Portals and stacking contexts.",
    answer: "Manage z-index and aria-hidden background; return focus on close.",
  },
  {
    id: 51,
    question: "RSC ↔ client island data flow.",
    answer: "Pass serialized data down; keep client callbacks small and localized.",
  },
  {
    id: 52,
    question: "Optimizing for low-end devices.",
    answer: "Minimize JS, optimize images, reduce layout thrash, and lazy-hydrate widgets.",
  },
  {
    id: 53,
    question: "Context default values usage.",
    answer:
      "Good for optional features; don’t rely on defaults for dynamic data—always provide Provider.",
  },
  {
    id: 54,
    question: "Passive listeners and scroll.",
    answer: "Mark as passive to avoid blocking scroll; only preventDefault when necessary.",
  },
  {
    id: 55,
    question: "Managing timers cleanly.",
    answer: "Store IDs in refs; clear on unmount; avoid updating unmounted state.",
  },
  {
    id: 56,
    question: "Accessible modal requirements.",
    answer: "Role=dialog, aria-modal, focus trap, restore focus on close, escape to dismiss.",
  },
  {
    id: 57,
    question: "Avoid layout thrashing.",
    answer: "Batch reads/writes, use transform/opacity animations; measure before mutate.",
  },
  {
    id: 58,
    question: "Immutable data benefits.",
    answer: "Shallow compares work, fewer bugs; structural sharing avoids deep copies.",
  },
  {
    id: 59,
    question: "Deep callback drilling issues.",
    answer: "Breaks memoization chains; lift logic or provide via context/store.",
  },
  {
    id: 60,
    question: "Composing drag+drop+resize.",
    answer: "Isolate concerns in hooks; coordinate via state machine/external store.",
  },
  {
    id: 61,
    question: "Hydration performance tips.",
    answer: "Trim client JS, lazy-hydrate non-critical islands, keep server output deterministic.",
  },
  {
    id: 62,
    question: "CSS Modules vs utility-first CSS.",
    answer: "Modules for component-scoped styles; utilities for speed/consistency.",
  },
  {
    id: 63,
    question: "How React schedules under load.",
    answer:
      "Urgent updates preempt non-urgent; work may pause/resume; transitions mark non-urgent.",
  },
  {
    id: 64,
    question: "Intl number/date formatting.",
    answer: "Use Intl APIs; memoize formatters to avoid per-render allocations.",
  },
  {
    id: 65,
    question: "Scroll position preservation.",
    answer: "Use anchors, restore on route change, and avoid content jumps with reserved space.",
  },
  {
    id: 66,
    question: "Accessible data grids basics.",
    answer: "Headers association, keyboard nav, roles, and careful virtualization semantics.",
  },
  {
    id: 67,
    question: "Decoupling data fetch from view.",
    answer: "Put fetch in hooks/services, components consume via props; simplifies testing.",
  },
  {
    id: 68,
    question: "Fragments vs wrapper divs.",
    answer: "Fragments avoid extra DOM when no semantics/styling needed.",
  },
  {
    id: 69,
    question: "Render props vs hooks trade-offs.",
    answer: "Hooks are flatter and composable; render props can cause deeply nested trees.",
  },
  {
    id: 70,
    question: "Securing event handlers.",
    answer:
      "Validate input, avoid eval, sanitize display, and respect permissions for clipboard/etc.",
  },
  {
    id: 71,
    question: "Skeleton design best practices.",
    answer: "Shape matches content to avoid CLS; set max wait and swap to error on failure.",
  },
  {
    id: 72,
    question: "Avoid excessive suspense boundaries.",
    answer: "Wrap real waiting parts; too many boundaries cause flashing and complexity.",
  },
  {
    id: 73,
    question: "Tree-shaking friendly modules.",
    answer: "Avoid top-level side effects; prefer named exports; lazy-load optional features.",
  },
  {
    id: 74,
    question: "Plugin-like component APIs.",
    answer: "Expose slots or children-as-function; document extension points clearly.",
  },
  {
    id: 75,
    question: "Optimizing SVG usage.",
    answer: "Inline tiny icons, sprite for many, and memoize complex inline SVGs.",
  },
  {
    id: 76,
    question: "Theming via tokens.",
    answer: "Provide design tokens via context/CSS variables; avoid global overrides.",
  },
  {
    id: 77,
    question: "Privacy-respecting telemetry.",
    answer: "Collect minimal, anonymized events; debounce; provide opt-out.",
  },
  {
    id: 78,
    question: "Pointer vs mouse/touch handling.",
    answer: "Prefer Pointer Events; adapt hover/focus semantics for touch.",
  },
  {
    id: 79,
    question: "Build-time feature flags.",
    answer: "Replace at build with bundler; tree-shake dead code; runtime flags for experiments.",
  },
  {
    id: 80,
    question: "Observer cleanup (IO/MO).",
    answer: "Disconnect observers on unmount; keep refs to unsubscribe reliably.",
  },
  {
    id: 81,
    question: "Web Workers integration.",
    answer: "Move heavy compute off main thread; message results back; cancel with flags.",
  },
  {
    id: 82,
    question: "Snapshot testing caveats.",
    answer: "Avoid brittle snapshots; prefer role-based assertions and user flows.",
  },
  {
    id: 83,
    question: "Accessible custom controls.",
    answer: "Mirror native semantics/keyboard; or wrap real inputs under the hood.",
  },
  {
    id: 84,
    question: "Declarative drag-and-drop.",
    answer: "Use libs or state machines; avoid manual DOM mutations during drag.",
  },
  {
    id: 85,
    question: "CSR vs SSR vs SSG trade-offs.",
    answer:
      "CSR: flexible but heavy; SSR: fast first paint with server cost; SSG: fastest but static.",
  },
  {
    id: 86,
    question: "Avoid over-fetching.",
    answer: "Cache, paginate, and coalesce requests; normalize entities; reuse across views.",
  },
  {
    id: 87,
    question: "Component performance measurement.",
    answer: "Use React Profiler and user timing marks; compare INP/LCP before/after changes.",
  },
  {
    id: 88,
    question: "Design tokens in practice.",
    answer: "Immutable tokens consumed by CSS vars/Tailwind theme for consistency.",
  },
  {
    id: 89,
    question: "Clipboard API handling.",
    answer: "Check permissions; provide fallback; show toasts; sanitize pasted HTML.",
  },
  {
    id: 90,
    question: "When should a component throw for Suspense?",
    answer:
      "When it truly waits on a resource; throwing a promise defers rendering via nearest boundary.",
  },
  {
    id: 91,
    question: "Migrating class components safely.",
    answer: "Wrap with adapters, parity test, gradually port to hooks feature-by-feature.",
  },
  {
    id: 92,
    question: "Prevent visual regressions during refactor.",
    answer:
      "Add storybook/visual tests; limit CSS drift; keep snapshots for styles only if stable.",
  },
  {
    id: 93,
    question: "Handling focus after route transitions.",
    answer: "Use layout effect to focus main heading and announce changes via aria-live.",
  },
  {
    id: 94,
    question: "Coordinating multiple Suspense boundaries.",
    answer: "Nest by dependency; stream outer shell first, inner sections as data arrives.",
  },
  {
    id: 95,
    question: "Ref patterns for canvas/webgl components.",
    answer:
      "Store imperative handles in refs and limit re-renders by isolating state outside React.",
  },
  {
    id: 96,
    question: "Guarding against effect re-entry loops.",
    answer:
      "Stabilize dependencies, move async logic outside, and guard with flags/AbortController.",
  },
  {
    id: 97,
    question: "Managing uncontrolled inputs with refs.",
    answer: "Read values on submit or blur; avoid per-keystroke re-renders.",
  },
  {
    id: 98,
    question: "A11y for toast notifications.",
    answer:
      "Use role='status' or aria-live='polite'; avoid stealing focus; auto-dismiss with pause on hover.",
  },
  {
    id: 99,
    question: "Keyboard traps in dialogs.",
    answer: "Implement focus trap and escape to close; restore focus to the trigger.",
  },
  {
    id: 100,
    question: "Handling drag performance.",
    answer:
      "Use transforms, pointer events, and requestAnimationFrame; avoid layout thrash inside move handlers.",
  },
];

export default REACT_QUESTIONS;
