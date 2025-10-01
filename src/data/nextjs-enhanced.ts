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
];

export default NEXTJS_ENHANCED_QUESTIONS;
