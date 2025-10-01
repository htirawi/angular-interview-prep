// React Interview Questions - 100 Senior-Level Questions
// Enhanced with categories, difficulty levels, and comprehensive tags

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
      "Render is deterministic—given state/props, React computes the same UI; side effects live outside render. This functional paradigm ensures predictable outputs, easier testing, and better reasoning about application behavior. Pure functions make debugging simpler since you can replay state changes reliably.",
    category: "Core Concepts",
    difficulty: "intermediate",
    tags: ["fundamentals", "state", "rendering", "functional-programming"],
  },
  {
    id: 2,
    question: "How do transitions help responsiveness?",
    answer:
      "They mark updates as non-urgent so React can keep input handlers and urgent updates snappy. Transitions allow React to interrupt low-priority work, improving perceived performance. Use startTransition for heavy state updates like filtering large lists while keeping typing responsive.",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["concurrent", "performance", "ux", "transitions"],
  },
  {
    id: 3,
    question: "useEffect vs useLayoutEffect difference.",
    answer:
      "useEffect runs after paint; useLayoutEffect runs before paint for synchronous DOM reads/writes. Use useLayoutEffect when you need to measure DOM or prevent visual flicker (like tooltips, animations). useEffect is async and won't block the browser.",
    category: "Hooks",
    difficulty: "easy",
    tags: ["hooks", "lifecycle", "dom", "timing"],
  },
  {
    id: 4,
    question: "Common stale closure causes.",
    answer:
      "Handlers capture old values; fix with functional updates, refs, or correct deps in effects. Closures close over variables at definition time. Use setState(prev => prev + 1) instead of setState(count + 1), or useRef for values that don't trigger renders.",
    category: "Hooks",
    difficulty: "intermediate",
    tags: ["hooks", "closures", "bugs", "state"],
  },
  {
    id: 5,
    question: "Suspense benefits for data UIs.",
    answer:
      "Coordinates async loading with fallbacks and enables streaming without spinner waterfalls. Suspense boundaries let you show loading states at the right granularity, improving UX by preventing layout shifts and reducing perceived wait time.",
    category: "Suspense",
    difficulty: "intermediate",
    tags: ["suspense", "async", "loading", "ux"],
  },
  {
    id: 6,
    question: "When to use useReducer.",
    answer:
      "When state transitions are complex or event-driven; keeps logic explicit and testable. Ideal for state machines, undo/redo, or when multiple actions modify the same state. Easier to test pure reducer functions separately from components.",
    category: "Hooks",
    difficulty: "easy",
    tags: ["hooks", "state-management", "reducer", "patterns"],
  },
  {
    id: 7,
    question: "Context performance pitfalls.",
    answer:
      "Provider updates re-render all consumers; split contexts or use selector-based consumption. Every context change triggers re-renders in all consumers, even if they only need part of the value. Split into multiple contexts (auth, theme, user) or use external stores like Zustand.",
    category: "State Management",
    difficulty: "intermediate",
    tags: ["context", "performance", "optimization", "state-management"],
  },
  {
    id: 8,
    question: "Keys in lists—why required.",
    answer:
      "They guide reconciliation; missing/unstable keys can move state between items incorrectly. Keys help React identify which items changed, were added, or removed. Using array indices as keys causes bugs when list order changes. Use stable, unique identifiers.",
    category: "Core Concepts",
    difficulty: "easy",
    tags: ["lists", "reconciliation", "keys", "rendering"],
  },
  {
    id: 9,
    question: "Hydration mismatch causes.",
    answer:
      "Non-deterministic markup, time/date, random IDs; fix by gating with effects or server generating deterministic output. Hydration expects server HTML to match client render. Use useEffect for client-only content, or ensure server renders consistent output (like ISO dates).",
    category: "SSR",
    difficulty: "hard",
    tags: ["ssr", "hydration", "bugs", "rendering"],
  },
  {
    id: 10,
    question: "StrictMode double-invoke handling.",
    answer:
      "Make effects idempotent and cleanly cancel; avoid side effects in render. StrictMode intentionally double-invokes effects in dev to surface bugs. Return cleanup functions that safely undo effect work. Never mutate state during render.",
    category: "Development",
    difficulty: "intermediate",
    tags: ["strict-mode", "effects", "development", "best-practices"],
  },
  {
    id: 11,
    question: "Refs vs state.",
    answer:
      "Refs hold mutable values without re-render; state triggers re-renders and drives UI. Use refs for DOM elements, timers, or any value that shouldn't trigger re-renders. Use state for values that affect what's displayed.",
    category: "Hooks",
    difficulty: "easy",
    tags: ["refs", "state", "hooks", "fundamentals"],
  },
  {
    id: 12,
    question: "useDeferredValue use case.",
    answer:
      "Defer expensive derived computations behind fast input updates. Keep input responsive by deferring expensive filtering/rendering. React shows stale value while computing new one. Similar to debouncing but integrated with concurrent rendering.",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["concurrent", "performance", "hooks", "optimization"],
  },
  {
    id: 13,
    question: "Designing a reusable custom hook.",
    answer:
      "Single responsibility, stable return identity, clear contract and error semantics. Return consistent values (use useMemo/useCallback), document dependencies, handle edge cases, and provide good TypeScript types. Test hooks in isolation.",
    category: "Hooks",
    difficulty: "intermediate",
    tags: ["custom-hooks", "patterns", "reusability", "api-design"],
  },
  {
    id: 14,
    question: "What are portals for?",
    answer:
      "Render children elsewhere in the DOM (modals, tooltips) while retaining React ownership. Portals maintain event bubbling through React tree despite different DOM location. Useful for z-index battles and accessibility.",
    category: "Advanced",
    difficulty: "intermediate",
    tags: ["portals", "dom", "modals", "rendering"],
  },
  {
    id: 15,
    question: "What do error boundaries catch?",
    answer:
      "Render/lifecycle errors of descendants; not async or event errors unless re-thrown. Error boundaries don't catch errors in event handlers, async code, or SSR. Wrap async errors in try/catch and setState error to trigger boundary.",
    category: "Error Handling",
    difficulty: "intermediate",
    tags: ["error-boundaries", "errors", "lifecycle", "patterns"],
  },
  {
    id: 16,
    question: "Large list performance tips.",
    answer:
      "Window/virtualize, memo row components, stable keys, avoid inline lambdas/objects. Use react-window or react-virtualized to render only visible items. Memoize list items, pass stable callbacks, and use key from data not index.",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["lists", "performance", "virtualization", "optimization"],
  },
  {
    id: 17,
    question: "Testing with RTL principles.",
    answer:
      "Test behavior and roles/labels, not implementation details or snapshots of whole trees. Query by accessibility roles, test user interactions, avoid testing internal state. Tests should resemble how users interact with your app.",
    category: "Testing",
    difficulty: "intermediate",
    tags: ["testing", "rtl", "accessibility", "best-practices"],
  },
  {
    id: 18,
    question: "Event batching behavior.",
    answer:
      "React batches setState calls in the same tick; use flushSync sparingly to force sync work. React 18 auto-batches even in setTimeout/promises. Batching reduces renders. Only use flushSync when you need DOM updates immediately (measuring).",
    category: "Core Concepts",
    difficulty: "intermediate",
    tags: ["batching", "state", "performance", "rendering"],
  },
  {
    id: 19,
    question: "Compound components pattern.",
    answer:
      "Expose subcomponents and share state via context; ergonomic APIs with composition. Examples: Select.Root, Select.Trigger, Select.Content. Users compose components flexibly while you manage shared state internally. Great for UI libraries.",
    category: "Patterns",
    difficulty: "hard",
    tags: ["patterns", "composition", "api-design", "components"],
  },
  {
    id: 20,
    question: "Why controlled inputs can lag.",
    answer:
      "Every keystroke re-renders; fix with debounce, useDeferredValue, or uncontrolled inputs. Each character triggers setState and full render. Use uncontrolled inputs with refs for better performance, or debounce for heavy downstream work.",
    category: "Performance",
    difficulty: "easy",
    tags: ["forms", "performance", "inputs", "optimization"],
  },
  {
    id: 21,
    question: "Isolating expensive children.",
    answer:
      "Wrap with memo and pass stable props; consider moving state closer to the child. React.memo prevents re-renders when props don't change. Ensure props are stable (memoize objects/arrays). Or lift state down so parent updates don't affect child.",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["memo", "performance", "optimization", "components"],
  },
  {
    id: 22,
    question: "Animation without jank.",
    answer:
      "Use CSS transitions for simple cases; transform/opacity; batch DOM reads/writes. Prefer CSS for 60fps animations. Use transform/opacity (GPU-accelerated). For JS animations, use requestAnimationFrame and read all DOM properties before writing.",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["animation", "performance", "css", "optimization"],
  },
  {
    id: 23,
    question: "Benefits of Server Components conceptually.",
    answer:
      "Smaller client bundles, secure data access; hydrate only interactive islands. RSC render on server, ship HTML not JS. Access databases directly without APIs. Client components only for interactivity. Reduces JavaScript payload significantly.",
    category: "SSR",
    difficulty: "hard",
    tags: ["rsc", "server-components", "architecture", "performance"],
  },
  {
    id: 24,
    question: "Composition over inheritance reasoning.",
    answer:
      "Keeps APIs small, flexible, and testable; avoids rigid hierarchies. React favors composition (children, render props). Inheritance creates tight coupling. Compose small, focused components with props/children for flexibility.",
    category: "Patterns",
    difficulty: "easy",
    tags: ["composition", "patterns", "architecture", "best-practices"],
  },
  {
    id: 25,
    question: "useId purpose.",
    answer:
      "Stable IDs across SSR/CSR to link labels and inputs without mismatch. Generates unique IDs that match between server and client. Essential for accessibility (label htmlFor, aria-describedby). Don't use for keys in lists.",
    category: "Hooks",
    difficulty: "intermediate",
    tags: ["hooks", "ssr", "accessibility", "ids"],
  },
  {
    id: 26,
    question: "Avoiding prop drilling without overusing context.",
    answer:
      "Colocate state, use composition, limited context, or an external store for hot state. Move state closer to where it's used. Pass components as children/props instead of deep props. Use context sparingly for truly global state.",
    category: "State Management",
    difficulty: "intermediate",
    tags: ["state-management", "context", "composition", "patterns"],
  },
  {
    id: 27,
    question: "Sharing logic between unrelated components.",
    answer:
      "Custom hooks or utility modules; avoid complex HOCs when hooks suffice. Extract shared logic to custom hooks (use prefix). Plain utility functions for non-React logic. HOCs are legacy pattern.",
    category: "Patterns",
    difficulty: "easy",
    tags: ["hooks", "reusability", "patterns", "code-organization"],
  },
  {
    id: 28,
    question: "Inline object/array prop issues.",
    answer:
      "They break memoization due to new identities each render; hoist constants or memoize. `<Child config={{...}}/>` creates new object every render. Use useMemo or define outside component. Breaks React.memo and useEffect dependencies.",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["performance", "memo", "optimization", "common-mistakes"],
  },
  {
    id: 29,
    question: "When to split a component.",
    answer:
      "Different update rates or responsibilities; improves readability and performance. Split when parts update independently, logic is complex, or for reusability. Smaller components are easier to test and optimize.",
    category: "Architecture",
    difficulty: "easy",
    tags: ["components", "architecture", "best-practices", "organization"],
  },
  {
    id: 30,
    question: "Safe use of dangerouslySetInnerHTML.",
    answer:
      "Only with sanitized content; prefer libraries that escape; enforce CSP. Use DOMPurify to sanitize user input. Better: render components instead of HTML strings. Set Content-Security-Policy headers to prevent XSS.",
    category: "Security",
    difficulty: "hard",
    tags: ["security", "xss", "html", "sanitization"],
  },
  {
    id: 31,
    question: "A11y focus management on navigation.",
    answer:
      "Move focus to main heading; announce changes; maintain tab order. Use useLayoutEffect to focus h1 after route change. Add aria-live region for announcements. Ensure logical tab order with semantic HTML.",
    category: "Accessibility",
    difficulty: "intermediate",
    tags: ["accessibility", "focus", "navigation", "a11y"],
  },
  {
    id: 32,
    question: "Forms: library vs hand-rolled.",
    answer:
      "Libraries handle validation/errors easily; hand-rolled for small forms and full control. React Hook Form or Formik for complex forms with validation. Plain state for simple forms. Libraries reduce boilerplate and bugs.",
    category: "Forms",
    difficulty: "easy",
    tags: ["forms", "libraries", "validation", "patterns"],
  },
  {
    id: 33,
    question: "Responsive image strategies.",
    answer:
      "Use srcset/sizes and aspect ratios; lazy load below the fold. Serve different resolutions with srcset. Use loading='lazy' for images below fold. Set width/height to prevent layout shift. Consider next/image or similar.",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["images", "performance", "responsive", "optimization"],
  },
  {
    id: 34,
    question: "Choosing external store over context.",
    answer:
      "For large, frequently updated, cross-cutting state where context re-renders are costly. Context causes all consumers to re-render. Zustand/Jotai allow selective subscriptions. Use for global UI state (theme, auth, notifications).",
    category: "State Management",
    difficulty: "intermediate",
    tags: ["state-management", "external-stores", "performance", "architecture"],
  },
  {
    id: 35,
    question: "Preventing async effect leaks.",
    answer:
      "Use AbortController or mounted refs; cleanup on unmount; guard state updates. Return cleanup from useEffect that aborts fetch. Check isMounted before setState in callbacks. Prevents 'Can't perform update on unmounted component' warnings.",
    category: "Hooks",
    difficulty: "intermediate",
    tags: ["effects", "async", "cleanup", "bugs"],
  },
  {
    id: 36,
    question: "useImperativeHandle responsibly.",
    answer:
      "Expose minimal imperative API (focus/scroll); avoid leaking internal state. Use with forwardRef to expose methods like focus(). Keep surface area small. Prefer declarative props when possible. Document the imperative API clearly.",
    category: "Advanced",
    difficulty: "hard",
    tags: ["hooks", "imperative", "refs", "api-design"],
  },
  {
    id: 37,
    question: "Infinite scroll pattern.",
    answer:
      "IntersectionObserver sentinel, cursor pagination, appended lists with stable keys. Place sentinel div at list bottom. When visible, fetch next page. Append to array with stable keys. Consider virtual scrolling for large lists.",
    category: "Patterns",
    difficulty: "intermediate",
    tags: ["patterns", "pagination", "intersection-observer", "ux"],
  },
  {
    id: 38,
    question: "Selector hooks for perf.",
    answer:
      "Return primitive/stable values; memoize derived results to avoid unnecessary renders. useSelector should return primitives or memoized objects. Use reselect for expensive computations. Shallow equality by default in most libraries.",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["selectors", "performance", "state-management", "optimization"],
  },
  {
    id: 39,
    question: "Reconciliation explained.",
    answer:
      "Diffs element trees between renders; keys instruct React which nodes persist or move. React compares new tree with previous. Same element type and key = update. Different = unmount/mount. Keys identify elements across renders.",
    category: "Core Concepts",
    difficulty: "intermediate",
    tags: ["reconciliation", "virtual-dom", "rendering", "keys"],
  },
  {
    id: 40,
    question: "Suspense anti-patterns.",
    answer:
      "Wrapping whole app in a single boundary, or throwing promises from deep client code. Have multiple boundaries at appropriate granularity. Don't throw promises from event handlers. Use Suspense with data fetching libraries, not raw promises.",
    category: "Suspense",
    difficulty: "hard",
    tags: ["suspense", "anti-patterns", "async", "best-practices"],
  },
  {
    id: 41,
    question: "Dynamic imports pattern.",
    answer:
      "Code-split large components and show Suspense fallback; prefetch on intent (hover). Use React.lazy(() => import('./Heavy')). Wrap in Suspense. Preload on link hover with link.preload. Reduces initial bundle size.",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["code-splitting", "lazy-loading", "performance", "suspense"],
  },
  {
    id: 42,
    question: "Improving INP.",
    answer:
      "Break up long tasks, defer non-urgent work with transitions, and avoid heavy sync JS. Interaction to Next Paint measures responsiveness. Use startTransition for heavy updates. Split long tasks with setTimeout. Virtualize lists.",
    category: "Performance",
    difficulty: "hard",
    tags: ["performance", "web-vitals", "inp", "optimization"],
  },
  {
    id: 43,
    question: "Avoiding global mutable singletons.",
    answer:
      "They break SSR determinism and caching; use providers or DI patterns. Singletons cause issues in server environments (shared across requests). Use Context providers or pass dependencies explicitly. Enables testing and SSR.",
    category: "SSR",
    difficulty: "hard",
    tags: ["ssr", "architecture", "singletons", "patterns"],
  },
  {
    id: 44,
    question: "Effect dependency reasoning.",
    answer:
      "List all closure values used; stabilize callbacks or values to keep arrays minimal and correct. ESLint plugin warns about missing deps. Stabilize with useCallback/useMemo. Empty array = runs once. Changing deps = re-run effect.",
    category: "Hooks",
    difficulty: "intermediate",
    tags: ["effects", "dependencies", "hooks", "best-practices"],
  },
  {
    id: 45,
    question: "CSS-in-JS performance notes.",
    answer:
      "Runtime styles can add cost; prefer static extraction or utility CSS for hot paths. Runtime CSS-in-JS generates styles on every render. Use static CSS extraction (linaria, vanilla-extract) or Tailwind. Styled-components has runtime cost.",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["css", "performance", "styling", "optimization"],
  },
  {
    id: 46,
    question: "Decomposing complex layouts.",
    answer:
      "Extract independent regions, presentational components, and compose with small props. Break into header, sidebar, main, footer. Each region manages its state. Keep components small and focused. Use composition over configuration.",
    category: "Architecture",
    difficulty: "easy",
    tags: ["architecture", "components", "composition", "organization"],
  },
  {
    id: 47,
    question: "Testing hooks directly.",
    answer:
      "Mount a test component or use hook testing utilities; assert contract, not internals. Use @testing-library/react-hooks renderHook. Test inputs/outputs, not implementation. Mock dependencies. Test error cases.",
    category: "Testing",
    difficulty: "intermediate",
    tags: ["testing", "hooks", "unit-tests", "best-practices"],
  },
  {
    id: 48,
    question: "Avoid zombie children on route swaps.",
    answer:
      "Key route containers to force unmount; cleanup effects to release resources. Add key to route component to force full remount. Return cleanup from useEffect to cancel timers/requests. Prevents memory leaks.",
    category: "Routing",
    difficulty: "intermediate",
    tags: ["routing", "cleanup", "memory-leaks", "effects"],
  },
  {
    id: 49,
    question: "useSyncExternalStore purpose.",
    answer:
      "Provides consistent snapshots for external stores in concurrent rendering. Ensures store reads are consistent during render. Used by Redux, Zustand for React 18. Handles tearing in concurrent mode. Subscribe/get snapshot pattern.",
    category: "Hooks",
    difficulty: "hard",
    tags: ["hooks", "concurrent", "external-stores", "state-management"],
  },
  {
    id: 50,
    question: "Portals and stacking contexts.",
    answer:
      "Manage z-index and aria-hidden background; return focus on close. Portal renders outside React root but in React tree. Handle z-index with CSS. Set aria-hidden on main content when modal open. Restore focus to trigger.",
    category: "Advanced",
    difficulty: "hard",
    tags: ["portals", "modals", "accessibility", "css"],
  },
  {
    id: 51,
    question: "RSC ↔ client island data flow.",
    answer:
      "Pass serialized data down; keep client callbacks small and localized. Server Components pass serializable props to Client Components. Can't pass functions/class instances. Use 'use client' directive. Plan data boundaries.",
    category: "SSR",
    difficulty: "hard",
    tags: ["rsc", "server-components", "architecture", "data-flow"],
  },
  {
    id: 52,
    question: "Optimizing for low-end devices.",
    answer:
      "Minimize JS, optimize images, reduce layout thrash, and lazy-hydrate widgets. Test on slow devices/throttled CPU. Reduce bundle size. Use modern image formats. Avoid heavy animations. Progressive enhancement.",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["performance", "mobile", "optimization", "progressive-enhancement"],
  },
  {
    id: 53,
    question: "Context default values usage.",
    answer:
      "Good for optional features; don't rely on defaults for dynamic data—always provide Provider. Defaults useful for testing or optional contexts. Runtime data needs Provider. TypeScript: use non-null assertion if Provider guaranteed.",
    category: "State Management",
    difficulty: "easy",
    tags: ["context", "patterns", "api-design", "typescript"],
  },
  {
    id: 54,
    question: "Passive listeners and scroll.",
    answer:
      "Mark as passive to avoid blocking scroll; only preventDefault when necessary. addEventListener('scroll', fn, { passive: true }). Passive listeners don't block scrolling. Only use active listeners if you need preventDefault.",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["events", "performance", "scroll", "optimization"],
  },
  {
    id: 55,
    question: "Managing timers cleanly.",
    answer:
      "Store IDs in refs; clear on unmount; avoid updating unmounted state. Use useRef for timer IDs. Return clearTimeout/clearInterval from useEffect. Check isMounted before setState in callbacks.",
    category: "Hooks",
    difficulty: "easy",
    tags: ["timers", "cleanup", "effects", "refs"],
  },
  {
    id: 56,
    question: "Accessible modal requirements.",
    answer:
      "Role=dialog, aria-modal, focus trap, restore focus on close, escape to dismiss. Trap focus inside modal. First focusable element receives focus. Esc closes modal. Restore focus to trigger. aria-labelledby for title.",
    category: "Accessibility",
    difficulty: "intermediate",
    tags: ["accessibility", "modals", "a11y", "aria"],
  },
  {
    id: 57,
    question: "Avoid layout thrashing.",
    answer:
      "Batch reads/writes, use transform/opacity animations; measure before mutate. Read all DOM properties first, then write. Avoid read-write-read-write cycles. Use requestAnimationFrame. Prefer CSS transforms.",
    category: "Performance",
    difficulty: "hard",
    tags: ["performance", "dom", "layout", "optimization"],
  },
  {
    id: 58,
    question: "Immutable data benefits.",
    answer:
      "Shallow compares work, fewer bugs; structural sharing avoids deep copies. React relies on shallow equality. Immutability enables time-travel debugging. Libraries like Immer make it ergonomic. Prevents accidental mutations.",
    category: "State Management",
    difficulty: "intermediate",
    tags: ["immutability", "state", "patterns", "best-practices"],
  },
  {
    id: 59,
    question: "Deep callback drilling issues.",
    answer:
      "Breaks memoization chains; lift logic or provide via context/store. Passing callbacks through many layers breaks memo. Use context for callbacks or lift event handlers up. Consider event bus for deeply nested components.",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["callbacks", "performance", "memo", "patterns"],
  },
  {
    id: 60,
    question: "Composing drag+drop+resize.",
    answer:
      "Isolate concerns in hooks; coordinate via state machine/external store. Create useDrag, useResize hooks. Combine with reducer or XState. Keep hooks focused. Share state through context or store.",
    category: "Advanced",
    difficulty: "hard",
    tags: ["interactions", "hooks", "state-machines", "patterns"],
  },
  {
    id: 61,
    question: "Hydration performance tips.",
    answer:
      "Trim client JS, lazy-hydrate non-critical islands, keep server output deterministic. Reduce initial JS bundle. Hydrate interactive parts first. Use progressive enhancement. Match server/client rendering exactly.",
    category: "SSR",
    difficulty: "hard",
    tags: ["ssr", "hydration", "performance", "optimization"],
  },
  {
    id: 62,
    question: "CSS Modules vs utility-first CSS.",
    answer:
      "Modules for component-scoped styles; utilities for speed/consistency. CSS Modules prevent class name collisions. Tailwind faster for prototyping and consistent spacing. Can mix both approaches.",
    category: "Styling",
    difficulty: "easy",
    tags: ["css", "styling", "architecture", "tailwind"],
  },
  {
    id: 63,
    question: "How React schedules under load.",
    answer:
      "Urgent updates preempt non-urgent; work may pause/resume; transitions mark non-urgent. Concurrent mode can interrupt rendering. High priority (input) preempts low priority (background updates). Prevents UI jank.",
    category: "Core Concepts",
    difficulty: "hard",
    tags: ["concurrent", "scheduling", "performance", "rendering"],
  },
  {
    id: 64,
    question: "Intl number/date formatting.",
    answer:
      "Use Intl APIs; memoize formatters to avoid per-render allocations. Intl.DateTimeFormat, Intl.NumberFormat for i18n. Reuse formatter instances (useMemo). Prefer over moment.js for smaller bundle.",
    category: "Internationalization",
    difficulty: "easy",
    tags: ["i18n", "intl", "performance", "formatting"],
  },
  {
    id: 65,
    question: "Scroll position preservation.",
    answer:
      "Use anchors, restore on route change, and avoid content jumps with reserved space. Save scrollY before navigation, restore after. Use CSS aspect ratios to reserve space. History API supports scroll restoration.",
    category: "UX",
    difficulty: "intermediate",
    tags: ["scroll", "ux", "navigation", "routing"],
  },
  {
    id: 66,
    question: "Accessible data grids basics.",
    answer:
      "Headers association, keyboard nav, roles, and careful virtualization semantics. Use role=grid, gridcell. Arrow key navigation. aria-colindex/rowindex for virtual scrolling. Associate headers with cells.",
    category: "Accessibility",
    difficulty: "hard",
    tags: ["accessibility", "data-grids", "a11y", "aria"],
  },
  {
    id: 67,
    question: "Decoupling data fetch from view.",
    answer:
      "Put fetch in hooks/services, components consume via props; simplifies testing. Custom hooks (useFetchUser) abstract data layer. Components receive data as props. Easy to mock in tests. Separation of concerns.",
    category: "Architecture",
    difficulty: "intermediate",
    tags: ["architecture", "data-fetching", "testing", "hooks"],
  },
  {
    id: 68,
    question: "Fragments vs wrapper divs.",
    answer:
      "Fragments avoid extra DOM when no semantics/styling needed. <></> when you don't need a wrapper element. Keeps DOM clean. Can't apply styles to fragments. Use div when you need styling/events.",
    category: "Core Concepts",
    difficulty: "easy",
    tags: ["fragments", "dom", "jsx", "best-practices"],
  },
  {
    id: 69,
    question: "Render props vs hooks trade-offs.",
    answer:
      "Hooks are flatter and composable; render props can cause deeply nested trees. Hooks replaced most render prop use cases. Render props useful for render-time composition. Hooks can't be called conditionally.",
    category: "Patterns",
    difficulty: "intermediate",
    tags: ["patterns", "hooks", "render-props", "composition"],
  },
  {
    id: 70,
    question: "Securing event handlers.",
    answer:
      "Validate input, avoid eval, sanitize display, and respect permissions for clipboard/etc. Never eval user input. Validate on client and server. Sanitize before rendering. Check permissions for sensitive APIs.",
    category: "Security",
    difficulty: "intermediate",
    tags: ["security", "validation", "events", "best-practices"],
  },
  {
    id: 71,
    question: "Skeleton design best practices.",
    answer:
      "Shape matches content to avoid CLS; set max wait and swap to error on failure. Skeleton should mimic final layout. Prevents Cumulative Layout Shift. Show error state after timeout. Pulse animation optional.",
    category: "UX",
    difficulty: "easy",
    tags: ["loading", "ux", "skeletons", "cls"],
  },
  {
    id: 72,
    question: "Avoid excessive suspense boundaries.",
    answer:
      "Wrap real waiting parts; too many boundaries cause flashing and complexity. One boundary per meaningful loading unit. Too many = choppy UX. Too few = wait for everything. Balance granularity.",
    category: "Suspense",
    difficulty: "intermediate",
    tags: ["suspense", "loading", "ux", "best-practices"],
  },
  {
    id: 73,
    question: "Tree-shaking friendly modules.",
    answer:
      "Avoid top-level side effects; prefer named exports; lazy-load optional features. Use ES modules. Named exports tree-shake better. Avoid import side effects. Mark packages as side-effect free in package.json.",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["tree-shaking", "bundling", "performance", "modules"],
  },
  {
    id: 74,
    question: "Plugin-like component APIs.",
    answer:
      "Expose slots or children-as-function; document extension points clearly. Allow users to inject components. Use children or render props. Clear extension points. Example: <DataTable renderRow={...} />.",
    category: "API Design",
    difficulty: "intermediate",
    tags: ["api-design", "extensibility", "components", "patterns"],
  },
  {
    id: 75,
    question: "Optimizing SVG usage.",
    answer:
      "Inline tiny icons, sprite for many, and memoize complex inline SVGs. Inline small SVGs (<1KB). Use sprite sheet for icons. SVGO to optimize. Memoize complex SVGs. Consider icon fonts for many icons.",
    category: "Performance",
    difficulty: "easy",
    tags: ["svg", "icons", "performance", "optimization"],
  },
  {
    id: 76,
    question: "Theming via tokens.",
    answer:
      "Provide design tokens via context/CSS variables; avoid global overrides. CSS custom properties for theme values. Context provides theme choice. Avoid inline styles. Use data attributes or classes.",
    category: "Styling",
    difficulty: "intermediate",
    tags: ["theming", "css-variables", "design-tokens", "styling"],
  },
  {
    id: 77,
    question: "Privacy-respecting telemetry.",
    answer:
      "Collect minimal, anonymized events; debounce; provide opt-out. Only collect what you need. Anonymize user data. Batch events. Clear opt-out UI. GDPR compliance. Consider self-hosting analytics.",
    category: "Privacy",
    difficulty: "intermediate",
    tags: ["analytics", "privacy", "gdpr", "ethics"],
  },
  {
    id: 78,
    question: "Pointer vs mouse/touch handling.",
    answer:
      "Prefer Pointer Events; adapt hover/focus semantics for touch. Pointer Events unify mouse/touch/pen. Touch has no hover. Show tooltips on tap, not hover. Use pointer-events CSS property.",
    category: "Events",
    difficulty: "intermediate",
    tags: ["events", "touch", "mobile", "interactions"],
  },
  {
    id: 79,
    question: "Build-time feature flags.",
    answer:
      "Replace at build with bundler; tree-shake dead code; runtime flags for experiments. Use env vars at build time. Dead code elimination removes unused branches. Runtime flags for A/B testing. LaunchDarkly for managed flags.",
    category: "Architecture",
    difficulty: "intermediate",
    tags: ["feature-flags", "bundling", "architecture", "ab-testing"],
  },
  {
    id: 80,
    question: "Observer cleanup (IO/MO).",
    answer:
      "Disconnect observers on unmount; keep refs to unsubscribe reliably. IntersectionObserver, MutationObserver need cleanup. Return disconnect from useEffect. Store observer in ref if it needs updating.",
    category: "Hooks",
    difficulty: "intermediate",
    tags: ["observers", "cleanup", "effects", "memory-leaks"],
  },
  {
    id: 81,
    question: "Web Workers integration.",
    answer:
      "Move heavy compute off main thread; message results back; cancel with flags. Create worker in useEffect. postMessage for communication. Terminate on unmount. Use for image processing, data parsing, etc.",
    category: "Performance",
    difficulty: "hard",
    tags: ["web-workers", "performance", "threading", "optimization"],
  },
  {
    id: 82,
    question: "Snapshot testing caveats.",
    answer:
      "Avoid brittle snapshots; prefer role-based assertions and user flows. Snapshots break on any change. Hard to review. Use for stable UI. Better: test user interactions and state changes.",
    category: "Testing",
    difficulty: "intermediate",
    tags: ["testing", "snapshots", "best-practices", "rtl"],
  },
  {
    id: 83,
    question: "Accessible custom controls.",
    answer:
      "Mirror native semantics/keyboard; or wrap real inputs under the hood. Use proper ARIA roles. Implement keyboard navigation. Better: enhance native elements. Combobox = complex ARIA pattern.",
    category: "Accessibility",
    difficulty: "hard",
    tags: ["accessibility", "custom-controls", "aria", "keyboard"],
  },
  {
    id: 84,
    question: "Declarative drag-and-drop.",
    answer:
      "Use libs or state machines; avoid manual DOM mutations during drag. Libraries: react-dnd, dnd-kit. State represents drag state. Update state, let React render. Don't mutate DOM directly.",
    category: "Interactions",
    difficulty: "hard",
    tags: ["drag-drop", "interactions", "state-machines", "libraries"],
  },
  {
    id: 85,
    question: "CSR vs SSR vs SSG trade-offs.",
    answer:
      "CSR: flexible but heavy; SSR: fast first paint with server cost; SSG: fastest but static. CSR = SPA, slow initial load. SSR = dynamic but needs server. SSG = pre-rendered, edge-deployable. Hybrid approaches best.",
    category: "Architecture",
    difficulty: "intermediate",
    tags: ["ssr", "ssg", "csr", "architecture", "rendering"],
  },
  {
    id: 86,
    question: "Avoid over-fetching.",
    answer:
      "Cache, paginate, and coalesce requests; normalize entities; reuse across views. GraphQL helps request only needed fields. REST: design endpoints carefully. Use SWR/React Query for caching. Normalize to avoid duplication.",
    category: "Data Fetching",
    difficulty: "intermediate",
    tags: ["data-fetching", "performance", "graphql", "caching"],
  },
  {
    id: 87,
    question: "Component performance measurement.",
    answer:
      "Use React Profiler and user timing marks; compare INP/LCP before/after changes. React DevTools Profiler shows render times. Performance.mark/measure for custom timing. Test on real devices. Lighthouse for metrics.",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["profiling", "performance", "devtools", "metrics"],
  },
  {
    id: 88,
    question: "Design tokens in practice.",
    answer:
      "Immutable tokens consumed by CSS vars/Tailwind theme for consistency. Single source of truth for colors, spacing, typography. Export to CSS vars, JS, iOS, Android. Tools: Style Dictionary, Theo.",
    category: "Styling",
    difficulty: "intermediate",
    tags: ["design-tokens", "styling", "design-systems", "css"],
  },
  {
    id: 89,
    question: "Clipboard API handling.",
    answer:
      "Check permissions; provide fallback; show toasts; sanitize pasted HTML. navigator.clipboard needs HTTPS. Check permissions first. Fallback to execCommand. Sanitize pasted content. Show success/error feedback.",
    category: "APIs",
    difficulty: "intermediate",
    tags: ["clipboard", "apis", "permissions", "ux"],
  },
  {
    id: 90,
    question: "When should a component throw for Suspense?",
    answer:
      "When it truly waits on a resource; throwing a promise defers rendering via nearest boundary. Read from cache that throws promise if not ready. Suspense catches thrown promise. Component re-renders when promise resolves. Pattern used by Relay, React Query.",
    category: "Suspense",
    difficulty: "hard",
    tags: ["suspense", "async", "promises", "patterns"],
  },
  {
    id: 91,
    question: "Migrating class components safely.",
    answer:
      "Wrap with adapters, parity test, gradually port to hooks feature-by-feature. Convert one component at a time. Test thoroughly. Keep class components if they work. useState replaces this.state. useEffect replaces lifecycles.",
    category: "Migration",
    difficulty: "intermediate",
    tags: ["migration", "class-components", "hooks", "refactoring"],
  },
  {
    id: 92,
    question: "Prevent visual regressions during refactor.",
    answer:
      "Add storybook/visual tests; limit CSS drift; keep snapshots for styles only if stable. Visual regression testing with Percy, Chromatic. Storybook documents components. Lock down CSS changes. Review visual diffs in CI.",
    category: "Testing",
    difficulty: "intermediate",
    tags: ["testing", "visual-regression", "storybook", "refactoring"],
  },
  {
    id: 93,
    question: "Handling focus after route transitions.",
    answer:
      "Use layout effect to focus main heading and announce changes via aria-live. Focus management library or custom hook. Focus h1 after route change. Announce route in aria-live region. Maintains keyboard navigation context.",
    category: "Accessibility",
    difficulty: "intermediate",
    tags: ["accessibility", "focus", "routing", "navigation"],
  },
  {
    id: 94,
    question: "Coordinating multiple Suspense boundaries.",
    answer:
      "Nest by dependency; stream outer shell first, inner sections as data arrives. Shell with multiple boundaries streams progressively. Critical content in first boundary. Nice-to-have in nested boundaries. SSR streaming pattern.",
    category: "Suspense",
    difficulty: "hard",
    tags: ["suspense", "ssr", "streaming", "architecture"],
  },
  {
    id: 95,
    question: "Ref patterns for canvas/webgl components.",
    answer:
      "Store imperative handles in refs and limit re-renders by isolating state outside React. useRef for canvas context. Avoid setState for animation. Use refs for WebGL state. Request animation frame for rendering. React for UI controls only.",
    category: "Advanced",
    difficulty: "hard",
    tags: ["canvas", "webgl", "refs", "performance"],
  },
  {
    id: 96,
    question: "Guarding against effect re-entry loops.",
    answer:
      "Stabilize dependencies, move async logic outside, and guard with flags/AbortController. Effect runs, sets state, triggers re-render, runs again = loop. Stabilize callbacks with useCallback. Use flags to prevent re-entry. AbortController for async cleanup.",
    category: "Hooks",
    difficulty: "hard",
    tags: ["effects", "bugs", "loops", "async"],
  },
  {
    id: 97,
    question: "Managing uncontrolled inputs with refs.",
    answer:
      "Read values on submit or blur; avoid per-keystroke re-renders. useRef for input elements. Access via ref.current.value. No re-renders while typing. Read on form submit. Good for simple forms without validation.",
    category: "Forms",
    difficulty: "easy",
    tags: ["forms", "refs", "uncontrolled", "performance"],
  },
  {
    id: 98,
    question: "A11y for toast notifications.",
    answer:
      "Use role='status' or aria-live='polite'; avoid stealing focus; auto-dismiss with pause on hover. aria-live announces to screen readers. Don't focus toast. Auto-dismiss after timeout. Pause timer on hover. Dismiss button with aria-label.",
    category: "Accessibility",
    difficulty: "intermediate",
    tags: ["accessibility", "toasts", "notifications", "aria"],
  },
  {
    id: 99,
    question: "Keyboard traps in dialogs.",
    answer:
      "Implement focus trap and escape to close; restore focus to the trigger. Tab cycles through modal elements. Shift+Tab reverses. Esc closes modal. First/last element wraps focus. Return focus to button that opened modal.",
    category: "Accessibility",
    difficulty: "intermediate",
    tags: ["accessibility", "modals", "focus-trap", "keyboard"],
  },
  {
    id: 100,
    question: "Handling drag performance.",
    answer:
      "Use transforms, pointer events, and requestAnimationFrame; avoid layout thrash inside move handlers. CSS transform instead of top/left. PointerEvents for unified handling. RAF for smooth updates. Read DOM once, write many. Batch state updates.",
    category: "Performance",
    difficulty: "hard",
    tags: ["drag-drop", "performance", "interactions", "optimization"],
  },
];

export default REACT_QUESTIONS;
