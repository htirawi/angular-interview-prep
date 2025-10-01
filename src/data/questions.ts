export type QA = {
  id: number;
  question: string;
  answer: string;
  category?: string;
  difficulty?: "intermediate" | "advanced" | "expert";
  tags?: string[];
};

export const QUESTIONS: QA[] = [
  {
    id: 1,
    question: "What problem does Angular solve as a framework vs. a view library?",
    answer:
      "Angular provides an opinionated, batteries-included stack: DI, routing, forms, HTTP, i18n, testing, and build tooling. This encourages consistent architecture across teams.\n" +
      "Because DI is first-class, cross-cutting concerns (e.g., interceptors, guards, resolvers, tokens) are standardized, improving testability and separation of concerns.\n" +
      "The compiler (AOT), type system, and template semantics give strong guarantees about template correctness at build time and enable optimizations like tree-shaking and hydration.\n" +
      "Angular's primitives (signals, zones/zoneless, change detection, standalone APIs) are cohesive, so scaling to very large apps with multiple teams is more predictable than stitching disparate libraries together.",
    category: "Architecture",
    difficulty: "intermediate",
    tags: ["framework", "architecture", "DI", "compiler"]
  },
  {
    id: 2,
    question: "Explain Angular’s rendering pipeline at a high level (template → DOM).",
    answer:
      "Templates compile to highly optimized instructions (Ivy) during AOT compilation. At runtime, Angular executes those instructions to create and update views.\n" +
      "Change detection (CD) marks views dirty and updates bindings. With Zones, async tasks trigger CD automatically; in zoneless or OnPush+Signals, reactivity is explicit.\n" +
      "Signals (Angular 16+) provide fine-grained reactivity: writes to a signal notify only subscribed computations/effects, reducing unnecessary DOM work."
  },
  {
    id: 3,
    question: "When would you choose zoneless change detection?",
    answer:
      "When you want deterministic, explicit reactivity with signals/observable bridges, and to cut global CD costs from Zone.js patching.\n" +
      "In high-frequency UIs (charts, games, dashboards) where micro-optimizations matter.\n" +
      "When using web workers or non-patched APIs where Zone can’t auto-detect changes; explicit signal/markForCheck calls make the update boundaries clear.\n" +
      "Tradeoff: more discipline—developers must wire reactivity intentionally."
  },
  {
    id: 4,
    question: "What is the difference between template expressions and component class logic?",
    answer:
      "Template expressions should be pure, fast, and side-effect free (no heavy computation, no subscriptions). They are evaluated during CD.\n" +
      "The component class is the place for orchestration, state, DI, and side effects. Complex computations should be memoized (signals/computed) or moved out of the hot path."
  },
  {
    id: 5,
    question: "What are standalone components and why did Angular move in that direction?",
    answer:
      "Standalone components, directives, and pipes can declare their own imports (no NgModule ceremony). This reduces boilerplate and clarifies dependencies.\n" +
      "It simplifies lazy-loading (route-level imports directly reference components). Teams get faster onboarding and less cognitive overhead.\n" +
      "NgModules are still supported, but standalone is the recommended path for new apps since v15+."
  },
  {
    id: 6,
    question: "Signals vs. Observables—what are the different mental models?",
    answer:
      "Signals are pull-based synchronous values with fine-grained dependency tracking. You read with `count()` and write with `count.set(...)`. `computed` derives value; `effect` reacts to changes.\n" +
      "Observables are push-based asynchronous streams (0..n emissions) great for events, async operations, and cancellable flows.\n" +
      "Signals excel at view state; Observables excel at time-based, async, and multi-value sequences. They interoperate via `toSignal`/`toObservable` bridges."
  },
  {
    id: 7,
    question: "When should you prefer a signal over an observable for component state?",
    answer:
      "Use signals for local UI state that is synchronous and frequently read by the template (flags, selected tab, derived counts) for minimal CD churn.\n" +
      "Use observables when you need multiplexing, backpressure, cancellation, or complex async operators (mergeMap, switchMap, etc.).\n" +
      "Hybrid: fetch with RxJS then convert via `toSignal(stream$, { initialValue })` for the template."
  },
  {
    id: 8,
    question: "Is it okay to call .subscribe() directly in components?",
    answer:
      "Prefer the async pipe or `toSignal` to avoid manual subscription management.\n" +
      "If you must subscribe (imperative side effects), scope the subscription: `takeUntilDestroyed()`, `takeUntil(this.destroyRef)`, or inject `DestroyRef` (v16+) and unsubscribe automatically.\n" +
      "Keep subscriptions idempotent and avoid subscribing in templates or inside getters."
  },
  {
    id: 9,
    question: "What is computed() in signals and how is it different from RxJS map?",
    answer:
      "`computed()` creates a memoized derived signal. Angular tracks dependencies automatically; recomputation happens only when inputs change.\n" +
      "RxJS `map` transforms emissions of a stream over time; `computed` always represents the latest value, not a stream sequence."
  },
  {
    id: 10,
    question: "How do you bridge RxJS streams to signals and vice versa?",
    answer:
      "Use `toSignal(observable$, { initialValue })` to expose async data to templates without manual subscribe/unsubscribe.\n" +
      "Use `toObservable(signal)` to feed reactive libraries, NgRx effects, or websocket pipelines with signal-driven values."
  },
  {
    id: 11,
    question: "Subject vs. BehaviorSubject vs. ReplaySubject—how to choose?",
    answer:
      "Subject: no initial value; late subscribers miss past emissions—use for fire-and-forget events.\n" +
      "BehaviorSubject: holds the latest value; new subscribers receive current state immediately—great for state containers.\n" +
      "ReplaySubject(n): replays the last n values to new subscribers—use for caching sequences or late joiners.\n" +
      "For Angular state, BehaviorSubject (or signals) is often better than Subject."
  },
  {
    id: 12,
    question: "Explain switchMap, mergeMap, concatMap, exhaustMap with practical UI examples.",
    answer:
      "switchMap: cancel previous request when a new one arrives (search-as-you-type).\n" +
      "mergeMap: run requests concurrently (upload many files at once).\n" +
      "concatMap: queue requests (submit steps sequentially).\n" +
      "exhaustMap: ignore new triggers until the current completes (avoid double-submission on button spam)."
  },
  {
    id: 13,
    question: "How do you avoid memory leaks with RxJS in Angular?",
    answer:
      "Use async pipe or `toSignal` to auto-manage subscriptions in templates.\n" +
      "When imperative, pair with `takeUntilDestroyed()`, `take(1)`, or `firstValueFrom` where applicable.\n" +
      "Be careful with Subjects—complete them when appropriate and avoid circular streams without `share`/`shareReplay` refCount."
  },
  {
    id: 14,
    question: "What is shareReplay and common pitfalls?",
    answer:
      "`shareReplay({ bufferSize: 1, refCount: true })` caches the last emission and multicasts to late subscribers.\n" +
      "Without `refCount`, the source remains “hot” and never unsubscribes—can leak HTTP calls or sockets. Prefer `{ refCount: true }` for on-demand caching."
  },
  {
    id: 15,
    question: "How do you handle errors in RxJS pipelines cleanly?",
    answer:
      "Use `catchError` in the right place (inner vs outer). Convert to user-friendly states (signals or a Result pattern).\n" +
      "In HTTP streams, `retry`/`retryWhen` for transient failures; ensure side effects (like toasts) are separated from pure transformations."
  },
  {
    id: 16,
    question: "What are HTTP interceptors and their primary use cases?",
    answer:
      "Cross-cutting concerns for auth tokens, request correlation IDs, caching, error normalization, language headers, retry policies, and server-driven features.\n" +
      "They operate on both request and response and can use `HttpContext` to opt-in/opt-out per call without new clients."
  },
  {
    id: 17,
    question: "How do you conditionally bypass an interceptor?",
    answer:
      "Use `HttpContext` keys: define a `new HttpContextToken(() => false)` and set it in the request options. Interceptor checks the key to skip logic for that call (e.g., skip auth for public endpoints)."
  },
  {
    id: 18,
    question: "Where to implement token refresh—interceptor or service?",
    answer:
      "Token refresh fits well in an interceptor to centralize logic. Use a single in-flight refresh (subject/queue) to prevent stampedes; replay queued requests after success, fail them after refresh failure.\n" +
      "Avoid infinite loops by guarding refresh endpoints and using `HttpContext` flags."
  },
  {
    id: 19,
    question: "Show a robust retry strategy for idempotent GETs.",
    answer:
      "Use `retry({ count: 3, delay: exponentialBackoff })` with jitter and stop on 4xx errors using `scan`/`mergeMap` predicates.\n" +
      "For POST/PUT, prefer explicit user action retries unless the API is idempotent (e.g., PUT with idempotency keys)."
  },
  {
    id: 20,
    question: "How do you implement request-level caching?",
    answer:
      "Build a response cache interceptor keyed by URL+params+headers; use `HttpContext` to opt-in per request.\n" +
      "Cache invalidation based on TTL or mutation events; combine with `shareReplay(1, { refCount: true })` to avoid duplicate HTTP hits."
  },
  {
    id: 21,
    question: "Explain CanActivateFn, CanMatchFn, and CanLoad differences.",
    answer:
      "CanMatchFn (v15+) controls whether a route definition matches and is evaluated before lazy loading—great for role-based gating.\n" +
      "CanActivateFn runs after a route is matched, before activation. Good for instance-level checks.\n" +
      "CanLoad (legacy) prevents loading lazy modules; standalone era prefers CanMatchFn with standalone components."
  },
  {
    id: 22,
    question: "What are resolvers and when are they valuable?",
    answer:
      "Resolvers fetch required data before route activation to avoid intermediate loading flicker and ensure a consistent data-ready view.\n" +
      "Prefer resolvers for critical data; for optional data, load in-component and show skeletons."
  },
  {
    id: 23,
    question: "How do you implement custom preloading strategies?",
    answer:
      "Implement `PreloadingStrategy` to preload certain lazy routes based on route.data flags, network conditions, or user signals (prefetch next likely page). Improves perceived performance without hurting initial load."
  },
  {
    id: 24,
    question: "How does router reuse strategy help performance?",
    answer:
      "By caching route components/trees to avoid re-creating expensive views when navigating back and forth—useful in admin consoles with heavy grids.\n" +
      "Manage cache keys and invalidation carefully to avoid stale state."
  },
  {
    id: 25,
    question: "How do you pass typed route data and inject it in standalone era?",
    answer:
      "Use route `data` with typed helpers and `inject(ActivatedRoute)` or `toSignal(route.data)` for reactivity. Prefer constants for keys and narrow types for safety."
  },
  {
    id: 26,
    question: "Default vs. OnPush—what changes?",
    answer:
      "Default: any async event triggers CD from root—safe but noisy in large trees.\n" +
      "OnPush: CD runs when input references change, on component events, or when you mark it (`markForCheck`). With signals, updates are even more localized.\n" +
      "Combine OnPush + signals/computed for minimal updates."
  },
  {
    id: 27,
    question: "How to optimize lists with @for / trackBy?",
    answer:
      "Use the new control flow `@for (item of items; track item.id) { ... }` to minimize DOM churn. The `track` expression ensures stable identity.\n" +
      "For huge lists, consider virtual scroll (CDK) and slice/pagination."
  },
  {
    id: 28,
    question: "Common change detection pitfalls?",
    answer:
      "Mutating arrays/objects in OnPush without cloning (no reference change).\n" +
      "Doing heavy work in template expressions or getters.\n" +
      "Multiple async pipes on the same stream—prefer a single async pipe and `as` syntax or convert to a signal."
  },
  {
    id: 29,
    question: "How to profile performance in Angular?",
    answer:
      "Use Angular DevTools profiler to record CD cycles and highlight components causing most work.\n" +
      "Use Chrome Performance for scripting/layout/paint; check forced reflows and long tasks; use `ngDevMode` flags in dev."
  },
  {
    id: 30,
    question: "Hydration and SSR—what matters?",
    answer:
      "With Angular v17+, SSR + hydration reduces TTI by reusing server-rendered DOM.\n" +
      "Ensure deterministic IDs and avoid non-deterministic client-only code before hydration.\n" +
      "Use `TransferState` to avoid double-fetching during hydration."
  },
  {
    id: 31,
    question: "Reactive vs. Template-driven forms—tradeoffs?",
    answer:
      "Reactive provides explicit, immutable updates, better testability, and composition (form groups, arrays, async validators).\n" +
      "Template-driven is simpler for small forms but harder to scale/test.\n" +
      "For complex enterprise apps, reactive forms are the standard."
  },
  {
    id: 32,
    question: "How do you build a reusable form control with ControlValueAccessor?",
    answer:
      "Implement `writeValue`, `registerOnChange`, `registerOnTouched`, and optionally `setDisabledState`.\n" +
      "Expose `@Input` for config and propagate value changes to form via registered callbacks.\n" +
      "Provide `NG_VALUE_ACCESSOR` in the component (standalone-friendly)."
  },
  {
    id: 33,
    question: "Async validation patterns that don’t spam the server?",
    answer:
      "Debounce user input, `distinctUntilChanged`, and `switchMap` to the validation HTTP call. Cancel in-flight validations on new input.\n" +
      "Use `updateOn: 'blur'` for certain fields to reduce noise."
  },
  {
    id: 34,
    question: "How to manage large dynamic forms?",
    answer:
      "Use strongly-typed form models (v14+), split into feature sub-forms, and leverage `FormArray` for repeating groups.\n" +
      "Persist draft state in signals or store; lazy-load heavy validators; memoize derived UI state."
  },
  {
    id: 35,
    question: "How do you bridge signals with reactive forms?",
    answer:
      "Convert `form.valueChanges` to a signal for template use; or drive form values from signals using effects.\n" +
      "Avoid feedback loops—gate updates via equality checks or `distinctUntilChanged`."
  },
  {
    id: 36,
    question: "Classic @Input/@Output vs. input()/output() signals?",
    answer:
      "`input()` creates a signal-backed input—reading it in template/class doesn’t trigger extra CD and composes with `computed` easily.\n" +
      "`output()` creates a strongly-typed EventEmitter-like output with less ceremony.\n" +
      "Signal inputs reduce boilerplate for derived state and remove many `ngOnChanges` cases."
  },
  {
    id: 37,
    question: "When do you still need ngOnChanges?",
    answer:
      "When you need to compare previous vs current values deeply or react to multiple inputs together before render.\n" +
      "With signal `computed`, many cases disappear, but for non-signals codebases `ngOnChanges` remains useful."
  },
  {
    id: 38,
    question: "How to prevent unnecessary child re-renders from a parent?",
    answer:
      "Prefer immutable inputs with stable references; memoize callbacks; avoid passing fresh lambdas.\n" +
      "Use OnPush and trackBy for lists; hoist constants from templates; avoid inline `new Date()`/`[]` literals."
  },
  {
    id: 39,
    question: "How do you share state between siblings without a global store?",
    answer:
      "Use a service with `providedIn: 'root'` or feature providers, exposing signals/BehaviorSubjects; inject in both siblings.\n" +
      "For short-lived scope, provide the service at a parent component to bound lifecycle."
  },
  {
    id: 40,
    question: "How does content projection affect change detection?",
    answer:
      "Projected content runs CD in the context of the projecting component. If the child is OnPush, projected templates can still update when the parent changes.\n" +
      "Understand tree ownership for correct performance tuning."
  },
  {
    id: 41,
    question: "What does ngOnDestroy guarantee and how do you use DestroyRef?",
    answer:
      "`ngOnDestroy` is called when Angular destroys the component/directive—clean up resources (subscriptions, timers).\n" +
      "In v16+, inject `DestroyRef` and use `takeUntilDestroyed()` or signal effect teardowns to avoid manual unsubscribe boilerplate."
  },
  {
    id: 42,
    question: "Common lifecycle mistakes?",
    answer:
      "Subscribing in `ngOnInit` without unsubscribing; mutating inputs in `ngOnChanges` without guarding; relying on `ngAfterViewInit` for layout before styles/fonts are ready."
  },
  {
    id: 43,
    question: "How do you detect and act on viewport size/lifecycle safely?",
    answer:
      "Use `fromEvent(window, 'resize')` with `auditTime` and `distinctUntilChanged` (on breakpoints), or the CDK `BreakpointObserver`. Convert to a signal for templates."
  },
  {
    id: 44,
    question: "When is NgRx the right choice vs. signals/services?",
    answer:
      "NgRx shines with complex, cross-cutting, multi-page state, strict immutability, time-travel debugging, and a clear action log for audits.\n" +
      "For local/stateful UIs, signals + services are lighter. Many teams use NgRx for domain state and signals for view state."
  },
  {
    id: 45,
    question: "What are selectors and why are they critical?",
    answer:
      "Selectors are pure, memoized functions to derive state efficiently and avoid recomputation.\n" +
      "Co-locate selectors with feature slices; compose them rather than reading store shape directly in components."
  },
  {
    id: 46,
    question: "Effects best practices?",
    answer:
      "Keep effects thin—map actions to side-effects (HTTP, navigation, toasts) and back to new actions.\n" +
      "Use `concatLatestFrom` to access store state; avoid nested subscribes. Always handle errors and completion."
  },
  {
    id: 47,
    question: "How to structure actions to avoid “action soup”?",
    answer:
      "Group by feature and intent, not by HTTP method: e.g., `loadUsers`, `loadUsersSuccess/Failure`.\n" +
      "Use `createActionGroup` for namespacing and reduced boilerplate."
  },
  {
    id: 48,
    question: "How to test NgRx?",
    answer:
      "Reducers: pure function tests with input action and initial state.\n" +
      "Effects: marble tests or schedulers with `provideMockActions`; assert dispatched actions and error paths."
  },
  {
    id: 49,
    question: "Any caveats with @ngrx/component-store?",
    answer:
      "Great for component-scoped state with RxJS fluency.\n" +
      "Watch for accidental memory leaks via long-lived subscriptions; expose view state as selectors and keep updaters immutable."
  },
  {
    id: 50,
    question: "Using signals with NgRx?",
    answer:
      "Bridge selector streams to signals with `toSignal(store.select(...), { initialValue })` for template ergonomics.\n" +
      "Keep NgRx as the single source of truth; signals are a presentation layer."
  },
  {
    id: 51,
    question: "What’s your approach to auth in Angular?",
    answer:
      "JWT or session cookies with CSRF protection, short-lived access tokens + refresh tokens.\n" +
      "Use interceptors for attaching tokens and handling 401/419 refresh.\n" +
      "Guards (CanMatchFn) to gate routes; role claims decoded client-side only for UX—server still enforces."
  },
  {
    id: 52,
    question: "LocalStorage vs. SessionStorage vs. Cookies?",
    answer:
      "LocalStorage: persistent, but vulnerable to XSS—avoid storing refresh tokens.\n" +
      "SessionStorage: cleared on tab close; similar XSS risks.\n" +
      "Cookies: HttpOnly cookies mitigate XSS token theft; combine with SameSite, Secure, and CSRF tokens."
  },
  {
    id: 53,
    question: "How to implement “remember me” securely?",
    answer:
      "Store only non-sensitive hints client-side; keep refresh token in HttpOnly cookie with proper expiry.\n" +
      "On login, server sets cookie with long max-age; client reads user profile on app load via a `/me` endpoint."
  },
  {
    id: 54,
    question: "Best practices for logout?",
    answer:
      "Clear client caches/signals, invalidate refresh tokens server-side, and remove sensitive state.\n" +
      "Redirect to a neutral route and clear stale interceptor state (e.g., in-flight refresh queues)."
  },
  {
    id: 55,
    question: "How do you approach route-level permissions (RBAC)?",
    answer:
      "Centralize permission checks in a `PermissionsService` (signals/observables). Guards read from it; components use structural directives (e.g., `*appHasPermission`) or signals to toggle UI affordances consistently."
  },
  {
    id: 56,
    question: "How do you structure a WebSocket service?",
    answer:
      "Encapsulate socket connection lifecycle in a service provided at root/feature; expose observables for inbound messages and methods for outbound.\n" +
      "Reconnect with backoff; serialize/deserialize safely.\n" +
      "For SignalR, wrap the official client in a service and bridge to signals for templates."
  },
  {
    id: 57,
    question: "How do you prevent duplicate socket messages to components?",
    answer:
      "Use `share`/`shareReplay` on message streams in the service (hot observable). Components subscribe via async pipe or `toSignal` to avoid extra connections."
  },
  {
    id: 58,
    question: "Handling presence/online status efficiently?",
    answer:
      "Keep a map of userId→status (signal or BehaviorSubject). Update on heartbeats/pings; throttle UI updates and batch renders with `effect` scheduling if needed."
  },
  {
    id: 59,
    question: "How to combine HTTP bootstrap with realtime updates?",
    answer:
      "Fetch initial snapshot via HTTP; then merge with a socket diff stream (e.g., `scan` to apply patches). Convert result to a computed signal for the view."
  },
  {
    id: 60,
    question: "Error handling with SignalR?",
    answer:
      "Listen to `onreconnecting`/`onreconnected`, surface UI banners via signals, and queue outbound messages during reconnects.\n" +
      "Use exponential backoff and circuit-breaker semantics for repeated failures."
  },
  {
    id: 61,
    question: "When do pipes belong in Angular vs. RxJS?",
    answer:
      "Angular pipes transform display values (pure functions) and should be fast and pure; RxJS transforms streams before they hit the template.\n" +
      "Heavy/async transformations don’t belong in a pure pipe; use an async pipe on an observable/signal that already did the work."
  },
  {
    id: 62,
    question: "Impure pipes—ever okay?",
    answer:
      "Rarely; they run on every CD. If needed (e.g., date-now), consider a signal + interval or a memoized computed instead."
  },
  {
    id: 63,
    question: "Using async pipe correctly?",
    answer:
      "Don’t nest multiple asyncs in the same expression; unwrap once and use `as` to assign.\n" +
      "For multiple streams, combine upstream (combineLatest) then expose a single stream."
  },
  {
    id: 64,
    question: "Can I write a pipe that accepts a signal?",
    answer:
      "Yes, but prefer transforming the signal via `computed` in the component and exposing the result directly. Keep pipes simple to keep CD cheap."
  },
  {
    id: 65,
    question: "What about i18n and pipes?",
    answer:
      "Prefer Angular i18n for messages; for custom formatting (currency, SAR symbol, RTL-aware), encapsulate in pure pipes and drive locale via injection tokens."
  },
  {
    id: 66,
    question: "How does Angular DI resolution work?",
    answer:
      "Hierarchical injectors resolve tokens by walking up the tree (component → module → root). The nearest provider wins.\n" +
      "Multi-providers aggregate arrays; `useExisting`, `useFactory`, and `useClass` define composition strategies."
  },
  {
    id: 67,
    question: "What changed with inject()?",
    answer:
      "`inject()` enables DI without constructors, especially in standalone functions (guards, resolvers, effects factories).\n" +
      "It can be used inside component code paths that run within an injection context."
  },
  {
    id: 68,
    question: "Feature providers and scoping?",
    answer:
      "Provide services at the feature route level (via `providers` on Route) to scope lifetime and enable multiple instances per route subtree—great for multi-tab admin pages."
  },
  {
    id: 69,
    question: "Environment-specific configuration?",
    answer:
      "Use injection tokens for config objects; provide different values per environment.\n" +
      "Avoid importing environment files directly into feature code."
  },
  {
    id: 70,
    question: "OpaqueToken vs. InjectionToken?",
    answer:
      "OpaqueToken is deprecated. Use `InjectionToken<T>` with a proper generic for typed DI and optional factory default."
  },
  {
    id: 71,
    question: "How to test a standalone component with signals?",
    answer:
      "Configure TestBed with `imports: [ComponentUnderTest]`.\n" +
      "Drive signals by setting their values and assert DOM updates; use `fakeAsync`/`tick` for async effects if needed."
  },
  {
    id: 72,
    question: "How to test interceptors?",
    answer:
      "Provide the interceptor in testing module with `provideHttpClient(withInterceptors([YourInterceptor]))`.\n" +
      "Use `HttpTestingController` to flush responses and assert request headers/contexts."
  },
  {
    id: 73,
    question: "Testing guards/resolvers?",
    answer:
      "Call the function-based guard/resolver directly with a mocked `Router`, `ActivatedRouteSnapshot`, and injected services via `TestBed.inject` or `inject()`.\n" +
      "Assert returned `UrlTree` or data observable."
  },
  {
    id: 74,
    question: "Testing NgRx reducers/effects?",
    answer:
      "Reducers: pure function tests with input action and initial state.\n" +
      "Effects: marble tests or real schedulers with `provideMockActions`. Ensure error paths are covered."
  },
  {
    id: 75,
    question: "Component harnesses (CDK)—why useful?",
    answer:
      "They provide a stable, DOM-agnostic API for interacting with components in tests, reducing fragility when DOM structure changes."
  },
  {
    id: 76,
    question: "Largest Contentful Paint (LCP) improvements in Angular?",
    answer:
      "SSR + hydration, route-level code splitting, critical CSS inlining, and deferring non-critical scripts.\n" +
      "Optimize hero images (ngOptimizedImage), and preconnect/preload required fonts/APIs."
  },
  {
    id: 77,
    question: "Total Blocking Time (TBT) improvements?",
    answer:
      "Split heavy work into web workers; lazy-import rarely used libraries; avoid synchronous layout thrashing;\n" +
      "use signals to minimize template recomputation."
  },
  {
    id: 78,
    question: "Tree-shaking friendly code patterns?",
    answer:
      "Avoid side-effectful top-level code; prefer per-feature imports; mark classes with pure annotations where applicable; keep providers local to features."
  },
  {
    id: 79,
    question: "Asset and image optimization (Angular 17+)?",
    answer:
      "Use `<img ngSrc=\"...\" priority>` / `ngOptimizedImage`.\n" +
      "Serve modern formats (WebP/AVIF), use responsive `sizes` and width/height to avoid CLS."
  },
  {
    id: 80,
    question: "CSP and security headers?",
    answer:
      "Use strict CSP with nonces/hashes; forbid `unsafe-inline` where possible;\n" +
      "set HSTS, X-Frame-Options/Frame-Ancestors, and proper `Referrer-Policy`. Ensure HttpOnly/SameSite cookies for auth."
  },
  {
    id: 81,
    question: "Why use @if, @for, @switch over *ngIf/*ngFor?",
    answer:
      "New control flow compiles to more efficient instructions, supports keyed `track` natively, and improves ergonomics (no `ng-container` gymnastics).\n" +
      "It’s also more predictable for diffing."
  },
  {
    id: 82,
    question: "Handling placeholder/skeletons with new control flow?",
    answer:
      "`@if (data(); as d) { ... } @else { <skeleton/> }` with signals powering data readiness.\n" +
      "Keeps templates concise and CD minimal."
  },
  {
    id: 83,
    question: "Template ref variables vs. ViewChild?",
    answer:
      "Template refs are great for local template interaction. `ViewChild` is for component logic needing an imperative handle.\n" +
      "Avoid exposing DOM to business logic—wrap in directives/services."
  },
  {
    id: 84,
    question: "Avoiding template bloat?",
    answer:
      "Extract presentational components; move complex conditionals to `computed` signals; keep templates declarative and side-effect free."
  },
  {
    id: 85,
    question: "Content queries vs. view queries?",
    answer:
      "ViewChild/ViewChildren query the component’s own view. ContentChild/ContentChildren query projected content from the parent.\n" +
      "Misuse can lead to lifecycle surprises."
  },
  {
    id: 86,
    question: "Key accessibility steps you always take?",
    answer:
      "Semantic HTML first, proper labels/roles, focus management on navigation, keyboard traps avoided, and visible focus outlines.\n" +
      "Color contrast audited; aria-live regions for async updates; i18n for message catalogs."
  },
  {
    id: 87,
    question: "RTL and i18n in Angular 17+?",
    answer:
      "Use Angular i18n or Transloco/ngx-translate; set `dir=rtl` where needed; swap icons and paddings with logical properties;\n" +
      "prebuild locale data and lazy-load language packs."
  },
  {
    id: 88,
    question: "Focus management after navigation?",
    answer:
      "Move focus to the main content container and announce page changes via aria-live. CDK’s `FocusMonitor` helps ensure keyboard accessibility."
  },
  {
    id: 89,
    question: "Forms and screen readers—what to watch for?",
    answer:
      "Associate labels with controls, describe errors via `aria-describedby`, and announce validation on submit/blur only—not every keystroke."
  },
  {
    id: 90,
    question: "Dynamic content updates?",
    answer:
      "Use signals/effects to update ARIA-friendly regions sparingly; ensure announcements don’t spam users with frequent updates."
  },
  {
    id: 91,
    question: "Nx or workspace libraries—what’s your approach?",
    answer:
      "Use Nx for large orgs: graph-aware builds, affected tests, generators, and consistent libs.\n" +
      "Split domain, UI, and data-access layers; enforce boundaries with lint rules."
  },
  {
    id: 92,
    question: "Versioning internal libraries?",
    answer:
      "SemVer with automated release notes; use changesets.\n" +
      "Keep peerDependencies aligned with Angular versions; test libraries against multiple Angular minors with CI matrix."
  },
  {
    id: 93,
    question: "Public API surfaces?",
    answer:
      "Barrel files per library; limit exports; strict TS configs.\n" +
      "Avoid leaking internal types that you may want to refactor later."
  },
  {
    id: 94,
    question: "Linting & formatting standards?",
    answer:
      "ESLint with Angular-specific rules, import sorting, no `any`, strict template type checking, and commit hooks (lint-staged + prettier)."
  },
  {
    id: 95,
    question: "CI for Angular apps?",
    answer:
      "Cache pnpm/npm, run `ng test --watch=false --browsers=ChromeHeadless`, `ng e2e` if applicable, `ng build --configuration=production`, and upload build artifacts.\n" +
      "Block merges on failing checks."
  },
  {
    id: 96,
    question: "Error monitoring & logging?",
    answer:
      "Provide a custom `ErrorHandler` to report exceptions to Sentry/Datadog.\n" +
      "Include correlation IDs from interceptors. Redact PII, and sample noisy errors to control cost."
  },
  {
    id: 97,
    question: "Feature flags?",
    answer:
      "Gate risky features with flags from a remote config; expose as signals; vary by environment, role, or cohort.\n" +
      "Snapshot on bootstrap and refresh periodically."
  },
  {
    id: 98,
    question: "Runtime configuration?",
    answer:
      "Avoid rebuilding for every env. Fetch `/config.json` at bootstrap and provide it via DI token.\n" +
      "This enables the same image to run in multiple environments."
  },
  {
    id: 99,
    question: "Security gotchas in Angular?",
    answer:
      "Never bypass Angular sanitization casually; use `DomSanitizer` only with strict reviews.\n" +
      "Avoid `[innerHTML]` with untrusted content; escape URLs; enforce CSP and HttpOnly cookies."
  },
  {
    id: 100,
    question: "What do you do on Day 1 in a new Angular codebase?",
    answer:
      "Map architecture: routes, state, DI graph, and data flow. Identify hot spots (heavy components), audit interceptors/guards, check strictness (TS, template), run perf/lighthouse and a11y baselines, and agree on coding standards (signals, OnPush, async pipe policy) with the team."
  }
];
