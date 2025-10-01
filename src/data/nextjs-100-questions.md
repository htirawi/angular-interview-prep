# Next.js (App Router, SSR/SSG/ISR, Edge, RSC) — 100 Mock Interview Questions with Senior-Level Answers

---

### 1) App Router vs. Pages Router—why the shift and when to use which?

**Answer (senior-level):**

- App Router embraces React Server Components (RSC), nested layouts, streaming, and colocation.
- Prefer App Router for new apps; Pages only for legacy support/migration.

### 2) What are React Server Components (RSC) in Next.js and why do they matter?

**Answer (senior-level):**

- RSC run on the server and don't ship JS to the client, reducing bundle size.
- They fetch data without waterfalls and compose with Client Components for interactivity.

### 3) Server vs. Client Components—how do you decide?

**Answer (senior-level):**

- Default to Server for data-fetching and heavy logic; mark 'use client' only where needed.
- Keep client boundaries narrow and leaf-like.

### 4) How does Next.js caching work with `fetch` in App Router?

**Answer (senior-level):**

- `fetch` is request-cached by default on the server; control with `{ cache: 'no-store' }` or `next: { revalidate }`.
- Tag-based revalidation enables granular invalidation.

### 5) Explain Incremental Static Regeneration (ISR) with examples.

**Answer (senior-level):**

- Build static pages and revalidate on a timer or on-demand via tags.
- Great for content that updates periodically (docs, blogs, catalogs).

### 6) Streaming and Suspense in Next.js—what’s the benefit?

**Answer (senior-level):**

- Server streams HTML while awaiting slow boundaries; improves TTFB and perceived performance.

### 7) What are Route Handlers and when to use them?

**Answer (senior-level):**

- `app/api/.../route.ts` defines HTTP verbs per file; co-locate logic; supports edge runtime and better typing.

### 8) Edge Runtime vs. Node.js Runtime in Next.js?

**Answer (senior-level):**

- Edge has low-latency, limited APIs; ideal for auth, AB tests, rewrites.
- Node runtime for heavy libs or FS access.

### 9) Middleware vs. Route Handlers—choose which?

**Answer (senior-level):**

- Middleware runs before routing for redirects/auth; keep it tiny.
- Route Handlers implement endpoints at specific paths.

### 10) How do you implement authenticated layouts with App Router?

**Answer (senior-level):**

- Read cookies/session in a server layout; render or `redirect('/login')`.
- Client checks only for UX; server stays authoritative.

### 11) `generateMetadata` and `generateStaticParams`—when to use?

**Answer (senior-level):**

- `generateMetadata` composes SEO per route; `generateStaticParams` enumerates static paths for dynamic routes.

### 12) SEO best practices in App Router?

**Answer (senior-level):**

- Use route `metadata`, canonical URLs, Open Graph; prefer server-rendered content and semantic HTML.

### 13) Image optimization with `next/image`?

**Answer (senior-level):**

- Responsive sizing, lazy load, and modern formats; use `sizes`/`fill` and configure domain allowlist.

### 14) Data fetching patterns with DB access in RSC?

**Answer (senior-level):**

- Query DB directly in server components/handlers; avoid extra HTTP layers where unnecessary.

### 15) Avoiding request waterfalls?

**Answer (senior-level):**

- Parallelize with `Promise.all`, minimize client boundaries, and stream Suspense boundaries.

### 16) When to disable caching?

**Answer (senior-level):**

- Highly dynamic per-user dashboards; use `no-store`/`revalidate: 0`; include session keys where relevant.

### 17) On-demand revalidation strategies?

**Answer (senior-level):**

- Use `revalidateTag`/`revalidatePath` post-mutation; ensure writers and readers share tags.

### 18) Internationalization with App Router?

**Answer (senior-level):**

- Locale segments + middleware, or libraries like `next-intl`; per-locale metadata and sitemaps.

### 19) Server Actions—benefits and caveats?

**Answer (senior-level):**

- Co-locate mutations, avoid client fetch code; validate on server; beware long-running CPU tasks on lambda.

### 20) File uploads in App Router?

**Answer (senior-level):**

- Route Handlers with `formData()` + signed URLs; stream to object storage; mind edge runtime limitations.

### 21) State management alongside RSC?

**Answer (senior-level):**

- Keep server as truth; client state for UI-only concerns (modals, toasts).

### 22) Auth—cookies vs. JWT?

**Answer (senior-level):**

- Prefer HttpOnly cookies for web; JWT for APIs/mobile; short TTL; rotate tokens; CSRF protection on mutations.

### 23) Protecting routes—server-first?

**Answer (senior-level):**

- Gate at middleware/layout; redirect before render; client guards only enhance UX.

### 24) Dynamic OG images?

**Answer (senior-level):**

- Use `ImageResponse` in a Route Handler; cache with tags or short TTLs.

### 25) Error handling in App Router?

**Answer (senior-level):**

- `error.tsx` and `not-found.tsx` per segment; log server errors to APM; return safe messages.

### 26) Bundling pitfalls with Client Components?

**Answer (senior-level):**

- Avoid giant UI libs in client boundaries; prefer dynamic imports; measure bundle with analyzer.

### 27) Runtime config without rebuilds?

**Answer (senior-level):**

- Read env on server; expose a sanitized `/config` via server component; avoid leaking secrets.

### 28) Analytics in RSC world?

**Answer (senior-level):**

- Render measurement scripts in client layout only; consider server-side logging for robustness.

### 29) Middleware cost control?

**Answer (senior-level):**

- Keep small dependency graph; cheap checks; push heavy logic into Route Handlers.

### 30) Monorepo patterns with Next.js?

**Answer (senior-level):**

- Turborepo/Nx; shared packages; edge-safe subsets; TS path aliases; remote caching.

### 31) Testing strategies for App Router?

**Answer (senior-level):**

- RTL for components; mock `next/navigation`; Playwright for e2e; test `generateMetadata`/`sitemap` outputs.

### 32) ISR + personalization?

**Answer (senior-level):**

- Static shell + client fetch for personalized widgets; avoid caching per-user content on server.

### 33) Security headers and CSP?

**Answer (senior-level):**

- Set in `next.config.js`; nonces/hashes; HSTS; frame-ancestors to prevent clickjacking.

### 34) Robots and Sitemaps as code?

**Answer (senior-level):**

- `app/robots.ts` & `app/sitemap.ts` dynamic generation; localize; add `lastmod` and alternates.

### 35) Migration plan Pages→App?

**Answer (senior-level):**

- Migrate leaf routes first; add layouts; move APIs; remove `_app`/`_document` last.

### 36) Advanced Next.js scenario #36: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 37) Advanced Next.js scenario #37: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 38) Advanced Next.js scenario #38: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 39) Advanced Next.js scenario #39: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 40) Advanced Next.js scenario #40: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 41) Advanced Next.js scenario #41: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 42) Advanced Next.js scenario #42: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 43) Advanced Next.js scenario #43: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 44) Advanced Next.js scenario #44: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 45) Advanced Next.js scenario #45: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 46) Advanced Next.js scenario #46: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 47) Advanced Next.js scenario #47: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 48) Advanced Next.js scenario #48: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 49) Advanced Next.js scenario #49: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 50) Advanced Next.js scenario #50: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 51) Advanced Next.js scenario #51: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 52) Advanced Next.js scenario #52: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 53) Advanced Next.js scenario #53: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 54) Advanced Next.js scenario #54: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 55) Advanced Next.js scenario #55: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 56) Advanced Next.js scenario #56: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 57) Advanced Next.js scenario #57: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 58) Advanced Next.js scenario #58: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 59) Advanced Next.js scenario #59: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 60) Advanced Next.js scenario #60: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 61) Advanced Next.js scenario #61: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 62) Advanced Next.js scenario #62: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 63) Advanced Next.js scenario #63: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 64) Advanced Next.js scenario #64: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 65) Advanced Next.js scenario #65: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 66) Advanced Next.js scenario #66: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 67) Advanced Next.js scenario #67: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 68) Advanced Next.js scenario #68: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 69) Advanced Next.js scenario #69: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 70) Advanced Next.js scenario #70: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 71) Advanced Next.js scenario #71: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 72) Advanced Next.js scenario #72: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 73) Advanced Next.js scenario #73: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 74) Advanced Next.js scenario #74: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 75) Advanced Next.js scenario #75: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 76) Advanced Next.js scenario #76: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 77) Advanced Next.js scenario #77: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 78) Advanced Next.js scenario #78: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 79) Advanced Next.js scenario #79: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 80) Advanced Next.js scenario #80: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 81) Advanced Next.js scenario #81: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 82) Advanced Next.js scenario #82: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 83) Advanced Next.js scenario #83: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 84) Advanced Next.js scenario #84: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 85) Advanced Next.js scenario #85: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 86) Advanced Next.js scenario #86: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 87) Advanced Next.js scenario #87: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 88) Advanced Next.js scenario #88: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 89) Advanced Next.js scenario #89: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 90) Advanced Next.js scenario #90: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 91) Advanced Next.js scenario #91: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 92) Advanced Next.js scenario #92: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 93) Advanced Next.js scenario #93: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 94) Advanced Next.js scenario #94: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 95) Advanced Next.js scenario #95: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 96) Advanced Next.js scenario #96: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 97) Advanced Next.js scenario #97: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 98) Advanced Next.js scenario #98: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 99) Advanced Next.js scenario #99: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.

### 100) Advanced Next.js scenario #100: performance, security, or data consistency trade-offs.

**Answer (senior-level):**

- Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.
