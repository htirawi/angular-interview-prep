// Nextjs Interview Questions - 100 Senior-Level Questions
// Auto-generated from markdown

export interface QA {
  id: number;
  question: string;
  answer: string;
  category?: string;
  difficulty?: string;
  tags?: string[];
}

export const NEXTJS_QUESTIONS: QA[] = [
  {
    id: 1,
    question: "App Router vs Pages Router: what changed and why?",
    answer:
      "App Router adopts React Server Components, nested layouts, streaming, and co-located route logic to cut client JS and improve data fetching.",
  },
  {
    id: 2,
    question: "When should a component use 'use client'?",
    answer:
      "Only if it needs state, effects, or event handlers. Keep client islands small and leaf-like.",
  },
  {
    id: 3,
    question: "RSC advantages for data fetching?",
    answer:
      "No client JS shipped, direct server data access, fewer waterfalls, and streaming with Suspense.",
  },
  {
    id: 4,
    question: "Control caching of server `fetch` calls.",
    answer:
      "Use `{ cache: 'no-store' }` or `next: { revalidate: N }`, and pair mutations with tag/path revalidation.",
  },
  {
    id: 5,
    question: "ISR vs SSR vs SSG selection criteria.",
    answer:
      "SSG for static; ISR for periodic updates; SSR for per-request personalization or highly dynamic content.",
  },
  {
    id: 6,
    question: "What does `revalidateTag` do?",
    answer:
      "Invalidates all cached fetches labeled with the tag, prompting fresh reads on next request.",
  },
  {
    id: 7,
    question: "What does `revalidatePath` do?",
    answer:
      "Rebuilds the specific path/segment cache, ideal for page-level updates after mutations.",
  },
  {
    id: 8,
    question: "Route Handlers: when to use them?",
    answer:
      "For small APIs, webhooks, file uploads, server actions helpers; keep logic near routes.",
  },
  {
    id: 9,
    question: "Edge runtime use cases.",
    answer: "Low-latency auth, AB tests, geo routing, lightweight checks; avoid heavy Node APIs.",
  },
  {
    id: 10,
    question: "Node runtime use cases.",
    answer:
      "Access to fs, crypto, heavy libs, or long-lived connections; larger cold starts are acceptable.",
  },
  {
    id: 11,
    question: "Parallel Routes purpose.",
    answer:
      "Render independent subtrees concurrently (e.g., inbox + preview), improving perceived speed.",
  },
  {
    id: 12,
    question: "Intercepting Routes purpose.",
    answer:
      "Display another route (e.g., modal details) on top of current context without losing state.",
  },
  {
    id: 13,
    question: "Authenticated layouts in App Router.",
    answer: "Read cookies/session in server layout and redirect unauthorized users before render.",
  },
  {
    id: 14,
    question: "Draft/Preview Mode behavior.",
    answer: "Temporarily disables static cache for a user to preview unpublished content.",
  },
  {
    id: 15,
    question: "Environment variables safety.",
    answer:
      "Use server env for secrets; only expose NEXT_PUBLIC_* to client; avoid leaking secrets.",
  },
  {
    id: 16,
    question: "Optimizing images with `next/image`.",
    answer:
      "Use `sizes`/`fill`, proper domains, priority on hero, and avoid CLS with fixed aspect boxes.",
  },
  {
    id: 17,
    question: "Using `next/font` effectively.",
    answer: "Automatic subsetting, preloading, no FOIT/FOUT; simpler than manual font CSS.",
  },
  {
    id: 18,
    question: "Dynamic Open Graph images generation.",
    answer:
      "Use `ImageResponse` in a route handler; cache short TTL or tag; personalize via params.",
  },
  {
    id: 19,
    question: "`generateMetadata` usage.",
    answer: "Compose titles, canonical, OG, and JSON-LD from params/data on the server.",
  },
  {
    id: 20,
    question: "Segment-level `loading.tsx`, `error.tsx`, `not-found.tsx`.",
    answer: "Provide skeletons, error boundaries, and 404 UIs per route segment.",
  },
  {
    id: 21,
    question: "Avoiding request waterfalls.",
    answer: "Parallelize server fetches, reduce client boundaries, and stream Suspense shells.",
  },
  {
    id: 22,
    question: "Per-user caching strategy.",
    answer: "Use `no-store` or short `revalidate`; include session in keys; never cache secrets.",
  },
  {
    id: 23,
    question: "File uploads in App Router.",
    answer: "Handle in route handlers with `formData()` and signed URLs; stream to object storage.",
  },
  {
    id: 24,
    question: "Cookies/session hardening.",
    answer: "HttpOnly, Secure, SameSite, rotation, short TTL; CSRF tokens for mutating routes.",
  },
  {
    id: 25,
    question: "Server Actions: benefits and cautions.",
    answer:
      "Co-locate mutations and validation; beware long CPU tasks on serverless; revalidate on success.",
  },
  {
    id: 26,
    question: "Middleware best practices.",
    answer:
      "Keep tiny dependency graph; perform redirects/rewrites; defer heavy logic to handlers.",
  },
  {
    id: 27,
    question: "Prefetching and perceived speed.",
    answer:
      "Link prefetching and RSC streaming deliver fast transitions; preload likely next routes.",
  },
  {
    id: 28,
    question: "Client navigation hooks limitations.",
    answer:
      "Use `useRouter`/`usePathname` only in client components; avoid expensive work in navigation effects.",
  },
  {
    id: 29,
    question: "Persisting filters in the URL.",
    answer: "Use `searchParams`; validate on the server and produce canonical links.",
  },
  {
    id: 30,
    question: "Handling slow external APIs.",
    answer:
      "Stream shell, show skeletons, log slowness; consider background jobs + webhooks + revalidation.",
  },
  {
    id: 31,
    question: "i18n options in App Router.",
    answer: "Locale segments + middleware or libraries; per-locale metadata and sitemaps.",
  },
  {
    id: 32,
    question: "SEO with RSC content.",
    answer:
      "Ensure critical content is server-rendered; set canonical and structured data in metadata.",
  },
  {
    id: 33,
    question: "Security headers and CSP.",
    answer:
      "Set via `headers()` in next.config; use nonces/hashes, HSTS, and frame-ancestors restrictions.",
  },
  {
    id: 34,
    question: "Web Vitals in Next.js.",
    answer: "Implement `reportWebVitals` to send LCP/INP/CLS to an endpoint for monitoring.",
  },
  {
    id: 35,
    question: "Profiling client vs server costs.",
    answer: "Bundle analyze client; trace slow server fetches/DB; watch TTFB and INP in RUM.",
  },
  {
    id: 36,
    question: "Hydration mismatch: causes/fixes.",
    answer:
      "Non-deterministic HTML or time-based output; move logic server-side or gate with effects.",
  },
  {
    id: 37,
    question: "Client-only heavy widgets.",
    answer: "Dynamically import with `{ ssr: false }` to cut initial JS; load on interaction.",
  },
  {
    id: 38,
    question: "Monorepo workflow.",
    answer: "Share UI/server packages, mark edge-safe modules, remote cache with Turborepo/Nx.",
  },
  {
    id: 39,
    question: "Testing App Router.",
    answer:
      "Mock `next/navigation`, test route handlers separately, e2e streaming with Playwright.",
  },
  {
    id: 40,
    question: "Sitemaps and robots via code.",
    answer: "Use `app/sitemap.ts` and `app/robots.ts` to reflect dynamic routes and locales.",
  },
  {
    id: 41,
    question: "Route segment config fields.",
    answer: "Export `runtime`, `revalidate`, `preferredRegion` to tune per-segment behavior.",
  },
  {
    id: 42,
    question: "Graceful degradation under outages.",
    answer: "Serve cached shells, disable mutations, and show incident banners; retry later.",
  },
  {
    id: 43,
    question: "Implementing rate limits.",
    answer: "Token bucket in a route handler or Edge; return 429 with Retry-After and log offense.",
  },
  {
    id: 44,
    question: "Webhook handling patterns.",
    answer: "Verify signature, idempotency key, store event, revalidate tags, respond fast.",
  },
  {
    id: 45,
    question: "Search implementation in RSC.",
    answer: "Query DB in server component, paginate with cursor, stream partial results.",
  },
  {
    id: 46,
    question: "Cursor-based pagination.",
    answer: "Use cursors in searchParams; cache pages; prefetch next; avoid page-number pitfalls.",
  },
  {
    id: 47,
    question: "Validation on the server.",
    answer: "Use Zod/Yup in server actions/handlers; return typed errors through props.",
  },
  {
    id: 48,
    question: "Avoid double-fetch after hydration.",
    answer: "Fetch in RSC only; don’t re-fetch in client effects; pass data via props.",
  },
  {
    id: 49,
    question: "Serving large/binary assets.",
    answer:
      "Use object storage/CDN; avoid bundling; stream downloads via handlers with range support.",
  },
  {
    id: 50,
    question: "Server error logging.",
    answer: "Log to APM in server code; map to user-safe messages; avoid leaking stack traces.",
  },
  {
    id: 51,
    question: "AB tests safely.",
    answer: "Assign variants in Edge middleware, persist in cookie, render both variants in RSC.",
  },
  {
    id: 52,
    question: "Geo personalization.",
    answer:
      "Read geo headers in middleware, set cookie, read in server layout for content decisions.",
  },
  {
    id: 53,
    question: "Feature flags strategy.",
    answer:
      "Evaluate flags on server; expose minimal booleans; avoid shipping the flag system client-side.",
  },
  {
    id: 54,
    question: "CDN vs app caching.",
    answer: "CDN caches HTML/assets; app layer uses fetch caches with tags for data freshness.",
  },
  {
    id: 55,
    question: "Safe `searchParams` handling.",
    answer: "Validate/normalize params; avoid huge objects; build canonical URLs consistently.",
  },
  {
    id: 56,
    question: "Avoid n+1 DB queries.",
    answer: "Batch with `IN` queries, loaders, or pre-joins; cache per request; parallelize.",
  },
  {
    id: 57,
    question: "Real-time updates patterns.",
    answer: "Client websockets for live UI; revalidate or mutate cache on significant changes.",
  },
  {
    id: 58,
    question: "Transactions in Server Actions.",
    answer: "Wrap DB writes in transactions; revalidate on commit; return canonical payloads.",
  },
  {
    id: 59,
    question: "Queues for heavy work.",
    answer:
      "Offload to job queue; notify client via polling/SSE; revalidate affected tags on completion.",
  },
  {
    id: 60,
    question: "Static export constraints.",
    answer: "Use `output: 'export'` for fully static sites; no runtime server code; limited APIs.",
  },
  {
    id: 61,
    question: "Abuse prevention in handlers.",
    answer: "Validate input, authenticate, throttle, and cap payload sizes/timeouts.",
  },
  {
    id: 62,
    question: "Canonical URLs across locales.",
    answer: "Use `alternates` metadata and set canonical per locale to prevent duplicate content.",
  },
  {
    id: 63,
    question: "Cookies in Edge runtime.",
    answer:
      "Use `cookies()`; keep payload small; sign/verify server-side; avoid secrets client-side.",
  },
  {
    id: 64,
    question: "Sessions vs JWTs on the web.",
    answer: "Prefer HttpOnly session cookies; JWTs for APIs/mobile; rotate refresh tokens.",
  },
  {
    id: 65,
    question: "Optimizing LCP with `next/image`.",
    answer: "Mark hero as priority, proper sizes, and preconnect to image CDN; avoid layout shift.",
  },
  {
    id: 66,
    question: "Refactoring client fetch to RSC.",
    answer:
      "Move fetch server-side, delete client effect, rely on Suspense fallbacks and streaming.",
  },
  {
    id: 67,
    question: "Prevent layout shift in streaming.",
    answer:
      "Reserve space with skeletons and stable containers; align fallback markup to final layout.",
  },
  {
    id: 68,
    question: "Handling HEAD/OPTIONS methods.",
    answer: "Export handlers for preflight and health checks; keep responses short and cacheable.",
  },
  {
    id: 69,
    question: "Securing Server Actions.",
    answer:
      "Enforce auth/CSRF in the action; validate inputs; never trust client-sent identifiers.",
  },
  {
    id: 70,
    question: "Fetch deduplication behavior.",
    answer:
      "Identical server fetches within a render are deduped; share results across components.",
  },
  {
    id: 71,
    question: "Programmatic redirects in RSC.",
    answer: "Call `redirect()` in a server segment to enforce auth or canonical routes early.",
  },
  {
    id: 72,
    question: "`notFound()` semantics.",
    answer: "Throw in server code to render the nearest not-found boundary; stops child rendering.",
  },
  {
    id: 73,
    question: "Font loading to reduce CLS.",
    answer: "Use `next/font` to inline and preload; avoid late-adding font CSS.",
  },
  {
    id: 74,
    question: "Measuring cold starts.",
    answer: "Instrument handler start; Edge cold starts are tiny; Node lambdas bigger—trim deps.",
  },
  {
    id: 75,
    question: "Runtime vs build-time secrets.",
    answer: "Keep secrets runtime via env/secret store; avoid embedding secrets at build time.",
  },
  {
    id: 76,
    question: "Opting out of RSC locally.",
    answer: "Wrap subtree with a client component boundary when library needs browser APIs.",
  },
  {
    id: 77,
    question: "Third‑party scripts strategy.",
    answer: "Use `next/script` with appropriate `strategy`; minimize blocking work.",
  },
  {
    id: 78,
    question: "No-JS form handling.",
    answer:
      "Use traditional form POST to route handlers/server actions; progressively enhance with client JS.",
  },
  {
    id: 79,
    question: "Large table strategy.",
    answer: "Render rows server-side; hydrate only interactive cells as small client islands.",
  },
  {
    id: 80,
    question: "Offline considerations.",
    answer:
      "Cache shell/assets; read-only pages can work offline; disable mutations or queue them.",
  },
  {
    id: 81,
    question: "Mapping Pages→App Router.",
    answer:
      "getServerSideProps → server fetch; API routes → handlers; getStaticProps → SSG + revalidate.",
  },
  {
    id: 82,
    question: "Testing `generateMetadata`.",
    answer: "Mock params/data, assert canonical/OG; ensure locale alternates if i18n enabled.",
  },
  {
    id: 83,
    question: "Route groups `(group)` usage.",
    answer: "Share layouts/config across segments without affecting URL structure.",
  },
  {
    id: 84,
    question: "Dynamic segments and catch-all.",
    answer: "Use `[slug]` / `[...all]`; validate and generate params for SSG cases.",
  },
  {
    id: 85,
    question: "Small client islands pattern.",
    answer:
      "Isolate interactive widgets; memoize props; avoid crossing boundaries with huge props.",
  },
  {
    id: 86,
    question: "Dev vs prod differences.",
    answer: "Verify streaming/caching in prod build; dev has extra checks and slower perf.",
  },
  {
    id: 87,
    question: "CI/CD for Next.js.",
    answer:
      "Cache .next, run typecheck/lint/test, build, and deploy previews per PR; smoke test routes.",
  },
  {
    id: 88,
    question: "Structured logging and tracing.",
    answer: "Attach correlation IDs; log start/end of handlers; redact PII; export to APM.",
  },
  {
    id: 89,
    question: "Robust 404/410 handling.",
    answer: "Return not-found for missing, 410 for gone; update sitemaps and internal links.",
  },
  {
    id: 90,
    question: "A11y in streaming pages.",
    answer: "Use landmarks, announce fallbacks, manage focus on navigation; avoid content jumps.",
  },
  {
    id: 91,
    question: "Progressive enhancement mindset.",
    answer: "Render server-first content; add client interactivity only where it aids UX.",
  },
  {
    id: 92,
    question: "Keep client boundaries leaf-sized rationale.",
    answer: "Limits hydration cost and re-render blast radius; improves TTI.",
  },
  {
    id: 93,
    question: "Handler reuse vs duplication.",
    answer:
      "Factor common auth/validation into utilities; keep route handlers focused per resource.",
  },
  {
    id: 94,
    question: "Static params updates after new content.",
    answer:
      "Revalidate lists and details; regenerate params during incremental builds or via webhooks.",
  },
  {
    id: 95,
    question: "SEO-friendly pagination.",
    answer: "Use rel=prev/next, canonical URLs, and meaningful titles/meta per page.",
  },
  {
    id: 96,
    question: "Avoid duplicate fetch across layouts.",
    answer: "Fetch once at the highest server segment; pass results down as props.",
  },
  {
    id: 97,
    question: "Image CDN configuration gotchas.",
    answer: "Whitelist domains, enable AVIF/WebP, and size images correctly to avoid upscaling.",
  },
  {
    id: 98,
    question: "Regional deployment considerations.",
    answer: "Set `preferredRegion` or ISR strategy per segment to minimize latency.",
  },
  {
    id: 99,
    question: "SaaS multitenancy in Next.js.",
    answer: "Namespace routes, scope caches/tags by tenant, and isolate secrets/env per tenant.",
  },
  {
    id: 100,
    question: "Streaming product page skeleton design.",
    answer: "Split gallery/details into Suspense boundaries; stream gallery first, details after.",
  },
];

export default NEXTJS_QUESTIONS;
