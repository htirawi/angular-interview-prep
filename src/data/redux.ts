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
  {
    id: 101,
    question: "What is Redux Toolkit, and how does it simplify Redux?",
    answer: `Redux Toolkit (RTK) is the official, recommended way to write Redux code. It reduces boilerplate and encourages best practices by default.

**Key Features:**
- **createSlice**: Combines reducers and actions in one place
- **configureStore**: Easy middleware setup with good defaults
- **Immutability**: Uses Immer.js for safe "mutating" logic
- **Built-in DevTools**: Automatic Redux DevTools integration
- **TypeScript Support**: Full type safety out of the box

**Example:**
\`\`\`javascript
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    incrementByAmount: (state, action) => state + action.payload
  }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
\`\`\`

**Benefits:**
- Reduces boilerplate by ~70%
- Prevents common mistakes
- Encourages immutable updates
- Automatic action type generation`,
    category: "Redux Toolkit",
    difficulty: "intermediate",
    tags: ["redux-toolkit", "createSlice", "boilerplate", "immer"],
  },
  {
    id: 102,
    question: "What is a thunk and how does redux-thunk work?",
    answer: `A thunk is a function that returns another function. It allows you to write async logic that interacts with the Redux store.

**How redux-thunk works:**
1. Intercepts functions instead of plain objects
2. Calls the function with \`dispatch\` and \`getState\` as arguments
3. Allows async operations before dispatching actions

**Example:**
\`\`\`javascript
// Thunk action creator
const fetchUser = (userId) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const userData = await response.json();
    dispatch(setUser(userData));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Usage in component
const dispatch = useDispatch();
useEffect(() => {
  dispatch(fetchUser(123));
}, [dispatch]);
\`\`\`

**Key Benefits:**
- Handle async operations
- Access current state via \`getState\`
- Dispatch multiple actions
- Error handling capabilities
- Loading state management`,
    category: "Redux Thunks",
    difficulty: "intermediate",
    tags: ["thunks", "async", "redux-thunk", "middleware"],
  },
  {
    id: 103,
    question: "What is createSlice() and how is it different from manual reducers?",
    answer: `createSlice() combines reducers and action creators in one place, significantly reducing boilerplate.

**Key Differences:**

**Manual Redux (Old Way):**
\`\`\`javascript
// Action types
const INCREMENT = 'counter/increment';
const DECREMENT = 'counter/decrement';

// Action creators
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });

// Reducer
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};
\`\`\`

**Redux Toolkit (Modern Way):**
\`\`\`javascript
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    incrementByAmount: (state, action) => state + action.payload
  }
});

// Auto-generated action creators
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
\`\`\`

**Benefits:**
- **Auto-generates action types** (e.g., 'counter/increment')
- **Uses Immer** for safe "mutating" logic
- **Co-locates** related code
- **Reduces boilerplate** by ~70%
- **TypeScript support** out of the box`,
    category: "Redux Toolkit",
    difficulty: "intermediate",
    tags: ["createSlice", "reducers", "actions", "immer", "boilerplate"],
  },
  {
    id: 104,
    question: "What is configureStore()?",
    answer: `configureStore() is Redux Toolkit's replacement for createStore(). It provides sensible defaults and reduces configuration complexity.

**Key Features:**
- **Automatic middleware**: Includes redux-thunk by default
- **DevTools integration**: Automatic Redux DevTools setup
- **Multiple reducers**: Built-in combineReducers functionality
- **Development checks**: Immutability and serializability checks
- **TypeScript support**: Full type safety

**Example:**
\`\`\`javascript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    // Automatically combines reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
\`\`\`

**vs createStore():**
- **Less configuration** required
- **Better defaults** for production
- **Automatic middleware** setup
- **Built-in DevTools** integration
- **Type safety** improvements`,
    category: "Redux Toolkit",
    difficulty: "intermediate",
    tags: ["configureStore", "store", "middleware", "devtools"],
  },
  {
    id: 105,
    question: "What are selectors and why are they useful?",
    answer: `Selectors are functions that extract specific pieces of state from the Redux store. They provide a clean abstraction layer for accessing state.

**Why Use Selectors:**
- **Performance**: Memoization prevents unnecessary re-renders
- **Abstraction**: Hide state shape complexity
- **Reusability**: Share logic across components
- **Testing**: Easy to unit test in isolation
- **Maintainability**: Centralized state access logic

**Basic Selector:**
\`\`\`javascript
// Simple selector
const selectCartItems = (state) => state.cart.items;
const selectCartTotal = (state) => state.cart.total;

// Usage in component
const cartItems = useSelector(selectCartItems);
const cartTotal = useSelector(selectCartTotal);
\`\`\`

**Memoized Selectors with Reselect:**
\`\`\`javascript
import { createSelector } from '@reduxjs/toolkit';

// Input selectors
const selectCartItems = (state) => state.cart.items;
const selectTaxRate = (state) => state.settings.taxRate;

// Memoized selector
const selectCartTotal = createSelector(
  [selectCartItems, selectTaxRate],
  (items, taxRate) => {
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    return subtotal * (1 + taxRate);
  }
);

// Complex derived state
const selectCartSummary = createSelector(
  [selectCartItems, selectCartTotal],
  (items, total) => ({
    itemCount: items.length,
    total,
    isEmpty: items.length === 0
  })
);
\`\`\`

**Benefits:**
- **Prevents unnecessary calculations**
- **Improves component performance**
- **Clean separation of concerns**
- **Easy to test and maintain**`,
    category: "Redux Selectors",
    difficulty: "intermediate",
    tags: ["selectors", "reselect", "memoization", "performance"],
  },
  {
    id: 106,
    question: "How do you persist Redux state across reloads?",
    answer: `Use redux-persist to save Redux state to localStorage (or AsyncStorage in React Native) and restore it on app reload.

**Setup:**
\`\`\`javascript
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'cart'], // Only persist these reducers
  blacklist: ['ui'], // Don't persist these reducers
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Create persistor
const persistor = persistStore(store);

export { store, persistor };
\`\`\`

**App Setup:**
\`\`\`javascript
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <YourApp />
      </PersistGate>
    </Provider>
  );
}
\`\`\`

**Advanced Configuration:**
\`\`\`javascript
const persistConfig = {
  key: 'root',
  storage,
  transforms: [
    // Encrypt sensitive data
    encryptTransform({
      secretKey: 'my-secret-key',
    }),
  ],
  migrate: createMigrate({
    1: (state) => {
      // Handle state migration
      return { ...state, version: 1 };
    },
  }),
};
\`\`\`

**Benefits:**
- **User experience**: Maintains state across sessions
- **Performance**: Reduces initial data loading
- **Flexibility**: Choose what to persist
- **Security**: Optional encryption support`,
    category: "Redux Persistence",
    difficulty: "intermediate",
    tags: ["redux-persist", "localStorage", "state-persistence", "rehydration"],
  },
  {
    id: 107,
    question: "How do you handle multiple reducers in Redux Toolkit?",
    answer: `Redux Toolkit provides several ways to handle multiple reducers, with configureStore being the most common approach.

**Method 1: configureStore (Recommended)**
\`\`\`javascript
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import cartSlice from './features/cart/cartSlice';
import productsSlice from './features/products/productsSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    products: productsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
\`\`\`

**Method 2: combineReducers (Manual)**
\`\`\`javascript
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
\`\`\`

**Method 3: Feature-based Structure**
\`\`\`javascript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

// features/auth/authSlice.ts
export const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, isAuthenticated: false },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});
\`\`\`

**Best Practices:**
- **Feature-based organization**: Group related slices together
- **Single responsibility**: Each slice handles one domain
- **Consistent naming**: Use descriptive slice names
- **Type safety**: Export RootState and AppDispatch types`,
    category: "Redux Architecture",
    difficulty: "intermediate",
    tags: ["multiple-reducers", "configureStore", "combineReducers", "architecture"],
  },
  {
    id: 108,
    question: "What are extraReducers in Redux Toolkit?",
    answer: `extraReducers allows a slice to respond to actions not defined in its own reducers. This is essential for handling async thunks and cross-slice actions.

**When to Use extraReducers:**
- **Async thunks**: Handle loading, success, and error states
- **Cross-slice actions**: Respond to actions from other slices
- **External actions**: Handle actions from libraries or legacy code

**Example with Async Thunk:**
\`\`\`javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(\`/api/users/\${userId}\`);
      if (!response.ok) throw new Error('Failed to fetch user');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
\`\`\`

**Cross-Slice Actions:**
\`\`\`javascript
// authSlice.ts
export const logout = createAction('auth/logout');

// cartSlice.ts
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.items = []; // Clear cart on logout
    });
  },
});
\`\`\`

**Benefits:**
- **Clean separation**: Keep async logic separate from sync reducers
- **Reusability**: Handle common patterns across slices
- **Type safety**: Full TypeScript support
- **Predictable**: Follows Redux patterns`,
    category: "Redux Toolkit",
    difficulty: "intermediate",
    tags: ["extraReducers", "async-thunks", "cross-slice", "createAsyncThunk"],
  },
  {
    id: 109,
    question: "What's the difference between mapStateToProps and useSelector()?",
    answer: `mapStateToProps is the legacy approach used with connect() in class components, while useSelector() is the modern hook-based approach for functional components.

**mapStateToProps (Legacy):**
\`\`\`javascript
import { connect } from 'react-redux';

class UserProfile extends Component {
  render() {
    const { user, loading, error } = this.props;
    // Component logic
  }
}

const mapStateToProps = (state) => ({
  user: state.user.data,
  loading: state.user.loading,
  error: state.user.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (id) => dispatch(fetchUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
\`\`\`

**useSelector() (Modern):**
\`\`\`javascript
import { useSelector, useDispatch } from 'react-redux';

function UserProfile() {
  const user = useSelector((state) => state.user.data);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  // Component logic
}
\`\`\`

**Key Differences:**

| Feature | mapStateToProps | useSelector() |
|---------|----------------|---------------|
| **Component Type** | Class components | Functional components |
| **Boilerplate** | High (HOC wrapper) | Low (direct hook usage) |
| **Performance** | Manual optimization | Automatic optimization |
| **TypeScript** | Complex typing | Simple typing |
| **Testing** | Harder to test | Easier to test |
| **Reusability** | Limited | High |

**Performance Comparison:**
\`\`\`javascript
// mapStateToProps - manual optimization needed
const mapStateToProps = (state, ownProps) => {
  // Manual memoization required
  return {
    expensiveData: expensiveSelector(state, ownProps.id),
  };
};

// useSelector - automatic optimization
const expensiveData = useSelector((state) => 
  expensiveSelector(state, userId)
);
\`\`\`

**Recommendation:**
- ✅ **Use useSelector()** for new projects
- ✅ **Migrate from mapStateToProps** when refactoring
- ❌ **Avoid mapStateToProps** unless maintaining legacy code`,
    category: "React Redux",
    difficulty: "intermediate",
    tags: ["useSelector", "mapStateToProps", "connect", "hooks", "legacy"],
  },
  {
    id: 110,
    question: "How would you structure a large Redux app?",
    answer: `A well-structured Redux app follows feature-based organization with clear separation of concerns and scalable patterns.

**Recommended Structure:**
\`\`\`
/src
  /store
    index.ts              # Store configuration
    rootReducer.ts        # Root reducer (if needed)
  /features
    /auth
      authSlice.ts        # Auth reducer + actions
      authAPI.ts          # Auth async thunks
      authSelectors.ts    # Auth selectors
      authTypes.ts        # Auth TypeScript types
    /cart
      cartSlice.ts
      cartSelectors.ts
      cartTypes.ts
    /products
      productsSlice.ts
      productsAPI.ts
      productsSelectors.ts
      productsTypes.ts
  /shared
    /components           # Reusable components
    /hooks               # Custom hooks
    /utils               # Utility functions
    /types               # Global types
\`\`\`

**Store Configuration:**
\`\`\`javascript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
\`\`\`

**Feature Slice Example:**
\`\`\`javascript
// features/auth/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
\`\`\`

**Selectors:**
\`\`\`javascript
// features/auth/authSelectors.ts
import { createSelector } from '@reduxjs/toolkit';

const selectAuthState = (state) => state.auth;

export const selectUser = createSelector(
  [selectAuthState],
  (auth) => auth.user
);

export const selectIsAuthenticated = createSelector(
  [selectUser],
  (user) => !!user
);

export const selectAuthLoading = createSelector(
  [selectAuthState],
  (auth) => auth.loading
);
\`\`\`

**Best Practices:**
- **Feature isolation**: Each feature is self-contained
- **Consistent naming**: Use descriptive, consistent names
- **Type safety**: Export and use TypeScript types
- **Separation of concerns**: Keep API logic separate from UI logic
- **Reusable patterns**: Create shared utilities and hooks`,
    category: "Redux Architecture",
    difficulty: "senior",
    tags: ["architecture", "structure", "features", "scalability", "best-practices"],
  },
];
export default REDUX_QUESTIONS;
