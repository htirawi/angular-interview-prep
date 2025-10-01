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
  {
    id: 4,
    question:
      "What is Next.js Image Optimization? How does the Image component work and what are the benefits?",
    answer:
      "Next.js Image Optimization is a powerful feature that automatically optimizes images for better performance, SEO, and user experience.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "import Image from 'next/image';\n\n" +
      "function MyComponent() {\n" +
      "  return (\n" +
      "    <div>\n" +
      "      <Image\n" +
      '        src="/hero.jpg"\n' +
      '        alt="Hero image"\n' +
      "        width={800}\n" +
      "        height={600}\n" +
      "        priority // Load immediately\n" +
      "      />\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**External Images:**\n" +
      "```javascript\n" +
      "// next.config.js\n" +
      "module.exports = {\n" +
      "  images: {\n" +
      "    domains: ['example.com', 'cdn.example.com'],\n" +
      "    // Or use remotePatterns for more control\n" +
      "    remotePatterns: [\n" +
      "      {\n" +
      "        protocol: 'https',\n" +
      "        hostname: '**.example.com',\n" +
      "        port: '',\n" +
      "        pathname: '/images/**',\n" +
      "      },\n" +
      "    ],\n" +
      "  },\n" +
      "};\n\n" +
      "// Usage\n" +
      "function ExternalImage() {\n" +
      "  return (\n" +
      "    <Image\n" +
      '      src="https://example.com/image.jpg"\n' +
      '      alt="External image"\n' +
      "      width={500}\n" +
      "      height={300}\n" +
      '      placeholder="blur"\n' +
      '      blurDataURL="data:image/jpeg;base64,..."\n' +
      "    />\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Key Features:**\n\n" +
      "**1. Automatic Format Selection:**\n" +
      "- WebP when supported (smaller file size)\n" +
      "- AVIF for modern browsers (even smaller)\n" +
      "- Falls back to original format\n\n" +
      "**2. Responsive Images:**\n" +
      "```javascript\n" +
      "function ResponsiveImage() {\n" +
      "  return (\n" +
      "    <Image\n" +
      '      src="/landscape.jpg"\n' +
      '      alt="Responsive landscape"\n' +
      "      fill // Fills parent container\n" +
      '      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"\n' +
      "      style={{\n" +
      "        objectFit: 'cover', // or 'contain'\n" +
      "      }}\n" +
      "    />\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**3. Lazy Loading:**\n" +
      "```javascript\n" +
      "function LazyImage() {\n" +
      "  return (\n" +
      "    <Image\n" +
      '      src="/below-fold.jpg"\n' +
      '      alt="Lazy loaded image"\n' +
      "      width={400}\n" +
      "      height={300}\n" +
      '      loading="lazy" // Default for non-priority images\n' +
      "    />\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**4. Blur Placeholder:**\n" +
      "```javascript\n" +
      "function BlurImage() {\n" +
      "  return (\n" +
      "    <Image\n" +
      '      src="/sharp-image.jpg"\n' +
      '      alt="Image with blur placeholder"\n' +
      "      width={600}\n" +
      "      height={400}\n" +
      '      placeholder="blur"\n' +
      '      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="\n' +
      "    />\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Performance Benefits:**\n" +
      "- **Automatic optimization**: Formats, sizes, quality\n" +
      "- **Lazy loading**: Images load when needed\n" +
      "- **Prevents layout shift**: Maintains aspect ratio\n" +
      "- **CDN delivery**: Images served from edge locations\n" +
      "- **Caching**: Optimized images cached globally\n\n" +
      "**Configuration Options:**\n" +
      "```javascript\n" +
      "// next.config.js\n" +
      "module.exports = {\n" +
      "  images: {\n" +
      "    formats: ['image/webp', 'image/avif'],\n" +
      "    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],\n" +
      "    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],\n" +
      "    minimumCacheTTL: 60,\n" +
      "    dangerouslyAllowSVG: true,\n" +
      "    contentSecurityPolicy: \"default-src 'self'; script-src 'none'; sandbox;\",\n" +
      "  },\n" +
      "};\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Always specify width and height (or use fill)\n" +
      "- Use priority for above-the-fold images\n" +
      "- Provide meaningful alt text for accessibility\n" +
      "- Use blur placeholders for better UX\n" +
      "- Configure proper domains for external images",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["image-optimization", "performance", "seo", "lazy-loading", "webp", "responsive"],
  },
  {
    id: 5,
    question:
      "How do you implement API routes in Next.js? Compare App Router vs Pages Router API routes.",
    answer:
      "Next.js provides two different approaches for creating API routes, each with distinct syntax and capabilities.\n\n" +
      "**Pages Router API Routes:**\n" +
      "```javascript\n" +
      "// pages/api/users.js\n" +
      "export default function handler(req, res) {\n" +
      "  const { method } = req;\n" +
      "  \n" +
      "  switch (method) {\n" +
      "    case 'GET':\n" +
      "      res.status(200).json({ users: [] });\n" +
      "      break;\n" +
      "    case 'POST':\n" +
      "      const { name, email } = req.body;\n" +
      "      // Create user logic\n" +
      "      res.status(201).json({ id: 1, name, email });\n" +
      "      break;\n" +
      "    default:\n" +
      "      res.setHeader('Allow', ['GET', 'POST']);\n" +
      "      res.status(405).end(`Method ${method} Not Allowed`);\n" +
      "  }\n" +
      "}\n\n" +
      "// pages/api/users/[id].js - Dynamic route\n" +
      "export default function handler(req, res) {\n" +
      "  const { id } = req.query;\n" +
      "  \n" +
      "  if (req.method === 'GET') {\n" +
      "    res.status(200).json({ id, name: 'John Doe' });\n" +
      "  } else if (req.method === 'PUT') {\n" +
      "    res.status(200).json({ id, ...req.body });\n" +
      "  } else if (req.method === 'DELETE') {\n" +
      "    res.status(204).end();\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**App Router API Routes:**\n" +
      "```javascript\n" +
      "// app/api/users/route.js\n" +
      "import { NextRequest, NextResponse } from 'next/server';\n\n" +
      "export async function GET() {\n" +
      "  return NextResponse.json({ users: [] });\n" +
      "}\n\n" +
      "export async function POST(request) {\n" +
      "  const body = await request.json();\n" +
      "  const { name, email } = body;\n" +
      "  \n" +
      "  // Create user logic\n" +
      "  return NextResponse.json(\n" +
      "    { id: 1, name, email },\n" +
      "    { status: 201 }\n" +
      "  );\n" +
      "}\n\n" +
      "// app/api/users/[id]/route.js - Dynamic route\n" +
      "export async function GET(request, { params }) {\n" +
      "  const { id } = params;\n" +
      "  \n" +
      "  return NextResponse.json({ id, name: 'John Doe' });\n" +
      "}\n\n" +
      "export async function PUT(request, { params }) {\n" +
      "  const { id } = params;\n" +
      "  const body = await request.json();\n" +
      "  \n" +
      "  return NextResponse.json({ id, ...body });\n" +
      "}\n\n" +
      "export async function DELETE(request, { params }) {\n" +
      "  const { id } = params;\n" +
      "  \n" +
      "  return new NextResponse(null, { status: 204 });\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced App Router Features:**\n\n" +
      "**1. Request/Response Streaming:**\n" +
      "```javascript\n" +
      "// app/api/stream/route.js\n" +
      "export async function GET() {\n" +
      "  const encoder = new TextEncoder();\n" +
      "  const stream = new ReadableStream({\n" +
      "    start(controller) {\n" +
      "      const sendData = (data) => {\n" +
      "        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\\n\\n`));\n" +
      "      };\n      " +
      "      \n" +
      "      // Send data every second\n" +
      "      const interval = setInterval(() => {\n" +
      "        sendData({ timestamp: Date.now() });\n" +
      "      }, 1000);\n      " +
      "      \n" +
      "      // Stop after 10 seconds\n" +
      "      setTimeout(() => {\n" +
      "        clearInterval(interval);\n" +
      "        controller.close();\n" +
      "      }, 10000);\n" +
      "    },\n" +
      "  });\n" +
      "  \n" +
      "  return new Response(stream, {\n" +
      "    headers: {\n" +
      "      'Content-Type': 'text/event-stream',\n" +
      "      'Cache-Control': 'no-cache',\n" +
      "      'Connection': 'keep-alive',\n" +
      "    },\n" +
      "  });\n" +
      "}\n" +
      "```\n\n" +
      "**2. Middleware Integration:**\n" +
      "```javascript\n" +
      "// middleware.js\n" +
      "import { NextResponse } from 'next/server';\n\n" +
      "export function middleware(request) {\n" +
      "  // Add custom headers\n" +
      "  const response = NextResponse.next();\n" +
      "  response.headers.set('X-Custom-Header', 'my-value');\n" +
      "  \n" +
      "  return response;\n" +
      "}\n\n" +
      "export const config = {\n" +
      "  matcher: '/api/:path*',\n" +
      "};\n" +
      "```\n\n" +
      "**3. Error Handling:**\n" +
      "```javascript\n" +
      "// app/api/users/route.js\n" +
      "export async function GET() {\n" +
      "  try {\n" +
      "    const users = await fetchUsers();\n" +
      "    return NextResponse.json(users);\n" +
      "  } catch (error) {\n" +
      "    return NextResponse.json(\n" +
      "      { error: 'Failed to fetch users' },\n" +
      "      { status: 500 }\n" +
      "    );\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Comparison:**\n\n" +
      "| Feature | Pages Router | App Router |\n" +
      "|---------|-------------|------------|\n" +
      "| Syntax | Single handler function | Separate functions per method |\n" +
      "| Request object | Node.js req/res | Web API Request/Response |\n" +
      "| Streaming | Limited | Full support |\n" +
      "| TypeScript | Manual typing | Built-in types |\n" +
      "| Middleware | Limited integration | Full integration |\n" +
      "| Edge Runtime | Supported | Better support |\n\n" +
      "**Best Practices:**\n" +
      "- Use proper HTTP status codes\n" +
      "- Implement proper error handling\n" +
      "- Add request validation\n" +
      "- Use TypeScript for better DX\n" +
      "- Consider rate limiting for public APIs\n" +
      "- Implement proper CORS headers when needed",
    category: "API Routes",
    difficulty: "intermediate",
    tags: ["api-routes", "app-router", "pages-router", "middleware", "streaming", "typescript"],
  },
  {
    id: 6,
    question:
      "What is Next.js Middleware? How do you implement authentication, redirects, and request modification?",
    answer:
      "Next.js Middleware allows you to run code before a request is completed, enabling powerful features like authentication, redirects, rewrites, and request/response modification.\n\n" +
      "**Basic Middleware Setup:**\n" +
      "```javascript\n" +
      "// middleware.js (or middleware.ts)\n" +
      "import { NextResponse } from 'next/server';\n\n" +
      "export function middleware(request) {\n" +
      "  // Get the pathname of the request\n" +
      "  const { pathname } = request.nextUrl;\n" +
      "  \n" +
      "  // Check if the request is for a protected route\n" +
      "  if (pathname.startsWith('/dashboard')) {\n" +
      "    // Check for authentication token\n" +
      "    const token = request.cookies.get('auth-token');\n" +
      "    \n" +
      "    if (!token) {\n" +
      "      // Redirect to login page\n" +
      "      return NextResponse.redirect(new URL('/login', request.url));\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  // Continue with the request\n" +
      "  return NextResponse.next();\n" +
      "}\n\n" +
      "// Configure which paths the middleware should run on\n" +
      "export const config = {\n" +
      "  matcher: [\n" +
      "    '/dashboard/:path*',\n" +
      "    '/api/protected/:path*',\n" +
      "  ],\n" +
      "};\n" +
      "```\n\n" +
      "**Authentication Middleware:**\n" +
      "```javascript\n" +
      "import { NextResponse } from 'next/server';\n" +
      "import { verifyToken } from './lib/auth';\n\n" +
      "export async function middleware(request) {\n" +
      "  const { pathname } = request.nextUrl;\n" +
      "  \n" +
      "  // Skip middleware for public routes\n" +
      "  const publicRoutes = ['/login', '/register', '/', '/about'];\n" +
      "  if (publicRoutes.includes(pathname)) {\n" +
      "    return NextResponse.next();\n" +
      "  }\n" +
      "  \n" +
      "  // Get token from cookies or headers\n" +
      "  const token = request.cookies.get('auth-token')?.value || \n" +
      "                request.headers.get('authorization')?.replace('Bearer ', '');\n" +
      "  \n" +
      "  if (!token) {\n" +
      "    return NextResponse.redirect(new URL('/login', request.url));\n" +
      "  }\n" +
      "  \n" +
      "  try {\n" +
      "    // Verify the token\n" +
      "    const user = await verifyToken(token);\n" +
      "    \n" +
      "    // Add user info to request headers\n" +
      "    const requestHeaders = new Headers(request.headers);\n" +
      "    requestHeaders.set('x-user-id', user.id);\n" +
      "    requestHeaders.set('x-user-role', user.role);\n" +
      "    \n" +
      "    return NextResponse.next({\n" +
      "      request: {\n" +
      "        headers: requestHeaders,\n" +
      "      },\n" +
      "    });\n" +
      "  } catch (error) {\n" +
      "    // Token is invalid\n" +
      "    return NextResponse.redirect(new URL('/login', request.url));\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Role-Based Access Control:**\n" +
      "```javascript\n" +
      "export async function middleware(request) {\n" +
      "  const { pathname } = request.nextUrl;\n" +
      "  \n" +
      "  // Admin routes\n" +
      "  if (pathname.startsWith('/admin')) {\n" +
      "    const userRole = request.headers.get('x-user-role');\n" +
      "    \n" +
      "    if (userRole !== 'admin') {\n" +
      "      return NextResponse.redirect(new URL('/unauthorized', request.url));\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  return NextResponse.next();\n" +
      "}\n" +
      "```\n\n" +
      "**Request/Response Modification:**\n" +
      "```javascript\n" +
      "export function middleware(request) {\n" +
      "  // Add custom headers to the request\n" +
      "  const requestHeaders = new Headers(request.headers);\n" +
      "  requestHeaders.set('x-custom-header', 'middleware-value');\n" +
      "  requestHeaders.set('x-timestamp', Date.now().toString());\n" +
      "  \n" +
      "  // Get the response\n" +
      "  const response = NextResponse.next({\n" +
      "    request: {\n" +
      "      headers: requestHeaders,\n" +
      "    },\n" +
      "  });\n" +
      "  \n" +
      "  // Add custom headers to the response\n" +
      "  response.headers.set('x-response-time', Date.now().toString());\n" +
      "  response.headers.set('x-middleware-processed', 'true');\n" +
      "  \n" +
      "  return response;\n" +
      "}\n" +
      "```\n\n" +
      "**URL Rewrites and Redirects:**\n" +
      "```javascript\n" +
      "export function middleware(request) {\n" +
      "  const { pathname } = request.nextUrl;\n" +
      "  \n" +
      "  // Rewrite API calls to external service\n" +
      "  if (pathname.startsWith('/api/external')) {\n" +
      "    const url = request.nextUrl.clone();\n" +
      "    url.pathname = pathname.replace('/api/external', '');\n" +
      "    url.hostname = 'api.external-service.com';\n" +
      "    \n" +
      "    return NextResponse.rewrite(url);\n" +
      "  }\n" +
      "  \n" +
      "  // Redirect old URLs to new ones\n" +
      "  if (pathname === '/old-page') {\n" +
      "    return NextResponse.redirect(new URL('/new-page', request.url));\n" +
      "  }\n" +
      "  \n" +
      "  // Conditional redirects based on user agent\n" +
      "  const userAgent = request.headers.get('user-agent') || '';\n" +
      "  if (pathname === '/mobile-app' && !userAgent.includes('Mobile')) {\n" +
      "    return NextResponse.redirect(new URL('/desktop-app', request.url));\n" +
      "  }\n" +
      "  \n" +
      "  return NextResponse.next();\n" +
      "}\n" +
      "```\n\n" +
      "**A/B Testing Middleware:**\n" +
      "```javascript\n" +
      "export function middleware(request) {\n" +
      "  const { pathname } = request.nextUrl;\n" +
      "  \n" +
      "  if (pathname === '/homepage') {\n" +
      "    // Simple A/B test based on user ID\n" +
      "    const userId = request.cookies.get('user-id')?.value || '0';\n" +
      "    const variant = parseInt(userId) % 2 === 0 ? 'A' : 'B';\n" +
      "    \n" +
      "    if (variant === 'B') {\n" +
      "      return NextResponse.rewrite(new URL('/homepage-variant-b', request.url));\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  return NextResponse.next();\n" +
      "}\n" +
      "```\n\n" +
      "**Rate Limiting:**\n" +
      "```javascript\n" +
      "const rateLimitMap = new Map();\n\n" +
      "export function middleware(request) {\n" +
      "  const ip = request.ip || '127.0.0.1';\n" +
      "  const now = Date.now();\n" +
      "  const windowMs = 60 * 1000; // 1 minute\n" +
      "  const maxRequests = 100;\n" +
      "  \n" +
      "  if (!rateLimitMap.has(ip)) {\n" +
      "    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });\n" +
      "  } else {\n" +
      "    const rateLimit = rateLimitMap.get(ip);\n" +
      "    \n" +
      "    if (now > rateLimit.resetTime) {\n" +
      "      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });\n" +
      "    } else if (rateLimit.count >= maxRequests) {\n" +
      "      return new NextResponse('Too Many Requests', { status: 429 });\n" +
      "    } else {\n" +
      "      rateLimit.count++;\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  return NextResponse.next();\n" +
      "}\n" +
      "```\n\n" +
      "**Configuration Options:**\n" +
      "```javascript\n" +
      "export const config = {\n" +
      "  // Match specific paths\n" +
      "  matcher: [\n" +
      "    '/dashboard/:path*',\n" +
      "    '/api/:path*',\n" +
      "    '/((?!_next/static|_next/image|favicon.ico).*)',\n" +
      "  ],\n" +
      "  \n" +
      "  // Skip middleware for certain paths\n" +
      "  // This is handled in the middleware function itself\n" +
      "};\n" +
      "```\n\n" +
      "**Edge Runtime Considerations:**\n" +
      "- Middleware runs at the Edge (closer to users)\n" +
      "- Limited Node.js APIs available\n" +
      "- Faster execution but fewer features\n" +
      "- Use Web APIs instead of Node.js APIs\n\n" +
      "**Best Practices:**\n" +
      "- Keep middleware lightweight and fast\n" +
      "- Use proper error handling\n" +
      "- Cache expensive operations\n" +
      "- Test middleware thoroughly\n" +
      "- Consider performance impact",
    category: "Middleware",
    difficulty: "intermediate",
    tags: ["middleware", "authentication", "redirects", "rewrites", "rate-limiting", "edge"],
  },
  {
    id: 7,
    question:
      "What is Static Site Generation (SSG) in Next.js? How do you implement getStaticProps and getStaticPaths?",
    answer:
      "Static Site Generation (SSG) is a Next.js feature that pre-renders pages at build time, creating static HTML files that can be served directly from a CDN for optimal performance.\n\n" +
      "**Basic SSG with getStaticProps:**\n" +
      "```javascript\n" +
      "// pages/blog/[slug].js\n" +
      "import { GetStaticProps, GetStaticPaths } from 'next';\n\n" +
      "function BlogPost({ post }) {\n" +
      "  return (\n" +
      "    <div>\n" +
      "      <h1>{post.title}</h1>\n" +
      "      <p>{post.content}</p>\n" +
      "      <p>Published: {post.publishedAt}</p>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n\n" +
      "// This function runs at build time\n" +
      "export const getStaticProps = async ({ params }) => {\n" +
      "  const { slug } = params;\n" +
      "  \n" +
      "  // Fetch data from CMS, API, or database\n" +
      "  const post = await fetchPostBySlug(slug);\n" +
      "  \n" +
      "  if (!post) {\n" +
      "    return {\n" +
      "      notFound: true, // Returns 404 page\n" +
      "    };\n" +
      "  }\n" +
      "  \n" +
      "  return {\n" +
      "    props: {\n" +
      "      post,\n" +
      "    },\n" +
      "    // Optional: Revalidate every 60 seconds (ISR)\n" +
      "    revalidate: 60,\n" +
      "  };\n" +
      "};\n\n" +
      "// This function runs at build time to generate paths\n" +
      "export const getStaticPaths = async () => {\n" +
      "  // Fetch all blog post slugs\n" +
      "  const posts = await fetchAllPostSlugs();\n" +
      "  \n" +
      "  const paths = posts.map((post) => ({\n" +
      "    params: { slug: post.slug },\n" +
      "  }));\n" +
      "  \n" +
      "  return {\n" +
      "    paths,\n" +
      "    // Enable ISR for paths not generated at build time\n" +
      "    fallback: 'blocking', // or 'true' for partial pre-rendering\n" +
      "  };\n" +
      "};\n\n" +
      "export default BlogPost;\n" +
      "```\n\n" +
      "**Fallback Strategies:**\n" +
      "```javascript\n" +
      "export const getStaticPaths = async () => {\n" +
      "  return {\n" +
      "    paths: [\n" +
      "      { params: { slug: 'popular-post-1' } },\n" +
      "      { params: { slug: 'popular-post-2' } },\n" +
      "    ],\n" +
      "    \n" +
      "    // 'blocking': Server-render on-demand, then cache\n" +
      "    // 'true': Show loading state, then render\n" +
      "    // false: Only pre-render paths listed above\n" +
      "    fallback: 'blocking',\n" +
      "  };\n" +
      "};\n\n" +
      "// Handle loading state for fallback: true\n" +
      "function BlogPost({ post }) {\n" +
      "  const router = useRouter();\n" +
      "  \n" +
      "  if (router.isFallback) {\n" +
      "    return <div>Loading...</div>;\n" +
      "  }\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <h1>{post.title}</h1>\n" +
      "      <p>{post.content}</p>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Incremental Static Regeneration (ISR):**\n" +
      "```javascript\n" +
      "export const getStaticProps = async () => {\n" +
      "  const posts = await fetchPosts();\n" +
      "  \n" +
      "  return {\n" +
      "    props: { posts },\n" +
      "    // Revalidate every 10 minutes\n" +
      "    revalidate: 600,\n" +
      "  };\n" +
      "};\n\n" +
      "// Manual revalidation via API route\n" +
      "// pages/api/revalidate.js\n" +
      "export default async function handler(req, res) {\n" +
      "  const { secret, path } = req.query;\n" +
      "  \n" +
      "  if (secret !== process.env.REVALIDATE_SECRET) {\n" +
      "    return res.status(401).json({ message: 'Invalid token' });\n" +
      "  }\n" +
      "  \n" +
      "  try {\n" +
      "    await res.revalidate(path);\n" +
      "    return res.json({ revalidated: true });\n" +
      "  } catch (err) {\n" +
      "    return res.status(500).json({ message: 'Error revalidating' });\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced SSG Patterns:**\n" +
      "```javascript\n" +
      "// pages/products/index.js - Product listing\n" +
      "export const getStaticProps = async ({ params, preview = false }) => {\n" +
      "  const products = await fetchProducts({ preview });\n" +
      "  \n" +
      "  return {\n" +
      "    props: {\n" +
      "      products,\n" +
      "      preview,\n" +
      "    },\n" +
      "    revalidate: 3600, // 1 hour\n" +
      "  };\n" +
      "};\n\n" +
      "// pages/products/[id].js - Individual product\n" +
      "export const getStaticPaths = async () => {\n" +
      "  // Only pre-render the most popular products\n" +
      "  const popularProducts = await fetchPopularProducts();\n" +
      "  \n" +
      "  const paths = popularProducts.map((product) => ({\n" +
      "    params: { id: product.id.toString() },\n" +
      "  }));\n" +
      "  \n" +
      "  return {\n" +
      "    paths,\n" +
      "    fallback: 'blocking', // Generate others on-demand\n" +
      "  };\n" +
      "};\n\n" +
      "export const getStaticProps = async ({ params }) => {\n" +
      "  const product = await fetchProduct(params.id);\n" +
      "  \n" +
      "  if (!product) {\n" +
      "    return { notFound: true };\n" +
      "  }\n" +
      "  \n" +
      "  return {\n" +
      "    props: { product },\n" +
      "    revalidate: 86400, // 24 hours\n" +
      "  };\n" +
      "};\n" +
      "```\n\n" +
      "**SSG vs SSR vs ISR:**\n\n" +
      "| Method | When | Performance | Use Case |\n" +
      "|--------|------|-------------|----------|\n" +
      "| SSG | Build time | Fastest | Static content |\n" +
      "| SSR | Request time | Slower | Dynamic content |\n" +
      "| ISR | Build + On-demand | Fast | Semi-dynamic content |\n\n" +
      "**Benefits of SSG:**\n" +
      "- **Performance**: Pre-rendered HTML loads instantly\n" +
      "- **SEO**: Search engines can crawl static HTML\n" +
      "- **CDN**: Static files can be cached globally\n" +
      "- **Cost**: Reduced server load and costs\n" +
      "- **Reliability**: No server dependencies\n\n" +
      "**When to Use SSG:**\n" +
      "- Blog posts, documentation, marketing pages\n" +
      "- Product catalogs with infrequent updates\n" +
      "- Landing pages and portfolios\n" +
      "- Content that doesn't change often\n\n" +
      "**Best Practices:**\n" +
      "- Use ISR for content that changes occasionally\n" +
      "- Implement proper error handling\n" +
      "- Use fallback strategies for dynamic routes\n" +
      "- Monitor build times and optimize accordingly\n" +
      "- Consider hybrid approaches (SSG + client-side fetching)",
    category: "SSG",
    difficulty: "intermediate",
    tags: ["ssg", "getStaticProps", "getStaticPaths", "isr", "performance", "seo"],
  },
  {
    id: 8,
    question:
      "What is Server-Side Rendering (SSR) in Next.js? How do you implement getServerSideProps?",
    answer:
      "Server-Side Rendering (SSR) in Next.js allows you to render pages on the server for each request, providing fresh data and better SEO for dynamic content.\n\n" +
      "**Basic SSR with getServerSideProps:**\n" +
      "```javascript\n" +
      "// pages/products/[id].js\n" +
      "import { GetServerSideProps } from 'next';\n\n" +
      "function ProductPage({ product, user }) {\n" +
      "  return (\n" +
      "    <div>\n" +
      "      <h1>{product.name}</h1>\n" +
      "      <p>{product.description}</p>\n" +
      "      <p>Price: ${product.price}</p>\n" +
      "      {user && <p>Welcome back, {user.name}!</p>}\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n\n" +
      "export const getServerSideProps = async (context) => {\n" +
      "  const { params, req, res, query } = context;\n" +
      "  const { id } = params;\n" +
      "  \n" +
      "  // Access request/response objects\n" +
      "  const userAgent = req.headers['user-agent'];\n" +
      "  const cookies = req.cookies;\n" +
      "  \n" +
      "  // Fetch data from API or database\n" +
      "  const product = await fetchProduct(id);\n" +
      "  \n" +
      "  if (!product) {\n" +
      "    return {\n" +
      "      notFound: true,\n" +
      "    };\n" +
      "  }\n" +
      "  \n" +
      "  // Get user from session/token\n" +
      "  const user = await getUserFromToken(cookies.authToken);\n" +
      "  \n" +
      "  // Set custom headers\n" +
      "  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');\n" +
      "  \n" +
      "  return {\n" +
      "    props: {\n" +
      "      product,\n" +
      "      user,\n" +
      "    },\n" +
      "  };\n" +
      "};\n\n" +
      "export default ProductPage;\n" +
      "```\n\n" +
      "**Advanced SSR Patterns:**\n" +
      "```javascript\n" +
      "export const getServerSideProps = async (context) => {\n" +
      "  const { params, req, res, query } = context;\n" +
      "  \n" +
      "  // Handle different scenarios\n" +
      "  try {\n" +
      "    // Parallel data fetching\n" +
      "    const [product, reviews, recommendations] = await Promise.all([\n" +
      "      fetchProduct(params.id),\n" +
      "      fetchReviews(params.id),\n" +
      "      fetchRecommendations(params.id),\n" +
      "    ]);\n" +
      "    \n" +
      "    // Conditional logic based on request\n" +
      "    if (req.headers['x-mobile-app']) {\n" +
      "      // Return mobile-specific data\n" +
      "      return {\n" +
      "        props: {\n" +
      "          product: product.mobile,\n" +
      "          reviews: reviews.slice(0, 5), // Limit for mobile\n" +
      "        },\n" +
      "      };\n" +
      "    }\n" +
      "    \n" +
      "    // Redirect based on conditions\n" +
      "    if (product.status === 'discontinued') {\n" +
      "      return {\n" +
      "        redirect: {\n" +
      "          destination: '/products',\n" +
      "          permanent: false,\n" +
      "        },\n" +
      "      };\n" +
      "    }\n" +
      "    \n" +
      "    return {\n" +
      "      props: {\n" +
      "        product,\n" +
      "        reviews,\n" +
      "        recommendations,\n" +
      "      },\n" +
      "    };\n" +
      "    \n" +
      "  } catch (error) {\n" +
      "    // Handle errors gracefully\n" +
      "    console.error('SSR Error:', error);\n" +
      "    \n" +
      "    return {\n" +
      "      props: {\n" +
      "        error: 'Failed to load product',\n" +
      "      },\n" +
      "    };\n" +
      "  }\n" +
      "};\n" +
      "```\n\n" +
      "**Authentication with SSR:**\n" +
      "```javascript\n" +
      "export const getServerSideProps = async (context) => {\n" +
      "  const { req } = context;\n" +
      "  \n" +
      "  // Check authentication\n" +
      "  const token = req.cookies.authToken;\n" +
      "  \n" +
      "  if (!token) {\n" +
      "    return {\n" +
      "      redirect: {\n" +
      "        destination: '/login',\n" +
      "        permanent: false,\n" +
      "      },\n" +
      "    };\n" +
      "  }\n" +
      "  \n" +
      "  try {\n" +
      "    // Verify token and get user\n" +
      "    const user = await verifyToken(token);\n" +
      "    const userData = await fetchUserData(user.id);\n" +
      "    \n" +
      "    return {\n" +
      "      props: {\n" +
      "        user: userData,\n" +
      "      },\n" +
      "    };\n" +
      "    \n" +
      "  } catch (error) {\n" +
      "    // Token is invalid\n" +
      "    return {\n" +
      "      redirect: {\n" +
      "        destination: '/login',\n" +
      "        permanent: false,\n" +
      "      },\n" +
      "    };\n" +
      "  }\n" +
      "};\n" +
      "```\n\n" +
      "**Caching Strategies:**\n" +
      "```javascript\n" +
      "export const getServerSideProps = async (context) => {\n" +
      "  const { res } = context;\n" +
      "  \n" +
      "  // Different caching strategies\n" +
      "  \n" +
      "  // 1. No caching (always fresh)\n" +
      "  res.setHeader('Cache-Control', 'no-store');\n" +
      "  \n" +
      "  // 2. Short-term caching\n" +
      "  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');\n" +
      "  \n" +
      "  // 3. CDN caching\n" +
      "  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');\n" +
      "  \n" +
      "  const data = await fetchData();\n" +
      "  \n" +
      "  return {\n" +
      "    props: { data },\n" +
      "  };\n" +
      "};\n" +
      "```\n\n" +
      "**SSR vs SSG vs ISR:**\n\n" +
      "| Method | When | Performance | Use Case |\n" +
      "|--------|------|-------------|----------|\n" +
      "| SSR | Every request | Slower | Personalized content |\n" +
      "| SSG | Build time | Fastest | Static content |\n" +
      "| ISR | Build + On-demand | Fast | Semi-dynamic content |\n\n" +
      "**When to Use SSR:**\n" +
      "- User-specific content (dashboards, profiles)\n" +
      "- Real-time data (stock prices, live scores)\n" +
      "- Authentication-dependent pages\n" +
      "- Content that changes frequently\n" +
      "- SEO-critical dynamic content\n\n" +
      "**Performance Considerations:**\n" +
      "- SSR is slower than SSG (server processing time)\n" +
      "- Use caching headers to improve performance\n" +
      "- Consider hybrid approaches (SSR + client-side updates)\n" +
      "- Monitor server response times\n\n" +
      "**Best Practices:**\n" +
      "- Use SSR only when necessary\n" +
      "- Implement proper error handling\n" +
      "- Set appropriate cache headers\n" +
      "- Optimize data fetching (parallel requests)\n" +
      "- Consider fallback strategies",
    category: "SSR",
    difficulty: "intermediate",
    tags: ["ssr", "getServerSideProps", "authentication", "caching", "performance", "seo"],
  },
  {
    id: 9,
    question:
      "How do you deploy Next.js applications? Compare Vercel, Netlify, AWS, and other deployment platforms.",
    answer:
      "Next.js applications can be deployed on various platforms, each offering different features, performance characteristics, and pricing models.\n\n" +
      "**Vercel (Recommended for Next.js):**\n" +
      "```javascript\n" +
      "// vercel.json\n" +
      "{\n" +
      '  "framework": "nextjs",\n' +
      '  "buildCommand": "npm run build",\n' +
      '  "outputDirectory": ".next",\n' +
      '  "installCommand": "npm install",\n' +
      '  "devCommand": "npm run dev",\n' +
      '  "regions": ["iad1"],\n' +
      '  "functions": {\n' +
      '    "app/api/**/*.js": {\n' +
      '      "maxDuration": 30\n' +
      "    }\n" +
      "  },\n" +
      '  "env": {\n' +
      '    "DATABASE_URL": "@database-url",\n' +
      '    "API_KEY": "@api-key"\n' +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Vercel Features:**\n" +
      "- **Zero-config deployment**: Automatic Next.js optimization\n" +
      "- **Edge Functions**: Serverless functions at the edge\n" +
      "- **Automatic HTTPS**: SSL certificates included\n" +
      "- **Preview deployments**: Branch-based previews\n" +
      "- **Analytics**: Built-in performance monitoring\n" +
      "- **Image Optimization**: Automatic image optimization\n\n" +
      "**Netlify Deployment:**\n" +
      "```javascript\n" +
      "// netlify.toml\n" +
      "[build]\n" +
      '  command = "npm run build"\n' +
      '  publish = ".next"\n' +
      "\n" +
      "[build.environment]\n" +
      '  NODE_VERSION = "18"\n' +
      "\n" +
      "[[redirects]]\n" +
      '  from = "/*"\n' +
      '  to = "/index.html"\n' +
      "  status = 200\n" +
      "\n" +
      "[functions]\n" +
      '  directory = "netlify/functions"\n' +
      "```\n\n" +
      "**AWS Deployment (Amplify):**\n" +
      "```yaml\n" +
      "# amplify.yml\n" +
      "version: 1\n" +
      "frontend:\n" +
      "  phases:\n" +
      "    preBuild:\n" +
      "      commands:\n" +
      "        - npm ci\n" +
      "    build:\n" +
      "      commands:\n" +
      "        - npm run build\n" +
      "  artifacts:\n" +
      "    baseDirectory: .next\n" +
      "    files:\n" +
      "      - '**/*'\n" +
      "  cache:\n" +
      "    paths:\n" +
      "      - node_modules/**/*\n" +
      "      - .next/cache/**/*\n" +
      "```\n\n" +
      "**Docker Deployment:**\n" +
      "```dockerfile\n" +
      "# Dockerfile\n" +
      "FROM node:18-alpine AS base\n\n" +
      "# Install dependencies only when needed\n" +
      "FROM base AS deps\n" +
      "RUN apk add --no-cache libc6-compat\n" +
      "WORKDIR /app\n" +
      "COPY package.json package-lock.json* ./ \n" +
      "RUN npm ci\n\n" +
      "# Rebuild the source code only when needed\n" +
      "FROM base AS builder\n" +
      "WORKDIR /app\n" +
      "COPY --from=deps /app/node_modules ./node_modules\n" +
      "COPY . .\n" +
      "RUN npm run build\n\n" +
      "# Production image, copy all the files and run next\n" +
      "FROM base AS runner\n" +
      "WORKDIR /app\n" +
      "ENV NODE_ENV production\n" +
      "RUN addgroup --system --gid 1001 nodejs\n" +
      "RUN adduser --system --uid 1001 nextjs\n" +
      "COPY --from=builder /app/public ./public\n" +
      "COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./\n" +
      "COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static\n" +
      "USER nextjs\n" +
      "EXPOSE 3000\n" +
      "ENV PORT 3000\n" +
      'CMD ["node", "server.js"]\n' +
      "```\n\n" +
      "**Platform Comparison:**\n\n" +
      "| Platform | Next.js Support | Pricing | Features | Best For |\n" +
      "|----------|-----------------|---------|----------|----------|\n" +
      "| Vercel | Excellent | Free tier + usage | Edge functions, Analytics | Next.js apps |\n" +
      "| Netlify | Good | Free tier + usage | Forms, Functions | Static sites |\n" +
      "| AWS Amplify | Good | Pay per use | Full AWS ecosystem | Enterprise |\n" +
      "| Railway | Good | Usage-based | Simple deployment | Small projects |\n" +
      "| DigitalOcean | Basic | Fixed pricing | VPS control | Custom setups |\n\n" +
      "**Environment Variables:**\n" +
      "```javascript\n" +
      "// .env.local (development)\n" +
      "DATABASE_URL=postgresql://localhost:5432/myapp\n" +
      "API_KEY=dev-key-123\n" +
      "NEXT_PUBLIC_API_URL=http://localhost:3000/api\n\n" +
      "// .env.production (production)\n" +
      "DATABASE_URL=postgresql://prod-server:5432/myapp\n" +
      "API_KEY=prod-key-456\n" +
      "NEXT_PUBLIC_API_URL=https://myapp.vercel.app/api\n" +
      "```\n\n" +
      "**Deployment Best Practices:**\n" +
      "```javascript\n" +
      "// next.config.js\n" +
      "module.exports = {\n" +
      "  // Optimize for production\n" +
      "  compress: true,\n" +
      "  poweredByHeader: false,\n" +
      "  \n" +
      "  // Environment-specific configs\n" +
      "  env: {\n" +
      "    CUSTOM_KEY: process.env.CUSTOM_KEY,\n" +
      "  },\n" +
      "  \n" +
      "  // Image optimization\n" +
      "  images: {\n" +
      "    domains: ['example.com'],\n" +
      "  },\n" +
      "  \n" +
      "  // Headers for security\n" +
      "  async headers() {\n" +
      "    return [\n" +
      "      {\n" +
      "        source: '/(.*)',\n" +
      "        headers: [\n" +
      "          {\n" +
      "            key: 'X-Frame-Options',\n" +
      "            value: 'DENY',\n" +
      "          },\n" +
      "          {\n" +
      "            key: 'X-Content-Type-Options',\n" +
      "            value: 'nosniff',\n" +
      "          },\n" +
      "        ],\n" +
      "      },\n" +
      "    ];\n" +
      "  },\n" +
      "};\n" +
      "```\n\n" +
      "**CI/CD Pipeline:**\n" +
      "```yaml\n" +
      "# .github/workflows/deploy.yml\n" +
      "name: Deploy to Production\n" +
      "on:\n" +
      "  push:\n" +
      "    branches: [main]\n" +
      "\n" +
      "jobs:\n" +
      "  deploy:\n" +
      "    runs-on: ubuntu-latest\n" +
      "    steps:\n" +
      "      - uses: actions/checkout@v3\n" +
      "      - uses: actions/setup-node@v3\n" +
      "        with:\n" +
      "          node-version: '18'\n" +
      "      - run: npm ci\n" +
      "      - run: npm run build\n" +
      "      - run: npm run test\n" +
      "      - uses: vercel/action@v1\n" +
      "        with:\n" +
      "          vercel-token: ${{ secrets.VERCEL_TOKEN }}\n" +
      "          vercel-org-id: ${{ secrets.ORG_ID }}\n" +
      "          vercel-project-id: ${{ secrets.PROJECT_ID }}\n" +
      "```\n\n" +
      "**Monitoring and Analytics:**\n" +
      "```javascript\n" +
      "// lib/analytics.js\n" +
      "export function trackEvent(event, properties) {\n" +
      "  if (typeof window !== 'undefined') {\n" +
      "    // Client-side tracking\n" +
      "    gtag('event', event, properties);\n" +
      "  }\n" +
      "}\n\n" +
      "// pages/_app.js\n" +
      "import { useEffect } from 'react';\n" +
      "import { useRouter } from 'next/router';\n" +
      "import * as gtag from '../lib/gtag';\n\n" +
      "export default function App({ Component, pageProps }) {\n" +
      "  const router = useRouter();\n" +
      "  \n" +
      "  useEffect(() => {\n" +
      "    const handleRouteChange = (url) => {\n" +
      "      gtag.pageview(url);\n" +
      "    };\n" +
      "    \n" +
      "    router.events.on('routeChangeComplete', handleRouteChange);\n" +
      "    return () => {\n" +
      "      router.events.off('routeChangeComplete', handleRouteChange);\n" +
      "    };\n" +
      "  }, [router.events]);\n" +
      "  \n" +
      "  return <Component {...pageProps} />;\n" +
      "}\n" +
      "```\n\n" +
      "**Key Considerations:**\n" +
      "- Choose platform based on your needs and budget\n" +
      "- Set up proper environment variables\n" +
      "- Implement monitoring and error tracking\n" +
      "- Use CDN for static assets\n" +
      "- Set up proper caching strategies\n" +
      "- Implement security headers\n" +
      "- Monitor performance and costs",
    category: "Deployment",
    difficulty: "intermediate",
    tags: ["deployment", "vercel", "netlify", "aws", "docker", "ci-cd"],
  },
  {
    id: 10,
    question:
      "How do you integrate TypeScript with Next.js? What are the key configuration options and type definitions?",
    answer:
      "Next.js has excellent TypeScript support out of the box, providing type safety and enhanced developer experience.\n\n" +
      "**Setup & Configuration:**\n\n" +
      "1. **Initial Setup:**\n" +
      "```bash\n" +
      "npx create-next-app@latest --typescript\n" +
      "# or add to existing project\n" +
      "npm install --save-dev typescript @types/react @types/node\n" +
      "```\n\n" +
      "2. **tsconfig.json Configuration:**\n" +
      "```json\n" +
      "{\n" +
      '  "compilerOptions": {\n' +
      '    "target": "es5",\n' +
      '    "lib": ["dom", "dom.iterable", "es6"],\n' +
      '    "allowJs": true,\n' +
      '    "skipLibCheck": true,\n' +
      '    "strict": true,\n' +
      '    "forceConsistentCasingInFileNames": true,\n' +
      '    "noEmit": true,\n' +
      '    "esModuleInterop": true,\n' +
      '    "module": "esnext",\n' +
      '    "moduleResolution": "node",\n' +
      '    "resolveJsonModule": true,\n' +
      '    "isolatedModules": true,\n' +
      '    "jsx": "preserve",\n' +
      '    "incremental": true,\n' +
      '    "plugins": [\n' +
      "      {\n" +
      '        "name": "next"\n' +
      "      }\n" +
      "    ]\n" +
      "  },\n" +
      '  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],\n' +
      '  "exclude": ["node_modules"]\n' +
      "}\n" +
      "```\n\n" +
      "**Key Type Definitions:**\n\n" +
      "1. **Page Props Types:**\n" +
      "```typescript\n" +
      "// pages/index.tsx\n" +
      "import { GetStaticProps, GetServerSideProps } from 'next';\n" +
      "\n" +
      "interface HomeProps {\n" +
      "  posts: Post[];\n" +
      "  count: number;\n" +
      "}\n" +
      "\n" +
      "export const getStaticProps: GetStaticProps<HomeProps> = async () => {\n" +
      "  const posts = await fetchPosts();\n" +
      "  return {\n" +
      "    props: {\n" +
      "      posts,\n" +
      "      count: posts.length\n" +
      "    },\n" +
      "    revalidate: 60\n" +
      "  };\n" +
      "};\n" +
      "\n" +
      "export default function Home({ posts, count }: HomeProps) {\n" +
      "  return (\n" +
      "    <div>\n" +
      "      <h1>Posts ({count})</h1>\n" +
      "      {posts.map(post => (\n" +
      "        <div key={post.id}>{post.title}</div>\n" +
      "      ))}\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "2. **API Route Types:**\n" +
      "```typescript\n" +
      "// pages/api/users.ts\n" +
      "import { NextApiRequest, NextApiResponse } from 'next';\n" +
      "\n" +
      "interface User {\n" +
      "  id: string;\n" +
      "  name: string;\n" +
      "  email: string;\n" +
      "}\n" +
      "\n" +
      "export default function handler(\n" +
      "  req: NextApiRequest,\n" +
      "  res: NextApiResponse<User[] | { error: string }>\n" +
      ") {\n" +
      "  if (req.method === 'GET') {\n" +
      "    const users: User[] = await getUsers();\n" +
      "    res.status(200).json(users);\n" +
      "  } else {\n" +
      "    res.status(405).json({ error: 'Method not allowed' });\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- Compile-time error detection\n" +
      "- Better IDE support with autocomplete\n" +
      "- Refactoring safety\n" +
      "- Self-documenting code\n" +
      "- Enhanced debugging experience",
    category: "TypeScript",
    difficulty: "intermediate",
    tags: ["typescript", "configuration", "types", "type-safety", "development"],
  },
  {
    id: 11,
    question:
      "How do you optimize Next.js performance? Explain bundle analysis, code splitting, and lazy loading strategies.",
    answer:
      "Next.js performance optimization involves multiple strategies to reduce bundle size, improve loading times, and enhance user experience.\n\n" +
      "**Bundle Analysis:**\n\n" +
      "1. **Analyze Bundle Size:**\n" +
      "```bash\n" +
      "# Install bundle analyzer\n" +
      "npm install --save-dev @next/bundle-analyzer\n" +
      "\n" +
      "# Add to next.config.js\n" +
      "const withBundleAnalyzer = require('@next/bundle-analyzer')({\n" +
      "  enabled: process.env.ANALYZE === 'true',\n" +
      "});\n" +
      "\n" +
      "module.exports = withBundleAnalyzer({\n" +
      "  // your config\n" +
      "});\n" +
      "\n" +
      "# Run analysis\n" +
      "ANALYZE=true npm run build\n" +
      "```\n\n" +
      "**Code Splitting Strategies:**\n\n" +
      "1. **Dynamic Imports:**\n" +
      "```typescript\n" +
      "// Lazy load components\n" +
      "import dynamic from 'next/dynamic';\n" +
      "\n" +
      "const HeavyComponent = dynamic(() => import('../components/HeavyComponent'), {\n" +
      "  loading: () => <p>Loading...</p>,\n" +
      "  ssr: false // Disable SSR for client-only components\n" +
      "});\n" +
      "\n" +
      "// Conditional loading\n" +
      "const Chart = dynamic(() => import('../components/Chart'), {\n" +
      "  loading: () => <div>Loading chart...</div>\n" +
      "});\n" +
      "\n" +
      "function Dashboard() {\n" +
      "  const [showChart, setShowChart] = useState(false);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <button onClick={() => setShowChart(true)}>\n" +
      "        Show Chart\n" +
      "      </button>\n" +
      "      {showChart && <Chart />}\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Performance Optimization Techniques:**\n\n" +
      "1. **Image Optimization:**\n" +
      "```typescript\n" +
      "import Image from 'next/image';\n" +
      "\n" +
      "// Optimized images\n" +
      "function OptimizedImage() {\n" +
      "  return (\n" +
      "    <Image\n" +
      "      src='/hero.jpg'\n" +
      "      alt='Hero image'\n" +
      "      width={800}\n" +
      "      height={600}\n" +
      "      priority // Load immediately\n" +
      "      placeholder='blur'\n" +
      "      blurDataURL='data:image/jpeg;base64,...'\n" +
      "    />\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "2. **Font Optimization:**\n" +
      "```typescript\n" +
      "import { Inter } from 'next/font/google';\n" +
      "\n" +
      "const inter = Inter({ subsets: ['latin'] });\n" +
      "\n" +
      "export default function RootLayout({ children }) {\n" +
      "  return (\n" +
      "    <html lang='en' className={inter.className}>\n" +
      "      <body>{children}</body>\n" +
      "    </html>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Use dynamic imports for heavy components\n" +
      "- Implement proper loading states\n" +
      "- Optimize images and fonts\n" +
      "- Use static generation when possible\n" +
      "- Monitor Core Web Vitals\n" +
      "- Implement proper caching strategies\n" +
      "- Minimize JavaScript bundle size\n" +
      "- Use CDN for static assets",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["performance", "bundle-analysis", "code-splitting", "lazy-loading", "optimization"],
  },
  {
    id: 12,
    question:
      "How do you implement testing in Next.js applications? Explain Jest, React Testing Library, and E2E testing strategies.",
    answer:
      "Testing Next.js applications requires a comprehensive approach covering unit tests, integration tests, and end-to-end testing.\n\n" +
      "**Jest Configuration:**\n\n" +
      "1. **Setup Jest:**\n" +
      "```bash\n" +
      "npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom\n" +
      "```\n\n" +
      "2. **jest.config.js:**\n" +
      "```javascript\n" +
      "const nextJest = require('next/jest');\n" +
      "\n" +
      "const createJestConfig = nextJest({\n" +
      "  dir: './',\n" +
      "});\n" +
      "\n" +
      "const customJestConfig = {\n" +
      "  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],\n" +
      "  testEnvironment: 'jest-environment-jsdom',\n" +
      "  moduleNameMapping: {\n" +
      "    '^@/(.*)$': '<rootDir>/src/$1',\n" +
      "  },\n" +
      "};\n" +
      "\n" +
      "module.exports = createJestConfig(customJestConfig);\n" +
      "```\n\n" +
      "**React Testing Library:**\n\n" +
      "1. **Component Testing:**\n" +
      "```typescript\n" +
      "// components/Button.test.tsx\n" +
      "import { render, screen, fireEvent } from '@testing-library/react';\n" +
      "import Button from './Button';\n" +
      "\n" +
      "describe('Button Component', () => {\n" +
      "  it('renders with correct text', () => {\n" +
      "    render(<Button>Click me</Button>);\n" +
      "    expect(screen.getByText('Click me')).toBeInTheDocument();\n" +
      "  });\n" +
      "\n" +
      "  it('calls onClick handler when clicked', () => {\n" +
      "    const handleClick = jest.fn();\n" +
      "    render(<Button onClick={handleClick}>Click me</Button>);\n" +
      "    \n" +
      "    fireEvent.click(screen.getByText('Click me'));\n" +
      "    expect(handleClick).toHaveBeenCalledTimes(1);\n" +
      "  });\n" +
      "});\n" +
      "```\n\n" +
      "2. **Page Testing:**\n" +
      "```typescript\n" +
      "// pages/index.test.tsx\n" +
      "import { render, screen } from '@testing-library/react';\n" +
      "import Home from '../pages/index';\n" +
      "\n" +
      "describe('Home Page', () => {\n" +
      "  it('renders welcome message', () => {\n" +
      "    render(<Home />);\n" +
      "    expect(screen.getByText('Welcome to Next.js!')).toBeInTheDocument();\n" +
      "  });\n" +
      "});\n" +
      "```\n\n" +
      "**API Route Testing:**\n\n" +
      "```typescript\n" +
      "// pages/api/users.test.ts\n" +
      "import { createMocks } from 'node-mocks-http';\n" +
      "import handler from '../api/users';\n" +
      "\n" +
      "describe('/api/users', () => {\n" +
      "  it('returns users list', async () => {\n" +
      "    const { req, res } = createMocks({\n" +
      "      method: 'GET',\n" +
      "    });\n" +
      "\n" +
      "    await handler(req, res);\n" +
      "\n" +
      "    expect(res._getStatusCode()).toBe(200);\n" +
      "    expect(JSON.parse(res._getData())).toEqual(\n" +
      "      expect.arrayContaining([\n" +
      "        expect.objectContaining({\n" +
      "          id: expect.any(String),\n" +
      "          name: expect.any(String),\n" +
      "        })\n" +
      "      ])\n" +
      "    );\n" +
      "  });\n" +
      "});\n" +
      "```\n\n" +
      "**E2E Testing with Playwright:**\n\n" +
      "1. **Setup Playwright:**\n" +
      "```bash\n" +
      "npm install --save-dev @playwright/test\n" +
      "npx playwright install\n" +
      "```\n\n" +
      "2. **E2E Test:**\n" +
      "```typescript\n" +
      "// tests/e2e/homepage.spec.ts\n" +
      "import { test, expect } from '@playwright/test';\n" +
      "\n" +
      "test('homepage loads correctly', async ({ page }) => {\n" +
      "  await page.goto('/');\n" +
      "  \n" +
      "  // Check page title\n" +
      "  await expect(page).toHaveTitle(/Next.js/);\n" +
      "  \n" +
      "  // Check main content\n" +
      "  await expect(page.locator('h1')).toContainText('Welcome to Next.js!');\n" +
      "  \n" +
      "  // Test navigation\n" +
      "  await page.click('text=About');\n" +
      "  await expect(page).toHaveURL('/about');\n" +
      "});\n" +
      "```\n\n" +
      "**Testing Best Practices:**\n" +
      "- Test user interactions, not implementation details\n" +
      "- Use data-testid for reliable element selection\n" +
      "- Mock external dependencies\n" +
      "- Test error states and edge cases\n" +
      "- Maintain good test coverage\n" +
      "- Use descriptive test names\n" +
      "- Keep tests simple and focused",
    category: "Testing",
    difficulty: "intermediate",
    tags: ["testing", "jest", "react-testing-library", "playwright", "e2e"],
  },
  {
    id: 13,
    question:
      "How do you implement internationalization (i18n) in Next.js? Explain multi-language support and routing strategies.",
    answer:
      "Next.js provides built-in internationalization support for creating multi-language applications with proper routing and content management.\n\n" +
      "**Setup i18n:**\n\n" +
      "1. **next.config.js Configuration:**\n" +
      "```javascript\n" +
      "module.exports = {\n" +
      "  i18n: {\n" +
      "    locales: ['en', 'es', 'fr', 'de'],\n" +
      "    defaultLocale: 'en',\n" +
      "    localeDetection: true,\n" +
      "  },\n" +
      "};\n" +
      "```\n\n" +
      "2. **Install Dependencies:**\n" +
      "```bash\n" +
      "npm install next-i18next\n" +
      "```\n\n" +
      "**Translation Files:**\n\n" +
      "1. **Create Translation Files:**\n" +
      "```javascript\n" +
      "// public/locales/en/common.json\n" +
      "{\n" +
      '  "welcome": "Welcome to our website",\n' +
      '  "about": "About Us",\n' +
      '  "contact": "Contact"\n' +
      "}\n" +
      "\n" +
      "// public/locales/es/common.json\n" +
      "{\n" +
      '  "welcome": "Bienvenido a nuestro sitio web",\n' +
      '  "about": "Acerca de Nosotros",\n' +
      '  "contact": "Contacto"\n' +
      "}\n" +
      "```\n\n" +
      "**Using Translations:**\n\n" +
      "1. **Pages Router:**\n" +
      "```typescript\n" +
      "// pages/index.tsx\n" +
      "import { useTranslation } from 'next-i18next';\n" +
      "import { serverSideTranslations } from 'next-i18next/serverSideTranslations';\n" +
      "\n" +
      "export default function Home() {\n" +
      "  const { t } = useTranslation('common');\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <h1>{t('welcome')}</h1>\n" +
      "      <nav>\n" +
      "        <Link href='/about'>{t('about')}</Link>\n" +
      "        <Link href='/contact'>{t('contact')}</Link>\n" +
      "      </nav>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "\n" +
      "export async function getStaticProps({ locale }) {\n" +
      "  return {\n" +
      "    props: {\n" +
      "      ...(await serverSideTranslations(locale, ['common'])),\n" +
      "    },\n" +
      "  };\n" +
      "}\n" +
      "```\n\n" +
      "2. **App Router:**\n" +
      "```typescript\n" +
      "// app/[locale]/page.tsx\n" +
      "import { useTranslations } from 'next-intl';\n" +
      "\n" +
      "export default function HomePage() {\n" +
      "  const t = useTranslations('common');\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <h1>{t('welcome')}</h1>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Language Switching:**\n\n" +
      "```typescript\n" +
      "// components/LanguageSwitcher.tsx\n" +
      "import { useRouter } from 'next/router';\n" +
      "import { useTranslation } from 'next-i18next';\n" +
      "\n" +
      "export default function LanguageSwitcher() {\n" +
      "  const router = useRouter();\n" +
      "  const { t } = useTranslation('common');\n" +
      "  \n" +
      "  const changeLanguage = (locale: string) => {\n" +
      "    router.push(router.asPath, router.asPath, { locale });\n" +
      "  };\n" +
      "  \n" +
      "  return (\n" +
      "    <select onChange={(e) => changeLanguage(e.target.value)}>\n" +
      "      <option value='en'>English</option>\n" +
      "      <option value='es'>Español</option>\n" +
      "      <option value='fr'>Français</option>\n" +
      "      <option value='de'>Deutsch</option>\n" +
      "    </select>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Features:**\n\n" +
      "1. **Namespace Organization:**\n" +
      "```javascript\n" +
      "// public/locales/en/\n" +
      "//   common.json\n" +
      "//   navigation.json\n" +
      "//   forms.json\n" +
      "//   errors.json\n" +
      "```\n\n" +
      "2. **Pluralization:**\n" +
      "```json\n" +
      "{\n" +
      '  "items": "{{count}} item",\n' +
      '  "items_plural": "{{count}} items"\n' +
      "}\n" +
      "```\n\n" +
      "3. **Interpolation:**\n" +
      "```json\n" +
      "{\n" +
      '  "welcome_user": "Welcome, {{name}}!"\n' +
      "}\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Use meaningful translation keys\n" +
      "- Organize translations by feature\n" +
      "- Test all language variants\n" +
      "- Consider RTL languages\n" +
      "- Use professional translation services\n" +
      "- Implement fallback strategies\n" +
      "- Monitor translation completeness",
    category: "Internationalization",
    difficulty: "intermediate",
    tags: ["i18n", "internationalization", "localization", "multi-language", "routing"],
  },
  {
    id: 14,
    question:
      "How do you implement authentication in Next.js? Explain NextAuth.js, JWT, and OAuth provider integration.",
    answer:
      "Authentication in Next.js can be implemented using various strategies, with NextAuth.js being the most popular solution for handling multiple authentication providers.\n\n" +
      "**NextAuth.js Setup:**\n\n" +
      "1. **Install Dependencies:**\n" +
      "```bash\n" +
      "npm install next-auth\n" +
      "npm install @next-auth/prisma-adapter prisma @prisma/client\n" +
      "```\n\n" +
      "2. **Configuration:**\n" +
      "```typescript\n" +
      "// pages/api/auth/[...nextauth].ts\n" +
      "import NextAuth from 'next-auth';\n" +
      "import GoogleProvider from 'next-auth/providers/google';\n" +
      "import GitHubProvider from 'next-auth/providers/github';\n" +
      "import CredentialsProvider from 'next-auth/providers/credentials';\n" +
      "\n" +
      "export default NextAuth({\n" +
      "  providers: [\n" +
      "    GoogleProvider({\n" +
      "      clientId: process.env.GOOGLE_CLIENT_ID!,\n" +
      "      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,\n" +
      "    }),\n" +
      "    GitHubProvider({\n" +
      "      clientId: process.env.GITHUB_ID!,\n" +
      "      clientSecret: process.env.GITHUB_SECRET!,\n" +
      "    }),\n" +
      "    CredentialsProvider({\n" +
      "      name: 'credentials',\n" +
      "      credentials: {\n" +
      "        email: { label: 'Email', type: 'email' },\n" +
      "        password: { label: 'Password', type: 'password' }\n" +
      "      },\n" +
      "      async authorize(credentials) {\n" +
      "        const user = await validateUser(credentials);\n" +
      "        return user ? { id: user.id, email: user.email } : null;\n" +
      "      }\n" +
      "    })\n" +
      "  ],\n" +
      "  callbacks: {\n" +
      "    async jwt({ token, user }) {\n" +
      "      if (user) {\n" +
      "        token.role = user.role;\n" +
      "      }\n" +
      "      return token;\n" +
      "    },\n" +
      "    async session({ session, token }) {\n" +
      "      session.user.role = token.role;\n" +
      "      return session;\n" +
      "    }\n" +
      "  },\n" +
      "  pages: {\n" +
      "    signIn: '/auth/signin',\n" +
      "    error: '/auth/error'\n" +
      "  }\n" +
      "});\n" +
      "```\n\n" +
      "**Using Authentication:**\n\n" +
      "1. **Client-side Usage:**\n" +
      "```typescript\n" +
      "// components/AuthButton.tsx\n" +
      "import { useSession, signIn, signOut } from 'next-auth/react';\n" +
      "\n" +
      "export default function AuthButton() {\n" +
      "  const { data: session, status } = useSession();\n" +
      "  \n" +
      "  if (status === 'loading') return <p>Loading...</p>;\n" +
      "  \n" +
      "  if (session) {\n" +
      "    return (\n" +
      "      <div>\n" +
      "        <p>Signed in as {session.user.email}</p>\n" +
      "        <button onClick={() => signOut()}>Sign out</button>\n" +
      "      </div>\n" +
      "    );\n" +
      "  }\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <p>Not signed in</p>\n" +
      "      <button onClick={() => signIn()}>Sign in</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "2. **Server-side Usage:**\n" +
      "```typescript\n" +
      "// pages/protected.tsx\n" +
      "import { getServerSession } from 'next-auth';\n" +
      "import { authOptions } from './api/auth/[...nextauth]';\n" +
      "\n" +
      "export async function getServerSideProps(context) {\n" +
      "  const session = await getServerSession(context.req, context.res, authOptions);\n" +
      "  \n" +
      "  if (!session) {\n" +
      "    return {\n" +
      "      redirect: {\n" +
      "        destination: '/auth/signin',\n" +
      "        permanent: false,\n" +
      "      },\n" +
      "    };\n" +
      "  }\n" +
      "  \n" +
      "  return {\n" +
      "    props: { session },\n" +
      "  };\n" +
      "}\n" +
      "\n" +
      "export default function ProtectedPage({ session }) {\n" +
      "  return <div>Welcome, {session.user.email}!</div>;\n" +
      "}\n" +
      "```\n\n" +
      "**JWT Implementation:**\n\n" +
      "```typescript\n" +
      "// utils/jwt.ts\n" +
      "import jwt from 'jsonwebtoken';\n" +
      "\n" +
      "const JWT_SECRET = process.env.JWT_SECRET!;\n" +
      "\n" +
      "export function generateToken(payload: any) {\n" +
      "  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });\n" +
      "}\n" +
      "\n" +
      "export function verifyToken(token: string) {\n" +
      "  try {\n" +
      "    return jwt.verify(token, JWT_SECRET);\n" +
      "  } catch (error) {\n" +
      "    return null;\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// API route for login\n" +
      "// pages/api/auth/login.ts\n" +
      "export default async function handler(req, res) {\n" +
      "  if (req.method !== 'POST') {\n" +
      "    return res.status(405).json({ error: 'Method not allowed' });\n" +
      "  }\n" +
      "  \n" +
      "  const { email, password } = req.body;\n" +
      "  const user = await validateUser({ email, password });\n" +
      "  \n" +
      "  if (!user) {\n" +
      "    return res.status(401).json({ error: 'Invalid credentials' });\n" +
      "  }\n" +
      "  \n" +
      "  const token = generateToken({ userId: user.id, email: user.email });\n" +
      "  \n" +
      "  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; SameSite=Strict`);\n" +
      "  res.status(200).json({ success: true });\n" +
      "}\n" +
      "```\n\n" +
      "**Middleware Protection:**\n\n" +
      "```typescript\n" +
      "// middleware.ts\n" +
      "import { withAuth } from 'next-auth/middleware';\n" +
      "\n" +
      "export default withAuth(\n" +
      "  function middleware(req) {\n" +
      "    // Additional middleware logic\n" +
      "  },\n" +
      "  {\n" +
      "    callbacks: {\n" +
      "      authorized: ({ token }) => !!token\n" +
      "    },\n" +
      "  }\n" +
      ");\n" +
      "\n" +
      "export const config = {\n" +
      "  matcher: ['/dashboard/:path*', '/admin/:path*']\n" +
      "};\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Use HTTPS in production\n" +
      "- Implement proper session management\n" +
      "- Use secure cookie settings\n" +
      "- Implement role-based access control\n" +
      "- Validate tokens on server-side\n" +
      "- Use environment variables for secrets\n" +
      "- Implement proper error handling\n" +
      "- Consider rate limiting for auth endpoints",
    category: "Authentication",
    difficulty: "intermediate",
    tags: ["authentication", "nextauth", "jwt", "oauth", "security"],
  },
  {
    id: 15,
    question:
      "How do you integrate databases with Next.js? Explain Prisma, MongoDB, PostgreSQL, and ORM patterns.",
    answer:
      "Next.js applications often require database integration for data persistence, with various options available depending on your needs.\n\n" +
      "**Prisma ORM Integration:**\n\n" +
      "1. **Setup Prisma:**\n" +
      "```bash\n" +
      "npm install prisma @prisma/client\n" +
      "npx prisma init\n" +
      "```\n\n" +
      "2. **Schema Definition:**\n" +
      "```prisma\n" +
      "// prisma/schema.prisma\n" +
      "generator client {\n" +
      '  provider = "prisma-client-js"\n' +
      "}\n" +
      "\n" +
      "datasource db {\n" +
      '  provider = "postgresql"\n' +
      '  url      = env("DATABASE_URL")\n' +
      "}\n" +
      "\n" +
      "model User {\n" +
      "  id        String   @id @default(cuid())\n" +
      "  email     String   @unique\n" +
      "  name      String?\n" +
      "  posts     Post[]\n" +
      "  createdAt DateTime @default(now())\n" +
      "  updatedAt DateTime @updatedAt\n" +
      "}\n" +
      "\n" +
      "model Post {\n" +
      "  id        String   @id @default(cuid())\n" +
      "  title     String\n" +
      "  content   String?\n" +
      "  published Boolean  @default(false)\n" +
      "  author    User     @relation(fields: [authorId], references: [id])\n" +
      "  authorId  String\n" +
      "  createdAt DateTime @default(now())\n" +
      "  updatedAt DateTime @updatedAt\n" +
      "}\n" +
      "```\n\n" +
      "3. **Using Prisma Client:**\n" +
      "```typescript\n" +
      "// lib/prisma.ts\n" +
      "import { PrismaClient } from '@prisma/client';\n" +
      "\n" +
      "const globalForPrisma = globalThis as unknown as {\n" +
      "  prisma: PrismaClient | undefined;\n" +
      "};\n" +
      "\n" +
      "export const prisma = globalForPrisma.prisma ?? new PrismaClient();\n" +
      "\n" +
      "if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;\n" +
      "\n" +
      "// pages/api/posts.ts\n" +
      "import { prisma } from '../../lib/prisma';\n" +
      "\n" +
      "export default async function handler(req, res) {\n" +
      "  if (req.method === 'GET') {\n" +
      "    const posts = await prisma.post.findMany({\n" +
      "      include: {\n" +
      "        author: {\n" +
      "          select: {\n" +
      "            name: true,\n" +
      "            email: true\n" +
      "          }\n" +
      "        }\n" +
      "      }\n" +
      "    });\n" +
      "    res.json(posts);\n" +
      "  } else if (req.method === 'POST') {\n" +
      "    const { title, content, authorId } = req.body;\n" +
      "    const post = await prisma.post.create({\n" +
      "      data: {\n" +
      "        title,\n" +
      "        content,\n" +
      "        authorId\n" +
      "      }\n" +
      "    });\n" +
      "    res.json(post);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**MongoDB Integration:**\n\n" +
      "1. **Using Mongoose:**\n" +
      "```bash\n" +
      "npm install mongoose\n" +
      "```\n\n" +
      "2. **Mongoose Setup:**\n" +
      "```typescript\n" +
      "// lib/mongodb.ts\n" +
      "import mongoose from 'mongoose';\n" +
      "\n" +
      "const MONGODB_URI = process.env.MONGODB_URI!;\n" +
      "\n" +
      "if (!MONGODB_URI) {\n" +
      "  throw new Error('Please define the MONGODB_URI environment variable');\n" +
      "}\n" +
      "\n" +
      "let cached = global.mongoose;\n" +
      "\n" +
      "if (!cached) {\n" +
      "  cached = global.mongoose = { conn: null, promise: null };\n" +
      "}\n" +
      "\n" +
      "async function connectDB() {\n" +
      "  if (cached.conn) {\n" +
      "    return cached.conn;\n" +
      "  }\n" +
      "\n" +
      "  if (!cached.promise) {\n" +
      "    const opts = {\n" +
      "      bufferCommands: false,\n" +
      "    };\n" +
      "\n" +
      "    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {\n" +
      "      return mongoose;\n" +
      "    });\n" +
      "  }\n" +
      "\n" +
      "  cached.conn = await cached.promise;\n" +
      "  return cached.conn;\n" +
      "}\n" +
      "\n" +
      "export default connectDB;\n" +
      "```\n\n" +
      "3. **Mongoose Models:**\n" +
      "```typescript\n" +
      "// models/User.ts\n" +
      "import mongoose, { Schema, Document } from 'mongoose';\n" +
      "\n" +
      "export interface IUser extends Document {\n" +
      "  name: string;\n" +
      "  email: string;\n" +
      "  password: string;\n" +
      "  createdAt: Date;\n" +
      "}\n" +
      "\n" +
      "const UserSchema: Schema = new Schema({\n" +
      "  name: {\n" +
      "    type: String,\n" +
      "    required: true\n" +
      "  },\n" +
      "  email: {\n" +
      "    type: String,\n" +
      "    required: true,\n" +
      "    unique: true\n" +
      "  },\n" +
      "  password: {\n" +
      "    type: String,\n" +
      "    required: true\n" +
      "  }\n" +
      "}, {\n" +
      "  timestamps: true\n" +
      "});\n" +
      "\n" +
      "export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);\n" +
      "```\n\n" +
      "**PostgreSQL with Raw Queries:**\n\n" +
      "```typescript\n" +
      "// lib/postgres.ts\n" +
      "import { Pool } from 'pg';\n" +
      "\n" +
      "const pool = new Pool({\n" +
      "  connectionString: process.env.POSTGRES_URL,\n" +
      "  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false\n" +
      "});\n" +
      "\n" +
      "export async function query(text: string, params?: any[]) {\n" +
      "  const client = await pool.connect();\n" +
      "  try {\n" +
      "    const result = await client.query(text, params);\n" +
      "    return result;\n" +
      "  } finally {\n" +
      "    client.release();\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// pages/api/users.ts\n" +
      "import { query } from '../../lib/postgres';\n" +
      "\n" +
      "export default async function handler(req, res) {\n" +
      "  if (req.method === 'GET') {\n" +
      "    const result = await query('SELECT * FROM users ORDER BY created_at DESC');\n" +
      "    res.json(result.rows);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Use connection pooling for better performance\n" +
      "- Implement proper error handling\n" +
      "- Use environment variables for database URLs\n" +
      "- Implement database migrations\n" +
      "- Use transactions for complex operations\n" +
      "- Implement proper indexing\n" +
      "- Use prepared statements to prevent SQL injection\n" +
      "- Monitor database performance",
    category: "Database",
    difficulty: "intermediate",
    tags: ["database", "prisma", "mongodb", "postgresql", "orm"],
  },
  {
    id: 16,
    question:
      "How do you implement state management in Next.js? Compare Zustand, Redux Toolkit, and Context API patterns.",
    answer:
      "State management in Next.js applications can be handled using various approaches, each with different trade-offs and use cases.\n\n" +
      "**Zustand (Lightweight):**\n\n" +
      "1. **Setup:**\n" +
      "```bash\n" +
      "npm install zustand\n" +
      "```\n\n" +
      "2. **Store Creation:**\n" +
      "```typescript\n" +
      "// stores/useStore.ts\n" +
      "import { create } from 'zustand';\n" +
      "import { devtools } from 'zustand/middleware';\n" +
      "\n" +
      "interface StoreState {\n" +
      "  count: number;\n" +
      "  user: User | null;\n" +
      "  increment: () => void;\n" +
      "  decrement: () => void;\n" +
      "  setUser: (user: User) => void;\n" +
      "}\n" +
      "\n" +
      "export const useStore = create<StoreState>()(\n" +
      "  devtools(\n" +
      "    (set) => ({\n" +
      "      count: 0,\n" +
      "      user: null,\n" +
      "      increment: () => set((state) => ({ count: state.count + 1 })),\n" +
      "      decrement: () => set((state) => ({ count: state.count - 1 })),\n" +
      "      setUser: (user) => set({ user }),\n" +
      "    }),\n" +
      "    { name: 'app-store' }\n" +
      "  )\n" +
      ");\n" +
      "```\n\n" +
      "3. **Using Zustand:**\n" +
      "```typescript\n" +
      "// components/Counter.tsx\n" +
      "import { useStore } from '../stores/useStore';\n" +
      "\n" +
      "export default function Counter() {\n" +
      "  const { count, increment, decrement } = useStore();\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <p>Count: {count}</p>\n" +
      "      <button onClick={increment}>+</button>\n" +
      "      <button onClick={decrement}>-</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Redux Toolkit:**\n\n" +
      "1. **Setup:**\n" +
      "```bash\n" +
      "npm install @reduxjs/toolkit react-redux\n" +
      "```\n\n" +
      "2. **Store Configuration:**\n" +
      "```typescript\n" +
      "// store/index.ts\n" +
      "import { configureStore } from '@reduxjs/toolkit';\n" +
      "import counterSlice from './slices/counterSlice';\n" +
      "import userSlice from './slices/userSlice';\n" +
      "\n" +
      "export const store = configureStore({\n" +
      "  reducer: {\n" +
      "    counter: counterSlice,\n" +
      "    user: userSlice,\n" +
      "  },\n" +
      "});\n" +
      "\n" +
      "export type RootState = ReturnType<typeof store.getState>;\n" +
      "export type AppDispatch = typeof store.dispatch;\n" +
      "```\n\n" +
      "3. **Slice Creation:**\n" +
      "```typescript\n" +
      "// store/slices/counterSlice.ts\n" +
      "import { createSlice, PayloadAction } from '@reduxjs/toolkit';\n" +
      "\n" +
      "interface CounterState {\n" +
      "  value: number;\n" +
      "}\n" +
      "\n" +
      "const initialState: CounterState = {\n" +
      "  value: 0,\n" +
      "};\n" +
      "\n" +
      "export const counterSlice = createSlice({\n" +
      "  name: 'counter',\n" +
      "  initialState,\n" +
      "  reducers: {\n" +
      "    increment: (state) => {\n" +
      "      state.value += 1;\n" +
      "    },\n" +
      "    decrement: (state) => {\n" +
      "      state.value -= 1;\n" +
      "    },\n" +
      "    incrementByAmount: (state, action: PayloadAction<number>) => {\n" +
      "      state.value += action.payload;\n" +
      "    },\n" +
      "  },\n" +
      "});\n" +
      "\n" +
      "export const { increment, decrement, incrementByAmount } = counterSlice.actions;\n" +
      "export default counterSlice.reducer;\n" +
      "```\n\n" +
      "**Context API:**\n\n" +
      "1. **Context Creation:**\n" +
      "```typescript\n" +
      "// contexts/AppContext.tsx\n" +
      "import { createContext, useContext, useReducer, ReactNode } from 'react';\n" +
      "\n" +
      "interface AppState {\n" +
      "  count: number;\n" +
      "  user: User | null;\n" +
      "}\n" +
      "\n" +
      "type AppAction = \n" +
      "  | { type: 'INCREMENT' }\n" +
      "  | { type: 'DECREMENT' }\n" +
      "  | { type: 'SET_USER'; payload: User };\n" +
      "\n" +
      "const initialState: AppState = {\n" +
      "  count: 0,\n" +
      "  user: null,\n" +
      "};\n" +
      "\n" +
      "function appReducer(state: AppState, action: AppAction): AppState {\n" +
      "  switch (action.type) {\n" +
      "    case 'INCREMENT':\n" +
      "      return { ...state, count: state.count + 1 };\n" +
      "    case 'DECREMENT':\n" +
      "      return { ...state, count: state.count - 1 };\n" +
      "    case 'SET_USER':\n" +
      "      return { ...state, user: action.payload };\n" +
      "    default:\n" +
      "      return state;\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "const AppContext = createContext<{\n" +
      "  state: AppState;\n" +
      "  dispatch: React.Dispatch<AppAction>;\n" +
      "} | null>(null);\n" +
      "\n" +
      "export function AppProvider({ children }: { children: ReactNode }) {\n" +
      "  const [state, dispatch] = useReducer(appReducer, initialState);\n" +
      "  \n" +
      "  return (\n" +
      "    <AppContext.Provider value={{ state, dispatch }}>\n" +
      "      {children}\n" +
      "    </AppContext.Provider>\n" +
      "  );\n" +
      "}\n" +
      "\n" +
      "export function useAppContext() {\n" +
      "  const context = useContext(AppContext);\n" +
      "  if (!context) {\n" +
      "    throw new Error('useAppContext must be used within AppProvider');\n" +
      "  }\n" +
      "  return context;\n" +
      "}\n" +
      "```\n\n" +
      "**Comparison:**\n\n" +
      "| Feature | Zustand | Redux Toolkit | Context API |\n" +
      "|---------|---------|---------------|-------------|\n" +
      "| Bundle Size | Small | Medium | Built-in |\n" +
      "| Boilerplate | Minimal | High | Medium |\n" +
      "| DevTools | Good | Excellent | Limited |\n" +
      "| Performance | Good | Good | Can be poor |\n" +
      "| Learning Curve | Easy | Steep | Easy |\n" +
      "| TypeScript | Excellent | Excellent | Good |\n\n" +
      "**Best Practices:**\n" +
      "- Use Zustand for simple to medium complexity\n" +
      "- Use Redux Toolkit for complex applications\n" +
      "- Use Context API for component-specific state\n" +
      "- Avoid prop drilling with proper state management\n" +
      "- Implement proper TypeScript types\n" +
      "- Use selectors for performance optimization\n" +
      "- Consider server state vs client state separation",
    category: "State Management",
    difficulty: "intermediate",
    tags: ["state-management", "zustand", "redux", "context-api", "react"],
  },
  {
    id: 17,
    question:
      "How do you implement SEO optimization in Next.js? Explain meta tags, structured data, and sitemap generation.",
    answer:
      "SEO optimization in Next.js involves proper meta tag management, structured data implementation, and sitemap generation for better search engine visibility.\n\n" +
      "**Meta Tags Management:**\n\n" +
      "1. **Pages Router:**\n" +
      "```typescript\n" +
      "// pages/_document.tsx\n" +
      "import { Html, Head, Main, NextScript } from 'next/document';\n" +
      "\n" +
      "export default function Document() {\n" +
      "  return (\n" +
      "    <Html lang='en'>\n" +
      "      <Head>\n" +
      "        <meta name='description' content='Your app description' />\n" +
      "        <meta name='keywords' content='nextjs, react, seo' />\n" +
      "        <meta name='author' content='Your Name' />\n" +
      "        <meta property='og:type' content='website' />\n" +
      "        <meta property='og:title' content='Your App Title' />\n" +
      "        <meta property='og:description' content='Your app description' />\n" +
      "        <meta property='og:image' content='/og-image.jpg' />\n" +
      "        <meta name='twitter:card' content='summary_large_image' />\n" +
      "        <meta name='twitter:title' content='Your App Title' />\n" +
      "        <meta name='twitter:description' content='Your app description' />\n" +
      "        <meta name='twitter:image' content='/og-image.jpg' />\n" +
      "      </Head>\n" +
      "      <body>\n" +
      "        <Main />\n" +
      "        <NextScript />\n" +
      "      </body>\n" +
      "    </Html>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "2. **Dynamic Meta Tags:**\n" +
      "```typescript\n" +
      "// pages/blog/[slug].tsx\n" +
      "import Head from 'next/head';\n" +
      "\n" +
      "export default function BlogPost({ post }) {\n" +
      "  return (\n" +
      "    <>\n" +
      "      <Head>\n" +
      "        <title>{post.title} | Your Blog</title>\n" +
      "        <meta name='description' content={post.excerpt} />\n" +
      "        <meta property='og:title' content={post.title} />\n" +
      "        <meta property='og:description' content={post.excerpt} />\n" +
      "        <meta property='og:image' content={post.featuredImage} />\n" +
      "        <meta property='article:published_time' content={post.publishedAt} />\n" +
      "        <meta property='article:author' content={post.author} />\n" +
      "      </Head>\n" +
      "      <article>\n" +
      "        <h1>{post.title}</h1>\n" +
      "        <div dangerouslySetInnerHTML={{ __html: post.content }} />\n" +
      "      </article>\n" +
      "    </>\n" +
      "  );\n" +
      "}\n" +
      "\n" +
      "export async function getStaticProps({ params }) {\n" +
      "  const post = await getPost(params.slug);\n" +
      "  return {\n" +
      "    props: { post },\n" +
      "  };\n" +
      "}\n" +
      "```\n\n" +
      "**Structured Data:**\n\n" +
      "1. **JSON-LD Implementation:**\n" +
      "```typescript\n" +
      "// components/StructuredData.tsx\n" +
      "interface StructuredDataProps {\n" +
      "  data: any;\n" +
      "}\n" +
      "\n" +
      "export default function StructuredData({ data }: StructuredDataProps) {\n" +
      "  return (\n" +
      "    <script\n" +
      "      type='application/ld+json'\n" +
      "      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}\n" +
      "    />\n" +
      "  );\n" +
      "}\n" +
      "\n" +
      "// pages/blog/[slug].tsx\n" +
      "const structuredData = {\n" +
      "  '@context': 'https://schema.org',\n" +
      "  '@type': 'Article',\n" +
      "  headline: post.title,\n" +
      "  description: post.excerpt,\n" +
      "  image: post.featuredImage,\n" +
      "  datePublished: post.publishedAt,\n" +
      "  dateModified: post.updatedAt,\n" +
      "  author: {\n" +
      "    '@type': 'Person',\n" +
      "    name: post.author,\n" +
      "  },\n" +
      "  publisher: {\n" +
      "    '@type': 'Organization',\n" +
      "    name: 'Your Company',\n" +
      "    logo: {\n" +
      "      '@type': 'ImageObject',\n" +
      "      url: '/logo.png',\n" +
      "    },\n" +
      "  },\n" +
      "};\n" +
      "\n" +
      "return (\n" +
      "  <>\n" +
      "    <StructuredData data={structuredData} />\n" +
      "    {/* rest of component */}\n" +
      "  </>\n" +
      ");\n" +
      "```\n\n" +
      "**Sitemap Generation:**\n\n" +
      "1. **Dynamic Sitemap:**\n" +
      "```typescript\n" +
      "// pages/sitemap.xml.ts\n" +
      "import { GetServerSideProps } from 'next';\n" +
      "\n" +
      "function generateSiteMap(posts: Post[]) {\n" +
      '  return `<?xml version="1.0" encoding="UTF-8"?>\n' +
      '    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      "      <url>\n" +
      "        <loc>https://yoursite.com</loc>\n" +
      "        <lastmod>${new Date().toISOString()}</lastmod>\n" +
      "        <changefreq>daily</changefreq>\n" +
      "        <priority>1.0</priority>\n" +
      "      </url>\n" +
      "      ${posts\n" +
      "        .map((post) => {\n" +
      "          return `\n" +
      "            <url>\n" +
      "              <loc>https://yoursite.com/blog/${post.slug}</loc>\n" +
      "              <lastmod>${post.updatedAt}</lastmod>\n" +
      "              <changefreq>weekly</changefreq>\n" +
      "              <priority>0.8</priority>\n" +
      "            </url>\n" +
      "          `;\n" +
      "        })\n" +
      "        .join('')}\n" +
      "    </urlset>\n" +
      "  `;\n" +
      "}\n" +
      "\n" +
      "export const getServerSideProps: GetServerSideProps = async ({ res }) => {\n" +
      "  const posts = await getAllPosts();\n" +
      "  const sitemap = generateSiteMap(posts);\n" +
      "\n" +
      "  res.setHeader('Content-Type', 'text/xml');\n" +
      "  res.write(sitemap);\n" +
      "  res.end();\n" +
      "\n" +
      "  return {\n" +
      "    props: {},\n" +
      "  };\n" +
      "};\n" +
      "\n" +
      "export default function SiteMap() {\n" +
      "  return null;\n" +
      "}\n" +
      "```\n\n" +
      "**SEO Best Practices:**\n" +
      "- Use descriptive, keyword-rich titles\n" +
      "- Implement proper heading hierarchy (H1, H2, H3)\n" +
      "- Add alt text to all images\n" +
      "- Use semantic HTML elements\n" +
      "- Implement proper internal linking\n" +
      "- Optimize page loading speed\n" +
      "- Use canonical URLs to prevent duplicate content\n" +
      "- Implement proper error pages (404, 500)\n" +
      "- Use robots.txt for crawler guidance\n" +
      "- Monitor Core Web Vitals",
    category: "SEO",
    difficulty: "intermediate",
    tags: ["seo", "meta-tags", "structured-data", "sitemap", "optimization"],
  },
  {
    id: 18,
    question:
      "How do you implement error handling in Next.js? Explain error boundaries, custom error pages, and error monitoring.",
    answer:
      "Error handling in Next.js involves implementing error boundaries, custom error pages, and proper error monitoring to ensure robust applications.\n\n" +
      "**Error Boundaries:**\n\n" +
      "1. **Class Component Error Boundary:**\n" +
      "```typescript\n" +
      "// components/ErrorBoundary.tsx\n" +
      "import React, { Component, ErrorInfo, ReactNode } from 'react';\n" +
      "\n" +
      "interface Props {\n" +
      "  children: ReactNode;\n" +
      "  fallback?: ReactNode;\n" +
      "}\n" +
      "\n" +
      "interface State {\n" +
      "  hasError: boolean;\n" +
      "  error?: Error;\n" +
      "}\n" +
      "\n" +
      "export class ErrorBoundary extends Component<Props, State> {\n" +
      "  constructor(props: Props) {\n" +
      "    super(props);\n" +
      "    this.state = { hasError: false };\n" +
      "  }\n" +
      "\n" +
      "  static getDerivedStateFromError(error: Error): State {\n" +
      "    return { hasError: true, error };\n" +
      "  }\n" +
      "\n" +
      "  componentDidCatch(error: Error, errorInfo: ErrorInfo) {\n" +
      "    console.error('Error caught by boundary:', error, errorInfo);\n" +
      "    \n" +
      "    // Send error to monitoring service\n" +
      "    if (typeof window !== 'undefined') {\n" +
      "      // Example: Sentry.captureException(error);\n" +
      "    }\n" +
      "  }\n" +
      "\n" +
      "  render() {\n" +
      "    if (this.state.hasError) {\n" +
      "      return this.props.fallback || (\n" +
      "        <div className='error-boundary'>\n" +
      "          <h2>Something went wrong</h2>\n" +
      "          <p>We're sorry, but something unexpected happened.</p>\n" +
      "          <button onClick={() => this.setState({ hasError: false })}>\n" +
      "            Try again\n" +
      "          </button>\n" +
      "        </div>\n" +
      "      );\n" +
      "    }\n" +
      "\n" +
      "    return this.props.children;\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "2. **Using Error Boundary:**\n" +
      "```typescript\n" +
      "// pages/_app.tsx\n" +
      "import { ErrorBoundary } from '../components/ErrorBoundary';\n" +
      "\n" +
      "export default function App({ Component, pageProps }) {\n" +
      "  return (\n" +
      "    <ErrorBoundary>\n" +
      "      <Component {...pageProps} />\n" +
      "    </ErrorBoundary>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Custom Error Pages:**\n\n" +
      "1. **404 Error Page:**\n" +
      "```typescript\n" +
      "// pages/404.tsx\n" +
      "import Link from 'next/link';\n" +
      "import Head from 'next/head';\n" +
      "\n" +
      "export default function Custom404() {\n" +
      "  return (\n" +
      "    <>\n" +
      "      <Head>\n" +
      "        <title>404 - Page Not Found</title>\n" +
      "        <meta name='robots' content='noindex' />\n" +
      "      </Head>\n" +
      "      <div className='error-page'>\n" +
      "        <h1>404 - Page Not Found</h1>\n" +
      "        <p>The page you're looking for doesn't exist.</p>\n" +
      "        <Link href='/'>\n" +
      "          <a>Go back home</a>\n" +
      "        </Link>\n" +
      "      </div>\n" +
      "    </>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "2. **500 Error Page:**\n" +
      "```typescript\n" +
      "// pages/500.tsx\n" +
      "import Head from 'next/head';\n" +
      "\n" +
      "export default function Custom500() {\n" +
      "  return (\n" +
      "    <>\n" +
      "      <Head>\n" +
      "        <title>500 - Server Error</title>\n" +
      "        <meta name='robots' content='noindex' />\n" +
      "      </Head>\n" +
      "      <div className='error-page'>\n" +
      "        <h1>500 - Server Error</h1>\n" +
      "        <p>Something went wrong on our end. Please try again later.</p>\n" +
      "      </div>\n" +
      "    </>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**API Error Handling:**\n\n" +
      "```typescript\n" +
      "// pages/api/users.ts\n" +
      "import { NextApiRequest, NextApiResponse } from 'next';\n" +
      "\n" +
      "export default async function handler(req: NextApiRequest, res: NextApiResponse) {\n" +
      "  try {\n" +
      "    if (req.method !== 'GET') {\n" +
      "      return res.status(405).json({ error: 'Method not allowed' });\n" +
      "    }\n" +
      "\n" +
      "    const users = await getUsers();\n" +
      "    res.status(200).json(users);\n" +
      "  } catch (error) {\n" +
      "    console.error('API Error:', error);\n" +
      "    \n" +
      "    // Log error to monitoring service\n" +
      "    // Example: Sentry.captureException(error);\n" +
      "    \n" +
      "    res.status(500).json({ \n" +
      "      error: 'Internal server error',\n" +
      "      message: process.env.NODE_ENV === 'development' ? error.message : undefined\n" +
      "    });\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Error Monitoring:**\n\n" +
      "1. **Sentry Integration:**\n" +
      "```bash\n" +
      "npm install @sentry/nextjs\n" +
      "```\n\n" +
      "2. **Sentry Configuration:**\n" +
      "```typescript\n" +
      "// sentry.client.config.ts\n" +
      "import * as Sentry from '@sentry/nextjs';\n" +
      "\n" +
      "Sentry.init({\n" +
      "  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,\n" +
      "  environment: process.env.NODE_ENV,\n" +
      "  tracesSampleRate: 1.0,\n" +
      "});\n" +
      "\n" +
      "// sentry.server.config.ts\n" +
      "import * as Sentry from '@sentry/nextjs';\n" +
      "\n" +
      "Sentry.init({\n" +
      "  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,\n" +
      "  environment: process.env.NODE_ENV,\n" +
      "  tracesSampleRate: 1.0,\n" +
      "});\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Implement error boundaries at appropriate levels\n" +
      "- Use custom error pages for better UX\n" +
      "- Log errors to monitoring services\n" +
      "- Provide meaningful error messages\n" +
      "- Implement retry mechanisms for transient errors\n" +
      "- Use proper HTTP status codes\n" +
      "- Handle both client and server-side errors\n" +
      "- Implement graceful degradation\n" +
      "- Test error scenarios thoroughly",
    category: "Error Handling",
    difficulty: "intermediate",
    tags: ["error-handling", "error-boundaries", "custom-pages", "monitoring", "sentry"],
  },
  {
    id: 19,
    question:
      "How do you implement Progressive Web App (PWA) features in Next.js? Explain service workers, offline support, and app manifest.",
    answer:
      "Progressive Web App (PWA) features in Next.js enable offline functionality, app-like experiences, and enhanced user engagement through service workers and web app manifests.\n\n" +
      "**Service Worker Setup:**\n\n" +
      "1. **Install PWA Plugin:**\n" +
      "```bash\n" +
      "npm install next-pwa\n" +
      "```\n\n" +
      "2. **next.config.js Configuration:**\n" +
      "```javascript\n" +
      "const withPWA = require('next-pwa')({\n" +
      "  dest: 'public',\n" +
      "  register: true,\n" +
      "  skipWaiting: true,\n" +
      "  disable: process.env.NODE_ENV === 'development',\n" +
      "});\n" +
      "\n" +
      "module.exports = withPWA({\n" +
      "  // your existing config\n" +
      "});\n" +
      "```\n\n" +
      "**Web App Manifest:**\n\n" +
      "1. **public/manifest.json:**\n" +
      "```json\n" +
      "{\n" +
      '  "name": "Your App Name",\n' +
      '  "short_name": "App",\n' +
      '  "description": "Your app description",\n' +
      '  "start_url": "/",\n' +
      '  "display": "standalone",\n' +
      '  "background_color": "#ffffff",\n' +
      '  "theme_color": "#000000",\n' +
      '  "orientation": "portrait",\n' +
      '  "icons": [\n' +
      "    {\n" +
      '      "src": "/icons/icon-72x72.png",\n' +
      '      "sizes": "72x72",\n' +
      '      "type": "image/png"\n' +
      "    },\n" +
      "    {\n" +
      '      "src": "/icons/icon-96x96.png",\n' +
      '      "sizes": "96x96",\n' +
      '      "type": "image/png"\n' +
      "    },\n" +
      "    {\n" +
      '      "src": "/icons/icon-128x128.png",\n' +
      '      "sizes": "128x128",\n' +
      '      "type": "image/png"\n' +
      "    },\n" +
      "    {\n" +
      '      "src": "/icons/icon-144x144.png",\n' +
      '      "sizes": "144x144",\n' +
      '      "type": "image/png"\n' +
      "    },\n" +
      "    {\n" +
      '      "src": "/icons/icon-152x152.png",\n' +
      '      "sizes": "152x152",\n' +
      '      "type": "image/png"\n' +
      "    },\n" +
      "    {\n" +
      '      "src": "/icons/icon-192x192.png",\n' +
      '      "sizes": "192x192",\n' +
      '      "type": "image/png"\n' +
      "    },\n" +
      "    {\n" +
      '      "src": "/icons/icon-384x384.png",\n' +
      '      "sizes": "384x384",\n' +
      '      "type": "image/png"\n' +
      "    },\n" +
      "    {\n" +
      '      "src": "/icons/icon-512x512.png",\n' +
      '      "sizes": "512x512",\n' +
      '      "type": "image/png"\n' +
      "    }\n" +
      "  ]\n" +
      "}\n" +
      "```\n\n" +
      "2. **Link Manifest in Document:**\n" +
      "```typescript\n" +
      "// pages/_document.tsx\n" +
      "import { Html, Head, Main, NextScript } from 'next/document';\n" +
      "\n" +
      "export default function Document() {\n" +
      "  return (\n" +
      "    <Html lang='en'>\n" +
      "      <Head>\n" +
      "        <link rel='manifest' href='/manifest.json' />\n" +
      "        <meta name='theme-color' content='#000000' />\n" +
      "        <meta name='apple-mobile-web-app-capable' content='yes' />\n" +
      "        <meta name='apple-mobile-web-app-status-bar-style' content='default' />\n" +
      "        <meta name='apple-mobile-web-app-title' content='Your App' />\n" +
      "        <link rel='apple-touch-icon' href='/icons/icon-192x192.png' />\n" +
      "      </Head>\n" +
      "      <body>\n" +
      "        <Main />\n" +
      "        <NextScript />\n" +
      "      </body>\n" +
      "    </Html>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Offline Support:**\n\n" +
      "1. **Custom Service Worker:**\n" +
      "```typescript\n" +
      "// public/sw.js\n" +
      "const CACHE_NAME = 'app-cache-v1';\n" +
      "const urlsToCache = [\n" +
      "  '/',\n" +
      "  '/static/js/bundle.js',\n" +
      "  '/static/css/main.css',\n" +
      "  '/manifest.json'\n" +
      "];\n" +
      "\n" +
      "self.addEventListener('install', (event) => {\n" +
      "  event.waitUntil(\n" +
      "    caches.open(CACHE_NAME)\n" +
      "      .then((cache) => cache.addAll(urlsToCache))\n" +
      "  );\n" +
      "});\n" +
      "\n" +
      "self.addEventListener('fetch', (event) => {\n" +
      "  event.respondWith(\n" +
      "    caches.match(event.request)\n" +
      "      .then((response) => {\n" +
      "        if (response) {\n" +
      "          return response;\n" +
      "        }\n" +
      "        return fetch(event.request);\n" +
      "      })\n" +
      "  );\n" +
      "});\n" +
      "```\n\n" +
      "2. **Offline Page:**\n" +
      "```typescript\n" +
      "// pages/offline.tsx\n" +
      "import Head from 'next/head';\n" +
      "\n" +
      "export default function Offline() {\n" +
      "  return (\n" +
      "    <>\n" +
      "      <Head>\n" +
      "        <title>Offline - Your App</title>\n" +
      "      </Head>\n" +
      "      <div className='offline-page'>\n" +
      "        <h1>You're offline</h1>\n" +
      "        <p>Please check your internet connection and try again.</p>\n" +
      "        <button onClick={() => window.location.reload()}>\n" +
      "          Retry\n" +
      "        </button>\n" +
      "      </div>\n" +
      "    </>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**PWA Features:**\n\n" +
      "1. **Install Prompt:**\n" +
      "```typescript\n" +
      "// components/InstallPrompt.tsx\n" +
      "import { useState, useEffect } from 'react';\n" +
      "\n" +
      "export default function InstallPrompt() {\n" +
      "  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);\n" +
      "  const [showInstallPrompt, setShowInstallPrompt] = useState(false);\n" +
      "\n" +
      "  useEffect(() => {\n" +
      "    const handler = (e: Event) => {\n" +
      "      e.preventDefault();\n" +
      "      setDeferredPrompt(e);\n" +
      "      setShowInstallPrompt(true);\n" +
      "    };\n" +
      "\n" +
      "    window.addEventListener('beforeinstallprompt', handler);\n" +
      "\n" +
      "    return () => {\n" +
      "      window.removeEventListener('beforeinstallprompt', handler);\n" +
      "    };\n" +
      "  }, []);\n" +
      "\n" +
      "  const handleInstall = async () => {\n" +
      "    if (deferredPrompt) {\n" +
      "      deferredPrompt.prompt();\n" +
      "      const { outcome } = await deferredPrompt.userChoice;\n" +
      "      console.log(`User response to the install prompt: ${outcome}`);\n" +
      "      setDeferredPrompt(null);\n" +
      "      setShowInstallPrompt(false);\n" +
      "    }\n" +
      "  };\n" +
      "\n" +
      "  if (!showInstallPrompt) return null;\n" +
      "\n" +
      "  return (\n" +
      "    <div className='install-prompt'>\n" +
      "      <p>Install our app for a better experience!</p>\n" +
      "      <button onClick={handleInstall}>Install</button>\n" +
      "      <button onClick={() => setShowInstallPrompt(false)}>Not now</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**PWA Best Practices:**\n" +
      "- Provide meaningful offline content\n" +
      "- Use appropriate cache strategies\n" +
      "- Implement proper error handling\n" +
      "- Test on various devices and browsers\n" +
      "- Monitor PWA metrics and user engagement\n" +
      "- Keep service worker updated\n" +
      "- Use HTTPS in production\n" +
      "- Implement proper app icons\n" +
      "- Consider app store distribution\n" +
      "- Monitor Core Web Vitals for PWA compliance",
    category: "PWA",
    difficulty: "intermediate",
    tags: ["pwa", "service-worker", "offline", "manifest", "progressive-web-app"],
  },
];

export default NEXTJS_ENHANCED_QUESTIONS;
