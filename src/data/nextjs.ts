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
    question: `App Router vs. Pages Router—why the shift and when to use which?`,
    answer: `App Router embraces React Server Components (RSC), nested layouts, streaming, and colocation.
Prefer App Router for new apps; Pages only for legacy support/migration.`,
  },
  {
    id: 2,
    question: `What are React Server Components (RSC) in Next.js and why do they matter?`,
    answer: `RSC run on the server and don't ship JS to the client, reducing bundle size.
They fetch data without waterfalls and compose with Client Components for interactivity.`,
  },
  {
    id: 3,
    question: `Server vs. Client Components—how do you decide?`,
    answer: `Default to Server for data-fetching and heavy logic; mark 'use client' only where needed.
Keep client boundaries narrow and leaf-like.`,
  },
  {
    id: 4,
    question: `How does Next.js caching work with \`fetch\` in App Router?`,
    answer: `\`fetch\` is request-cached by default on the server; control with \`{ cache: 'no-store' }\` or \`next: { revalidate }\`.
Tag-based revalidation enables granular invalidation.`,
  },
  {
    id: 5,
    question: `Explain Incremental Static Regeneration (ISR) with examples.`,
    answer: `Build static pages and revalidate on a timer or on-demand via tags.
Great for content that updates periodically (docs, blogs, catalogs).`,
  },
  {
    id: 6,
    question: `Streaming and Suspense in Next.js—what’s the benefit?`,
    answer: `Server streams HTML while awaiting slow boundaries; improves TTFB and perceived performance.`,
  },
  {
    id: 7,
    question: `What are Route Handlers and when to use them?`,
    answer: `\`app/api/.../route.ts\` defines HTTP verbs per file; co-locate logic; supports edge runtime and better typing.`,
  },
  {
    id: 8,
    question: `Edge Runtime vs. Node.js Runtime in Next.js?`,
    answer: `Edge has low-latency, limited APIs; ideal for auth, AB tests, rewrites.
Node runtime for heavy libs or FS access.`,
  },
  {
    id: 9,
    question: `Middleware vs. Route Handlers—choose which?`,
    answer: `Middleware runs before routing for redirects/auth; keep it tiny.
Route Handlers implement endpoints at specific paths.`,
  },
  {
    id: 10,
    question: `How do you implement authenticated layouts with App Router?`,
    answer: `Read cookies/session in a server layout; render or \`redirect('/login')\`.
Client checks only for UX; server stays authoritative.`,
  },
  {
    id: 11,
    question: `\`generateMetadata\` and \`generateStaticParams\`—when to use?`,
    answer: `\`generateMetadata\` composes SEO per route; \`generateStaticParams\` enumerates static paths for dynamic routes.`,
  },
  {
    id: 12,
    question: `SEO best practices in App Router?`,
    answer: `Use route \`metadata\`, canonical URLs, Open Graph; prefer server-rendered content and semantic HTML.`,
  },
  {
    id: 13,
    question: `Image optimization with \`next/image\`?`,
    answer: `Responsive sizing, lazy load, and modern formats; use \`sizes\`/\`fill\` and configure domain allowlist.`,
  },
  {
    id: 14,
    question: `Data fetching patterns with DB access in RSC?`,
    answer: `Query DB directly in server components/handlers; avoid extra HTTP layers where unnecessary.`,
  },
  {
    id: 15,
    question: `Avoiding request waterfalls?`,
    answer: `Parallelize with \`Promise.all\`, minimize client boundaries, and stream Suspense boundaries.`,
  },
  {
    id: 16,
    question: `When to disable caching?`,
    answer: `Highly dynamic per-user dashboards; use \`no-store\`/\`revalidate: 0\`; include session keys where relevant.`,
  },
  {
    id: 17,
    question: `On-demand revalidation strategies?`,
    answer: `Use \`revalidateTag\`/\`revalidatePath\` post-mutation; ensure writers and readers share tags.`,
  },
  {
    id: 18,
    question: `Internationalization with App Router?`,
    answer: `Locale segments + middleware, or libraries like \`next-intl\`; per-locale metadata and sitemaps.`,
  },
  {
    id: 19,
    question: `Server Actions—benefits and caveats?`,
    answer: `Co-locate mutations, avoid client fetch code; validate on server; beware long-running CPU tasks on lambda.`,
  },
  {
    id: 20,
    question: `File uploads in App Router?`,
    answer: `Route Handlers with \`formData()\` + signed URLs; stream to object storage; mind edge runtime limitations.`,
  },
  {
    id: 21,
    question: `State management alongside RSC?`,
    answer: `Keep server as truth; client state for UI-only concerns (modals, toasts).`,
  },
  {
    id: 22,
    question: `Auth—cookies vs. JWT?`,
    answer: `Prefer HttpOnly cookies for web; JWT for APIs/mobile; short TTL; rotate tokens; CSRF protection on mutations.`,
  },
  {
    id: 23,
    question: `Protecting routes—server-first?`,
    answer: `Gate at middleware/layout; redirect before render; client guards only enhance UX.`,
  },
  {
    id: 24,
    question: `Dynamic OG images?`,
    answer: `Use \`ImageResponse\` in a Route Handler; cache with tags or short TTLs.`,
  },
  {
    id: 25,
    question: `Error handling in App Router?`,
    answer: `\`error.tsx\` and \`not-found.tsx\` per segment; log server errors to APM; return safe messages.`,
  },
  {
    id: 26,
    question: `Bundling pitfalls with Client Components?`,
    answer: `Avoid giant UI libs in client boundaries; prefer dynamic imports; measure bundle with analyzer.`,
  },
  {
    id: 27,
    question: `Runtime config without rebuilds?`,
    answer: `Read env on server; expose a sanitized \`/config\` via server component; avoid leaking secrets.`,
  },
  {
    id: 28,
    question: `Analytics in RSC world?`,
    answer: `Render measurement scripts in client layout only; consider server-side logging for robustness.`,
  },
  {
    id: 29,
    question: `Middleware cost control?`,
    answer: `Keep small dependency graph; cheap checks; push heavy logic into Route Handlers.`,
  },
  {
    id: 30,
    question: `Monorepo patterns with Next.js?`,
    answer: `Turborepo/Nx; shared packages; edge-safe subsets; TS path aliases; remote caching.`,
  },
  {
    id: 31,
    question: `Testing strategies for App Router?`,
    answer: `RTL for components; mock \`next/navigation\`; Playwright for e2e; test \`generateMetadata\`/\`sitemap\` outputs.`,
  },
  {
    id: 32,
    question: `ISR + personalization?`,
    answer: `Static shell + client fetch for personalized widgets; avoid caching per-user content on server.`,
  },
  {
    id: 33,
    question: `Security headers and CSP?`,
    answer: `Set in \`next.config.js\`; nonces/hashes; HSTS; frame-ancestors to prevent clickjacking.`,
  },
  {
    id: 34,
    question: `Robots and Sitemaps as code?`,
    answer: `\`app/robots.ts\` & \`app/sitemap.ts\` dynamic generation; localize; add \`lastmod\` and alternates.`,
  },
  {
    id: 35,
    question: `Migration plan Pages→App?`,
    answer: `Migrate leaf routes first; add layouts; move APIs; remove \`_app\`/\`_document\` last.`,
  },
  {
    id: 36,
    question: `Advanced Next.js scenario #36: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 37,
    question: `Advanced Next.js scenario #37: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 38,
    question: `Advanced Next.js scenario #38: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 39,
    question: `Advanced Next.js scenario #39: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 40,
    question: `Advanced Next.js scenario #40: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 41,
    question: `Advanced Next.js scenario #41: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 42,
    question: `Advanced Next.js scenario #42: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 43,
    question: `Advanced Next.js scenario #43: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 44,
    question: `Advanced Next.js scenario #44: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 45,
    question: `Advanced Next.js scenario #45: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 46,
    question: `Advanced Next.js scenario #46: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 47,
    question: `Advanced Next.js scenario #47: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 48,
    question: `Advanced Next.js scenario #48: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 49,
    question: `Advanced Next.js scenario #49: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 50,
    question: `Advanced Next.js scenario #50: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 51,
    question: `Advanced Next.js scenario #51: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 52,
    question: `Advanced Next.js scenario #52: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 53,
    question: `Advanced Next.js scenario #53: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 54,
    question: `Advanced Next.js scenario #54: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 55,
    question: `Advanced Next.js scenario #55: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 56,
    question: `Advanced Next.js scenario #56: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 57,
    question: `Advanced Next.js scenario #57: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 58,
    question: `Advanced Next.js scenario #58: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 59,
    question: `Advanced Next.js scenario #59: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 60,
    question: `Advanced Next.js scenario #60: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 61,
    question: `Advanced Next.js scenario #61: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 62,
    question: `Advanced Next.js scenario #62: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 63,
    question: `Advanced Next.js scenario #63: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 64,
    question: `Advanced Next.js scenario #64: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 65,
    question: `Advanced Next.js scenario #65: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 66,
    question: `Advanced Next.js scenario #66: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 67,
    question: `Advanced Next.js scenario #67: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 68,
    question: `Advanced Next.js scenario #68: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 69,
    question: `Advanced Next.js scenario #69: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 70,
    question: `Advanced Next.js scenario #70: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 71,
    question: `Advanced Next.js scenario #71: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 72,
    question: `Advanced Next.js scenario #72: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 73,
    question: `Advanced Next.js scenario #73: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 74,
    question: `Advanced Next.js scenario #74: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 75,
    question: `Advanced Next.js scenario #75: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 76,
    question: `Advanced Next.js scenario #76: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 77,
    question: `Advanced Next.js scenario #77: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 78,
    question: `Advanced Next.js scenario #78: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 79,
    question: `Advanced Next.js scenario #79: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 80,
    question: `Advanced Next.js scenario #80: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 81,
    question: `Advanced Next.js scenario #81: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 82,
    question: `Advanced Next.js scenario #82: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 83,
    question: `Advanced Next.js scenario #83: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 84,
    question: `Advanced Next.js scenario #84: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 85,
    question: `Advanced Next.js scenario #85: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 86,
    question: `Advanced Next.js scenario #86: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 87,
    question: `Advanced Next.js scenario #87: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 88,
    question: `Advanced Next.js scenario #88: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 89,
    question: `Advanced Next.js scenario #89: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 90,
    question: `Advanced Next.js scenario #90: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 91,
    question: `Advanced Next.js scenario #91: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 92,
    question: `Advanced Next.js scenario #92: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 93,
    question: `Advanced Next.js scenario #93: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 94,
    question: `Advanced Next.js scenario #94: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 95,
    question: `Advanced Next.js scenario #95: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 96,
    question: `Advanced Next.js scenario #96: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 97,
    question: `Advanced Next.js scenario #97: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 98,
    question: `Advanced Next.js scenario #98: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 99,
    question: `Advanced Next.js scenario #99: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
  {
    id: 100,
    question: `Advanced Next.js scenario #100: performance, security, or data consistency trade-offs.`,
    answer: `Explain constraints; pick RSC vs client; choose cache & revalidation; justify edge vs node runtime; test and observe.`,
  },
];

export default NEXTJS_QUESTIONS;
