// Next.js Interview Questions - 15 Core Senior-Level Questions
// Comprehensive answers designed for technical interview preparation

export interface QA {
  id: number;
  question: string;
  answer: string;
  category?: string;
  difficulty?: string;
  tags?: string[];
}

export const NEXTJS_ENHANCED_QUESTIONS: QA[] = [
  {
    id: 1,
    question:
      "App Router vs Pages Router - Explain the architectural differences and when to use each.",
    answer:
      "Next.js offers two routing systems with fundamentally different architectures and capabilities.\n\n" +
      "**Pages Router (Legacy - Next.js <13):**\n\n" +
      "File-based routing in `pages/` directory:\n" +
      "```javascript\n" +
      "pages/\n" +
      "  index.js         → /\n" +
      "  about.js         → /about\n" +
      "  blog/[slug].js   → /blog/:slug\n" +
      "  _app.js          → Custom App wrapper\n" +
      "  _document.js     → Custom Document (HTML structure)\n" +
      "```\n\n" +
      "**Characteristics:**\n" +
      "- Client-side React components by default\n" +
      "- getServerSideProps / getStaticProps for data\n" +
      "- API routes in pages/api/\n" +
      "- Single layout via _app.js\n" +
      "- Mature, stable, well-documented\n\n" +
      "**App Router (Modern - Next.js 13+):**\n\n" +
      "File-based routing in `app/` directory:\n" +
      "```javascript\n" +
      "app/\n" +
      "  page.js          → / (route segment)\n" +
      "  layout.js        → Shared layout\n" +
      "  about/\n" +
      "    page.js        → /about\n" +
      "  blog/\n" +
      "    [slug]/\n" +
      "      page.js      → /blog/:slug\n" +
      "  api/\n" +
      "    route.js       → API route handler\n" +
      "```\n\n" +
      "**Key Innovations:**\n\n" +
      "**1. React Server Components (RSC):**\n" +
      "```javascript\n" +
      "// app/page.js - Server Component by default!\n" +
      "export default async function Page() {\n" +
      "  // Runs on server, doesn't ship to client\n" +
      "  const data = await fetch('https://api.example.com/data');\n" +
      "  const result = await data.json();\n" +
      "  \n" +
      "  return <div>{result.title}</div>;\n" +
      "}\n\n" +
      "// No JavaScript sent to client for this component!\n" +
      "```\n\n" +
      "**2. Nested Layouts:**\n" +
      "```javascript\n" +
      "app/\n" +
      "  layout.js        → Root layout (wraps all pages)\n" +
      "  dashboard/\n" +
      "    layout.js      → Dashboard layout (nested)\n" +
      "    page.js        → Dashboard page\n" +
      "    settings/\n" +
      "      page.js      → Inherits both layouts\n" +
      "```\n\n" +
      "**3. Streaming & Suspense:**\n" +
      "```javascript\n" +
      "export default function Page() {\n" +
      "  return (\n" +
      "    <div>\n" +
      "      <Header /> {/* Sent immediately */}\n" +
      "      <Suspense fallback={<Skeleton />}>\n" +
      "        <SlowComponent /> {/* Streamed when ready */}\n" +
      "      </Suspense>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**4. Colocation:**\n" +
      "```javascript\n" +
      "app/dashboard/\n" +
      "  page.js          → Page\n" +
      "  layout.js        → Layout\n" +
      "  loading.js       → Loading UI\n" +
      "  error.js         → Error UI\n" +
      "  not-found.js     → 404 UI\n" +
      "  components/      → Local components\n" +
      "  utils/           → Local utilities\n" +
      "```\n\n" +
      "**Comparison Table:**\n\n" +
      "| Feature | Pages Router | App Router |\n" +
      "|---------|-------------|------------|\n" +
      "| Default | Client Component | Server Component |\n" +
      "| Data fetching | getServerSideProps | async components |\n" +
      "| Layouts | Single _app.js | Nested layouts |\n" +
      "| Loading states | Custom | loading.js |\n" +
      "| Error handling | _error.js | error.js per route |\n" +
      "| Streaming | Limited | Full support |\n" +
      "| Suspense | Client only | Server + Client |\n" +
      "| Maturity | Stable | Evolving |\n\n" +
      "**When to Use Pages Router:**\n\n" +
      "- Existing large applications (migration cost)\n" +
      "- Need mature ecosystem / more tutorials\n" +
      "- Team not ready for RSC paradigm shift\n" +
      "- Heavy client-side interactivity\n" +
      "- Using libraries not yet compatible with RSC\n\n" +
      "**When to Use App Router:**\n\n" +
      "- New projects (recommended by Next.js team)\n" +
      "- Want smaller client bundles\n" +
      "- Need nested layouts\n" +
      "- Content-heavy sites (blogs, docs)\n" +
      "- SEO-critical pages\n" +
      "- Want streaming SSR\n\n" +
      "**Migration Strategy:**\n\n" +
      "Can use both simultaneously:\n" +
      "```\n" +
      "pages/        → Old routes\n" +
      "app/          → New routes\n" +
      "// App Router takes precedence\n" +
      "```\n\n" +
      "Migrate incrementally: leaf routes first, complex pages last.\n\n" +
      "**Key Takeaway:** App Router represents React's future with Server Components. Use for new projects. Pages Router remains fully supported for existing apps.",
    category: "Routing",
    difficulty: "hard",
    tags: ["app-router", "pages-router", "rsc", "routing", "architecture", "migration"],
  },
  {
    id: 2,
    question:
      "What are React Server Components (RSC) in Next.js? How do they differ from traditional components?",
    answer:
      "React Server Components run exclusively on the server and don't ship JavaScript to the client, fundamentally changing how we build React applications.\n\n" +
      "**Traditional React (Client Components):**\n\n" +
      "```javascript\n" +
      "// All code runs on client\n" +
      "function ProductList() {\n" +
      "  const [products, setProducts] = useState([]);\n" +
      "  \n" +
      "  useEffect(() => {\n" +
      "    fetch('/api/products').then(res => res.json()).then(setProducts);\n" +
      "  }, []);\n\n" +
      "  return products.map(p => <Product key={p.id} data={p} />);\n" +
      "}\n\n" +
      "// Problems:\n" +
      "// 1. Shipped to client (increases bundle)\n" +
      "// 2. Waterfall (page loads, then data fetches)\n" +
      "// 3. Loading state complexity\n" +
      "```\n\n" +
      "**Server Components:**\n\n" +
      "```javascript\n" +
      "// app/products/page.js - Server Component\n" +
      "export default async function ProductList() {\n" +
      "  // Runs on server only!\n" +
      "  const products = await db.product.findMany();\n\n" +
      "  return products.map(p => <Product key={p.id} data={p} />);\n" +
      "}\n\n" +
      "// Benefits:\n" +
      "// 1. Zero JavaScript sent to client\n" +
      "// 2. Direct database access (no API layer)\n" +
      "// 3. No loading states (data ready before render)\n" +
      "```\n\n" +
      "**Server vs Client Components:**\n\n" +
      "**Server Components (Default):**\n" +
      "```javascript\n" +
      "// app/page.js\n" +
      "export default async function Page() {\n" +
      "  const data = await fetchData(); // Can use async/await\n" +
      "  \n" +
      "  return <div>{data.title}</div>;\n" +
      "}\n" +
      "```\n\n" +
      "✅ **Can:**\n" +
      "- Fetch data (async/await)\n" +
      "- Access backend directly (DB, file system)\n" +
      "- Use server-only libraries\n" +
      "- Keep sensitive data on server\n\n" +
      "❌ **Cannot:**\n" +
      "- Use hooks (useState, useEffect, etc.)\n" +
      "- Use browser APIs (window, document)\n" +
      "- Add event listeners (onClick, onChange)\n" +
      "- Use Context (can read, can't create Provider)\n\n" +
      "**Client Components:**\n\n" +
      "```javascript\n" +
      "// app/counter.js\n" +
      "'use client'; // Directive at top\n\n" +
      "import { useState } from 'react';\n\n" +
      "export default function Counter() {\n" +
      "  const [count, setCount] = useState(0);\n" +
      "  \n" +
      "  return (\n" +
      "    <button onClick={() => setCount(c => c + 1)}>\n" +
      "      Count: {count}\n" +
      "    </button>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "✅ **Can:**\n" +
      "- Use all hooks\n" +
      "- Add interactivity (events)\n" +
      "- Use browser APIs\n" +
      "- Use state and effects\n\n" +
      "❌ **Cannot:**\n" +
      "- Async/await in component body\n" +
      "- Access backend directly\n\n" +
      "**Composition Patterns:**\n\n" +
      "**Server Component → Client Component:**\n" +
      "```javascript\n" +
      "// ✅ Can import client component in server component\n" +
      "// app/page.js (Server)\n" +
      "import Counter from './counter'; // Client Component\n\n" +
      "export default async function Page() {\n" +
      "  const data = await fetchData();\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <h1>{data.title}</h1>\n" +
      "      <Counter /> {/* Interactive island */}\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Client Component → Server Component:**\n" +
      "```javascript\n" +
      "// ❌ Can't import server component in client component\n" +
      "'use client';\n" +
      "import ServerComponent from './server'; // Error!\n\n" +
      "// ✅ Pass as children instead\n" +
      "'use client';\n" +
      "export default function ClientWrapper({ children }) {\n" +
      "  return <div className='wrapper'>{children}</div>;\n" +
      "}\n\n" +
      "// app/page.js\n" +
      "export default function Page() {\n" +
      "  return (\n" +
      "    <ClientWrapper>\n" +
      "      <ServerComponent /> {/* Works! */}\n" +
      "    </ClientWrapper>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Data Flow:**\n\n" +
      "```javascript\n" +
      "// ✅ Server → Client: Serializable props only\n" +
      "// Server Component\n" +
      "const user = await db.user.findOne();\n" +
      "<ClientComponent user={user} /> // ✅ Plain object\n\n" +
      "// ❌ Can't pass functions\n" +
      "<ClientComponent onClick={handleClick} /> // Error! Functions not serializable\n\n" +
      "// ✅ Define handler in client component\n" +
      "'use client';\n" +
      "function ClientComponent({ user }) {\n" +
      "  const handleClick = () => {}; // Defined client-side\n" +
      "  return <button onClick={handleClick}>{user.name}</button>;\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits:**\n\n" +
      "1. **Smaller Bundles:** Server logic not sent to client\n" +
      "2. **Better Security:** Keep API keys, tokens on server\n" +
      "3. **Faster Initial Load:** Less JS to parse/execute\n" +
      "4. **Direct Data Access:** No API roundtrip\n" +
      "5. **SEO:** Fully rendered HTML\n\n" +
      "**When to Use Each:**\n\n" +
      "**Server Components:**\n" +
      "- Data fetching\n" +
      "- Content rendering\n" +
      "- Markdown/static content\n" +
      "- Using large dependencies (charts, markdown parsers)\n\n" +
      "**Client Components:**\n" +
      "- Interactivity (clicks, inputs)\n" +
      "- State management (useState, useReducer)\n" +
      "- Effects (useEffect)\n" +
      "- Browser APIs (localStorage, geolocation)\n" +
      "- Context providers\n\n" +
      "**Best Practice:** Default to Server Components. Add 'use client' only where needed. Keep client boundaries narrow and leaf-like.",
    category: "Architecture",
    difficulty: "hard",
    tags: ["rsc", "server-components", "app-router", "architecture", "rendering"],
  },
  {
    id: 3,
    question:
      "How does Next.js caching work with fetch in App Router? Explain cache strategies and revalidation.",
    answer:
      "Next.js extends the native fetch API with caching and revalidation capabilities in App Router.\n\n" +
      "**Default Behavior:**\n\n" +
      "```javascript\n" +
      "// Cached by default!\n" +
      "const res = await fetch('https://api.example.com/data');\n" +
      "// Subsequent requests return cached response\n" +
      "```\n\n" +
      "**Cache Options:**\n\n" +
      "**1. force-cache (Default):**\n" +
      "```javascript\n" +
      "fetch(url, { cache: 'force-cache' });\n" +
      "// Cache forever, revalidate manually\n" +
      "```\n\n" +
      "**2. no-store (Never Cache):**\n" +
      "```javascript\n" +
      "// Always fetch fresh data\n" +
      "fetch(url, { cache: 'no-store' });\n\n" +
      "// Use for:\n" +
      "// - User-specific data\n" +
      "// - Real-time data\n" +
      "// - Frequently changing content\n" +
      "```\n\n" +
      "**3. Time-Based Revalidation:**\n" +
      "```javascript\n" +
      "// Revalidate every 60 seconds\n" +
      "fetch(url, { \n" +
      "  next: { revalidate: 60 } \n" +
      "});\n\n" +
      "// After 60s, next request triggers revalidation in background\n" +
      "// Serves stale content while revalidating\n" +
      "```\n\n" +
      "**4. Tag-Based Revalidation:**\n\n" +
      "```javascript\n" +
      "// Tag your requests\n" +
      "fetch(url, {\n" +
      "  next: { tags: ['products'] }\n" +
      "});\n\n" +
      "// Revalidate on-demand\n" +
      "// app/api/revalidate/route.js\n" +
      "import { revalidateTag } from 'next/cache';\n\n" +
      "export async function POST(request) {\n" +
      "  revalidateTag('products'); // Invalidates all 'products' requests\n" +
      "  return Response.json({ revalidated: true });\n" +
      "}\n\n" +
      "// Use case: Webhook after CMS update\n" +
      "```\n\n" +
      "**5. Path-Based Revalidation:**\n\n" +
      "```javascript\n" +
      "import { revalidatePath } from 'next/cache';\n\n" +
      "// Revalidate specific page\n" +
      "revalidatePath('/products');\n\n" +
      "// Revalidate all product pages\n" +
      "revalidatePath('/products/[id]', 'page');\n\n" +
      "// Revalidate entire layout\n" +
      "revalidatePath('/products', 'layout');\n" +
      "```\n\n" +
      "**Caching Layers:**\n\n" +
      "Next.js has multiple cache layers:\n\n" +
      "```\n" +
      "Request → Request Memoization → Data Cache → Full Route Cache → Client Router Cache\n" +
      "```\n\n" +
      "**1. Request Memoization:**\n" +
      "```javascript\n" +
      "// Same fetch deduped during single render\n" +
      "async function Header() {\n" +
      "  const user = await fetch('/api/user'); // Request 1\n" +
      "}\n\n" +
      "async function Sidebar() {\n" +
      "  const user = await fetch('/api/user'); // Deduped! Uses Request 1\n" +
      "}\n\n" +
      "// Only one actual fetch made\n" +
      "```\n\n" +
      "**2. Data Cache (Persistent):**\n\n" +
      "Survives across deployments\n\n" +
      "**3. Full Route Cache:**\n\n" +
      "```javascript\n" +
      "// Static rendering\n" +
      "export default async function Page() {\n" +
      "  const data = await fetch(url, { next: { revalidate: 3600 } });\n" +
      "  return <div>{data.title}</div>;\n" +
      "}\n" +
      "// Entire page HTML cached for 1 hour\n" +
      "```\n\n" +
      "**Opt Out of All Caching:**\n\n" +
      "```javascript\n" +
      "// Route segment config\n" +
      "export const dynamic = 'force-dynamic';\n" +
      "export const revalidate = 0;\n\n" +
      "// Or per-request\n" +
      "fetch(url, { cache: 'no-store' });\n" +
      "```\n\n" +
      "**Real-World Patterns:**\n\n" +
      "**Blog Posts (ISR):**\n" +
      "```javascript\n" +
      "// Revalidate every hour\n" +
      "export const revalidate = 3600;\n\n" +
      "export default async function BlogPost({ params }) {\n" +
      "  const post = await fetch(`/api/posts/${params.slug}`, {\n" +
      "    next: { tags: ['posts', `post-${params.slug}`] }\n" +
      "  });\n" +
      "}\n\n" +
      "// After publishing new post:\n" +
      "revalidateTag('posts');\n" +
      "```\n\n" +
      "**User Dashboard (Dynamic):**\n" +
      "```javascript\n" +
      "export default async function Dashboard() {\n" +
      "  // Always fresh\n" +
      "  const user = await fetch('/api/user', { cache: 'no-store' });\n" +
      "  \n" +
      "  return <div>Welcome, {user.name}</div>;\n" +
      "}\n" +
      "```\n\n" +
      "**Best Practices:**\n\n" +
      "1. Use tags for related data (easier invalidation)\n" +
      "2. Cache static content aggressively\n" +
      "3. no-store for personalized data\n" +
      "4. Time-based for content that changes predictably\n" +
      "5. On-demand revalidation for CMS-driven content",
    category: "Caching",
    difficulty: "hard",
    tags: ["caching", "fetch", "revalidation", "isr", "performance", "data-fetching"],
  },
];

export default NEXTJS_ENHANCED_QUESTIONS;
