// Redux Interview Questions - 100 Senior-Level Questions
// Auto-generated from markdown

export interface QA {
  id: number;
  question: string;
  answer: string;
  category?: string;
  difficulty?: string;
  tags?: string[];
}

export const REDUX_QUESTIONS: QA[] = [
  {
    id: 1,
    question: "Why use Redux in 2025 and when not to?",
    answer:
      "Use Redux for predictable global state, devtools, and cross-cutting workflows; skip it for local, view-only state where component or small store suffices.",
  },
  {
    id: 2,
    question: "Core Redux principles?",
    answer:
      "Single store, read-only state, changes via pure reducers; enables time-travel and predictable transitions.",
  },
  {
    id: 3,
    question: "What problems does Redux Toolkit solve?",
    answer:
      "Boilerplate reduction, safer immutable updates with Immer, standard store setup, typed patterns.",
  },
  {
    id: 4,
    question: "configureStore advantages?",
    answer:
      "Applies good defaults: devtools, thunk, immutability/serializability checks, and typed dispatch/getState.",
  },
  {
    id: 5,
    question: "createSlice benefits?",
    answer:
      "Co-locates actions and reducers, auto-generates action creators and types, reduces boilerplate.",
  },
  {
    id: 6,
    question: "When to split slices?",
    answer:
      "When domains are independent, ownership differs, or update frequencies differ; avoid giant monolith slices.",
  },
  {
    id: 7,
    question: "How to model normalized entities?",
    answer:
      "Store by id in `entities` with `ids` array; avoid duplicating records in multiple places—reference by id.",
  },
  {
    id: 8,
    question: "createEntityAdapter—why and how?",
    answer:
      "Provides CRUD reducers and memoized selectors; define `selectId` and `sortComparer` to standardize entity access.",
  },
  {
    id: 9,
    question: "Selectors role and benefits?",
    answer:
      "Centralize derived data, memoize computations, reduce re-renders, and simplify components.",
  },
  {
    id: 10,
    question: "Reselect memoization pitfalls?",
    answer:
      "Memoization breaks if inputs aren’t referentially stable; avoid inline objects and new arrays as selector inputs.",
  },
  {
    id: 11,
    question: "Selector factories—when?",
    answer:
      "When per-component props affect selection; create a new selector per instance to isolate memo caches.",
  },
  {
    id: 12,
    question: "Where to put derived UI state?",
    answer:
      "Prefer selectors for derivable data; only store non-derivable UI flags (e.g., modal open) in state.",
  },
  {
    id: 13,
    question: "Thunk vs. RTK Query—choose which?",
    answer:
      "RTKQ for fetching/caching boilerplate-free data; thunks for workflows and side effects not tied to HTTP.",
  },
  {
    id: 14,
    question: "fetchBaseQuery customization?",
    answer: "Add baseUrl, headers, auth token injection, and error handling; use `prepareHeaders`.",
  },
  {
    id: 15,
    question: "RTKQ tags overview?",
    answer:
      "Use `providesTags` and `invalidatesTags` to relate queries and mutations for precise cache invalidation.",
  },
  {
    id: 16,
    question: "Cache lifetime tuning in RTKQ?",
    answer:
      "`keepUnusedDataFor` controls how long unused cache entries persist before garbage collection.",
  },
  {
    id: 17,
    question: "Optimistic updates pattern?",
    answer:
      "Update cache or slice before server response; rollback in `onQueryStarted` catch block if it fails.",
  },
  {
    id: 18,
    question: "serializeQueryArgs purpose?",
    answer:
      "Create stable cache keys for complex params to prevent redundant cache entries and refetch storms.",
  },
  {
    id: 19,
    question: "Polling with RTKQ?",
    answer:
      "Use `pollingInterval` for periodic refresh or manual `refetch`; ensure dedupe to avoid overlapping requests.",
  },
  {
    id: 20,
    question: "Streaming data with Redux?",
    answer:
      "Use middleware to connect WebSocket/SSE and dispatch actions on events; buffer and backoff reconnects.",
  },
  {
    id: 21,
    question: "Handling auth refresh in RTKQ?",
    answer:
      "Intercept 401, perform single refresh flow, retry failed queries using a queue to avoid stampede.",
  },
  {
    id: 22,
    question: "Where to keep tokens?",
    answer:
      "Avoid storing tokens in Redux if possible; prefer HttpOnly cookies; if stored, limit exposure and clear on logout.",
  },
  {
    id: 23,
    question: "Serializability checks—why and when to disable?",
    answer:
      "Ensure time-travel and stability; disable for known non-serializable values (e.g., file blobs) near slice boundaries.",
  },
  {
    id: 24,
    question: "Error handling strategy across app?",
    answer:
      "Normalize error shapes in slices, show user-friendly messages, and avoid raw server errors in state.",
  },
  {
    id: 25,
    question: "Cross-slice communication?",
    answer:
      "Dispatch domain events other slices react to, or use selectors; avoid direct imports of other slices’ state.",
  },
  {
    id: 26,
    question: "Listener middleware—use cases?",
    answer:
      "Centralize reactions to actions, orchestrate side effects, debounce/search, and analytics without scattering thunks.",
  },
  {
    id: 27,
    question: "Middleware vs. enhancers?",
    answer:
      "Middleware wraps dispatch pipeline; enhancers wrap store creation (e.g., devtools, persistence).",
  },
  {
    id: 28,
    question: "Designing action names?",
    answer:
      "Intent-based (`cart/itemAdded`) not transport-based; clearer logs and less churn when APIs change.",
  },
  {
    id: 29,
    question: "Batching actions—benefits?",
    answer:
      "Reduces re-renders and middleware overhead; dispatch one composite action or use batching helpers.",
  },
  {
    id: 30,
    question: "Avoiding store bloat?",
    answer:
      "Keep state minimal, normalized, and serializable; compute derived data in selectors, purge caches on logout.",
  },
  {
    id: 31,
    question: "SSR hydration with Redux?",
    answer:
      "Dehydrate store into HTML, hydrate on client, avoid duplicate client fetch by checking cached state.",
  },
  {
    id: 32,
    question: "Persisting Redux state safely?",
    answer:
      "Persist non-sensitive slices, version schemas, migrate on load, and encrypt if needed.",
  },
  {
    id: 33,
    question: "Migrations for persisted state?",
    answer:
      "Write versioned transforms for structural changes; handle removed fields and set defaults.",
  },
  {
    id: 34,
    question: "Performance tuning useSelector?",
    answer:
      "Return primitives or memoized objects, use shallowEqual, and avoid passing new lambdas/objects.",
  },
  {
    id: 35,
    question: "Equality function caveats?",
    answer:
      "Custom equality must be fast and correct; shallowEqual is usually enough for plain objects.",
  },
  {
    id: 36,
    question: "Why single store is preferred?",
    answer:
      "Simplifies devtools/time-travel and global coordination; multiple stores complicate cross-feature flows.",
  },
  {
    id: 37,
    question: "When might multiple stores be justified?",
    answer:
      "Microfrontends isolation or embedded widgets; ensure clear boundaries and avoid cross-store coupling.",
  },
  {
    id: 38,
    question: "Action payload design best practices?",
    answer:
      "Use minimal, normalized payloads with IDs and metadata; avoid large nested structures.",
  },
  {
    id: 39,
    question: "Time-travel debugging tips?",
    answer:
      "Ensure serializable state, reduce noisy actions, and inspect diffs/selectors to spot unintended changes.",
  },
  {
    id: 40,
    question: "Preventing accidental state mutation in reducers?",
    answer:
      "Immer in RTK prevents mutation; in classic reducers, copy and spread arrays/objects carefully.",
  },
  {
    id: 41,
    question: "Testing reducers effectively?",
    answer:
      "Assert pure transitions: given prev state + action, expect next state; test edge cases and invariants.",
  },
  {
    id: 42,
    question: "Testing thunks?",
    answer:
      "Mock APIs, assert dispatched action sequence, test success/error/cancel paths with fake timers.",
  },
  {
    id: 43,
    question: "Testing selectors?",
    answer:
      "Construct test states and verify derived outputs; include memo cache behavior with identical inputs.",
  },
  {
    id: 44,
    question: "Testing middleware/listeners?",
    answer:
      "Simulate dispatches and assert side effects and subsequent actions; avoid hitting real network.",
  },
  {
    id: 45,
    question: "EntityAdapter advanced usage?",
    answer:
      "Use `upsertMany`, custom `selectIds`, and `selectTotal` for efficient lists and counts.",
  },
  {
    id: 46,
    question: "Paginated lists with EntityAdapter?",
    answer:
      "Keep `idsByPage` map and merge entities via adapter; never duplicate entities per page.",
  },
  {
    id: 47,
    question: "Form state in Redux—when justified?",
    answer:
      "Complex multi-step flows or server-driven validation; otherwise prefer local or form libs.",
  },
  {
    id: 48,
    question: "Undo/redo with Redux?",
    answer:
      "Keep history stacks of past/future states or actions; scope to slices to limit memory.",
  },
  {
    id: 49,
    question: "Feature flags integration?",
    answer:
      "Middleware/selector gates to alter behavior; flags come from config slice or environment.",
  },
  {
    id: 50,
    question: "Analytics with Redux?",
    answer:
      "Middleware logs action lifecycles; include correlation IDs for tracing requests across layers.",
  },
  {
    id: 51,
    question: "Handling WebSocket bursts?",
    answer:
      "Throttle/debounce in middleware, coalesce actions, and limit store churn with derived selectors.",
  },
  {
    id: 52,
    question: "Backpressure strategies?",
    answer: "Drop or buffer low-priority events, batch updates, and announce rate limit to UI.",
  },
  {
    id: 53,
    question: "Large tables performance with Redux?",
    answer:
      "Select only visible row IDs, virtualize UI, memoize row selectors, and avoid passing large arrays.",
  },
  {
    id: 54,
    question: "Dealing with non-determinism in tests?",
    answer: "Inject clocks/random seeds; mock Date/Math.random; keep reducers pure.",
  },
  {
    id: 55,
    question: "Security considerations for state logs?",
    answer: "Redact PII and tokens; avoid logging sensitive payloads; enforce log size limits.",
  },
  {
    id: 56,
    question: "Clearing sensitive state on logout?",
    answer: "Reset relevant slices and RTKQ caches; clear persisted storage and in-memory tokens.",
  },
  {
    id: 57,
    question: "Cross-tab sync strategies?",
    answer:
      "BroadcastChannel/localStorage events to sync logout, theme, and cache invalidation across tabs.",
  },
  {
    id: 58,
    question: "Refactoring legacy reducers to RTK?",
    answer:
      "Move cases into createSlice, introduce Immer updates, keep action types stable via createAction.",
  },
  {
    id: 59,
    question: "Entity relationships modeling?",
    answer:
      "Store foreign keys and derive joins in selectors; avoid embedding nested objects across slices.",
  },
  {
    id: 60,
    question: "Retry with exponential backoff?",
    answer: "Implement in thunks or baseQuery; stop on 4xx; jitter to avoid thundering herd.",
  },
  {
    id: 61,
    question: "Debounce search with listener middleware?",
    answer:
      "React to `queryChanged` with debounce, cancel pending fetch on new input, dispatch fetch when idle.",
  },
  {
    id: 62,
    question: "Cancelable thunks?",
    answer:
      "Use AbortController from thunkAPI.signal; pass to fetch and check `signal.aborted` before updates.",
  },
  {
    id: 63,
    question: "Deduplicating requests?",
    answer:
      "Keep an in-flight map in middleware or rely on RTKQ’s request dedupe; avoid duplicate thunks.",
  },
  {
    id: 64,
    question: "Domain events vs. CRUD actions?",
    answer:
      "Domain events convey intent and decouple from transport; CRUD leaks HTTP concerns into UI.",
  },
  {
    id: 65,
    question: "Error boundary slice?",
    answer:
      "Centralize user-visible errors; allow toasts/alerts to subscribe to this slice for consistent UX.",
  },
  {
    id: 66,
    question: "RTKQ transformResponse use cases?",
    answer:
      "Normalize responses, compute totals, or massage shapes before caching for consistent selectors.",
  },
  {
    id: 67,
    question: "RTKQ `selectFromResult` benefits?",
    answer: "Pick minimal data from query state, lowering re-renders and improving performance.",
  },
  {
    id: 68,
    question: "RTKQ conditional queries?",
    answer:
      "Use `skip`/`skipToken` until prerequisites exist (e.g., userId), avoiding premature network calls.",
  },
  {
    id: 69,
    question: "Schema evolution without breakage?",
    answer:
      "Keep backward-compatible fields, migrations for persisted clients, selectors tolerant to missing fields.",
  },
  {
    id: 70,
    question: "Multi-tenant state design?",
    answer:
      "Namespace by tenant ID; clear tenant slices on switch; scope selectors/actions per tenant context.",
  },
  {
    id: 71,
    question: "Optimizing dev vs. prod store config?",
    answer:
      "Enable checks and logs only in dev; disable in prod for performance; keep feature flags.",
  },
  {
    id: 72,
    question: "Minimizing bundle size?",
    answer:
      "Code-split slices and heavy features; lazy-inject reducers; avoid shipping dev-only middleware.",
  },
  {
    id: 73,
    question: "Using `prepare` callbacks in createSlice?",
    answer:
      "Format payloads, add metadata like correlation IDs, and validate inputs before reducer logic.",
  },
  {
    id: 74,
    question: "Queueing optimistic tasks offline?",
    answer: "Persist queued actions, replay when online, resolve conflicts on server responses.",
  },
  {
    id: 75,
    question: "Monitoring selector performance?",
    answer:
      "Track recomputations with custom memoization logs or devtools plugins; optimize hotspots.",
  },
  {
    id: 76,
    question: "Store size limits?",
    answer:
      "Evict stale data, paginate, and avoid storing giant blobs; derive instead of duplicating.",
  },
  {
    id: 77,
    question: "Why avoid putting derived collections in state?",
    answer: "They drift from source of truth and cause sync bugs; compute with selectors instead.",
  },
  {
    id: 78,
    question: "Security for RTKQ file uploads?",
    answer: "Whitelist types/sizes, sign URLs server-side, and avoid keeping blobs in Redux state.",
  },
  {
    id: 79,
    question: "GraphQL with Redux/RTKQ?",
    answer:
      "Use custom baseQuery for GraphQL or a separate client; still leverage tags for invalidation.",
  },
  {
    id: 80,
    question: "RTKQ + WebSockets integration?",
    answer: "Use extraEndpoints or middleware to update cache entries from socket events.",
  },
  {
    id: 81,
    question: "Local-first patterns with Redux?",
    answer:
      "Stage writes in slices, mark dirty, sync in background, reconcile on server acceptance.",
  },
  {
    id: 82,
    question: "Avoiding hydration tearing issues?",
    answer:
      "Hydrate once, avoid mismatched defaults, and gate client-only slices until after mount.",
  },
  {
    id: 83,
    question: "Action-driven navigation?",
    answer:
      "Dispatch high-level intent actions; handle navigation in middleware with router integration.",
  },
  {
    id: 84,
    question: "Unit boundaries for slices?",
    answer:
      "Slices own domain state + reducers + selectors; side effects live in middleware/listeners.",
  },
  {
    id: 85,
    question: "Detecting unknown actions in reducers?",
    answer:
      "Return previous state for unknown actions; never throw—other slices may dispatch unrelated actions.",
  },
  {
    id: 86,
    question: "Preventing accidental deep copies in reducers?",
    answer:
      "Immer handles it; otherwise only copy the paths you change—avoid JSON.parse/stringify.",
  },
  {
    id: 87,
    question: "Comparing Redux to Zustand/Jotai.",
    answer:
      "Redux excels at tooling, constraints, and ecosystem; others trade constraints for simplicity and size.",
  },
  {
    id: 88,
    question: "Migrating from context-based state.",
    answer:
      "Start by moving hot/global state to Redux; keep local UI state in components; incrementally adopt RTKQ.",
  },
  {
    id: 89,
    question: "RTKQ endpoint design for pagination.",
    answer: "Use cursor-based args, transformResponse to merge, and tags for precise invalidation.",
  },
  {
    id: 90,
    question: "Handling 429/Rate limits.",
    answer: "Dispatch backoff and display retry-after; slow down polling or queue writes.",
  },
  {
    id: 91,
    question: "Preventing infinite retry loops.",
    answer: "Stop on certain status codes, cap attempts, and require manual retry after limit.",
  },
  {
    id: 92,
    question: "A/B flags impacting caching.",
    answer: "Include flag state in query args or tag derivation so caches separate by variant.",
  },
  {
    id: 93,
    question: "Feature ownership and slice boundaries.",
    answer:
      "Each team owns slices and endpoints; contracts are selectors/actions, not internal state shape.",
  },
  {
    id: 94,
    question: "When to trigger global refetch on login.",
    answer:
      "After auth change, invalidate sensitive tags and clear caches to avoid leaking data across users.",
  },
  {
    id: 95,
    question: "Store instrumentation for audits.",
    answer:
      "Record action timings, payload sizes, and reducer durations to detect hotspots/regressions.",
  },
  {
    id: 96,
    question: "Avoiding action storms from UI.",
    answer: "Throttle UI events in middleware, coalesce updates, and prefer final-state actions.",
  },
  {
    id: 97,
    question: "Redux in microfrontends.",
    answer:
      "Namespace actions, avoid shared global store unless necessary, and use events for cross-app comms.",
  },
  {
    id: 98,
    question: "Graceful feature rollback.",
    answer:
      "Guard with flags, maintain backward-compatible schema, and keep migrations reversible.",
  },
  {
    id: 99,
    question: "Documenting slice contracts.",
    answer: "Document selectors/actions/events; keep reducers private; expose stable APIs.",
  },
  {
    id: 100,
    question: "Choosing between RTK createApi vs multiple APIs.",
    answer:
      "Use injectEndpoints for modularity; share baseQuery and tags while keeping domains isolated.",
  },
];
export default REDUX_QUESTIONS;
