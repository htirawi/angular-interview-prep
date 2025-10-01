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
      "export async function query(text: string, params?: unknown[]) {\n" +
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
      "  const [deferredPrompt, setDeferredPrompt] = useState<unknown>(null);\n" +
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
  {
    id: 20,
    question:
      "What is Incremental Static Regeneration (ISR) in Next.js? Explain on-demand revalidation, edge ISR, and fallback strategies.",
    answer:
      "Incremental Static Regeneration (ISR) is a Next.js feature that allows you to update static content after build time without rebuilding the entire site, combining the benefits of SSG with dynamic content updates.\n\n" +
      "**Basic ISR Implementation:**\n\n" +
      "```typescript\n" +
      "// pages/posts/[slug].tsx\n" +
      "export async function getStaticProps({ params }) {\n" +
      "  const post = await fetchPost(params.slug);\n" +
      "  \n" +
      "  return {\n" +
      "    props: { post },\n" +
      "    revalidate: 60, // Revalidate every 60 seconds\n" +
      "  };\n" +
      "}\n" +
      "\n" +
      "export async function getStaticPaths() {\n" +
      "  const posts = await fetchPopularPosts(); // Only generate popular posts at build time\n" +
      "  \n" +
      "  const paths = posts.map((post) => ({\n" +
      "    params: { slug: post.slug },\n" +
      "  }));\n" +
      "\n" +
      "  return {\n" +
      "    paths,\n      " +
      "    fallback: 'blocking', // Enable ISR for other paths\n" +
      "  };\n" +
      "}\n" +
      "```\n\n" +
      "**On-Demand Revalidation:**\n\n" +
      "```typescript\n" +
      "// pages/api/revalidate.ts\n" +
      "export default async function handler(req, res) {\n" +
      "  const { secret, slug } = req.query;\n" +
      "\n" +
      "  if (secret !== process.env.REVALIDATE_SECRET) {\n" +
      "    return res.status(401).json({ message: 'Invalid token' });\n" +
      "  }\n" +
      "\n" +
      "  try {\n" +
      "    await res.revalidate(`/posts/${slug}`);\n" +
      "    return res.json({ revalidated: true });\n" +
      "  } catch (err) {\n" +
      "    return res.status(500).send('Error revalidating');\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Trigger revalidation from CMS webhook\n" +
      "// POST /api/revalidate?secret=mysecret&slug=my-post\n" +
      "```\n\n" +
      "**Edge ISR with Vercel Edge Functions:**\n\n" +
      "```typescript\n" +
      "// pages/api/posts/[slug].ts\n" +
      "export const config = {\n" +
      "  runtime: 'edge',\n" +
      "};\n" +
      "\n" +
      "export default async function handler(req) {\n" +
      "  const { slug } = req.nextUrl.searchParams.get('slug');\n" +
      "  \n" +
      "  // Check cache first\n" +
      "  const cached = await caches.default.get(`post-${slug}`);\n" +
      "  if (cached) {\n" +
      "    return new Response(cached.body, {\n" +
      "      headers: { 'Cache-Control': 's-maxage=60' }\n" +
      "    });\n" +
      "  }\n" +
      "  \n" +
      "  const post = await fetchPost(slug);\n" +
      "  const response = new Response(JSON.stringify(post));\n" +
      "  \n" +
      "  // Cache for 60 seconds\n" +
      "  await caches.default.put(`post-${slug}`, response.clone());\n" +
      "  \n" +
      "  return response;\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Fallback Strategies:**\n\n" +
      "```typescript\n" +
      "// pages/products/[id].tsx\n" +
      "export async function getStaticPaths() {\n" +
      "  return {\n" +
      "    paths: [], // Don't pre-generate any paths\n" +
      "    fallback: 'blocking', // Generate on-demand\n" +
      "  };\n" +
      "}\n" +
      "\n" +
      "export async function getStaticProps({ params }) {\n" +
      "  try {\n" +
      "    const product = await fetchProduct(params.id);\n" +
      "    \n" +
      "    if (!product) {\n" +
      "      return {\n" +
      "        notFound: true,\n" +
      "      };\n" +
      "    }\n" +
      "\n" +
      "    return {\n" +
      "      props: { product },\n" +
      "      revalidate: 3600, // 1 hour\n" +
      "    };\n" +
      "  } catch (error) {\n" +
      "    return {\n" +
      "      notFound: true,\n" +
      "    };\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**ISR with Stale-While-Revalidate:**\n\n" +
      "```typescript\n" +
      "// pages/blog/[slug].tsx\n" +
      "export async function getStaticProps({ params }) {\n" +
      "  const post = await fetchPost(params.slug);\n" +
      "  \n" +
      "  return {\n" +
      "    props: { post },\n" +
      "    revalidate: 300, // 5 minutes\n" +
      "    // Serve stale content while revalidating\n" +
      "  };\n" +
      "}\n" +
      "\n" +
      "// Custom cache headers\n" +
      "export async function getServerSideProps({ res }) {\n" +
      "  res.setHeader(\n" +
      "    'Cache-Control',\n" +
      "    'public, s-maxage=300, stale-while-revalidate=86400'\n" +
      "  );\n" +
      "  \n" +
      "  return { props: {} };\n" +
      "}\n" +
      "```\n\n" +
      "**ISR Best Practices:**\n" +
      "- Use appropriate revalidation intervals\n" +
      "- Implement proper error handling\n" +
      "- Use on-demand revalidation for critical updates\n" +
      "- Monitor cache hit rates\n" +
      "- Consider edge ISR for global performance\n" +
      "- Use fallback strategies for dynamic content\n" +
      "- Implement proper cache invalidation\n" +
      "- Monitor ISR performance metrics",
    category: "ISR",
    difficulty: "advanced",
    tags: ["isr", "incremental-static-regeneration", "on-demand", "edge", "caching"],
  },
  {
    id: 21,
    question:
      "What is Client-Side Rendering (CSR) in Next.js? When should you use CSR vs SSR vs SSG?",
    answer:
      "Client-Side Rendering (CSR) in Next.js involves rendering components and fetching data entirely on the client side, typically using React hooks like useEffect and useState for data fetching.\n\n" +
      "**CSR Implementation Patterns:**\n\n" +
      "1. **Basic CSR with useEffect:**\n" +
      "```typescript\n" +
      "// pages/dashboard.tsx\n" +
      "import { useState, useEffect } from 'react';\n" +
      "\n" +
      "export default function Dashboard() {\n" +
      "  const [data, setData] = useState(null);\n" +
      "  const [loading, setLoading] = useState(true);\n" +
      "  const [error, setError] = useState(null);\n" +
      "\n" +
      "  useEffect(() => {\n" +
      "    async function fetchData() {\n" +
      "      try {\n" +
      "        const response = await fetch('/api/user-data');\n" +
      "        const userData = await response.json();\n" +
      "        setData(userData);\n" +
      "      } catch (err) {\n" +
      "        setError(err.message);\n" +
      "      } finally {\n" +
      "        setLoading(false);\n" +
      "      }\n" +
      "    }\n" +
      "\n" +
      "    fetchData();\n" +
      "  }, []);\n" +
      "\n" +
      "  if (loading) return <div>Loading...</div>;\n" +
      "  if (error) return <div>Error: {error}</div>;\n" +
      "\n" +
      "  return (\n" +
      "    <div>\n" +
      "      <h1>Dashboard</h1>\n" +
      "      <pre>{JSON.stringify(data, null, 2)}</pre>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "2. **CSR with SWR (Stale-While-Revalidate):**\n" +
      "```typescript\n" +
      "// pages/profile.tsx\n" +
      "import useSWR from 'swr';\n" +
      "\n" +
      "const fetcher = (url: string) => fetch(url).then((res) => res.json());\n" +
      "\n" +
      "export default function Profile() {\n" +
      "  const { data, error, mutate } = useSWR('/api/profile', fetcher, {\n" +
      "    revalidateOnFocus: true,\n" +
      "    revalidateOnReconnect: true,\n" +
      "    refreshInterval: 30000, // 30 seconds\n" +
      "  });\n" +
      "\n" +
      "  if (error) return <div>Failed to load profile</div>;\n" +
      "  if (!data) return <div>Loading profile...</div>;\n" +
      "\n" +
      "  return (\n" +
      "    <div>\n" +
      "      <h1>{data.name}</h1>\n" +
      "      <p>{data.email}</p>\n" +
      "      <button onClick={() => mutate()}>Refresh</button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "3. **CSR with React Query:**\n" +
      "```typescript\n" +
      "// pages/posts.tsx\n" +
      "import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';\n" +
      "\n" +
      "export default function Posts() {\n" +
      "  const queryClient = useQueryClient();\n" +
      "\n" +
      "  const { data: posts, isLoading, error } = useQuery({\n" +
      "    queryKey: ['posts'],\n" +
      "    queryFn: () => fetch('/api/posts').then(res => res.json()),\n" +
      "    staleTime: 5 * 60 * 1000, // 5 minutes\n" +
      "    cacheTime: 10 * 60 * 1000, // 10 minutes\n" +
      "  });\n" +
      "\n" +
      "  const createPost = useMutation({\n" +
      "    mutationFn: (newPost) => fetch('/api/posts', {\n" +
      "      method: 'POST',\n" +
      "      headers: { 'Content-Type': 'application/json' },\n" +
      "      body: JSON.stringify(newPost),\n" +
      "    }),\n" +
      "    onSuccess: () => {\n" +
      "      queryClient.invalidateQueries(['posts']);\n" +
      "    },\n" +
      "  });\n" +
      "\n" +
      "  if (isLoading) return <div>Loading posts...</div>;\n" +
      "  if (error) return <div>Error loading posts</div>;\n" +
      "\n" +
      "  return (\n" +
      "    <div>\n" +
      "      {posts.map(post => (\n" +
      "        <div key={post.id}>{post.title}</div>\n" +
      "      ))}\n" +
      "      <button onClick={() => createPost.mutate({ title: 'New Post' })}>\n" +
      "        Create Post\n" +
      "      </button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use CSR:**\n\n" +
      "| Scenario | Use CSR | Reason |\n" +
      "|----------|---------|--------|\n" +
      "| User-specific dashboards | ✅ | Personalized content |\n" +
      "| Real-time data | ✅ | Frequent updates |\n" +
      "| Interactive applications | ✅ | Client-side interactions |\n" +
      "| Authentication-dependent | ✅ | User context required |\n" +
      "| SEO-critical content | ❌ | Not indexed by crawlers |\n" +
      "| Initial page load | ❌ | Slower perceived performance |\n" +
      "| Static content | ❌ | Better with SSG |\n\n" +
      "**CSR vs SSR vs SSG Comparison:**\n\n" +
      "```typescript\n" +
      "// CSR: Client-side data fetching\n" +
      "function CSRPage() {\n" +
      "  const [data, setData] = useState(null);\n" +
      "  useEffect(() => {\n" +
      "    fetch('/api/data').then(res => res.json()).then(setData);\n" +
      "  }, []);\n" +
      "  return <div>{data ? data.title : 'Loading...'}</div>;\n" +
      "}\n" +
      "\n" +
      "// SSR: Server-side data fetching\n" +
      "export async function getServerSideProps() {\n" +
      "  const data = await fetchData();\n" +
      "  return { props: { data } };\n" +
      "}\n" +
      "\n" +
      "// SSG: Build-time data fetching\n" +
      "export async function getStaticProps() {\n" +
      "  const data = await fetchData();\n" +
      "  return { props: { data }, revalidate: 60 };\n" +
      "}\n" +
      "```\n\n" +
      "**CSR Best Practices:**\n" +
      "- Use loading states and error boundaries\n" +
      "- Implement proper caching strategies\n" +
      "- Consider SEO implications\n" +
      "- Use optimistic updates for better UX\n" +
      "- Implement proper error handling\n" +
      "- Use data fetching libraries (SWR, React Query)\n" +
      "- Consider hybrid approaches (SSG + CSR)\n" +
      "- Monitor Core Web Vitals",
    category: "CSR",
    difficulty: "intermediate",
    tags: ["csr", "client-side-rendering", "useEffect", "swr", "react-query"],
  },
  {
    id: 22,
    question:
      "How do you implement hybrid rendering strategies in Next.js? Explain combining SSG, SSR, ISR, and CSR patterns.",
    answer:
      "Hybrid rendering strategies in Next.js allow you to combine different rendering methods within the same application, optimizing for both performance and user experience.\n\n" +
      "**Hybrid Strategy Patterns:**\n\n" +
      "1. **SSG + CSR for Dynamic Content:**\n" +
      "```typescript\n" +
      "// pages/blog/[slug].tsx\n" +
      "export async function getStaticProps({ params }) {\n" +
      "  const post = await fetchPost(params.slug);\n" +
      "  \n" +
      "  return {\n" +
      "    props: { \n" +
      "      post,\n" +
      "      // Static content for SEO\n" +
      "    },\n" +
      "    revalidate: 3600, // 1 hour ISR\n" +
      "  };\n" +
      "}\n" +
      "\n" +
      "export default function BlogPost({ post }) {\n" +
      "  const [comments, setComments] = useState([]);\n" +
      "  const [likes, setLikes] = useState(post.likes);\n" +
      "\n" +
      "  // CSR for dynamic, user-specific content\n" +
      "  useEffect(() => {\n" +
      "    fetchComments(post.id).then(setComments);\n" +
      "  }, [post.id]);\n" +
      "\n" +
      "  return (\n" +
      "    <article>\n" +
      "      {/* SSG content - SEO optimized */}\n" +
      "      <h1>{post.title}</h1>\n" +
      "      <div dangerouslySetInnerHTML={{ __html: post.content }} />\n" +
      "      \n" +
      "      {/* CSR content - Dynamic */}\n" +
      "      <div className='interactions'>\n" +
      "        <button onClick={() => setLikes(likes + 1)}>\n" +
      "          {likes} Likes\n" +
      "        </button>\n" +
      "        <CommentsList comments={comments} />\n" +
      "      </div>\n" +
      "    </article>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "2. **SSR + CSR for Authentication:**\n" +
      "```typescript\n" +
      "// pages/dashboard.tsx\n" +
      "export async function getServerSideProps(context) {\n" +
      "  const session = await getSession(context);\n" +
      "  \n" +
      "  if (!session) {\n" +
      "    return {\n" +
      "      redirect: {\n" +
      "        destination: '/login',\n" +
      "        permanent: false,\n" +
      "      },\n" +
      "    };\n" +
      "  }\n" +
      "\n" +
      "  // SSR for initial user data\n" +
      "  const userProfile = await fetchUserProfile(session.user.id);\n" +
      "  \n" +
      "  return {\n" +
      "    props: { userProfile },\n" +
      "  };\n" +
      "}\n" +
      "\n" +
      "export default function Dashboard({ userProfile }) {\n" +
      "  const [realtimeData, setRealtimeData] = useState(null);\n" +
      "\n" +
      "  // CSR for real-time updates\n" +
      "  useEffect(() => {\n" +
      "    const socket = io();\n" +
      "    socket.on('dashboard-update', setRealtimeData);\n" +
      "    return () => socket.disconnect();\n" +
      "  }, []);\n" +
      "\n" +
      "  return (\n" +
      "    <div>\n" +
      "      {/* SSR content - Initial load */}\n" +
      "      <h1>Welcome, {userProfile.name}</h1>\n" +
      "      \n" +
      "      {/* CSR content - Real-time */}\n" +
      "      <RealtimeWidget data={realtimeData} />\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "3. **ISR + CSR for E-commerce:**\n" +
      "```typescript\n" +
      "// pages/products/[id].tsx\n" +
      "export async function getStaticProps({ params }) {\n" +
      "  const product = await fetchProduct(params.id);\n" +
      "  \n" +
      "  return {\n" +
      "    props: { product },\n" +
      "    revalidate: 300, // 5 minutes ISR\n" +
      "  };\n" +
      "}\n" +
      "\n" +
      "export async function getStaticPaths() {\n" +
      "  const popularProducts = await fetchPopularProducts();\n" +
      "  \n" +
      "  return {\n" +
      "    paths: popularProducts.map(p => ({ params: { id: p.id } })),\n" +
      "    fallback: 'blocking', // ISR for other products\n" +
      "  };\n" +
      "}\n" +
      "\n" +
      "export default function ProductPage({ product }) {\n" +
      "  const [inventory, setInventory] = useState(product.stock);\n" +
      "  const [cart, setCart] = useState([]);\n" +
      "\n" +
      "  // CSR for inventory and cart management\n" +
      "  useEffect(() => {\n" +
      "    const interval = setInterval(() => {\n" +
      "      fetchInventory(product.id).then(setInventory);\n" +
      "    }, 30000); // Check every 30 seconds\n" +
      "    \n" +
      "    return () => clearInterval(interval);\n" +
      "  }, [product.id]);\n" +
      "\n" +
      "  return (\n" +
      "    <div>\n" +
      "      {/* ISR content - SEO optimized */}\n" +
      "      <h1>{product.name}</h1>\n" +
      "      <p>{product.description}</p>\n" +
      "      \n" +
      "      {/* CSR content - Dynamic */}\n" +
      "      <div className='purchase-section'>\n" +
      "        <p>Stock: {inventory}</p>\n" +
      "        <button \n" +
      "          onClick={() => addToCart(product.id)}\n" +
      "          disabled={inventory === 0}\n" +
      "        >\n" +
      "          Add to Cart\n" +
      "        </button>\n" +
      "      </div>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Hybrid Strategy Decision Matrix:**\n\n" +
      "| Content Type | Initial Render | Updates | Strategy |\n" +
      "|--------------|----------------|---------|----------|\n" +
      "| Blog posts | SSG | ISR | SSG + ISR |\n" +
      "| User dashboard | SSR | CSR | SSR + CSR |\n" +
      "| Product pages | ISR | CSR | ISR + CSR |\n" +
      "| Real-time chat | CSR | CSR | Pure CSR |\n" +
      "| Marketing pages | SSG | Manual | Pure SSG |\n\n" +
      "**Advanced Hybrid Patterns:**\n\n" +
      "```typescript\n" +
      "// pages/app.tsx - App Router hybrid\n" +
      "export default async function AppPage() {\n" +
      "  // Server Component - SSG/SSR\n" +
      "  const staticData = await fetchStaticData();\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <StaticContent data={staticData} />\n" +
      "      <Suspense fallback={<div>Loading...</div>}>\n" +
      "        <DynamicContent />\n" +
      "      </Suspense>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "\n" +
      "// components/DynamicContent.tsx\n" +
      "'use client';\n" +
      "\n" +
      "export default function DynamicContent() {\n" +
      "  const [data, setData] = useState(null);\n" +
      "  \n" +
      "  useEffect(() => {\n" +
      "    fetchDynamicData().then(setData);\n" +
      "  }, []);\n" +
      "  \n" +
      "  return <div>{data && <RealtimeWidget data={data} />}</div>;\n" +
      "}\n" +
      "```\n\n" +
      "**Best Practices for Hybrid Rendering:**\n" +
      "- Use SSG for SEO-critical content\n" +
      "- Use SSR for authentication-dependent pages\n" +
      "- Use ISR for semi-dynamic content\n" +
      "- Use CSR for real-time, interactive features\n" +
      "- Implement proper loading states\n" +
      "- Consider Core Web Vitals impact\n" +
      "- Use Suspense boundaries effectively\n" +
      "- Monitor performance metrics\n" +
      "- Implement proper error boundaries\n" +
      "- Consider user experience trade-offs",
    category: "Hybrid Rendering",
    difficulty: "advanced",
    tags: ["hybrid", "ssg", "ssr", "isr", "csr", "rendering-strategies"],
  },
  {
    id: 23,
    question:
      "What is Edge Runtime in Next.js? How do you implement Edge Functions and Edge Middleware?",
    answer:
      "Edge Runtime in Next.js is a lightweight JavaScript runtime optimized for edge computing, enabling faster response times by running code closer to users at the edge of the network.\n\n" +
      "**Edge Functions Implementation:**\n\n" +
      "1. **Basic Edge Function:**\n" +
      "```typescript\n" +
      "// pages/api/hello.ts\n" +
      "export const config = {\n" +
      "  runtime: 'edge',\n" +
      "};\n" +
      "\n" +
      "export default async function handler(req: Request) {\n" +
      "  const { searchParams } = new URL(req.url);\n" +
      "  const name = searchParams.get('name') || 'World';\n" +
      "  \n" +
      "  return new Response(\n" +
      "    JSON.stringify({ message: `Hello ${name}!` }),\n" +
      "    {\n" +
      "      status: 200,\n" +
      "      headers: {\n" +
      "        'Content-Type': 'application/json',\n" +
      "        'Cache-Control': 'public, max-age=60',\n" +
      "      },\n" +
      "    }\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "2. **Edge Function with Geolocation:**\n" +
      "```typescript\n" +
      "// pages/api/location.ts\n" +
      "export const config = {\n" +
      "  runtime: 'edge',\n" +
      "};\n" +
      "\n" +
      "export default async function handler(req: Request) {\n" +
      "  const country = req.geo?.country || 'Unknown';\n" +
      "  const city = req.geo?.city || 'Unknown';\n" +
      "  const region = req.geo?.region || 'Unknown';\n" +
      "  \n" +
      "  return new Response(\n" +
      "    JSON.stringify({\n" +
      "      country,\n" +
      "      city,\n" +
      "      region,\n" +
      "      timestamp: new Date().toISOString(),\n" +
      "    }),\n" +
      "    {\n" +
      "      headers: {\n" +
      "        'Content-Type': 'application/json',\n" +
      "        'Cache-Control': 'public, max-age=300',\n" +
      "      },\n" +
      "    }\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Edge Middleware Implementation:**\n\n" +
      "1. **Basic Edge Middleware:**\n" +
      "```typescript\n" +
      "// middleware.ts\n" +
      "import { NextRequest, NextResponse } from 'next/server';\n" +
      "\n" +
      "export function middleware(request: NextRequest) {\n" +
      "  // Add custom headers\n" +
      "  const response = NextResponse.next();\n" +
      "  \n" +
      "  response.headers.set('X-Custom-Header', 'Edge-Middleware');\n" +
      "  response.headers.set('X-Request-ID', crypto.randomUUID());\n" +
      "  \n" +
      "  return response;\n" +
      "}\n" +
      "\n" +
      "export const config = {\n" +
      "  matcher: [\n" +
      "    '/((?!api|_next/static|_next/image|favicon.ico).*)',\n" +
      "  ],\n" +
      "};\n" +
      "```\n\n" +
      "2. **A/B Testing with Edge Middleware:**\n" +
      "```typescript\n" +
      "// middleware.ts\n" +
      "import { NextRequest, NextResponse } from 'next/server';\n" +
      "\n" +
      "export function middleware(request: NextRequest) {\n" +
      "  const url = request.nextUrl.clone();\n" +
      "  \n" +
      "  // A/B test based on user location\n" +
      "  const country = request.geo?.country;\n" +
      "  const isUS = country === 'US';\n" +
      "  \n" +
      "  if (url.pathname === '/pricing') {\n" +
      "    if (isUS) {\n" +
      "      url.pathname = '/pricing/us';\n" +
      "    } else {\n" +
      "      url.pathname = '/pricing/international';\n" +
      "    }\n" +
      "    \n" +
      "    return NextResponse.redirect(url);\n" +
      "  }\n" +
      "  \n" +
      "  return NextResponse.next();\n" +
      "}\n" +
      "```\n\n" +
      "3. **Rate Limiting with Edge Middleware:**\n" +
      "```typescript\n" +
      "// middleware.ts\n" +
      "import { NextRequest, NextResponse } from 'next/server';\n" +
      "\n" +
      "const rateLimit = new Map();\n" +
      "\n" +
      "export function middleware(request: NextRequest) {\n" +
      "  const ip = request.ip ?? '127.0.0.1';\n" +
      "  const limit = 10; // requests per minute\n" +
      "  const windowMs = 60 * 1000; // 1 minute\n" +
      "  \n" +
      "  const now = Date.now();\n" +
      "  const windowStart = now - windowMs;\n" +
      "  \n" +
      "  if (!rateLimit.has(ip)) {\n" +
      "    rateLimit.set(ip, []);\n" +
      "  }\n" +
      "  \n" +
      "  const requests = rateLimit.get(ip);\n" +
      "  \n" +
      "  // Remove old requests\n" +
      "  const validRequests = requests.filter((time: number) => time > windowStart);\n" +
      "  \n" +
      "  if (validRequests.length >= limit) {\n" +
      "    return new NextResponse('Too Many Requests', { status: 429 });\n" +
      "  }\n" +
      "  \n" +
      "  validRequests.push(now);\n" +
      "  rateLimit.set(ip, validRequests);\n" +
      "  \n" +
      "  return NextResponse.next();\n" +
      "}\n" +
      "```\n\n" +
      "**Edge Runtime vs Node.js Runtime:**\n\n" +
      "| Feature | Edge Runtime | Node.js Runtime |\n" +
      "|---------|--------------|-----------------|\n" +
      "| Cold Start | ~0ms | ~100ms |\n" +
      "| Memory | ~8MB | ~128MB |\n" +
      "| Execution Time | 30s max | 10s max (Vercel) |\n" +
      "| APIs | Web APIs only | Node.js APIs |\n" +
      "| Location | Global edge | Regional |\n" +
      "| Use Case | Simple logic | Complex operations |\n\n" +
      "**Advanced Edge Patterns:**\n\n" +
      "```typescript\n" +
      "// pages/api/edge-cache.ts\n" +
      "export const config = {\n" +
      "  runtime: 'edge',\n" +
      "};\n" +
      "\n" +
      "export default async function handler(req: Request) {\n" +
      "  const cache = caches.default;\n" +
      "  const cacheKey = new Request(req.url, req);\n" +
      "  \n" +
      "  // Check cache first\n" +
      "  const cached = await cache.match(cacheKey);\n" +
      "  if (cached) {\n" +
      "    return cached;\n" +
      "  }\n" +
      "  \n" +
      "  // Fetch data\n" +
      "  const data = await fetch('https://api.example.com/data');\n" +
      "  const response = new Response(data.body, {\n" +
      "    headers: {\n" +
      "      'Content-Type': 'application/json',\n" +
      "      'Cache-Control': 'public, max-age=300',\n" +
      "    },\n" +
      "  });\n" +
      "  \n" +
      "  // Cache the response\n" +
      "  await cache.put(cacheKey, response.clone());\n" +
      "  \n" +
      "  return response;\n" +
      "}\n" +
      "```\n\n" +
      "**Edge Runtime Best Practices:**\n" +
      "- Use for simple, fast operations\n" +
      "- Leverage geolocation data\n" +
      "- Implement proper caching\n" +
      "- Handle errors gracefully\n" +
      "- Monitor performance metrics\n" +
      "- Use for A/B testing\n" +
      "- Implement rate limiting\n" +
      "- Consider cold start impact\n" +
      "- Use Web APIs instead of Node.js APIs\n" +
      "- Test across different edge locations",
    category: "Edge Runtime",
    difficulty: "advanced",
    tags: ["edge-runtime", "edge-functions", "edge-middleware", "vercel", "performance"],
  },
  {
    id: 24,
    question:
      "What is Streaming SSR in Next.js? How do you implement React 18 streaming with Suspense boundaries?",
    answer:
      "Streaming SSR in Next.js leverages React 18's streaming capabilities to send HTML to the browser progressively, improving perceived performance by rendering parts of the page as they become available.\n\n" +
      "**Basic Streaming SSR Implementation:**\n\n" +
      "1. **App Router Streaming:**\n" +
      "```typescript\n" +
      "// app/page.tsx\n" +
      "import { Suspense } from 'react';\n" +
      "\n" +
      "async function SlowComponent() {\n" +
      "  // Simulate slow data fetching\n" +
      "  await new Promise(resolve => setTimeout(resolve, 2000));\n" +
      "  const data = await fetch('https://api.example.com/slow-data');\n" +
      "  return <div>Slow data loaded: {data}</div>;\n" +
      "}\n" +
      "\n" +
      "async function FastComponent() {\n" +
      "  const data = await fetch('https://api.example.com/fast-data');\n" +
      "  return <div>Fast data loaded: {data}</div>;\n" +
      "}\n" +
      "\n" +
      "export default function Page() {\n" +
      "  return (\n" +
      "    <div>\n" +
      "      <h1>Streaming SSR Example</h1>\n" +
      "      \n" +
      "      {/* Fast content renders immediately */}\n" +
      "      <Suspense fallback={<div>Loading fast content...</div>}>\n" +
      "        <FastComponent />\n" +
      "      </Suspense>\n" +
      "      \n" +
      "      {/* Slow content streams in later */}\n" +
      "      <Suspense fallback={<div>Loading slow content...</div>}>\n" +
      "        <SlowComponent />\n" +
      "      </Suspense>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "2. **Pages Router Streaming:**\n" +
      "```typescript\n" +
      "// pages/streaming.tsx\n" +
      "import { Suspense } from 'react';\n" +
      "\n" +
      "function StreamingComponent({ delay }: { delay: number }) {\n" +
      "  return (\n" +
      "    <Suspense fallback={<div>Loading component with {delay}ms delay...</div>}>\n" +
      "      <AsyncComponent delay={delay} />\n" +
      "    </Suspense>\n" +
      "  );\n" +
      "}\n" +
      "\n" +
      "async function AsyncComponent({ delay }: { delay: number }) {\n" +
      "  await new Promise(resolve => setTimeout(resolve, delay));\n" +
      "  return <div>Component loaded after {delay}ms</div>;\n" +
      "}\n" +
      "\n" +
      "export default function StreamingPage() {\n" +
      "  return (\n" +
      "    <div>\n" +
      "      <h1>Streaming SSR Page</h1>\n" +
      "      <StreamingComponent delay={1000} />\n" +
      "      <StreamingComponent delay={2000} />\n" +
      "      <StreamingComponent delay={3000} />\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Streaming Patterns:**\n\n" +
      "1. **Nested Suspense Boundaries:**\n" +
      "```typescript\n" +
      "// app/dashboard/page.tsx\n" +
      "import { Suspense } from 'react';\n" +
      "\n" +
      "async function UserProfile({ userId }: { userId: string }) {\n" +
      "  const user = await fetchUser(userId);\n" +
      "  return (\n" +
      "    <div>\n" +
      "      <h2>{user.name}</h2>\n" +
      "      <p>{user.email}</p>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "\n" +
      "async function UserPosts({ userId }: { userId: string }) {\n" +
      "  const posts = await fetchUserPosts(userId);\n" +
      "  return (\n" +
      "    <div>\n" +
      "      {posts.map(post => (\n" +
      "        <div key={post.id}>{post.title}</div>\n" +
      "      ))}\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "\n" +
      "async function UserStats({ userId }: { userId: string }) {\n" +
      "  const stats = await fetchUserStats(userId);\n" +
      "  return (\n" +
      "    <div>\n" +
      "      <p>Posts: {stats.postCount}</p>\n" +
      "      <p>Followers: {stats.followerCount}</p>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "\n" +
      "export default async function Dashboard({ params }: { params: { userId: string } }) {\n" +
      "  return (\n" +
      "    <div>\n" +
      "      <h1>User Dashboard</h1>\n" +
      "      \n" +
      "      {/* Profile loads first */}\n" +
      "      <Suspense fallback={<div>Loading profile...</div>}>\n" +
      "        <UserProfile userId={params.userId} />\n" +
      "      </Suspense>\n" +
      "      \n" +
      "      {/* Posts and stats load independently */}\n" +
      "      <div className='grid'>\n" +
      "        <Suspense fallback={<div>Loading posts...</div>}>\n" +
      "          <UserPosts userId={params.userId} />\n" +
      "        </Suspense>\n" +
      "        \n" +
      "        <Suspense fallback={<div>Loading stats...</div>}>\n" +
      "          <UserStats userId={params.userId} />\n" +
      "        </Suspense>\n" +
      "      </div>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "2. **Error Boundaries with Streaming:**\n" +
      "```typescript\n" +
      "// components/StreamingErrorBoundary.tsx\n" +
      "import { Component, ReactNode } from 'react';\n" +
      "import { Suspense } from 'react';\n" +
      "\n" +
      "interface Props {\n" +
      "  children: ReactNode;\n" +
      "  fallback: ReactNode;\n" +
      "  errorFallback: ReactNode;\n" +
      "}\n" +
      "\n" +
      "interface State {\n" +
      "  hasError: boolean;\n" +
      "}\n" +
      "\n" +
      "export class StreamingErrorBoundary extends Component<Props, State> {\n" +
      "  constructor(props: Props) {\n" +
      "    super(props);\n" +
      "    this.state = { hasError: false };\n" +
      "  }\n" +
      "\n" +
      "  static getDerivedStateFromError(): State {\n" +
      "    return { hasError: true };\n" +
      "  }\n" +
      "\n" +
      "  componentDidCatch(error: Error, errorInfo: any) {\n" +
      "    console.error('Streaming error:', error, errorInfo);\n" +
      "  }\n" +
      "\n" +
      "  render() {\n" +
      "    if (this.state.hasError) {\n" +
      "      return this.props.errorFallback;\n" +
      "    }\n" +
      "\n" +
      "    return (\n" +
      "      <Suspense fallback={this.props.fallback}>\n" +
      "        {this.props.children}\n" +
      "      </Suspense>\n" +
      "    );\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Usage\n" +
      "export default function StreamingPage() {\n" +
      "  return (\n" +
      "    <StreamingErrorBoundary\n" +
      "      fallback={<div>Loading...</div>}\n" +
      "      errorFallback={<div>Something went wrong</div>}\n" +
      "    >\n" +
      "      <AsyncComponent />\n" +
      "    </StreamingErrorBoundary>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Streaming SSR Benefits:**\n\n" +
      "| Metric | Traditional SSR | Streaming SSR |\n" +
      "|--------|------------------|---------------|\n" +
      "| Time to First Byte | 2-5s | 0.1-0.5s |\n" +
      "| Time to Interactive | 5-10s | 2-5s |\n" +
      "| Perceived Performance | Poor | Good |\n" +
      "| User Experience | Slow | Fast |\n\n" +
      "**Streaming SSR Best Practices:**\n" +
      "- Use appropriate Suspense boundaries\n" +
      "- Implement proper error boundaries\n" +
      "- Design loading states carefully\n" +
      "- Consider user experience trade-offs\n" +
      "- Monitor streaming performance\n" +
      "- Use streaming for non-critical content\n" +
      "- Implement proper fallbacks\n" +
      "- Test across different network conditions\n" +
      "- Consider SEO implications\n" +
      "- Use streaming for large data sets",
    category: "Streaming SSR",
    difficulty: "advanced",
    tags: ["streaming", "ssr", "suspense", "react-18", "performance"],
  },
  {
    id: 25,
    question:
      "How do you implement advanced caching strategies in Next.js? Explain cache headers, stale-while-revalidate, and CDN optimization.",
    answer:
      "Advanced caching strategies in Next.js involve implementing multiple layers of caching to optimize performance, reduce server load, and improve user experience.\n\n" +
      "**Cache Headers Implementation:**\n\n" +
      "1. **Custom Cache Headers:**\n" +
      "```typescript\n" +
      "// pages/api/data.ts\n" +
      "export default async function handler(req, res) {\n" +
      "  const data = await fetchData();\n" +
      "  \n" +
      "  // Set cache headers\n" +
      "  res.setHeader(\n" +
      "    'Cache-Control',\n" +
      "    'public, s-maxage=300, stale-while-revalidate=86400'\n" +
      "  );\n" +
      "  res.setHeader('ETag', generateETag(data));\n" +
      "  res.setHeader('Last-Modified', new Date().toUTCString());\n" +
      "  \n" +
      "  res.json(data);\n" +
      "}\n" +
      "```\n\n" +
      "2. **Conditional Requests:**\n" +
      "```typescript\n" +
      "// pages/api/posts/[id].ts\n" +
      "export default async function handler(req, res) {\n" +
      "  const { id } = req.query;\n" +
      "  const post = await fetchPost(id);\n" +
      "  \n" +
      "  const etag = generateETag(post);\n      " +
      "  const ifNoneMatch = req.headers['if-none-match'];\n" +
      "  \n" +
      "  if (ifNoneMatch === etag) {\n" +
      "    res.status(304).end();\n" +
      "    return;\n" +
      "  }\n" +
      "  \n" +
      "  res.setHeader('ETag', etag);\n" +
      "  res.setHeader('Cache-Control', 'public, max-age=300');\n" +
      "  res.json(post);\n" +
      "}\n" +
      "```\n\n" +
      "**Stale-While-Revalidate Pattern:**\n\n" +
      "```typescript\n" +
      "// pages/api/products.ts\n" +
      "export default async function handler(req, res) {\n" +
      "  const products = await fetchProducts();\n" +
      "  \n" +
      "  // Serve stale content while revalidating\n" +
      "  res.setHeader(\n" +
      "    'Cache-Control',\n" +
      "    'public, s-maxage=60, stale-while-revalidate=300'\n" +
      "  );\n" +
      "  \n" +
      "  res.json(products);\n" +
      "}\n" +
      "\n" +
      "// Client-side implementation\n" +
      "// utils/cache.ts\n" +
      "class SWRCache {\n" +
      "  private cache = new Map();\n" +
      "  \n" +
      "  async get(key: string, fetcher: () => Promise<unknown>) {\n" +
      "    const cached = this.cache.get(key);\n" +
      "    \n" +
      "    if (cached && !this.isStale(cached)) {\n" +
      "      return cached.data;\n" +
      "    }\n" +
      "    \n" +
      "    if (cached && this.isStale(cached)) {\n" +
      "      // Return stale data immediately\n" +
      "      this.revalidate(key, fetcher);\n" +
      "      return cached.data;\n" +
      "    }\n" +
      "    \n" +
      "    // No cached data, fetch and cache\n" +
      "    const data = await fetcher();\n" +
      "    this.cache.set(key, {\n" +
      "      data,\n" +
      "      timestamp: Date.now(),\n" +
      "    });\n" +
      "    \n" +
      "    return data;\n" +
      "  }\n" +
      "  \n" +
      "  private isStale(cached: { timestamp: number }) {\n" +
      "    return Date.now() - cached.timestamp > 300000; // 5 minutes\n" +
      "  }\n" +
      "  \n" +
      "  private async revalidate(key: string, fetcher: () => Promise<unknown>) {\n" +
      "    try {\n" +
      "      const data = await fetcher();\n" +
      "      this.cache.set(key, {\n" +
      "        data,\n" +
      "        timestamp: Date.now(),\n" +
      "      });\n" +
      "    } catch (error) {\n" +
      "      console.error('Revalidation failed:', error);\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "export const swrCache = new SWRCache();\n" +
      "```\n\n" +
      "**CDN Optimization:**\n\n" +
      "1. **Static Asset Caching:**\n" +
      "```typescript\n" +
      "// next.config.js\n" +
      "module.exports = {\n" +
      "  async headers() {\n" +
      "    return [\n" +
      "      {\n" +
      "        source: '/static/:path*',\n" +
      "        headers: [\n" +
      "          {\n" +
      "            key: 'Cache-Control',\n" +
      "            value: 'public, max-age=31536000, immutable',\n" +
      "          },\n" +
      "        ],\n" +
      "      },\n" +
      "      {\n" +
      "        source: '/api/:path*',\n" +
      "        headers: [\n" +
      "          {\n" +
      "            key: 'Cache-Control',\n" +
      "            value: 'public, s-maxage=300, stale-while-revalidate=86400',\n" +
      "          },\n" +
      "        ],\n" +
      "      },\n" +
      "    ];\n" +
      "  },\n" +
      "};\n" +
      "```\n\n" +
      "2. **Edge Caching:**\n" +
      "```typescript\n" +
      "// pages/api/edge-cache.ts\n" +
      "export const config = {\n" +
      "  runtime: 'edge',\n" +
      "};\n" +
      "\n" +
      "export default async function handler(req: Request) {\n" +
      "  const cache = caches.default;\n" +
      "  const cacheKey = new Request(req.url, req);\n" +
      "  \n" +
      "  // Check edge cache\n" +
      "  const cached = await cache.match(cacheKey);\n" +
      "  if (cached) {\n" +
      "    return cached;\n" +
      "  }\n" +
      "  \n" +
      "  // Fetch from origin\n" +
      "  const response = await fetch('https://api.example.com/data');\n      " +
      "  const data = await response.json();\n" +
      "  \n" +
      "  // Create response with cache headers\n" +
      "  const newResponse = new Response(JSON.stringify(data), {\n" +
      "    headers: {\n" +
      "      'Content-Type': 'application/json',\n" +
      "      'Cache-Control': 'public, max-age=300, s-maxage=3600',\n" +
      "    },\n" +
      "  });\n" +
      "  \n" +
      "  // Cache the response\n" +
      "  await cache.put(cacheKey, newResponse.clone());\n" +
      "  \n" +
      "  return newResponse;\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Caching Patterns:**\n\n" +
      "1. **Cache Invalidation:**\n" +
      "```typescript\n" +
      "// pages/api/revalidate.ts\n" +
      "export default async function handler(req, res) {\n" +
      "  const { secret, path } = req.query;\n      " +
      "  \n" +
      "  if (secret !== process.env.REVALIDATE_SECRET) {\n" +
      "    return res.status(401).json({ message: 'Invalid token' });\n" +
      "  }\n" +
      "  \n" +
      "  try {\n" +
      "    // Revalidate specific path\n" +
      "    await res.revalidate(path);\n" +
      "    \n" +
      "    // Clear CDN cache\n      " +
      "    await clearCDNCache(path);\n" +
      "    \n" +
      "    return res.json({ revalidated: true, path });\n" +
      "  } catch (err) {\n" +
      "    return res.status(500).send('Error revalidating');\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "async function clearCDNCache(path: string) {\n" +
      "  // Implementation depends on CDN provider\n" +
      "  // Example for Cloudflare\n      " +
      "  await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache`, {\n" +
      "    method: 'POST',\n" +
      "    headers: {\n" +
      "      'Authorization': `Bearer ${CLOUDFLARE_TOKEN}`,\n" +
      "      'Content-Type': 'application/json',\n" +
      "    },\n" +
      "    body: JSON.stringify({\n" +
      "      files: [path],\n" +
      "    }),\n" +
      "  });\n" +
      "}\n" +
      "```\n\n" +
      "2. **Cache Warming:**\n" +
      "```typescript\n" +
      "// scripts/warm-cache.ts\n" +
      "async function warmCache() {\n" +
      "  const popularPaths = [\n" +
      "    '/',\n" +
      "    '/blog',\n" +
      "    '/products',\n" +
      "    '/about',\n" +
      "  ];\n" +
      "  \n" +
      "  for (const path of popularPaths) {\n" +
      "    try {\n" +
      "      await fetch(`${process.env.NEXT_PUBLIC_URL}${path}`);\n" +
      "      console.log(`Warmed cache for ${path}`);\n" +
      "    } catch (error) {\n" +
      "      console.error(`Failed to warm cache for ${path}:`, error);\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Run after deployment\n" +
      "warmCache();\n" +
      "```\n\n" +
      "**Caching Strategy Matrix:**\n\n" +
      "| Content Type | Cache Strategy | TTL | Invalidation |\n" +
      "|--------------|----------------|-----|---------------|\n" +
      "| Static assets | Immutable | 1 year | Manual |\n" +
      "| API responses | SWR | 5 min | On-demand |\n" +
      "| User data | Private | 1 hour | User action |\n" +
      "| Public content | Public | 1 day | Webhook |\n\n" +
      "**Caching Best Practices:**\n" +
      "- Use appropriate cache headers\n" +
      "- Implement proper cache invalidation\n" +
      "- Monitor cache hit rates\n" +
      "- Use stale-while-revalidate for better UX\n" +
      "- Implement cache warming strategies\n" +
      "- Consider user privacy (private vs public)\n" +
      "- Test cache behavior across environments\n" +
      "- Monitor CDN performance\n" +
      "- Implement proper error handling\n" +
      "- Use cache versioning for breaking changes",
    category: "Advanced Caching",
    difficulty: "advanced",
    tags: ["caching", "cache-headers", "swr", "cdn", "optimization"],
  },
  {
    id: 26,
    question:
      "How do you implement performance monitoring in Next.js? Explain Web Vitals, Core Web Vitals, and performance budgets.",
    answer:
      "Performance monitoring in Next.js involves tracking key metrics to ensure optimal user experience, including Core Web Vitals, custom metrics, and performance budgets.\n\n" +
      "**Web Vitals Implementation:**\n\n" +
      "1. **Basic Web Vitals Tracking:**\n" +
      "```typescript\n" +
      "// pages/_app.tsx\n" +
      "import { useEffect } from 'react';\n" +
      "import { useRouter } from 'next/router';\n" +
      "\n" +
      "export function reportWebVitals(metric: any) {\n" +
      "  // Send to analytics service\n" +
      "  if (typeof window !== 'undefined') {\n" +
      "    // Google Analytics 4\n" +
      "    gtag('event', metric.name, {\n" +
      "      value: Math.round(metric.value),\n" +
      "      event_label: metric.id,\n      " +
      "      non_interaction: true,\n" +
      "    });\n" +
      "    \n" +
      "    // Custom analytics\n      " +
      "    fetch('/api/analytics', {\n" +
      "      method: 'POST',\n" +
      "      headers: { 'Content-Type': 'application/json' },\n" +
      "      body: JSON.stringify({\n" +
      "        name: metric.name,\n" +
      "        value: metric.value,\n" +
      "        id: metric.id,\n" +
      "        url: window.location.href,\n" +
      "        timestamp: Date.now(),\n" +
      "      }),\n" +
      "    });\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "export default function App({ Component, pageProps }) {\n" +
      "  const router = useRouter();\n" +
      "  \n" +
      "  useEffect(() => {\n" +
      "    const handleRouteChange = (url: string) => {\n" +
      "      // Track route changes\n      " +
      "      gtag('config', GA_TRACKING_ID, {\n" +
      "        page_path: url,\n" +
      "      });\n" +
      "    };\n" +
      "    \n" +
      "    router.events.on('routeChangeComplete', handleRouteChange);\n" +
      "    return () => router.events.off('routeChangeComplete', handleRouteChange);\n" +
      "  }, [router.events]);\n" +
      "  \n" +
      "  return <Component {...pageProps} />;\n" +
      "}\n" +
      "```\n\n" +
      "2. **Advanced Performance Monitoring:**\n" +
      "```typescript\n" +
      "// utils/performance.ts\n" +
      "class PerformanceMonitor {\n" +
      "  private metrics: Map<string, number> = new Map();\n" +
      "  \n" +
      "  measureCustomMetric(name: string, fn: () => Promise<unknown>) {\n" +
      "    const start = performance.now();\n" +
      "    return fn().finally(() => {\n" +
      "      const duration = performance.now() - start;\n" +
      "      this.metrics.set(name, duration);\n" +
      "      this.reportMetric(name, duration);\n" +
      "    });\n" +
      "  }\n" +
      "  \n" +
      "  measureComponentRender(componentName: string) {\n" +
      "    const start = performance.now();\n" +
      "    \n" +
      "    return () => {\n" +
      "      const duration = performance.now() - start;\n" +
      "      this.reportMetric(`component_render_${componentName}`, duration);\n" +
      "    };\n" +
      "  }\n" +
      "  \n" +
      "  private reportMetric(name: string, value: number) {\n" +
      "    // Send to monitoring service\n      " +
      "    fetch('/api/metrics', {\n" +
      "      method: 'POST',\n" +
      "      headers: { 'Content-Type': 'application/json' },\n" +
      "      body: JSON.stringify({\n" +
      "        name,\n" +
      "        value,\n" +
      "        timestamp: Date.now(),\n" +
      "        url: window.location.href,\n" +
      "      }),\n" +
      "    });\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "export const performanceMonitor = new PerformanceMonitor();\n" +
      "```\n\n" +
      "**Core Web Vitals Tracking:**\n\n" +
      "```typescript\n" +
      "// components/WebVitals.tsx\n" +
      "import { useEffect } from 'react';\n" +
      "\n" +
      "export default function WebVitals() {\n" +
      "  useEffect(() => {\n" +
      "    // Track Largest Contentful Paint (LCP)\n" +
      "    const lcpObserver = new PerformanceObserver((list) => {\n" +
      "      const entries = list.getEntries();\n" +
      "      const lastEntry = entries[entries.length - 1];\n" +
      "      \n      " +
      "      reportWebVitals({\n" +
      "        name: 'LCP',\n" +
      "        value: lastEntry.startTime,\n" +
      "        id: 'lcp',\n" +
      "      });\n" +
      "    });\n" +
      "    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });\n" +
      "    \n" +
      "    // Track First Input Delay (FID)\n" +
      "    const fidObserver = new PerformanceObserver((list) => {\n" +
      "      const entries = list.getEntries();\n" +
      "      entries.forEach((entry) => {\n" +
      "        reportWebVitals({\n" +
      "          name: 'FID',\n" +
      "          value: entry.processingStart - entry.startTime,\n" +
      "          id: 'fid',\n" +
      "        });\n" +
      "      });\n" +
      "    });\n" +
      "    fidObserver.observe({ entryTypes: ['first-input'] });\n" +
      "    \n" +
      "    // Track Cumulative Layout Shift (CLS)\n" +
      "    let clsValue = 0;\n" +
      "    const clsObserver = new PerformanceObserver((list) => {\n" +
      "      const entries = list.getEntries();\n" +
      "      entries.forEach((entry) => {\n" +
      "        if (!entry.hadRecentInput) {\n" +
      "          clsValue += entry.value;\n" +
      "        }\n" +
      "      });\n" +
      "      \n      " +
      "      reportWebVitals({\n" +
      "        name: 'CLS',\n" +
      "        value: clsValue,\n" +
      "        id: 'cls',\n" +
      "      });\n" +
      "    });\n" +
      "    clsObserver.observe({ entryTypes: ['layout-shift'] });\n" +
      "    \n" +
      "    return () => {\n" +
      "      lcpObserver.disconnect();\n" +
      "      fidObserver.disconnect();\n" +
      "      clsObserver.disconnect();\n" +
      "    };\n" +
      "  }, []);\n" +
      "  \n" +
      "  return null;\n" +
      "}\n" +
      "```\n\n" +
      "**Performance Budgets:**\n\n" +
      "```typescript\n" +
      "// next.config.js\n" +
      "module.exports = {\n" +
      "  experimental: {\n" +
      "    webVitalsAttribution: ['CLS', 'LCP'],\n" +
      "  },\n" +
      "  \n" +
      "  // Performance budgets\n      " +
      "  webpack: (config, { dev, isServer }) => {\n" +
      "    if (!dev && !isServer) {\n" +
      "      config.optimization.splitChunks = {\n" +
      "        chunks: 'all',\n" +
      "        cacheGroups: {\n" +
      "          vendor: {\n" +
      "            test: /[\\\\/]node_modules[\\\\/]/,\n" +
      "            name: 'vendors',\n" +
      "            chunks: 'all',\n" +
      "            maxSize: 250000, // 250KB budget\n" +
      "          },\n" +
      "        },\n" +
      "      };\n" +
      "    }\n" +
      "    return config;\n" +
      "  },\n" +
      "};\n" +
      "```\n\n" +
      "**Performance Budget Monitoring:**\n\n" +
      "```typescript\n" +
      "// scripts/performance-budget.js\n" +
      "const budget = {\n" +
      "  'first-contentful-paint': 2000, // 2s\n" +
      "  'largest-contentful-paint': 2500, // 2.5s\n" +
      "  'first-input-delay': 100, // 100ms\n" +
      "  'cumulative-layout-shift': 0.1, // 0.1\n" +
      "  'total-blocking-time': 300, // 300ms\n" +
      "};\n" +
      "\n" +
      "function checkBudget(metric) {\n" +
      "  const threshold = budget[metric.name];\n" +
      "  if (threshold && metric.value > threshold) {\n" +
      "    console.warn(`Performance budget exceeded: ${metric.name}`, {\n" +
      "      value: metric.value,\n" +
      "      threshold,\n" +
      "    });\n" +
      "    \n" +
      "    // Send alert\n      " +
      "    fetch('/api/alerts', {\n" +
      "      method: 'POST',\n" +
      "      headers: { 'Content-Type': 'application/json' },\n" +
      "      body: JSON.stringify({\n" +
      "        type: 'performance_budget',\n" +
      "        metric: metric.name,\n" +
      "        value: metric.value,\n" +
      "        threshold,\n" +
      "      }),\n" +
      "    });\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Performance Monitoring Dashboard:**\n\n" +
      "```typescript\n" +
      "// pages/api/metrics.ts\n" +
      "export default async function handler(req, res) {\n" +
      "  if (req.method !== 'POST') {\n" +
      "    return res.status(405).json({ error: 'Method not allowed' });\n" +
      "  }\n" +
      "  \n" +
      "  const { name, value, url, timestamp } = req.body;\n" +
      "  \n" +
      "  // Store in database\n      " +
      "  await db.metrics.create({\n" +
      "    data: {\n" +
      "      name,\n" +
      "      value,\n" +
      "      url,\n" +
      "      timestamp: new Date(timestamp),\n" +
      "    },\n" +
      "  });\n" +
      "  \n" +
      "  res.json({ success: true });\n" +
      "}\n" +
      "\n" +
      "// pages/admin/performance.tsx\n" +
      "export default function PerformanceDashboard() {\n" +
      "  const [metrics, setMetrics] = useState([]);\n" +
      "  \n" +
      "  useEffect(() => {\n" +
      "    fetch('/api/metrics').then(res => res.json()).then(setMetrics);\n" +
      "  }, []);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <h1>Performance Dashboard</h1>\n" +
      "      <div className='metrics-grid'>\n" +
      "        {metrics.map(metric => (\n" +
      "          <div key={metric.id} className='metric-card'>\n" +
      "            <h3>{metric.name}</h3>\n" +
      "            <p>{metric.value}ms</p>\n" +
      "            <p>{metric.url}</p>\n" +
      "          </div>\n" +
      "        ))}\n" +
      "      </div>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Performance Monitoring Best Practices:**\n" +
      "- Track Core Web Vitals consistently\n" +
      "- Set up performance budgets\n" +
      "- Monitor real user metrics (RUM)\n" +
      "- Use performance budgets in CI/CD\n" +
      "- Implement custom metrics for business KPIs\n" +
      "- Set up alerts for performance regressions\n" +
      "- Monitor performance across different devices\n" +
      "- Use performance profiling tools\n" +
      "- Implement performance testing\n" +
      "- Monitor third-party script impact",
    category: "Performance Monitoring",
    difficulty: "advanced",
    tags: ["performance", "web-vitals", "monitoring", "budgets", "analytics"],
  },
  {
    id: 27,
    question:
      "How do you implement security best practices in Next.js? Explain Content Security Policy, authentication, and data protection.",
    answer:
      "Security in Next.js involves implementing multiple layers of protection including Content Security Policy (CSP), secure authentication, data validation, and protection against common vulnerabilities.\n\n" +
      "**Content Security Policy (CSP):**\n\n" +
      "```typescript\n" +
      "// next.config.js\n" +
      "module.exports = {\n" +
      "  async headers() {\n" +
      "    return [\n" +
      "      {\n" +
      "        source: '/(.*)',\n" +
      "        headers: [\n" +
      "          {\n" +
      "            key: 'Content-Security-Policy',\n" +
      "            value: [\n" +
      "              \"default-src 'self'\",\n" +
      "              \"script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com\",\n" +
      "              \"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com\",\n" +
      "              \"font-src 'self' https://fonts.gstatic.com\",\n" +
      "              \"img-src 'self' data: https: blob:\",\n" +
      "              \"connect-src 'self' https://api.example.com\",\n" +
      "              \"frame-ancestors 'none'\",\n" +
      "              \"base-uri 'self'\",\n" +
      "              \"form-action 'self'\",\n" +
      "            ].join('; '),\n" +
      "          },\n" +
      "          {\n" +
      "            key: 'X-Frame-Options',\n" +
      "            value: 'DENY',\n" +
      "          },\n" +
      "          {\n" +
      "            key: 'X-Content-Type-Options',\n" +
      "            value: 'nosniff',\n" +
      "          },\n" +
      "          {\n" +
      "            key: 'Referrer-Policy',\n" +
      "            value: 'strict-origin-when-cross-origin',\n" +
      "          },\n" +
      "        ],\n" +
      "      },\n" +
      "    ];\n" +
      "  },\n" +
      "};\n" +
      "```\n\n" +
      "**Secure Authentication:**\n\n" +
      "```typescript\n" +
      "// lib/auth.ts\n" +
      "import { SignJWT, jwtVerify } from 'jose';\n" +
      "import { cookies } from 'next/headers';\n" +
      "\n" +
      "const secret = new TextEncoder().encode(process.env.JWT_SECRET);\n" +
      "\n" +
      "export async function createToken(payload: { userId: string; email: string }) {\n" +
      "  const token = await new SignJWT(payload)\n" +
      "    .setProtectedHeader({ alg: 'HS256' })\n" +
      "    .setIssuedAt()\n" +
      "    .setExpirationTime('24h')\n" +
      "    .sign(secret);\n" +
      "  \n" +
      "  return token;\n" +
      "}\n" +
      "\n" +
      "export async function verifyToken(token: string) {\n" +
      "  try {\n" +
      "    const { payload } = await jwtVerify(token, secret);\n" +
      "    return payload;\n" +
      "  } catch (error) {\n" +
      "    throw new Error('Invalid token');\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "export async function getSession() {\n" +
      "  const cookieStore = cookies();\n" +
      "  const token = cookieStore.get('auth-token')?.value;\n" +
      "  \n" +
      "  if (!token) return null;\n" +
      "  \n" +
      "  try {\n" +
      "    return await verifyToken(token);\n" +
      "  } catch {\n" +
      "    return null;\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**API Route Security:**\n\n" +
      "```typescript\n" +
      "// pages/api/protected.ts\n" +
      "import { NextApiRequest, NextApiResponse } from 'next';\n" +
      "import { getSession } from '../../lib/auth';\n" +
      "import rateLimit from 'express-rate-limit';\n" +
      "\n" +
      "const limiter = rateLimit({\n" +
      "  windowMs: 15 * 60 * 1000, // 15 minutes\n" +
      "  max: 100, // limit each IP to 100 requests per windowMs\n" +
      "  message: 'Too many requests from this IP',\n" +
      "});\n" +
      "\n" +
      "export default async function handler(req: NextApiRequest, res: NextApiResponse) {\n" +
      "  // Rate limiting\n" +
      "  await new Promise((resolve, reject) => {\n" +
      "    limiter(req, res, (err) => {\n" +
      "      if (err) reject(err);\n" +
      "      else resolve(undefined);\n" +
      "    });\n" +
      "  });\n" +
      "  \n" +
      "  // Authentication check\n" +
      "  const session = await getSession();\n" +
      "  if (!session) {\n" +
      "    return res.status(401).json({ error: 'Unauthorized' });\n" +
      "  }\n" +
      "  \n" +
      "  // CSRF protection\n" +
      "  const csrfToken = req.headers['x-csrf-token'];\n" +
      "  if (!csrfToken || csrfToken !== req.cookies['csrf-token']) {\n" +
      "    return res.status(403).json({ error: 'Invalid CSRF token' });\n" +
      "  }\n" +
      "  \n" +
      "  // Input validation\n" +
      "  const { data } = req.body;\n" +
      "  if (!data || typeof data !== 'string' || data.length > 1000) {\n" +
      "    return res.status(400).json({ error: 'Invalid input' });\n" +
      "  }\n" +
      "  \n" +
      "  // Sanitize input\n" +
      "  const sanitizedData = data.replace(/<script[^>]*>.*?<\\/script>/gi, '');\n" +
      "  \n" +
      "  res.json({ success: true, data: sanitizedData });\n" +
      "}\n" +
      "```\n\n" +
      "**Middleware Security:**\n\n" +
      "```typescript\n" +
      "// middleware.ts\n" +
      "import { NextResponse } from 'next/server';\n" +
      "import type { NextRequest } from 'next/server';\n" +
      "\n" +
      "export function middleware(request: NextRequest) {\n" +
      "  const response = NextResponse.next();\n" +
      "  \n" +
      "  // Security headers\n" +
      "  response.headers.set('X-Frame-Options', 'DENY');\n" +
      "  response.headers.set('X-Content-Type-Options', 'nosniff');\n" +
      "  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');\n" +
      "  \n" +
      "  // HSTS for HTTPS\n" +
      "  if (request.nextUrl.protocol === 'https:') {\n" +
      "    response.headers.set(\n" +
      "      'Strict-Transport-Security',\n" +
      "      'max-age=31536000; includeSubDomains'\n" +
      "    );\n" +
      "  }\n" +
      "  \n" +
      "  // Authentication check for protected routes\n" +
      "  if (request.nextUrl.pathname.startsWith('/admin')) {\n" +
      "    const token = request.cookies.get('auth-token')?.value;\n" +
      "    \n" +
      "    if (!token) {\n" +
      "      return NextResponse.redirect(new URL('/login', request.url));\n" +
      "    }\n" +
      "    \n" +
      "    try {\n" +
      "      // Verify token\n      " +
      "      const payload = await verifyToken(token);\n" +
      "      \n" +
      "      // Check permissions\n      " +
      "      if (!payload.role || !['admin', 'super-admin'].includes(payload.role)) {\n" +
      "        return NextResponse.redirect(new URL('/unauthorized', request.url));\n" +
      "      }\n" +
      "    } catch {\n" +
      "      return NextResponse.redirect(new URL('/login', request.url));\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  return response;\n" +
      "}\n" +
      "\n" +
      "export const config = {\n" +
      "  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],\n" +
      "};\n" +
      "```\n\n" +
      "**Data Protection:**\n\n" +
      "```typescript\n" +
      "// lib/encryption.ts\n" +
      "import crypto from 'crypto';\n" +
      "\n" +
      "const algorithm = 'aes-256-gcm';\n" +
      "const secretKey = process.env.ENCRYPTION_KEY!;\n" +
      "\n" +
      "export function encrypt(text: string): { encrypted: string; iv: string; tag: string } {\n" +
      "  const iv = crypto.randomBytes(16);\n" +
      "  const cipher = crypto.createCipher(algorithm, secretKey);\n" +
      "  cipher.setAAD(Buffer.from('nextjs-app', 'utf8'));\n" +
      "  \n" +
      "  let encrypted = cipher.update(text, 'utf8', 'hex');\n" +
      "  encrypted += cipher.final('hex');\n" +
      "  \n" +
      "  const tag = cipher.getAuthTag();\n" +
      "  \n" +
      "  return {\n" +
      "    encrypted,\n" +
      "    iv: iv.toString('hex'),\n" +
      "    tag: tag.toString('hex'),\n" +
      "  };\n" +
      "}\n" +
      "\n" +
      "export function decrypt(encryptedData: { encrypted: string; iv: string; tag: string }): string {\n" +
      "  const decipher = crypto.createDecipher(algorithm, secretKey);\n" +
      "  decipher.setAAD(Buffer.from('nextjs-app', 'utf8'));\n" +
      "  decipher.setAuthTag(Buffer.from(encryptedData.tag, 'hex'));\n" +
      "  \n" +
      "  let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');\n" +
      "  decrypted += decipher.final('utf8');\n" +
      "  \n" +
      "  return decrypted;\n" +
      "}\n" +
      "\n" +
      "// lib/validation.ts\n" +
      "import { z } from 'zod';\n" +
      "\n" +
      "export const userSchema = z.object({\n" +
      "  email: z.string().email().max(255),\n" +
      "  password: z.string().min(8).max(128),\n" +
      "  name: z.string().min(1).max(100).regex(/^[a-zA-Z\\s]+$/),\n" +
      "  age: z.number().int().min(13).max(120),\n" +
      "});\n" +
      "\n" +
      "export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): T {\n" +
      "  try {\n" +
      "    return schema.parse(data);\n" +
      "  } catch (error) {\n" +
      "    if (error instanceof z.ZodError) {\n" +
      "      throw new Error(`Validation failed: ${error.errors.map(e => e.message).join(', ')}`);\n" +
      "    }\n" +
      "    throw error;\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Security Best Practices:**\n" +
      "- Implement Content Security Policy (CSP)\n" +
      "- Use secure authentication (JWT with proper expiration)\n" +
      "- Implement rate limiting on API routes\n" +
      "- Validate and sanitize all inputs\n" +
      "- Use HTTPS in production\n" +
      "- Implement proper CORS policies\n" +
      "- Use secure headers (HSTS, X-Frame-Options, etc.)\n" +
      "- Encrypt sensitive data\n" +
      "- Implement CSRF protection\n" +
      "- Use environment variables for secrets\n" +
      "- Regular security audits and dependency updates\n" +
      "- Implement proper error handling (don't expose sensitive info)\n" +
      "- Use secure session management\n" +
      "- Implement proper access controls\n" +
      "- Monitor for security vulnerabilities",
    category: "Security",
    difficulty: "advanced",
    tags: ["security", "csp", "authentication", "encryption", "validation"],
  },
  {
    id: 28,
    question:
      "How do you implement advanced routing patterns in Next.js? Explain dynamic routes, catch-all routes, and route groups.",
    answer:
      "Advanced routing in Next.js involves using dynamic routes, catch-all routes, route groups, and custom routing patterns to create flexible and maintainable navigation structures.\n\n" +
      "**Dynamic Routes:**\n\n" +
      "```typescript\n" +
      "// pages/posts/[id].tsx\n" +
      "import { GetStaticPaths, GetStaticProps } from 'next';\n" +
      "import { useRouter } from 'next/router';\n" +
      "\n" +
      "interface Post {\n" +
      "  id: string;\n" +
      "  title: string;\n" +
      "  content: string;\n" +
      "  slug: string;\n" +
      "}\n" +
      "\n" +
      "interface PostPageProps {\n" +
      "  post: Post;\n" +
      "}\n" +
      "\n" +
      "export default function PostPage({ post }: PostPageProps) {\n" +
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
      "\n" +
      "export const getStaticPaths: GetStaticPaths = async () => {\n" +
      "  const posts = await fetchPosts();\n" +
      "  \n" +
      "  const paths = posts.map((post) => ({\n" +
      "    params: { id: post.id },\n" +
      "  }));\n" +
      "  \n" +
      "  return {\n" +
      "    paths,\n" +
      "    fallback: true, // Enable ISR\n" +
      "  };\n" +
      "};\n" +
      "\n" +
      "export const getStaticProps: GetStaticProps = async ({ params }) => {\n" +
      "  const post = await fetchPost(params?.id as string);\n" +
      "  \n" +
      "  if (!post) {\n" +
      "    return {\n" +
      "      notFound: true,\n" +
      "    };\n" +
      "  }\n" +
      "  \n" +
      "  return {\n" +
      "    props: { post },\n" +
      "    revalidate: 3600, // Revalidate every hour\n" +
      "  };\n" +
      "};\n" +
      "```\n\n" +
      "**Catch-All Routes:**\n\n" +
      "```typescript\n" +
      "// pages/docs/[...slug].tsx\n" +
      "import { GetStaticPaths, GetStaticProps } from 'next';\n" +
      "import { useRouter } from 'next/router';\n" +
      "\n" +
      "interface DocPageProps {\n" +
      "  doc: {\n" +
      "    title: string;\n" +
      "    content: string;\n" +
      "    path: string[];\n" +
      "  };\n" +
      "}\n" +
      "\n" +
      "export default function DocPage({ doc }: DocPageProps) {\n" +
      "  const router = useRouter();\n" +
      "  const { slug } = router.query;\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <nav>\n" +
      "        {doc.path.map((segment, index) => (\n" +
      "          <span key={index}>\n" +
      "            {segment}\n" +
      "            {index < doc.path.length - 1 && ' / '}\n" +
      "          </span>\n" +
      "        ))}\n" +
      "      </nav>\n" +
      "      <h1>{doc.title}</h1>\n" +
      "      <div dangerouslySetInnerHTML={{ __html: doc.content }} />\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "\n" +
      "export const getStaticPaths: GetStaticPaths = async () => {\n" +
      "  const docs = await fetchAllDocs();\n" +
      "  \n" +
      "  const paths = docs.map((doc) => ({\n" +
      "    params: { slug: doc.path },\n" +
      "  }));\n" +
      "  \n" +
      "  return {\n" +
      "    paths,\n" +
      "    fallback: 'blocking',\n" +
      "  };\n" +
      "};\n" +
      "\n" +
      "export const getStaticProps: GetStaticProps = async ({ params }) => {\n" +
      "  const slug = params?.slug as string[];\n" +
      "  const doc = await fetchDocByPath(slug);\n" +
      "  \n" +
      "  if (!doc) {\n" +
      "    return {\n" +
      "      notFound: true,\n" +
      "    };\n" +
      "  }\n" +
      "  \n" +
      "  return {\n" +
      "    props: { doc },\n" +
      "    revalidate: 3600,\n" +
      "  };\n" +
      "};\n" +
      "```\n\n" +
      "**Optional Catch-All Routes:**\n\n" +
      "```typescript\n" +
      "// pages/shop/[[...slug]].tsx\n" +
      "import { GetStaticPaths, GetStaticProps } from 'next';\n" +
      "\n" +
      "interface ShopPageProps {\n" +
      "  category?: string;\n" +
      "  subcategory?: string;\n" +
      "  product?: string;\n" +
      "  products: Product[];\n" +
      "}\n" +
      "\n" +
      "export default function ShopPage({ category, subcategory, product, products }: ShopPageProps) {\n" +
      "  if (product) {\n" +
      "    return <ProductPage product={product} />;\n" +
      "  }\n" +
      "  \n" +
      "  if (subcategory) {\n" +
      "    return <SubcategoryPage subcategory={subcategory} products={products} />;\n" +
      "  }\n" +
      "  \n" +
      "  if (category) {\n" +
      "    return <CategoryPage category={category} products={products} />;\n" +
      "  }\n" +
      "  \n" +
      "  return <ShopHomePage products={products} />;\n" +
      "}\n" +
      "\n" +
      "export const getStaticPaths: GetStaticPaths = async () => {\n" +
      "  return {\n" +
      "    paths: [\n" +
      "      { params: { slug: [] } }, // /shop\n" +
      "      { params: { slug: ['electronics'] } }, // /shop/electronics\n" +
      "      { params: { slug: ['electronics', 'phones'] } }, // /shop/electronics/phones\n" +
      "    ],\n" +
      "    fallback: 'blocking',\n" +
      "  };\n" +
      "};\n" +
      "\n" +
      "export const getStaticProps: GetStaticProps = async ({ params }) => {\n" +
      "  const slug = params?.slug as string[] || [];\n" +
      "  \n" +
      "  const [category, subcategory, product] = slug;\n" +
      "  \n" +
      "  let products = [];\n" +
      "  \n" +
      "  if (product) {\n" +
      "    products = await fetchProduct(product);\n" +
      "  } else if (subcategory) {\n" +
      "    products = await fetchProductsBySubcategory(subcategory);\n" +
      "  } else if (category) {\n" +
      "    products = await fetchProductsByCategory(category);\n" +
      "  } else {\n" +
      "    products = await fetchAllProducts();\n" +
      "  }\n" +
      "  \n" +
      "  return {\n" +
      "    props: {\n" +
      "      category,\n" +
      "      subcategory,\n" +
      "      product,\n" +
      "      products,\n" +
      "    },\n" +
      "    revalidate: 3600,\n" +
      "  };\n" +
      "};\n" +
      "```\n\n" +
      "**Route Groups (App Router):**\n\n" +
      "```typescript\n" +
      "// app/(marketing)/layout.tsx\n" +
      "export default function MarketingLayout({\n" +
      "  children,\n" +
      "}: {\n" +
      "  children: React.ReactNode;\n" +
      "}) {\n" +
      "  return (\n" +
      "    <div className='marketing-layout'>\n" +
      "      <MarketingHeader />\n" +
      "      {children}\n" +
      "      <MarketingFooter />\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "\n" +
      "// app/(marketing)/page.tsx\n" +
      "export default function HomePage() {\n" +
      "  return <div>Marketing Home Page</div>;\n" +
      "}\n" +
      "\n" +
      "// app/(marketing)/about/page.tsx\n" +
      "export default function AboutPage() {\n" +
      "  return <div>About Us</div>;\n" +
      "}\n" +
      "\n" +
      "// app/(dashboard)/layout.tsx\n" +
      "export default function DashboardLayout({\n" +
      "  children,\n" +
      "}: {\n" +
      "  children: React.ReactNode;\n" +
      "}) {\n" +
      "  return (\n" +
      "    <div className='dashboard-layout'>\n" +
      "      <DashboardSidebar />\n" +
      "      <main>{children}</main>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "\n" +
      "// app/(dashboard)/dashboard/page.tsx\n" +
      "export default function DashboardPage() {\n" +
      "  return <div>Dashboard</div>;\n" +
      "}\n" +
      "```\n\n" +
      "**Custom Routing with Middleware:**\n\n" +
      "```typescript\n" +
      "// middleware.ts\n" +
      "import { NextResponse } from 'next/server';\n" +
      "import type { NextRequest } from 'next/server';\n" +
      "\n" +
      "export function middleware(request: NextRequest) {\n" +
      "  const { pathname } = request.nextUrl;\n" +
      "  \n" +
      "  // Redirect old URLs to new structure\n" +
      "  if (pathname.startsWith('/old-blog/')) {\n" +
      "    const slug = pathname.replace('/old-blog/', '');\n" +
      "    return NextResponse.redirect(new URL(`/blog/${slug}`, request.url));\n" +
      "  }\n" +
      "  \n" +
      "  // Handle locale routing\n" +
      "  const locale = request.headers.get('accept-language')?.split(',')[0] || 'en';\n" +
      "  \n" +
      "  if (!pathname.startsWith(`/${locale}/`) && !pathname.startsWith('/api/')) {\n" +
      "    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));\n" +
      "  }\n" +
      "  \n" +
      "  // Handle A/B testing routes\n" +
      "  if (pathname === '/pricing') {\n" +
      "    const variant = Math.random() > 0.5 ? 'a' : 'b';\n" +
      "    return NextResponse.rewrite(new URL(`/pricing/${variant}`, request.url));\n" +
      "  }\n" +
      "  \n" +
      "  return NextResponse.next();\n" +
      "}\n" +
      "\n" +
      "export const config = {\n" +
      "  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],\n" +
      "};\n" +
      "```\n\n" +
      "**Programmatic Navigation:**\n\n" +
      "```typescript\n" +
      "// hooks/useNavigation.ts\n" +
      "import { useRouter } from 'next/router';\n" +
      "import { useCallback } from 'react';\n" +
      "\n" +
      "export function useNavigation() {\n" +
      "  const router = useRouter();\n" +
      "  \n" +
      "  const navigateToPost = useCallback((postId: string) => {\n" +
      "    router.push(`/posts/${postId}`);\n" +
      "  }, [router]);\n" +
      "  \n" +
      "  const navigateToCategory = useCallback((category: string, subcategory?: string) => {\n" +
      "    const path = subcategory \n" +
      "      ? `/shop/${category}/${subcategory}`\n" +
      "      : `/shop/${category}`;\n" +
      "    router.push(path);\n" +
      "  }, [router]);\n" +
      "  \n" +
      "  const navigateWithQuery = useCallback((path: string, query: Record<string, string>) => {\n" +
      "    router.push({\n" +
      "      pathname: path,\n" +
      "      query,\n" +
      "    });\n" +
      "  }, [router]);\n" +
      "  \n" +
      "  const replaceRoute = useCallback((path: string) => {\n" +
      "    router.replace(path);\n" +
      "  }, [router]);\n" +
      "  \n" +
      "  return {\n" +
      "    navigateToPost,\n" +
      "    navigateToCategory,\n" +
      "    navigateWithQuery,\n" +
      "    replaceRoute,\n" +
      "    router,\n" +
      "  };\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Routing Patterns:**\n" +
      "- Use dynamic routes for parameterized pages\n" +
      "- Implement catch-all routes for flexible URL structures\n" +
      "- Use optional catch-all routes for hierarchical content\n" +
      "- Leverage route groups for different layouts\n" +
      "- Implement custom middleware for URL transformations\n" +
      "- Use programmatic navigation for complex routing logic\n" +
      "- Implement proper fallback strategies\n" +
      "- Use route-based code splitting\n" +
      "- Implement proper error boundaries for routes\n" +
      "- Use shallow routing for query parameter updates",
    category: "Advanced Routing",
    difficulty: "advanced",
    tags: ["routing", "dynamic-routes", "catch-all", "route-groups", "middleware"],
  },
  {
    id: 29,
    question:
      "How do you implement microservices architecture with Next.js? Explain API Gateway patterns, service communication, and data consistency.",
    answer:
      "Microservices architecture with Next.js involves breaking down applications into smaller, independent services that communicate through well-defined APIs, with Next.js serving as the frontend gateway and API orchestrator.\n\n" +
      "**API Gateway Pattern:**\n\n" +
      "```typescript\n" +
      "// pages/api/gateway/[...service].ts\n" +
      "import { NextApiRequest, NextApiResponse } from 'next';\n" +
      "import { getSession } from '../../../lib/auth';\n" +
      "\n" +
      "const SERVICES = {\n" +
      "  users: process.env.USER_SERVICE_URL,\n" +
      "  orders: process.env.ORDER_SERVICE_URL,\n" +
      "  products: process.env.PRODUCT_SERVICE_URL,\n" +
      "  payments: process.env.PAYMENT_SERVICE_URL,\n" +
      "};\n" +
      "\n" +
      "export default async function handler(req: NextApiRequest, res: NextApiResponse) {\n" +
      "  const { service } = req.query;\n" +
      "  const serviceName = Array.isArray(service) ? service[0] : service;\n" +
      "  \n" +
      "  if (!serviceName || !SERVICES[serviceName as keyof typeof SERVICES]) {\n" +
      "    return res.status(404).json({ error: 'Service not found' });\n" +
      "  }\n" +
      "  \n" +
      "  // Authentication check\n" +
      "  const session = await getSession();\n" +
      "  if (!session) {\n" +
      "    return res.status(401).json({ error: 'Unauthorized' });\n" +
      "  }\n" +
      "  \n" +
      "  // Rate limiting per service\n" +
      "  const rateLimitKey = `${session.userId}:${serviceName}`;\n" +
      "  const isRateLimited = await checkRateLimit(rateLimitKey);\n" +
      "  if (isRateLimited) {\n" +
      "    return res.status(429).json({ error: 'Rate limit exceeded' });\n" +
      "  }\n" +
      "  \n" +
      "  try {\n" +
      "    // Forward request to microservice\n      " +
      "    const serviceUrl = SERVICES[serviceName as keyof typeof SERVICES];\n" +
      "    const response = await fetch(`${serviceUrl}/api/${req.url?.split('/').slice(3).join('/')}`, {\n" +
      "      method: req.method,\n" +
      "      headers: {\n" +
      "        'Content-Type': 'application/json',\n" +
      "        'Authorization': `Bearer ${session.token}`,\n" +
      "        'X-User-ID': session.userId,\n" +
      "        'X-Service-Name': serviceName,\n" +
      "      },\n" +
      "      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,\n" +
      "    });\n" +
      "    \n" +
      "    const data = await response.json();\n" +
      "    \n" +
      "    // Log request for monitoring\n      " +
      "    await logRequest({\n" +
      "      service: serviceName,\n" +
      "      method: req.method,\n" +
      "      userId: session.userId,\n" +
      "      status: response.status,\n" +
      "      timestamp: new Date(),\n" +
      "    });\n" +
      "    \n" +
      "    res.status(response.status).json(data);\n" +
      "  } catch (error) {\n" +
      "    console.error(`Gateway error for ${serviceName}:`, error);\n" +
      "    res.status(500).json({ error: 'Internal server error' });\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Service Communication:**\n\n" +
      "```typescript\n" +
      "// lib/services/UserService.ts\n" +
      "class UserService {\n" +
      "  private baseUrl: string;\n" +
      "  private timeout: number;\n" +
      "  \n" +
      "  constructor() {\n" +
      "    this.baseUrl = process.env.USER_SERVICE_URL!;\n" +
      "    this.timeout = 5000;\n" +
      "  }\n" +
      "  \n" +
      "  async getUser(userId: string): Promise<User> {\n" +
      "    const controller = new AbortController();\n" +
      "    const timeoutId = setTimeout(() => controller.abort(), this.timeout);\n" +
      "    \n" +
      "    try {\n" +
      "      const response = await fetch(`${this.baseUrl}/users/${userId}`, {\n" +
      "        signal: controller.signal,\n" +
      "        headers: {\n" +
      "          'Content-Type': 'application/json',\n" +
      "        },\n" +
      "      });\n" +
      "      \n" +
      "      if (!response.ok) {\n" +
      "        throw new Error(`User service error: ${response.status}`);\n" +
      "      }\n" +
      "      \n" +
      "      return await response.json();\n" +
      "    } catch (error) {\n" +
      "      if (error.name === 'AbortError') {\n" +
      "        throw new Error('User service timeout');\n" +
      "      }\n" +
      "      throw error;\n" +
      "    } finally {\n" +
      "      clearTimeout(timeoutId);\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  async createUser(userData: CreateUserRequest): Promise<User> {\n" +
      "    const response = await fetch(`${this.baseUrl}/users`, {\n" +
      "      method: 'POST',\n" +
      "      headers: {\n" +
      "        'Content-Type': 'application/json',\n" +
      "      },\n" +
      "      body: JSON.stringify(userData),\n" +
      "    });\n" +
      "    \n" +
      "    if (!response.ok) {\n" +
      "      throw new Error(`User creation failed: ${response.status}`);\n" +
      "    }\n" +
      "    \n" +
      "    return await response.json();\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// lib/services/OrderService.ts\n" +
      "class OrderService {\n" +
      "  private baseUrl: string;\n" +
      "  \n" +
      "  constructor() {\n" +
      "    this.baseUrl = process.env.ORDER_SERVICE_URL!;\n" +
      "  }\n" +
      "  \n" +
      "  async createOrder(orderData: CreateOrderRequest): Promise<Order> {\n" +
      "    // Validate order data\n      " +
      "    const validatedData = await this.validateOrder(orderData);\n" +
      "    \n" +
      "    // Create order\n      " +
      "    const response = await fetch(`${this.baseUrl}/orders`, {\n" +
      "      method: 'POST',\n" +
      "      headers: {\n" +
      "        'Content-Type': 'application/json',\n" +
      "      },\n" +
      "      body: JSON.stringify(validatedData),\n" +
      "    });\n" +
      "    \n" +
      "    if (!response.ok) {\n" +
      "      throw new Error(`Order creation failed: ${response.status}`);\n" +
      "    }\n" +
      "    \n" +
      "    const order = await response.json();\n" +
      "    \n" +
      "    // Publish order created event\n      " +
      "    await this.publishEvent('order.created', order);\n" +
      "    \n" +
      "    return order;\n" +
      "  }\n" +
      "  \n" +
      "  private async validateOrder(orderData: CreateOrderRequest): Promise<CreateOrderRequest> {\n" +
      "    // Validate with product service\n      " +
      "    const productService = new ProductService();\n" +
      "    \n" +
      "    for (const item of orderData.items) {\n" +
      "      const product = await productService.getProduct(item.productId);\n" +
      "      if (!product || product.stock < item.quantity) {\n" +
      "        throw new Error(`Insufficient stock for product ${item.productId}`);\n" +
      "      }\n" +
      "    }\n" +
      "    \n" +
      "    return orderData;\n" +
      "  }\n" +
      "  \n" +
      "  private async publishEvent(eventType: string, data: unknown): Promise<void> {\n" +
      "    await fetch(`${process.env.EVENT_SERVICE_URL}/events`, {\n" +
      "      method: 'POST',\n" +
      "      headers: {\n" +
      "        'Content-Type': 'application/json',\n" +
      "      },\n" +
      "      body: JSON.stringify({\n" +
      "        type: eventType,\n" +
      "        data,\n" +
      "        timestamp: new Date().toISOString(),\n" +
      "      }),\n" +
      "    });\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "export const userService = new UserService();\n" +
      "export const orderService = new OrderService();\n" +
      "```\n\n" +
      "**Data Consistency Patterns:**\n\n" +
      "```typescript\n" +
      "// lib/patterns/SagaPattern.ts\n" +
      "class OrderSaga {\n" +
      "  private steps: Array<{ name: string; execute: () => Promise<unknown>; compensate: () => Promise<void> }>;\n" +
      "  private executedSteps: string[];\n" +
      "  \n" +
      "  constructor() {\n" +
      "    this.steps = [];\n" +
      "    this.executedSteps = [];\n" +
      "  }\n" +
      "  \n" +
      "  addStep(step: { name: string; execute: () => Promise<unknown>; compensate: () => Promise<void> }) {\n" +
      "    this.steps.push(step);\n" +
      "    return this;\n" +
      "  }\n" +
      "  \n" +
      "  async execute(): Promise<unknown> {\n" +
      "    const results: unknown[] = [];\n" +
      "    \n" +
      "    try {\n" +
      "      for (const step of this.steps) {\n" +
      "        const result = await step.execute();\n" +
      "        results.push(result);\n" +
      "        this.executedSteps.push(step.name);\n" +
      "      }\n" +
      "      \n" +
      "      return results;\n" +
      "    } catch (error) {\n" +
      "      // Compensate executed steps\n      " +
      "      await this.compensate();\n" +
      "      throw error;\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  private async compensate(): Promise<void> {\n" +
      "    // Compensate in reverse order\n      " +
      "    for (let i = this.executedSteps.length - 1; i >= 0; i--) {\n" +
      "      const stepName = this.executedSteps[i];\n" +
      "      const step = this.steps.find(s => s.name === stepName);\n" +
      "      \n      " +
      "      if (step) {\n" +
      "        try {\n" +
      "          await step.compensate();\n" +
      "        } catch (compensationError) {\n" +
      "          console.error(`Compensation failed for step ${stepName}:`, compensationError);\n" +
      "        }\n" +
      "      }\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Usage example\n" +
      "async function createOrderWithPayment(orderData: CreateOrderRequest, paymentData: PaymentRequest) {\n" +
      "  const saga = new OrderSaga()\n" +
      "    .addStep({\n" +
      "      name: 'create-order',\n" +
      "      execute: async () => {\n" +
      "        return await orderService.createOrder(orderData);\n" +
      "      },\n" +
      "      compensate: async () => {\n" +
      "        await orderService.cancelOrder(orderData.id);\n" +
      "      },\n" +
      "    })\n" +
      "    .addStep({\n" +
      "      name: 'process-payment',\n" +
      "      execute: async () => {\n" +
      "        return await paymentService.processPayment(paymentData);\n" +
      "      },\n" +
      "      compensate: async () => {\n" +
      "        await paymentService.refundPayment(paymentData.id);\n" +
      "      },\n" +
      "    })\n" +
      "    .addStep({\n" +
      "      name: 'update-inventory',\n" +
      "      execute: async () => {\n" +
      "        return await inventoryService.updateStock(orderData.items);\n" +
      "      },\n" +
      "      compensate: async () => {\n" +
      "        await inventoryService.restoreStock(orderData.items);\n" +
      "      },\n" +
      "    });\n" +
      "  \n" +
      "  return await saga.execute();\n" +
      "}\n" +
      "```\n\n" +
      "**Event-Driven Architecture:**\n\n" +
      "```typescript\n" +
      "// lib/events/EventBus.ts\n" +
      "interface Event {\n" +
      "  type: string;\n" +
      "  data: unknown;\n" +
      "  timestamp: string;\n" +
      "  source: string;\n" +
      "}\n" +
      "\n" +
      "class EventBus {\n" +
      "  private handlers: Map<string, Array<(event: Event) => Promise<void>>>;\n" +
      "  \n" +
      "  constructor() {\n" +
      "    this.handlers = new Map();\n" +
      "  }\n" +
      "  \n" +
      "  subscribe(eventType: string, handler: (event: Event) => Promise<void>) {\n" +
      "    if (!this.handlers.has(eventType)) {\n" +
      "      this.handlers.set(eventType, []);\n" +
      "    }\n" +
      "    this.handlers.get(eventType)!.push(handler);\n" +
      "  }\n" +
      "  \n" +
      "  async publish(event: Event): Promise<void> {\n" +
      "    const handlers = this.handlers.get(event.type) || [];\n" +
      "    \n" +
      "    await Promise.allSettled(\n" +
      "      handlers.map(async (handler) => {\n" +
      "        try {\n" +
      "          await handler(event);\n" +
      "        } catch (error) {\n" +
      "          console.error(`Event handler failed for ${event.type}:`, error);\n" +
      "        }\n" +
      "      })\n" +
      "    );\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Event handlers\n" +
      "const eventBus = new EventBus();\n" +
      "\n" +
      "eventBus.subscribe('order.created', async (event) => {\n" +
      "  // Send confirmation email\n      " +
      "  await emailService.sendOrderConfirmation(event.data);\n" +
      "  \n" +
      "  // Update analytics\n      " +
      "  await analyticsService.trackOrderCreated(event.data);\n" +
      "});\n" +
      "\n" +
      "eventBus.subscribe('payment.processed', async (event) => {\n" +
      "  // Update order status\n      " +
      "  await orderService.updateOrderStatus(event.data.orderId, 'paid');\n" +
      "  \n" +
      "  // Trigger fulfillment\n      " +
      "  await fulfillmentService.startFulfillment(event.data.orderId);\n" +
      "});\n" +
      "```\n\n" +
      "**Service Discovery and Health Checks:**\n\n" +
      "```typescript\n" +
      "// lib/discovery/ServiceRegistry.ts\n" +
      "interface ServiceInfo {\n" +
      "  name: string;\n" +
      "  url: string;\n" +
      "  health: 'healthy' | 'unhealthy' | 'unknown';\n" +
      "  lastCheck: Date;\n" +
      "}\n" +
      "\n" +
      "class ServiceRegistry {\n" +
      "  private services: Map<string, ServiceInfo>;\n" +
      "  private healthCheckInterval: NodeJS.Timeout;\n" +
      "  \n" +
      "  constructor() {\n" +
      "    this.services = new Map();\n" +
      "    this.startHealthChecks();\n" +
      "  }\n" +
      "  \n" +
      "  registerService(name: string, url: string): void {\n" +
      "    this.services.set(name, {\n" +
      "      name,\n" +
      "      url,\n" +
      "      health: 'unknown',\n" +
      "      lastCheck: new Date(),\n" +
      "    });\n" +
      "  }\n" +
      "  \n" +
      "  getService(name: string): ServiceInfo | undefined {\n" +
      "    return this.services.get(name);\n" +
      "  }\n" +
      "  \n" +
      "  getHealthyService(name: string): ServiceInfo | undefined {\n" +
      "    const service = this.services.get(name);\n" +
      "    return service?.health === 'healthy' ? service : undefined;\n" +
      "  }\n" +
      "  \n" +
      "  private startHealthChecks(): void {\n" +
      "    this.healthCheckInterval = setInterval(async () => {\n" +
      "      for (const [name, service] of this.services) {\n" +
      "        try {\n" +
      "          const response = await fetch(`${service.url}/health`, {\n" +
      "            timeout: 5000,\n" +
      "          });\n" +
      "          \n" +
      "          service.health = response.ok ? 'healthy' : 'unhealthy';\n" +
      "        } catch {\n" +
      "          service.health = 'unhealthy';\n" +
      "        }\n" +
      "        \n" +
      "        service.lastCheck = new Date();\n" +
      "      }\n" +
      "    }, 30000); // Check every 30 seconds\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "export const serviceRegistry = new ServiceRegistry();\n" +
      "```\n\n" +
      "**Microservices Best Practices:**\n" +
      "- Implement proper service boundaries\n" +
      "- Use API Gateway for request routing\n" +
      "- Implement circuit breakers for fault tolerance\n" +
      "- Use event-driven architecture for loose coupling\n" +
      "- Implement distributed tracing\n" +
      "- Use service mesh for communication\n" +
      "- Implement proper error handling and retries\n" +
      "- Use database per service pattern\n" +
      "- Implement proper monitoring and logging\n" +
      "- Use containerization (Docker) for deployment\n" +
      "- Implement proper security (authentication/authorization)\n" +
      "- Use message queues for asynchronous communication\n" +
      "- Implement proper data consistency patterns\n" +
      "- Use proper service discovery mechanisms",
    category: "Microservices",
    difficulty: "advanced",
    tags: ["microservices", "api-gateway", "service-communication", "data-consistency", "events"],
  },
  {
    id: 30,
    question:
      "What is Next.js Image Optimization? How do you implement responsive images, lazy loading, and WebP conversion?",
    answer:
      "Next.js Image component provides automatic image optimization, responsive loading, and modern format conversion.\n\n" +
      "**Basic Image Usage:**\n" +
      "```jsx\n" +
      "import Image from 'next/image';\n" +
      "\n" +
      "function HeroImage() {\n" +
      "  return (\n" +
      "    <Image\n" +
      "      src='/hero-image.jpg'\n" +
      "      alt='Hero image'\n" +
      "      width={800}\n" +
      "      height={600}\n" +
      "      priority // Load immediately for above-the-fold content\n" +
      "    />\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Responsive Images:**\n" +
      "```jsx\n" +
      "function ResponsiveImage() {\n" +
      "  return (\n" +
      "    <Image\n" +
      "      src='/responsive-image.jpg'\n" +
      "      alt='Responsive image'\n" +
      "      fill // Fill parent container\n" +
      "      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'\n" +
      "      style={{\n" +
      "        objectFit: 'cover', // or 'contain', 'fill', etc.\n" +
      "        objectPosition: 'center'\n" +
      "      }}\n" +
      "    />\n" +
      "  );\n" +
      "}\n" +
      "\n" +
      "// With responsive container\n" +
      "function ImageContainer() {\n" +
      "  return (\n" +
      "    <div className='relative w-full h-64 md:h-96'>\n" +
      "      <Image\n" +
      "        src='/landscape.jpg'\n" +
      "        alt='Landscape'\n" +
      "        fill\n" +
      "        sizes='(max-width: 768px) 100vw, 50vw'\n" +
      "        className='rounded-lg'\n" +
      "      />\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**External Images:**\n" +
      "```javascript\n" +
      "// next.config.js\n" +
      "const nextConfig = {\n" +
      "  images: {\n" +
      "    remotePatterns: [\n" +
      "      {\n" +
      "        protocol: 'https',\n" +
      "        hostname: 'example.com',\n" +
      "        port: '',\n" +
      "        pathname: '/images/**',\n" +
      "      },\n" +
      "      {\n" +
      "        protocol: 'https',\n" +
      "        hostname: 'cdn.example.com',\n" +
      "      },\n" +
      "    ],\n" +
      "    // Or use domains (deprecated)\n" +
      "    domains: ['example.com', 'cdn.example.com'],\n" +
      "  },\n" +
      "};\n" +
      "\n" +
      "// Usage with external images\n" +
      "function ExternalImage() {\n" +
      "  return (\n" +
      "    <Image\n" +
      "      src='https://example.com/image.jpg'\n" +
      "      alt='External image'\n" +
      "      width={400}\n" +
      "      height={300}\n" +
      "      unoptimized={false} // Enable optimization\n" +
      "    />\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Image Features:**\n" +
      "```jsx\n" +
      "function AdvancedImage() {\n" +
      "  return (\n" +
      "    <Image\n" +
      "      src='/complex-image.jpg'\n" +
      "      alt='Advanced image'\n" +
      "      width={600}\n" +
      "      height={400}\n" +
      "      \n" +
      "      // Loading strategies\n" +
      "      loading='lazy' // Default for non-priority images\n" +
      "      priority={false} // Explicitly set to false\n" +
      "      \n" +
      "      // Placeholder options\n" +
      "      placeholder='blur'\n" +
      "      blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...'\n" +
      "      \n" +
      "      // Quality and format\n" +
      "      quality={85} // 0-100, default 75\n" +
      "      \n" +
      "      // Responsive breakpoints\n" +
      "      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'\n" +
      "      \n" +
      "      // Event handlers\n" +
      "      onLoad={() => console.log('Image loaded')}\n" +
      "      onError={() => console.log('Image failed to load')}\n" +
      "      \n" +
      "      // Custom loader\n" +
      "      loader={({ src, width, quality }) => {\n" +
      "        return `${src}?w=${width}&q=${quality || 75}`;\n" +
      "      }}\n" +
      "    />\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Custom Image Loader:**\n" +
      "```javascript\n" +
      "// Custom loader for specific domains\n" +
      "const customLoader = ({ src, width, quality }) => {\n" +
      "  return `https://my-cdn.com/${src}?w=${width}&q=${quality || 75}`;\n" +
      "};\n" +
      "\n" +
      "// Usage\n" +
      "function CustomLoadedImage() {\n" +
      "  return (\n" +
      "    <Image\n" +
      "      src='/my-image.jpg'\n" +
      "      loader={customLoader}\n" +
      "      alt='Custom loaded image'\n" +
      "      width={500}\n" +
      "      height={300}\n" +
      "    />\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Image Optimization Configuration:**\n" +
      "```javascript\n" +
      "// next.config.js\n" +
      "const nextConfig = {\n" +
      "  images: {\n" +
      "    // Device sizes for responsive images\n" +
      "    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],\n" +
      "    \n" +
      "    // Image sizes for different breakpoints\n" +
      "    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],\n" +
      "    \n" +
      "    // Formats to generate\n" +
      "    formats: ['image/webp', 'image/avif'],\n" +
      "    \n" +
      "    // Minimum cache TTL\n" +
      "    minimumCacheTTL: 60,\n" +
      "    \n" +
      "    // Disable static image optimization\n" +
      "    unoptimized: false,\n" +
      "    \n" +
      "    // Custom loader\n" +
      "    loader: 'custom',\n" +
      "    loaderFile: './my-loader.js',\n" +
      "  },\n" +
      "};\n" +
      "```\n\n" +
      "**Performance Benefits:**\n" +
      "- Automatic WebP/AVIF conversion\n" +
      "- Responsive image generation\n" +
      "- Lazy loading by default\n" +
      "- Blur placeholder support\n" +
      "- Automatic sizing optimization\n" +
      "- CDN integration\n" +
      "- Reduced Cumulative Layout Shift (CLS)",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["image-optimization", "responsive-images", "lazy-loading", "webp", "performance"],
  },
  {
    id: 31,
    question:
      "What is Next.js Font Optimization? How do you implement Google Fonts, custom fonts, and font display strategies?",
    answer:
      "Next.js provides automatic font optimization including Google Fonts integration, custom font loading, and performance optimizations.\n\n" +
      "**Google Fonts Integration:**\n" +
      "```jsx\n" +
      "import { Inter, Roboto } from 'next/font/google';\n" +
      "\n" +
      "// Configure fonts\n" +
      "const inter = Inter({\n" +
      "  subsets: ['latin'],\n" +
      "  display: 'swap', // Optimize font loading\n" +
      "  variable: '--font-inter', // CSS variable\n" +
      "});\n" +
      "\n" +
      "const roboto = Roboto({\n" +
      "  weight: ['300', '400', '500', '700'],\n" +
      "  subsets: ['latin'],\n" +
      "  display: 'swap',\n" +
      "});\n" +
      "\n" +
      "// Root layout\n" +
      "export default function RootLayout({ children }) {\n" +
      "  return (\n" +
      "    <html lang='en' className={inter.variable}>\n" +
      "      <body className={inter.className}>\n" +
      "        {children}\n" +
      "      </body>\n" +
      "    </html>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Custom Fonts:**\n" +
      "```jsx\n" +
      "import localFont from 'next/font/local';\n" +
      "\n" +
      "// Local font files\n" +
      "const customFont = localFont({\n" +
      "  src: [\n" +
      "    {\n" +
      "      path: './fonts/CustomFont-Regular.woff2',\n" +
      "      weight: '400',\n" +
      "      style: 'normal',\n" +
      "    },\n" +
      "    {\n" +
      "      path: './fonts/CustomFont-Bold.woff2',\n" +
      "      weight: '700',\n" +
      "      style: 'normal',\n" +
      "    },\n" +
      "  ],\n" +
      "  variable: '--font-custom',\n" +
      "  display: 'swap',\n" +
      "});\n" +
      "\n" +
      "// Usage\n" +
      "function CustomFontComponent() {\n" +
      "  return (\n" +
      "    <div className={customFont.className}>\n" +
      "      <h1>Custom Font Text</h1>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Font Display Strategies:**\n" +
      "```jsx\n" +
      "import { Inter } from 'next/font/google';\n" +
      "\n" +
      "// Different display strategies\n" +
      "const interSwap = Inter({\n" +
      "  subsets: ['latin'],\n" +
      "  display: 'swap', // Show fallback immediately, swap when loaded\n" +
      "});\n" +
      "\n" +
      "const interBlock = Inter({\n" +
      "  subsets: ['latin'],\n" +
      "  display: 'block', // Hide text until font loads\n" +
      "});\n" +
      "\n" +
      "const interFallback = Inter({\n" +
      "  subsets: ['latin'],\n" +
      "  display: 'fallback', // Show fallback briefly, then swap\n" +
      "});\n" +
      "\n" +
      "const interOptional = Inter({\n" +
      "  subsets: ['latin'],\n" +
      "  display: 'optional', // Use font only if already cached\n" +
      "});\n" +
      "```\n\n" +
      "**Advanced Font Configuration:**\n" +
      "```jsx\n" +
      "import { Inter, Roboto_Mono } from 'next/font/google';\n" +
      "\n" +
      "// Advanced configuration\n" +
      "const inter = Inter({\n" +
      "  subsets: ['latin', 'latin-ext'],\n" +
      "  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],\n" +
      "  style: ['normal', 'italic'],\n" +
      "  display: 'swap',\n" +
      "  variable: '--font-inter',\n" +
      "  preload: true, // Preload the font\n" +
      "  fallback: ['system-ui', 'arial'], // Fallback fonts\n" +
      "  adjustFontFallback: true, // Adjust fallback metrics\n" +
      "});\n" +
      "\n" +
      "const robotoMono = Roboto_Mono({\n" +
      "  subsets: ['latin'],\n" +
      "  weight: ['300', '400', '500', '700'],\n" +
      "  display: 'swap',\n" +
      "  variable: '--font-roboto-mono',\n" +
      "});\n" +
      "\n" +
      "// CSS variables usage\n" +
      "export default function Layout({ children }) {\n" +
      "  return (\n" +
      "    <html className={`${inter.variable} ${robotoMono.variable}`}>\n" +
      "      <body>\n" +
      "        <style jsx global>{`\n" +
      "          :root {\n" +
      "            --font-inter: ${inter.style.fontFamily};\n" +
      "            --font-roboto-mono: ${robotoMono.style.fontFamily};\n" +
      "          }\n" +
      "        `}</style>\n" +
      "        {children}\n" +
      "      </body>\n" +
      "    </html>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Font Preloading:**\n" +
      "```jsx\n" +
      "import Head from 'next/head';\n" +
      "import { Inter } from 'next/font/google';\n" +
      "\n" +
      "const inter = Inter({\n" +
      "  subsets: ['latin'],\n" +
      "  preload: true,\n" +
      "});\n" +
      "\n" +
      "function PageWithPreloadedFont() {\n" +
      "  return (\n" +
      "    <>\n" +
      "      <Head>\n" +
      "        {/* Additional font preloading */}\n" +
      "        <link\n" +
      "          rel='preload'\n" +
      "          href='/fonts/custom-font.woff2'\n" +
      "          as='font'\n" +
      "          type='font/woff2'\n" +
      "          crossOrigin='anonymous'\n" +
      "        />\n" +
      "      </Head>\n" +
      "      <div className={inter.className}>\n" +
      "        <h1>Preloaded Font Content</h1>\n" +
      "      </div>\n" +
      "    </>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Font Performance Optimization:**\n" +
      "```javascript\n" +
      "// next.config.js\n" +
      "const nextConfig = {\n" +
      "  // Font optimization settings\n" +
      "  experimental: {\n" +
      "    optimizeFonts: true,\n" +
      "  },\n" +
      "  \n" +
      "  // Headers for font caching\n" +
      "  async headers() {\n" +
      "    return [\n" +
      "      {\n" +
      "        source: '/fonts/:path*',\n" +
      "        headers: [\n" +
      "          {\n" +
      "            key: 'Cache-Control',\n" +
      "            value: 'public, max-age=31536000, immutable',\n" +
      "          },\n" +
      "        ],\n" +
      "      },\n" +
      "    ];\n" +
      "  },\n" +
      "};\n" +
      "```\n\n" +
      "**Font Loading Best Practices:**\n" +
      "- Use `display: 'swap'` for better UX\n" +
      "- Preload critical fonts\n" +
      "- Limit font weights and styles\n" +
      "- Use system fonts as fallbacks\n" +
      "- Implement font-display strategies\n" +
      "- Cache fonts with proper headers\n" +
      "- Monitor Core Web Vitals",
    category: "Performance",
    difficulty: "intermediate",
    tags: ["font-optimization", "google-fonts", "custom-fonts", "font-display", "performance"],
  },
  {
    id: 32,
    question:
      "What is Next.js Bundle Analysis? How do you analyze bundle size, identify optimization opportunities, and implement code splitting?",
    answer:
      "Next.js provides built-in bundle analysis tools to understand bundle composition, identify optimization opportunities, and implement effective code splitting.\n\n" +
      "**Bundle Analysis Setup:**\n" +
      "```bash\n" +
      "# Install bundle analyzer\n" +
      "npm install --save-dev @next/bundle-analyzer\n" +
      "\n" +
      "# Analyze bundle\n" +
      "ANALYZE=true npm run build\n" +
      "```\n\n" +
      "```javascript\n" +
      "// next.config.js\n" +
      "const withBundleAnalyzer = require('@next/bundle-analyzer')({\n" +
      "  enabled: process.env.ANALYZE === 'true',\n" +
      "});\n" +
      "\n" +
      "const nextConfig = {\n" +
      "  // Bundle analysis configuration\n" +
      "  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {\n" +
      "    // Custom webpack configuration\n" +
      "    if (!dev && !isServer) {\n" +
      "      config.optimization.splitChunks = {\n" +
      "        chunks: 'all',\n" +
      "        cacheGroups: {\n" +
      "          vendor: {\n" +
      "            test: /[\\\\/]node_modules[\\\\/]/,\n" +
      "            name: 'vendors',\n" +
      "            chunks: 'all',\n" +
      "          },\n" +
      "          common: {\n" +
      "            name: 'common',\n" +
      "            minChunks: 2,\n" +
      "            chunks: 'all',\n" +
      "            enforce: true,\n" +
      "          },\n" +
      "        },\n" +
      "      };\n" +
      "    }\n" +
      "    return config;\n" +
      "  },\n" +
      "};\n" +
      "\n" +
      "module.exports = withBundleAnalyzer(nextConfig);\n" +
      "```\n\n" +
      "**Dynamic Imports and Code Splitting:**\n" +
      "```jsx\n" +
      "import dynamic from 'next/dynamic';\n" +
      "import { Suspense } from 'react';\n" +
      "\n" +
      "// Dynamic import with loading component\n" +
      "const HeavyComponent = dynamic(() => import('./HeavyComponent'), {\n" +
      "  loading: () => <p>Loading...</p>,\n" +
      "  ssr: false, // Disable SSR for this component\n" +
      "});\n" +
      "\n" +
      "// Dynamic import with custom loading\n" +
      "const ChartComponent = dynamic(\n" +
      "  () => import('./ChartComponent'),\n" +
      "  {\n" +
      "    loading: () => <div className='animate-pulse bg-gray-200 h-64' />,\n" +
      "  }\n" +
      ");\n" +
      "\n" +
      "// Conditional dynamic import\n" +
      "const ConditionalComponent = dynamic(\n" +
      "  () => import('./ConditionalComponent'),\n" +
      "  {\n" +
      "    loading: () => <p>Loading conditional component...</p>,\n" +
      "  }\n" +
      ");\n" +
      "\n" +
      "function Page() {\n" +
      "  const [showChart, setShowChart] = useState(false);\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <h1>My Page</h1>\n" +
      "      \n" +
      "      {/* Always load heavy component */}\n" +
      "      <Suspense fallback={<div>Loading...</div>}>\n" +
      "        <HeavyComponent />\n" +
      "      </Suspense>\n" +
      "      \n" +
      "      {/* Conditionally load chart */}\n" +
      "      {showChart && (\n" +
      "        <Suspense fallback={<div>Loading chart...</div>}>\n" +
      "          <ChartComponent />\n" +
      "        </Suspense>\n" +
      "      )}\n" +
      "      \n" +
      "      <button onClick={() => setShowChart(!showChart)}>\n" +
      "        Toggle Chart\n" +
      "      </button>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Route-Based Code Splitting:**\n" +
      "```jsx\n" +
      "// pages/_app.js or app/layout.js\n" +
      "import dynamic from 'next/dynamic';\n" +
      "\n" +
      "// Split admin components\n" +
      "const AdminPanel = dynamic(() => import('../components/AdminPanel'), {\n" +
      "  loading: () => <div>Loading admin panel...</div>,\n" +
      "});\n" +
      "\n" +
      "// Split dashboard components\n" +
      "const Dashboard = dynamic(() => import('../components/Dashboard'), {\n" +
      "  loading: () => <div>Loading dashboard...</div>,\n" +
      "});\n" +
      "\n" +
      "function App({ Component, pageProps }) {\n" +
      "  return (\n" +
      "    <div>\n" +
      "      <Component {...pageProps} />\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Library Code Splitting:**\n" +
      "```jsx\n" +
      "// Split large libraries\n" +
      "const loadLodash = () => import('lodash');\n" +
      "const loadMoment = () => import('moment');\n" +
      "\n" +
      "// Use dynamic imports for libraries\n" +
      "async function processData(data) {\n" +
      "  const { debounce } = await loadLodash();\n" +
      "  return debounce(data, 300);\n" +
      "}\n" +
      "\n" +
      "// Component with library splitting\n" +
      "function DataProcessor() {\n" +
      "  const [processedData, setProcessedData] = useState(null);\n" +
      "  \n" +
      "  useEffect(() => {\n" +
      "    const processData = async () => {\n" +
      "      const { debounce } = await import('lodash');\n" +
      "      const result = debounce(rawData, 300);\n" +
      "      setProcessedData(result);\n" +
      "    };\n" +
      "    \n" +
      "    processData();\n" +
      "  }, []);\n" +
      "  \n" +
      "  return <div>{processedData}</div>;\n" +
      "}\n" +
      "```\n\n" +
      "**Bundle Optimization Strategies:**\n" +
      "```javascript\n" +
      "// next.config.js - Advanced optimization\n" +
      "const nextConfig = {\n" +
      "  // Enable SWC minification\n" +
      "  swcMinify: true,\n" +
      "  \n" +
      "  // Compress output\n" +
      "  compress: true,\n" +
      "  \n" +
      "  // Webpack optimization\n" +
      "  webpack: (config, { dev, isServer }) => {\n" +
      "    if (!dev && !isServer) {\n" +
      "      // Tree shaking optimization\n" +
      "      config.optimization.usedExports = true;\n" +
      "      config.optimization.sideEffects = false;\n" +
      "      \n" +
      "      // Bundle splitting\n" +
      "      config.optimization.splitChunks = {\n" +
      "        chunks: 'all',\n" +
      "        cacheGroups: {\n" +
      "          // Framework chunks\n" +
      "          framework: {\n" +
      "            test: /[\\\\/]node_modules[\\\\/](react|react-dom)[\\\\/]/,\n" +
      "            name: 'framework',\n" +
      "            chunks: 'all',\n" +
      "            priority: 40,\n" +
      "          },\n" +
      "          // UI library chunks\n" +
      "          ui: {\n" +
      "            test: /[\\\\/]node_modules[\\\\/](@mui|antd|chakra-ui)[\\\\/]/,\n" +
      "            name: 'ui-libs',\n" +
      "            chunks: 'all',\n" +
      "            priority: 30,\n" +
      "          },\n" +
      "          // Utility chunks\n" +
      "          utils: {\n" +
      "            test: /[\\\\/]node_modules[\\\\/](lodash|moment|date-fns)[\\\\/]/,\n" +
      "            name: 'utils',\n" +
      "            chunks: 'all',\n" +
      "            priority: 20,\n" +
      "          },\n" +
      "          // Common chunks\n" +
      "          common: {\n" +
      "            name: 'common',\n" +
      "            minChunks: 2,\n" +
      "            chunks: 'all',\n" +
      "            priority: 10,\n" +
      "            enforce: true,\n" +
      "          },\n" +
      "        },\n" +
      "      };\n" +
      "    }\n" +
      "    return config;\n" +
      "  },\n" +
      "};\n" +
      "```\n\n" +
      "**Bundle Analysis Tools:**\n" +
      "```bash\n" +
      "# Webpack Bundle Analyzer\n" +
      "npm install --save-dev webpack-bundle-analyzer\n" +
      "\n" +
      "# Source Map Explorer\n" +
      "npm install --save-dev source-map-explorer\n" +
      "\n" +
      "# Analyze bundle\n" +
      "npx source-map-explorer 'dist/static/chunks/*.js'\n" +
      "```\n\n" +
      "**Performance Monitoring:**\n" +
      "```jsx\n" +
      "// Bundle size monitoring\n" +
      "function BundleSizeMonitor() {\n" +
      "  useEffect(() => {\n" +
      "    // Monitor bundle loading performance\n" +
      "    const observer = new PerformanceObserver((list) => {\n" +
      "      list.getEntries().forEach((entry) => {\n" +
      "        if (entry.entryType === 'resource') {\n" +
      "          console.log(`Bundle loaded: ${entry.name}, Size: ${entry.transferSize}`);\n" +
      "        }\n" +
      "      });\n" +
      "    });\n" +
      "    \n" +
      "    observer.observe({ entryTypes: ['resource'] });\n" +
      "    \n" +
      "    return () => observer.disconnect();\n" +
      "  }, []);\n" +
      "  \n" +
      "  return null;\n" +
      "}\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Use dynamic imports for large components\n" +
      "- Implement proper loading states\n" +
      "- Split vendor libraries separately\n" +
      "- Monitor bundle size regularly\n" +
      "- Use tree shaking effectively\n" +
      "- Implement lazy loading for routes\n" +
      "- Optimize images and fonts",
    category: "Performance",
    difficulty: "advanced",
    tags: ["bundle-analysis", "code-splitting", "dynamic-imports", "webpack", "optimization"],
  },
  {
    id: 33,
    question:
      "What is Next.js Middleware? How do you implement authentication, redirects, and request/response manipulation?",
    answer:
      "Next.js Middleware allows you to run code before a request is completed, enabling authentication, redirects, and request/response manipulation.\n\n" +
      "**Basic Middleware Setup:**\n" +
      "```javascript\n" +
      "// middleware.js\n" +
      "import { NextResponse } from 'next/server';\n" +
      "\n" +
      "export function middleware(request) {\n" +
      "  // Get the pathname\n" +
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
      "}\n" +
      "\n" +
      "// Configure which paths the middleware should run on\n" +
      "export const config = {\n" +
      "  matcher: [\n" +
      "    '/dashboard/:path*',\n" +
      "    '/admin/:path*',\n" +
      "    '/api/protected/:path*'\n" +
      "  ]\n" +
      "};\n" +
      "```\n\n" +
      "**Authentication Middleware:**\n" +
      "```javascript\n" +
      "// middleware.js\n" +
      "import { NextResponse } from 'next/server';\n" +
      "import { verifyToken } from './lib/auth';\n" +
      "\n" +
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
      "    // Add user info to headers\n" +
      "    const requestHeaders = new Headers(request.headers);\n" +
      "    requestHeaders.set('x-user-id', user.id);\n" +
      "    requestHeaders.set('x-user-role', user.role);\n" +
      "    \n" +
      "    // Check role-based access\n" +
      "    if (pathname.startsWith('/admin') && user.role !== 'admin') {\n" +
      "      return NextResponse.redirect(new URL('/unauthorized', request.url));\n" +
      "    }\n" +
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
      "\n" +
      "export const config = {\n" +
      "  matcher: [\n" +
      "    '/((?!api|_next/static|_next/image|favicon.ico).*)',\n" +
      "  ],\n" +
      "};\n" +
      "```\n\n" +
      "**Request/Response Manipulation:**\n" +
      "```javascript\n" +
      "// middleware.js\n" +
      "import { NextResponse } from 'next/server';\n" +
      "\n" +
      "export function middleware(request) {\n" +
      "  const { pathname } = request.nextUrl;\n" +
      "  \n" +
      "  // Add custom headers\n" +
      "  const requestHeaders = new Headers(request.headers);\n" +
      "  requestHeaders.set('x-custom-header', 'custom-value');\n" +
      "  requestHeaders.set('x-request-time', new Date().toISOString());\n" +
      "  \n" +
      "  // Modify the request\n" +
      "  const response = NextResponse.next({\n" +
      "    request: {\n" +
      "      headers: requestHeaders,\n" +
      "    },\n" +
      "  });\n" +
      "  \n" +
      "  // Add response headers\n" +
      "  response.headers.set('x-response-time', new Date().toISOString());\n" +
      "  response.headers.set('x-custom-response', 'response-value');\n" +
      "  \n" +
      "  // Add security headers\n" +
      "  response.headers.set('X-Frame-Options', 'DENY');\n" +
      "  response.headers.set('X-Content-Type-Options', 'nosniff');\n" +
      "  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');\n" +
      "  \n" +
      "  return response;\n" +
      "}\n" +
      "```\n\n" +
      "**Redirects and Rewrites:**\n" +
      "```javascript\n" +
      "// middleware.js\n" +
      "import { NextResponse } from 'next/server';\n" +
      "\n" +
      "export function middleware(request) {\n" +
      "  const { pathname } = request.nextUrl;\n" +
      "  \n" +
      "  // Redirect old URLs to new ones\n" +
      "  if (pathname === '/old-page') {\n" +
      "    return NextResponse.redirect(new URL('/new-page', request.url));\n" +
      "  }\n" +
      "  \n" +
      "  // Rewrite URLs (internal redirect)\n" +
      "  if (pathname.startsWith('/api/v1')) {\n" +
      "    const newUrl = new URL(request.url);\n" +
      "    newUrl.pathname = pathname.replace('/api/v1', '/api/v2');\n" +
      "    return NextResponse.rewrite(newUrl);\n" +
      "  }\n" +
      "  \n" +
      "  // Conditional redirects\n" +
      "  if (pathname === '/dashboard' && request.nextUrl.searchParams.get('version') === 'old') {\n" +
      "    return NextResponse.redirect(new URL('/dashboard-v1', request.url));\n" +
      "  }\n" +
      "  \n" +
      "  return NextResponse.next();\n" +
      "}\n" +
      "```\n\n" +
      "**Rate Limiting Middleware:**\n" +
      "```javascript\n" +
      "// middleware.js\n" +
      "import { NextResponse } from 'next/server';\n" +
      "\n" +
      "// Simple in-memory rate limiting\n" +
      "const rateLimitMap = new Map();\n" +
      "\n" +
      "export function middleware(request) {\n" +
      "  const { pathname } = request.nextUrl;\n" +
      "  \n" +
      "  // Apply rate limiting to API routes\n" +
      "  if (pathname.startsWith('/api/')) {\n" +
      "    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';\n" +
      "    const now = Date.now();\n" +
      "    const windowMs = 60 * 1000; // 1 minute\n" +
      "    const maxRequests = 100; // Max 100 requests per minute\n" +
      "    \n" +
      "    if (!rateLimitMap.has(ip)) {\n" +
      "      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });\n" +
      "    } else {\n" +
      "      const rateLimit = rateLimitMap.get(ip);\n" +
      "      \n" +
      "      if (now > rateLimit.resetTime) {\n" +
      "        // Reset the counter\n" +
      "        rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });\n" +
      "      } else if (rateLimit.count >= maxRequests) {\n" +
      "        // Rate limit exceeded\n" +
      "        return new NextResponse('Too Many Requests', { status: 429 });\n" +
      "      } else {\n" +
      "        // Increment the counter\n" +
      "        rateLimit.count++;\n" +
      "      }\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  return NextResponse.next();\n" +
      "}\n" +
      "```\n\n" +
      "**A/B Testing Middleware:**\n" +
      "```javascript\n" +
      "// middleware.js\n" +
      "import { NextResponse } from 'next/server';\n" +
      "\n" +
      "export function middleware(request) {\n" +
      "  const { pathname } = request.nextUrl;\n" +
      "  \n" +
      "  // A/B test for homepage\n" +
      "  if (pathname === '/') {\n" +
      "    const userId = request.cookies.get('user-id')?.value;\n" +
      "    \n" +
      "    if (!userId) {\n" +
      "      // Generate a random user ID\n" +
      "      const newUserId = Math.random().toString(36).substring(7);\n" +
      "      \n" +
      "      // Assign to A or B group\n      " +
      "      const group = Math.random() < 0.5 ? 'A' : 'B';\n" +
      "      \n" +
      "      const response = NextResponse.next();\n" +
      "      response.cookies.set('user-id', newUserId);\n" +
      "      response.cookies.set('ab-group', group);\n" +
      "      \n" +
      "      return response;\n" +
      "    }\n" +
      "    \n" +
      "    const group = request.cookies.get('ab-group')?.value;\n" +
      "    \n" +
      "    if (group === 'B') {\n" +
      "      // Redirect to variant B\n" +
      "      return NextResponse.rewrite(new URL('/homepage-variant-b', request.url));\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  return NextResponse.next();\n" +
      "}\n" +
      "```\n\n" +
      "**Middleware Configuration:**\n" +
      "```javascript\n" +
      "// middleware.js\n" +
      "import { NextResponse } from 'next/server';\n" +
      "\n" +
      "export function middleware(request) {\n" +
      "  // Your middleware logic here\n" +
      "  return NextResponse.next();\n" +
      "}\n" +
      "\n" +
      "// Configure which paths the middleware should run on\n" +
      "export const config = {\n" +
      "  matcher: [\n" +
      "    // Match all request paths except for the ones starting with:\n" +
      "    // - api (API routes)\n" +
      "    // - _next/static (static files)\n" +
      "    // - _next/image (image optimization files)\n" +
      "    // - favicon.ico (favicon file)\n" +
      "    '/((?!api|_next/static|_next/image|favicon.ico).*)',\n" +
      "    \n" +
      "    // Or match specific paths\n      " +
      "    '/dashboard/:path*',\n" +
      "    '/admin/:path*',\n" +
      "    '/api/protected/:path*'\n" +
      "  ]\n" +
      "};\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Keep middleware lightweight and fast\n" +
      "- Use proper error handling\n" +
      "- Implement proper logging\n" +
      "- Use environment variables for configuration\n" +
      "- Test middleware thoroughly\n" +
      "- Consider performance impact\n" +
      "- Use proper TypeScript types",
    category: "Middleware",
    difficulty: "intermediate",
    tags: ["middleware", "authentication", "redirects", "rate-limiting", "ab-testing"],
  },
  {
    id: 34,
    question:
      "What is Next.js API Routes? How do you implement RESTful APIs, handle different HTTP methods, and manage API middleware?",
    answer:
      "Next.js API Routes provide a way to build API endpoints within your Next.js application, handling server-side logic and data processing.\n\n" +
      "**Basic API Route Setup:**\n" +
      "```javascript\n" +
      "// pages/api/users.js or app/api/users/route.js\n" +
      "export default function handler(req, res) {\n" +
      "  if (req.method === 'GET') {\n" +
      "    // Handle GET request\n" +
      "    res.status(200).json({ users: [] });\n" +
      "  } else if (req.method === 'POST') {\n" +
      "    // Handle POST request\n" +
      "    const { name, email } = req.body;\n" +
      "    res.status(201).json({ message: 'User created', user: { name, email } });\n" +
      "  } else {\n" +
      "    // Method not allowed\n" +
      "    res.setHeader('Allow', ['GET', 'POST']);\n" +
      "    res.status(405).end(`Method ${req.method} Not Allowed`);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**App Router API Routes:**\n" +
      "```javascript\n" +
      "// app/api/users/route.js\n" +
      "import { NextRequest, NextResponse } from 'next/server';\n" +
      "\n" +
      "export async function GET(request) {\n" +
      "  try {\n" +
      "    const users = await fetchUsers();\n" +
      "    return NextResponse.json({ users });\n" +
      "  } catch (error) {\n" +
      "    return NextResponse.json(\n" +
      "      { error: 'Failed to fetch users' },\n" +
      "      { status: 500 }\n" +
      "    );\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "export async function POST(request) {\n" +
      "  try {\n" +
      "    const body = await request.json();\n" +
      "    const { name, email } = body;\n" +
      "    \n" +
      "    // Validate input\n" +
      "    if (!name || !email) {\n" +
      "      return NextResponse.json(\n" +
      "        { error: 'Name and email are required' },\n" +
      "        { status: 400 }\n" +
      "      );\n" +
      "    }\n" +
      "    \n" +
      "    const user = await createUser({ name, email });\n" +
      "    return NextResponse.json({ user }, { status: 201 });\n" +
      "  } catch (error) {\n" +
      "    return NextResponse.json(\n" +
      "      { error: 'Failed to create user' },\n" +
      "      { status: 500 }\n" +
      "    );\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Dynamic API Routes:**\n" +
      "```javascript\n" +
      "// pages/api/users/[id].js or app/api/users/[id]/route.js\n" +
      "export default function handler(req, res) {\n" +
      "  const { id } = req.query;\n" +
      "  \n" +
      "  switch (req.method) {\n" +
      "    case 'GET':\n" +
      "      // Get user by ID\n" +
      "      const user = getUserById(id);\n" +
      "      if (!user) {\n" +
      "        return res.status(404).json({ error: 'User not found' });\n" +
      "      }\n" +
      "      res.status(200).json({ user });\n" +
      "      break;\n" +
      "      \n" +
      "    case 'PUT':\n" +
      "      // Update user\n      " +
      "      const { name, email } = req.body;\n" +
      "      const updatedUser = updateUser(id, { name, email });\n" +
      "      res.status(200).json({ user: updatedUser });\n" +
      "      break;\n" +
      "      \n" +
      "    case 'DELETE':\n" +
      "      // Delete user\n      " +
      "      deleteUser(id);\n" +
      "      res.status(204).end();\n" +
      "      break;\n" +
      "      \n" +
      "    default:\n" +
      "      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);\n" +
      "      res.status(405).end(`Method ${req.method} Not Allowed`);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**API Middleware:**\n" +
      "```javascript\n" +
      "// pages/api/protected/route.js\n" +
      "import { verifyToken } from '../../lib/auth';\n" +
      "\n" +
      "export default async function handler(req, res) {\n" +
      "  // Authentication middleware\n" +
      "  const token = req.headers.authorization?.replace('Bearer ', '');\n" +
      "  \n" +
      "  if (!token) {\n" +
      "    return res.status(401).json({ error: 'No token provided' });\n" +
      "  }\n" +
      "  \n" +
      "  try {\n" +
      "    const user = await verifyToken(token);\n" +
      "    req.user = user; // Add user to request\n" +
      "  } catch (error) {\n" +
      "    return res.status(401).json({ error: 'Invalid token' });\n" +
      "  }\n" +
      "  \n" +
      "  // Rate limiting middleware\n" +
      "  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;\n" +
      "  const rateLimitKey = `rate_limit_${ip}`;\n" +
      "  \n" +
      "  // Check rate limit (implement with Redis or similar)\n      " +
      "  const rateLimit = await checkRateLimit(rateLimitKey);\n" +
      "  if (!rateLimit.allowed) {\n" +
      "    return res.status(429).json({ error: 'Rate limit exceeded' });\n" +
      "  }\n" +
      "  \n" +
      "  // CORS middleware\n" +
      "  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');\n" +
      "  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');\n" +
      "  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');\n" +
      "  \n" +
      "  // Handle preflight requests\n      " +
      "  if (req.method === 'OPTIONS') {\n" +
      "    return res.status(200).end();\n" +
      "  }\n" +
      "  \n" +
      "  // Your API logic here\n      " +
      "  res.status(200).json({ message: 'Protected resource accessed' });\n" +
      "}\n" +
      "```\n\n" +
      "**Error Handling:**\n" +
      "```javascript\n" +
      "// pages/api/error-handling.js\n" +
      "export default async function handler(req, res) {\n" +
      "  try {\n" +
      "    // Simulate an error\n      " +
      "    if (req.query.error === 'true') {\n" +
      "      throw new Error('Something went wrong');\n" +
      "    }\n" +
      "    \n" +
      "    res.status(200).json({ message: 'Success' });\n" +
      "  } catch (error) {\n" +
      "    console.error('API Error:', error);\n" +
      "    \n" +
      "    // Log error to monitoring service\n      " +
      "    await logError(error, req);\n" +
      "    \n" +
      "    // Return appropriate error response\n      " +
      "    res.status(500).json({\n" +
      "      error: 'Internal server error',\n" +
      "      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'\n" +
      "    });\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Request Validation:**\n" +
      "```javascript\n" +
      "// pages/api/validate.js\n" +
      "import Joi from 'joi';\n" +
      "\n" +
      "const userSchema = Joi.object({\n" +
      "  name: Joi.string().min(2).max(50).required(),\n" +
      "  email: Joi.string().email().required(),\n" +
      "  age: Joi.number().integer().min(0).max(120).optional()\n" +
      "});\n" +
      "\n" +
      "export default function handler(req, res) {\n" +
      "  if (req.method !== 'POST') {\n" +
      "    return res.status(405).json({ error: 'Method not allowed' });\n" +
      "  }\n" +
      "  \n" +
      "  // Validate request body\n      " +
      "  const { error, value } = userSchema.validate(req.body);\n" +
      "  \n" +
      "  if (error) {\n" +
      "    return res.status(400).json({\n" +
      "      error: 'Validation failed',\n" +
      "      details: error.details.map(detail => detail.message)\n" +
      "    });\n" +
      "  }\n" +
      "  \n" +
      "  // Process validated data\n      " +
      "  res.status(200).json({ message: 'User validated', user: value });\n" +
      "}\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Use proper HTTP status codes\n" +
      "- Implement input validation\n" +
      "- Handle errors gracefully\n" +
      "- Use TypeScript for type safety\n" +
      "- Implement proper logging\n" +
      "- Use environment variables for configuration\n" +
      "- Implement rate limiting\n" +
      "- Use proper CORS settings",
    category: "API Routes",
    difficulty: "intermediate",
    tags: ["api-routes", "restful", "http-methods", "middleware", "validation"],
  },
  {
    id: 35,
    question:
      "What is Next.js Edge Runtime? How do you implement Edge Functions, Edge Middleware, and optimize for global performance?",
    answer:
      "Next.js Edge Runtime provides a lightweight JavaScript runtime optimized for edge computing, enabling faster response times and global distribution.\n\n" +
      "**Edge Runtime Features:**\n" +
      "```javascript\n" +
      "// Edge Runtime limitations and capabilities\n" +
      "const edgeRuntimeInfo = {\n" +
      "  // Available APIs\n      " +
      "  available: [\n" +
      "    'fetch',\n" +
      "    'Request',\n" +
      "    'Response',\n" +
      "    'Headers',\n" +
      "    'URL',\n" +
      "    'crypto',\n" +
      "    'TextEncoder',\n      " +
      "    'TextDecoder'\n" +
      "  ],\n" +
      "  \n" +
      "  // Not available\n      " +
      "  unavailable: [\n" +
      "    'fs',\n" +
      "    'path',\n" +
      "    'os',\n" +
      "    'child_process',\n" +
      "    'Node.js APIs'\n" +
      "  ],\n" +
      "  \n" +
      "  // Performance benefits\n      " +
      "  benefits: [\n" +
      "    'Faster cold starts',\n" +
      "    'Lower memory usage',\n" +
      "    'Global distribution',\n" +
      "    'Reduced latency'\n" +
      "  ]\n" +
      "};\n" +
      "```\n\n" +
      "**Edge API Routes:**\n" +
      "```javascript\n" +
      "// app/api/edge-example/route.js\n" +
      "import { NextRequest, NextResponse } from 'next/server';\n" +
      "\n" +
      "// Configure as Edge Runtime\n      " +
      "export const runtime = 'edge';\n" +
      "\n" +
      "export async function GET(request) {\n" +
      "  // Get user's location from headers\n      " +
      "  const country = request.geo?.country || 'US';\n" +
      "  const city = request.geo?.city || 'Unknown';\n" +
      "  \n" +
      "  // Get user agent\n      " +
      "  const userAgent = request.headers.get('user-agent') || '';\n" +
      "  \n" +
      "  // Process request with edge-specific logic\n      " +
      "  const response = {\n" +
      "    message: 'Hello from Edge Runtime!',\n" +
      "    location: { country, city },\n" +
      "    userAgent,\n" +
      "    timestamp: new Date().toISOString(),\n" +
      "    runtime: 'edge'\n" +
      "  };\n" +
      "  \n" +
      "  return NextResponse.json(response);\n" +
      "}\n" +
      "\n" +
      "export async function POST(request) {\n" +
      "  try {\n" +
      "    const body = await request.json();\n" +
      "    \n" +
      "    // Process data with edge-optimized logic\n      " +
      "    const processedData = processData(body);\n" +
      "    \n" +
      "    return NextResponse.json({ processedData });\n" +
      "  } catch (error) {\n" +
      "    return NextResponse.json(\n" +
      "      { error: 'Processing failed' },\n" +
      "      { status: 500 }\n" +
      "    );\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "function processData(data) {\n" +
      "  // Edge-optimized data processing\n      " +
      "  return {\n" +
      "    ...data,\n" +
      "    processedAt: new Date().toISOString(),\n" +
      "    edgeProcessed: true\n" +
      "  };\n" +
      "}\n" +
      "```\n\n" +
      "**Edge Middleware:**\n" +
      "```javascript\n" +
      "// middleware.js\n" +
      "import { NextResponse } from 'next/server';\n" +
      "\n" +
      "export function middleware(request) {\n" +
      "  // Edge middleware runs at the edge\n      " +
      "  const { pathname } = request.nextUrl;\n" +
      "  \n" +
      "  // Geo-based routing\n      " +
      "  const country = request.geo?.country;\n" +
      "  \n" +
      "  if (country === 'CN') {\n" +
      "    // Redirect Chinese users to Chinese version\n      " +
      "    return NextResponse.redirect(new URL('/zh' + pathname, request.url));\n" +
      "  }\n" +
      "  \n" +
      "  // A/B testing at the edge\n      " +
      "  if (pathname === '/') {\n      " +
      "    const abTest = request.cookies.get('ab-test')?.value;\n" +
      "    \n" +
      "    if (!abTest) {\n" +
      "      const variant = Math.random() < 0.5 ? 'A' : 'B';\n" +
      "      const response = NextResponse.next();\n" +
      "      response.cookies.set('ab-test', variant);\n" +
      "      \n" +
      "      if (variant === 'B') {\n" +
      "        return NextResponse.rewrite(new URL('/variant-b', request.url));\n" +
      "      }\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  // Add edge-specific headers\n      " +
      "  const response = NextResponse.next();\n" +
      "  response.headers.set('x-edge-location', request.geo?.city || 'Unknown');\n" +
      "  response.headers.set('x-edge-country', request.geo?.country || 'Unknown');\n" +
      "  \n" +
      "  return response;\n" +
      "}\n" +
      "\n" +
      "export const config = {\n" +
      "  matcher: [\n" +
      "    '/((?!api|_next/static|_next/image|favicon.ico).*)',\n" +
      "  ],\n" +
      "};\n" +
      "```\n\n" +
      "**Edge Functions with External APIs:**\n" +
      "```javascript\n" +
      "// app/api/weather/route.js\n" +
      "import { NextRequest, NextResponse } from 'next/server';\n" +
      "\n" +
      "export const runtime = 'edge';\n" +
      "\n" +
      "export async function GET(request) {\n" +
      "  const { searchParams } = new URL(request.url);\n" +
      "  const city = searchParams.get('city') || 'London';\n" +
      "  \n" +
      "  try {\n" +
      "    // Fetch weather data from external API\n      " +
      "    const weatherResponse = await fetch(\n" +
      "      `https://api.weather.com/v1/current?city=${city}&key=${process.env.WEATHER_API_KEY}`,\n" +
      "      {\n" +
      "        headers: {\n" +
      "          'User-Agent': 'Next.js Edge Function'\n" +
      "        }\n" +
      "      }\n" +
      "    );\n" +
      "    \n" +
      "    if (!weatherResponse.ok) {\n" +
      "      throw new Error('Weather API request failed');\n" +
      "    }\n" +
      "    \n" +
      "    const weatherData = await weatherResponse.json();\n" +
      "    \n" +
      "    // Process and return data\n      " +
      "    return NextResponse.json({\n" +
      "      city,\n" +
      "      weather: weatherData,\n" +
      "      processedAt: new Date().toISOString(),\n" +
      "      edgeLocation: request.geo?.city\n" +
      "    });\n" +
      "  } catch (error) {\n" +
      "    return NextResponse.json(\n" +
      "      { error: 'Failed to fetch weather data' },\n" +
      "      { status: 500 }\n" +
      "    );\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Edge Caching Strategy:**\n" +
      "```javascript\n" +
      "// app/api/cached-data/route.js\n" +
      "import { NextRequest, NextResponse } from 'next/server';\n" +
      "\n" +
      "export const runtime = 'edge';\n" +
      "\n" +
      "export async function GET(request) {\n" +
      "  const { searchParams } = new URL(request.url);\n" +
      "  const cacheKey = searchParams.get('key');\n" +
      "  \n" +
      "  if (!cacheKey) {\n" +
      "    return NextResponse.json(\n" +
      "      { error: 'Cache key required' },\n" +
      "      { status: 400 }\n" +
      "    );\n" +
      "  }\n" +
      "  \n" +
      "  try {\n" +
      "    // Fetch data from external source\n      " +
      "    const dataResponse = await fetch(`https://api.example.com/data/${cacheKey}`);\n" +
      "    const data = await dataResponse.json();\n" +
      "    \n" +
      "    // Create response with caching headers\n      " +
      "    const response = NextResponse.json(data);\n" +
      "    \n" +
      "    // Set cache headers for edge caching\n      " +
      "    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');\n" +
      "    response.headers.set('CDN-Cache-Control', 'public, s-maxage=300');\n" +
      "    \n" +
      "    return response;\n" +
      "  } catch (error) {\n" +
      "    return NextResponse.json(\n" +
      "      { error: 'Failed to fetch data' },\n" +
      "      { status: 500 }\n" +
      "    );\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Edge Runtime Configuration:**\n" +
      "```javascript\n" +
      "// next.config.js\n" +
      "const nextConfig = {\n" +
      "  // Enable Edge Runtime for specific routes\n      " +
      "  experimental: {\n" +
      "    runtime: 'edge',\n" +
      "  },\n" +
      "  \n" +
      "  // Edge-specific configuration\n      " +
      "  async headers() {\n" +
      "    return [\n" +
      "      {\n" +
      "        source: '/api/edge/:path*',\n" +
      "        headers: [\n" +
      "          {\n" +
      "            key: 'Cache-Control',\n" +
      "            value: 'public, s-maxage=300, stale-while-revalidate=600',\n" +
      "          },\n" +
      "        ],\n" +
      "      },\n" +
      "    ];\n" +
      "  },\n" +
      "};\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Use Edge Runtime for simple, fast operations\n" +
      "- Avoid Node.js-specific APIs\n" +
      "- Implement proper error handling\n" +
      "- Use edge caching effectively\n" +
      "- Monitor edge function performance\n" +
      "- Test edge functions thoroughly\n" +
      "- Consider global distribution benefits",
    category: "Edge Runtime",
    difficulty: "advanced",
    tags: ["edge-runtime", "edge-functions", "edge-middleware", "global-performance", "caching"],
  },
  {
    id: 36,
    question:
      "What is Next.js Streaming SSR? How do you implement React 18 Streaming, Suspense boundaries, and progressive loading?",
    answer:
      "Next.js Streaming SSR enables progressive rendering of pages, allowing users to see content as it becomes available rather than waiting for the entire page to load.\n\n" +
      "**Streaming SSR Basics:**\n" +
      "```jsx\n" +
      "// app/page.js\n" +
      "import { Suspense } from 'react';\n" +
      "import { getData } from './lib/data';\n" +
      "\n" +
      "// This component will stream\n      " +
      "async function StreamingComponent() {\n" +
      "  const data = await getData(); // This takes time\n      " +
      "  return (\n" +
      "    <div>\n" +
      "      <h2>Streamed Content</h2>\n" +
      "      <p>{data.message}</p>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "\n" +
      "// Loading component\n      " +
      "function LoadingComponent() {\n" +
      "  return (\n" +
      "    <div className='animate-pulse'>\n" +
      "      <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>\n" +
      "      <div className='h-4 bg-gray-200 rounded w-1/2'></div>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "\n" +
      "export default function Page() {\n" +
      "  return (\n" +
      "    <div>\n" +
      "      <h1>My Page</h1>\n" +
      "      \n" +
      "      {/* This will stream */}\n      " +
      "      <Suspense fallback={<LoadingComponent />}>\n" +
      "        <StreamingComponent />\n" +
      "      </Suspense>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Multiple Streaming Components:**\n" +
      "```jsx\n" +
      "// app/page.js\n      " +
      "import { Suspense } from 'react';\n" +
      "\n" +
      "// Fast component\n      " +
      "async function FastComponent() {\n" +
      "  const data = await getFastData();\n      " +
      "  return <div>Fast: {data.message}</div>;\n" +
      "}\n" +
      "\n" +
      "// Slow component\n      " +
      "async function SlowComponent() {\n" +
      "  const data = await getSlowData();\n      " +
      "  return <div>Slow: {data.message}</div>;\n" +
      "}\n" +
      "\n" +
      "// Very slow component\n      " +
      "async function VerySlowComponent() {\n" +
      "  const data = await getVerySlowData();\n      " +
      "  return <div>Very Slow: {data.message}</div>;\n" +
      "}\n" +
      "\n" +
      "export default function Page() {\n" +
      "  return (\n" +
      "    <div>\n" +
      "      <h1>Streaming Page</h1>\n      " +
      "      \n" +
      "      {/* These will stream independently */}\n      " +
      "      <Suspense fallback={<div>Loading fast...</div>}>\n" +
      "        <FastComponent />\n" +
      "      </Suspense>\n      " +
      "      \n" +
      "      <Suspense fallback={<div>Loading slow...</div>}>\n" +
      "        <SlowComponent />\n" +
      "      </Suspense>\n      " +
      "      \n" +
      "      <Suspense fallback={<div>Loading very slow...</div>}>\n" +
      "        <VerySlowComponent />\n" +
      "      </Suspense>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Streaming with Error Boundaries:**\n" +
      "```jsx\n" +
      "// app/page.js\n      " +
      "import { Suspense } from 'react';\n      " +
      "import { ErrorBoundary } from 'react-error-boundary';\n" +
      "\n" +
      "// Component that might fail\n      " +
      "async function RiskyComponent() {\n" +
      "  const data = await getRiskyData();\n      " +
      "  if (Math.random() < 0.5) {\n" +
      "    throw new Error('Random failure');\n      " +
      "  }\n      " +
      "  return <div>Success: {data.message}</div>;\n" +
      "}\n      " +
      "\n" +
      "// Error fallback\n      " +
      "function ErrorFallback({ error, resetErrorBoundary }) {\n      " +
      "  return (\n" +
      "    <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>\n      " +
      "      <h3>Something went wrong:</h3>\n      " +
      "      <p>{error.message}</p>\n      " +
      "      <button onClick={resetErrorBoundary} className='mt-2 bg-red-500 text-white px-4 py-2 rounded'>\n      " +
      "        Try again\n      " +
      "      </button>\n      " +
      "    </div>\n      " +
      "  );\n      " +
      "}\n      " +
      "\n" +
      "export default function Page() {\n      " +
      "  return (\n" +
      "    <div>\n      " +
      "      <h1>Streaming with Error Handling</h1>\n      " +
      "      \n" +
      "      <ErrorBoundary FallbackComponent={ErrorFallback}>\n      " +
      "        <Suspense fallback={<div>Loading...</div>}>\n      " +
      "          <RiskyComponent />\n      " +
      "        </Suspense>\n      " +
      "      </ErrorBoundary>\n      " +
      "    </div>\n      " +
      "  );\n      " +
      "}\n      " +
      "```\n\n" +
      "**Streaming Configuration:**\n      " +
      "```javascript\n      " +
      "// next.config.js\n      " +
      "const nextConfig = {\n      " +
      "  // Enable streaming SSR\n      " +
      "  experimental: {\n      " +
      "    streaming: true,\n      " +
      "  },\n      " +
      "  \n      " +
      "  // Configure streaming behavior\n      " +
      "  async headers() {\n      " +
      "    return [\n      " +
      "      {\n      " +
      "        source: '/streaming/:path*',\n      " +
      "        headers: [\n      " +
      "          {\n      " +
      "            key: 'Cache-Control',\n      " +
      "            value: 'public, s-maxage=300, stale-while-revalidate=600',\n      " +
      "          },\n      " +
      "        ],\n      " +
      "      },\n      " +
      "    ];\n      " +
      "  },\n      " +
      "};\n      " +
      "```\n\n" +
      "**Best Practices:**\n      " +
      "- Use Suspense boundaries effectively\n      " +
      "- Implement proper error handling\n      " +
      "- Use loading states that match content\n      " +
      "- Test streaming behavior\n      " +
      "- Monitor streaming performance\n      " +
      "- Consider user experience\n      " +
      "- Use progressive enhancement",
    category: "Streaming SSR",
    difficulty: "advanced",
    tags: ["streaming-ssr", "react-18", "suspense", "progressive-loading", "error-boundaries"],
  },
  {
    id: 37,
    question:
      "What is Next.js Advanced Caching? How do you implement Cache Headers, Stale-While-Revalidate, and CDN Optimization?",
    answer:
      "Next.js provides advanced caching strategies to optimize performance, reduce server load, and improve user experience through intelligent cache management.\n\n" +
      "**Cache Headers Configuration:**\n" +
      "```javascript\n" +
      "// next.config.js\n" +
      "const nextConfig = {\n" +
      "  async headers() {\n" +
      "    return [\n" +
      "      {\n" +
      "        source: '/api/data/:path*',\n" +
      "        headers: [\n" +
      "          {\n" +
      "            key: 'Cache-Control',\n" +
      "            value: 'public, s-maxage=300, stale-while-revalidate=600',\n" +
      "          },\n" +
      "        ],\n" +
      "      },\n" +
      "      {\n" +
      "        source: '/static/:path*',\n" +
      "        headers: [\n" +
      "          {\n" +
      "            key: 'Cache-Control',\n" +
      "            value: 'public, max-age=31536000, immutable',\n" +
      "          },\n" +
      "        ],\n" +
      "      },\n" +
      "    ];\n" +
      "  },\n" +
      "};\n" +
      "```\n\n" +
      "**Stale-While-Revalidate Implementation:**\n" +
      "```javascript\n" +
      "// app/api/cached-data/route.js\n" +
      "import { NextRequest, NextResponse } from 'next/server';\n" +
      "\n" +
      "export async function GET(request) {\n" +
      "  const { searchParams } = new URL(request.url);\n" +
      "  const key = searchParams.get('key');\n" +
      "  \n" +
      "  if (!key) {\n" +
      "    return NextResponse.json(\n" +
      "      { error: 'Key required' },\n" +
      "      { status: 400 }\n" +
      "    );\n" +
      "  }\n" +
      "  \n" +
      "  try {\n" +
      "    // Fetch data from external source\n      " +
      "    const dataResponse = await fetch(`https://api.example.com/data/${key}`);\n      " +
      "    const data = await dataResponse.json();\n      " +
      "    \n      " +
      "    // Create response with SWR headers\n      " +
      "    const response = NextResponse.json(data);\n      " +
      "    \n      " +
      "    // Set SWR headers\n      " +
      "    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');\n      " +
      "    response.headers.set('CDN-Cache-Control', 'public, s-maxage=300');\n      " +
      "    \n      " +
      "    return response;\n      " +
      "  } catch (error) {\n      " +
      "    return NextResponse.json(\n      " +
      "      { error: 'Failed to fetch data' },\n      " +
      "      { status: 500 }\n      " +
      "    );\n      " +
      "  }\n      " +
      "}\n      " +
      "```\n\n" +
      "**CDN Optimization:**\n      " +
      "```javascript\n      " +
      "// next.config.js\n      " +
      "const nextConfig = {\n      " +
      "  // CDN configuration\n      " +
      "  async headers() {\n      " +
      "    return [\n      " +
      "      {\n      " +
      "        source: '/api/cdn/:path*',\n      " +
      "        headers: [\n      " +
      "          {\n      " +
      "            key: 'Cache-Control',\n      " +
      "            value: 'public, s-maxage=300, stale-while-revalidate=600',\n      " +
      "          },\n      " +
      "          {\n      " +
      "            key: 'CDN-Cache-Control',\n      " +
      "            value: 'public, s-maxage=300',\n      " +
      "          },\n      " +
      "        ],\n      " +
      "      },\n      " +
      "    ];\n      " +
      "  },\n      " +
      "};\n      " +
      "```\n\n" +
      "**Best Practices:**\n      " +
      "- Use appropriate cache headers\n      " +
      "- Implement SWR for better UX\n      " +
      "- Optimize CDN caching\n      " +
      "- Monitor cache performance\n      " +
      "- Test cache behavior\n      " +
      "- Consider cache invalidation\n      " +
      "- Use cache warming strategies",
    category: "Caching",
    difficulty: "advanced",
    tags: ["caching", "cache-headers", "stale-while-revalidate", "cdn", "optimization"],
  },
  {
    id: 38,
    question:
      "What is Next.js Performance Monitoring? How do you implement Web Vitals tracking, Core Web Vitals optimization, and Performance Budgets?",
    answer:
      "Next.js Performance Monitoring helps track and optimize web performance metrics, ensuring optimal user experience and meeting performance standards.\n\n" +
      "**Web Vitals Implementation:**\n" +
      "```javascript\n" +
      "// lib/analytics.js\n" +
      "export function reportWebVitals(metric) {\n" +
      "  // Log to console in development\n      " +
      "  if (process.env.NODE_ENV === 'development') {\n      " +
      "    console.log(metric);\n      " +
      "  }\n      " +
      "  \n      " +
      "  // Send to analytics service\n      " +
      "  if (metric.label === 'web-vital') {\n      " +
      "    // Send to Google Analytics\n      " +
      "    gtag('event', metric.name, {\n      " +
      "      value: Math.round(metric.value),\n      " +
      "      event_label: metric.id,\n      " +
      "      non_interaction: true,\n      " +
      "    });\n      " +
      "    \n      " +
      "    // Send to custom analytics\n      " +
      "    fetch('/api/analytics', {\n      " +
      "      method: 'POST',\n      " +
      "      headers: { 'Content-Type': 'application/json' },\n      " +
      "      body: JSON.stringify({\n      " +
      "        name: metric.name,\n      " +
      "        value: metric.value,\n      " +
      "        id: metric.id,\n      " +
      "        url: window.location.href\n      " +
      "      })\n      " +
      "    });\n      " +
      "  }\n      " +
      "}\n      " +
      "```\n\n" +
      "**Performance Budget Configuration:**\n      " +
      "```javascript\n      " +
      "// next.config.js\n      " +
      "const nextConfig = {\n      " +
      "  // Performance budget\n      " +
      "  experimental: {\n      " +
      "    webpackBuildWorker: true,\n      " +
      "  },\n      " +
      "  \n      " +
      "  // Bundle analyzer\n      " +
      "  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {\n      " +
      "    if (!dev && !isServer) {\n      " +
      "      // Performance budget warnings\n      " +
      "      config.performance = {\n      " +
      "        maxAssetSize: 250000,\n      " +
      "        maxEntrypointSize: 250000,\n      " +
      "        hints: 'warning'\n      " +
      "      };\n      " +
      "    }\n      " +
      "    return config;\n      " +
      "  },\n      " +
      "};\n      " +
      "```\n\n" +
      "**Core Web Vitals Optimization:**\n      " +
      "```jsx\n      " +
      "// app/layout.js\n      " +
      "import { reportWebVitals } from './lib/analytics';\n      " +
      "\n      " +
      "export default function RootLayout({ children }) {\n      " +
      "  return (\n      " +
      "    <html lang='en'>\n      " +
      "      <head>\n      " +
      "        {/* Preload critical resources */}\n      " +
      "        <link rel='preload' href='/fonts/inter.woff2' as='font' type='font/woff2' crossOrigin='anonymous' />\n      " +
      "        <link rel='preload' href='/images/hero.jpg' as='image' />\n      " +
      "        \n      " +
      "        {/* Optimize LCP */}\n      " +
      "        <link rel='preload' href='/api/critical-data' as='fetch' crossOrigin='anonymous' />\n      " +
      "      </head>\n      " +
      "      <body>\n      " +
      "        {children}\n      " +
      "        \n      " +
      "        {/* Web Vitals script */}\n      " +
      "        <script\n      " +
      "          dangerouslySetInnerHTML={{\n      " +
      "            __html: `\n      " +
      "              if ('web-vital' in window) {\n      " +
      "                import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {\n      " +
      "                  getCLS(reportWebVitals);\n      " +
      "                  getFID(reportWebVitals);\n      " +
      "                  getFCP(reportWebVitals);\n      " +
      "                  getLCP(reportWebVitals);\n      " +
      "                  getTTFB(reportWebVitals);\n      " +
      "                });\n      " +
      "              }\n      " +
      "            `\n      " +
      "          }}\n      " +
      "        />\n      " +
      "      </body>\n      " +
      "    </html>\n      " +
      "  );\n      " +
      "}\n      " +
      "```\n\n" +
      "**Best Practices:**\n      " +
      "- Monitor Core Web Vitals regularly\n      " +
      "- Set performance budgets\n      " +
      "- Optimize LCP, FID, and CLS\n      " +
      "- Use performance monitoring tools\n      " +
      "- Test performance on real devices\n      " +
      "- Implement proper caching\n      " +
      "- Monitor performance in production",
    category: "Performance",
    difficulty: "advanced",
    tags: [
      "performance-monitoring",
      "web-vitals",
      "core-web-vitals",
      "performance-budgets",
      "optimization",
    ],
  },
  {
    id: 39,
    question:
      "What is Next.js Security Best Practices? How do you implement Content Security Policy, Authentication, and Data Protection?",
    answer:
      "Next.js Security Best Practices ensure your application is protected against common vulnerabilities and follows security standards.\n\n" +
      "**Content Security Policy:**\n" +
      "```javascript\n" +
      "// next.config.js\n" +
      "const nextConfig = {\n" +
      "  async headers() {\n" +
      "    return [\n      " +
      "      {\n      " +
      "        source: '/(.*)',\n      " +
      "        headers: [\n      " +
      "          {\n      " +
      "            key: 'Content-Security-Policy',\n      " +
      "            value: \"default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.example.com;\"\n      " +
      "          },\n      " +
      "        ],\n      " +
      "      },\n      " +
      "    ];\n      " +
      "  },\n      " +
      "};\n      " +
      "```\n\n" +
      "**Authentication Implementation:**\n      " +
      "```javascript\n      " +
      "// lib/auth.js\n      " +
      "import jwt from 'jsonwebtoken';\n      " +
      "import bcrypt from 'bcryptjs';\n      " +
      "\n      " +
      "export async function hashPassword(password) {\n      " +
      "  return await bcrypt.hash(password, 12);\n      " +
      "}\n      " +
      "\n      " +
      "export async function verifyPassword(password, hashedPassword) {\n      " +
      "  return await bcrypt.compare(password, hashedPassword);\n      " +
      "}\n      " +
      "\n      " +
      "export function generateToken(userId) {\n      " +
      "  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });\n      " +
      "}\n      " +
      "\n      " +
      "export function verifyToken(token) {\n      " +
      "  return jwt.verify(token, process.env.JWT_SECRET);\n      " +
      "}\n      " +
      "```\n\n" +
      "**Data Protection:**\n      " +
      "```javascript\n      " +
      "// lib/encryption.js\n      " +
      "import crypto from 'crypto';\n      " +
      "\n      " +
      "const algorithm = 'aes-256-gcm';\n      " +
      "const secretKey = process.env.ENCRYPTION_KEY;\n      " +
      "\n      " +
      "export function encrypt(text) {\n      " +
      "  const iv = crypto.randomBytes(16);\n      " +
      "  const cipher = crypto.createCipher(algorithm, secretKey);\n      " +
      "  \n      " +
      "  let encrypted = cipher.update(text, 'utf8', 'hex');\n      " +
      "  encrypted += cipher.final('hex');\n      " +
      "  \n      " +
      "  return {\n      " +
      "    encrypted,\n      " +
      "    iv: iv.toString('hex')\n      " +
      "  };\n      " +
      "}\n      " +
      "\n      " +
      "export function decrypt(encryptedData, iv) {\n      " +
      "  const decipher = crypto.createDecipher(algorithm, secretKey);\n      " +
      "  \n      " +
      "  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');\n      " +
      "  decrypted += decipher.final('utf8');\n      " +
      "  \n      " +
      "  return decrypted;\n      " +
      "}\n      " +
      "```\n\n" +
      "**Best Practices:**\n      " +
      "- Implement CSP headers\n      " +
      "- Use secure authentication\n      " +
      "- Encrypt sensitive data\n      " +
      "- Validate all inputs\n      " +
      "- Use HTTPS in production\n      " +
      "- Implement rate limiting\n      " +
      "- Keep dependencies updated",
    category: "Security",
    difficulty: "advanced",
    tags: ["security", "csp", "authentication", "data-protection", "encryption"],
  },
  {
    id: 40,
    question:
      "What is Next.js Advanced Routing Patterns? How do you implement Dynamic Routes, Catch-All Routes, Route Groups, and Middleware?",
    answer:
      "Next.js Advanced Routing Patterns provide flexible and powerful routing capabilities for complex applications.\n\n" +
      "**Dynamic Routes:**\n" +
      "```javascript\n" +
      "// app/posts/[slug]/page.js\n      " +
      "export default function Post({ params }) {\n      " +
      "  const { slug } = params;\n      " +
      "  return <div>Post: {slug}</div>;\n      " +
      "}\n      " +
      "\n      " +
      "// app/users/[id]/page.js\n      " +
      "export default function User({ params }) {\n      " +
      "  const { id } = params;\n      " +
      "  return <div>User: {id}</div>;\n      " +
      "}\n      " +
      "```\n\n" +
      "**Catch-All Routes:**\n      " +
      "```javascript\n      " +
      "// app/docs/[...slug]/page.js\n      " +
      "export default function Docs({ params }) {\n      " +
      "  const { slug } = params;\n      " +
      "  return <div>Docs: {slug.join('/')}</div>;\n      " +
      "}\n      " +
      "\n      " +
      "// app/shop/[...category]/page.js\n      " +
      "export default function Category({ params }) {\n      " +
      "  const { category } = params;\n      " +
      "  return <div>Category: {category.join('/')}</div>;\n      " +
      "}\n      " +
      "```\n\n" +
      "**Route Groups:**\n      " +
      "```javascript\n      " +
      "// app/(auth)/login/page.js\n      " +
      "export default function Login() {\n      " +
      "  return <div>Login Page</div>;\n      " +
      "}\n      " +
      "\n      " +
      "// app/(auth)/register/page.js\n      " +
      "export default function Register() {\n      " +
      "  return <div>Register Page</div>;\n      " +
      "}\n      " +
      "\n      " +
      "// app/(dashboard)/analytics/page.js\n      " +
      "export default function Analytics() {\n      " +
      "  return <div>Analytics Page</div>;\n      " +
      "}\n      " +
      "```\n\n" +
      "**Middleware Integration:**\n      " +
      "```javascript\n      " +
      "// middleware.js\n      " +
      "import { NextResponse } from 'next/server';\n      " +
      "\n      " +
      "export function middleware(request) {\n      " +
      "  const { pathname } = request.nextUrl;\n      " +
      "  \n      " +
      "  // Auth group protection\n      " +
      "  if (pathname.startsWith('/(auth)')) {\n      " +
      "    const token = request.cookies.get('auth-token');\n      " +
      "    if (token) {\n      " +
      "      return NextResponse.redirect(new URL('/dashboard', request.url));\n      " +
      "    }\n      " +
      "  }\n      " +
      "  \n      " +
      "  // Dashboard group protection\n      " +
      "  if (pathname.startsWith('/(dashboard)')) {\n      " +
      "    const token = request.cookies.get('auth-token');\n      " +
      "    if (!token) {\n      " +
      "      return NextResponse.redirect(new URL('/login', request.url));\n      " +
      "    }\n      " +
      "  }\n      " +
      "  \n      " +
      "  return NextResponse.next();\n      " +
      "}\n      " +
      "\n      " +
      "export const config = {\n      " +
      "  matcher: [\n      " +
      "    '/(auth)/:path*',\n      " +
      "    '/(dashboard)/:path*'\n      " +
      "  ]\n      " +
      "};\n      " +
      "```\n\n" +
      "**Best Practices:**\n      " +
      "- Use route groups for organization\n      " +
      "- Implement proper middleware\n      " +
      "- Handle dynamic routes carefully\n      " +
      "- Use catch-all routes sparingly\n      " +
      "- Test routing thoroughly\n      " +
      "- Consider SEO implications\n      " +
      "- Implement proper error handling",
    category: "Routing",
    difficulty: "intermediate",
    tags: ["routing", "dynamic-routes", "catch-all", "route-groups", "middleware"],
  },
  {
    id: 41,
    question:
      "What is Next.js Microservices Architecture? How do you implement API Gateway, Service Communication, and Data Consistency?",
    answer:
      "Next.js Microservices Architecture enables building scalable, maintainable applications by breaking them into independent services.\n\n" +
      "**API Gateway Implementation:**\n" +
      "```javascript\n" +
      "// app/api/gateway/route.js\n      " +
      "import { NextRequest, NextResponse } from 'next/server';\n      " +
      "\n      " +
      "export async function GET(request) {\n      " +
      "  const { searchParams } = new URL(request.url);\n      " +
      "  const service = searchParams.get('service');\n      " +
      "  const endpoint = searchParams.get('endpoint');\n      " +
      "  \n      " +
      "  if (!service || !endpoint) {\n      " +
      "    return NextResponse.json(\n      " +
      "      { error: 'Service and endpoint required' },\n      " +
      "      { status: 400 }\n      " +
      "    );\n      " +
      "  }\n      " +
      "  \n      " +
      "  try {\n      " +
      "    // Route to appropriate service\n      " +
      "    const serviceUrl = getServiceUrl(service);\n      " +
      "    const response = await fetch(`${serviceUrl}/${endpoint}`);\n      " +
      "    const data = await response.json();\n      " +
      "    \n      " +
      "    return NextResponse.json(data);\n      " +
      "  } catch (error) {\n      " +
      "    return NextResponse.json(\n      " +
      "      { error: 'Service unavailable' },\n      " +
      "      { status: 503 }\n      " +
      "    );\n      " +
      "  }\n      " +
      "}\n      " +
      "\n      " +
      "function getServiceUrl(service) {\n      " +
      "  const services = {\n      " +
      "    'user': process.env.USER_SERVICE_URL,\n      " +
      "    'order': process.env.ORDER_SERVICE_URL,\n      " +
      "    'payment': process.env.PAYMENT_SERVICE_URL\n      " +
      "  };\n      " +
      "  return services[service];\n      " +
      "}\n      " +
      "```\n\n" +
      "**Service Communication:**\n      " +
      "```javascript\n      " +
      "// lib/service-client.js\n      " +
      "class ServiceClient {\n      " +
      "  constructor(serviceUrl) {\n      " +
      "    this.serviceUrl = serviceUrl;\n      " +
      "  }\n      " +
      "  \n      " +
      "  async request(endpoint, options = {}) {\n      " +
      "    const url = `${this.serviceUrl}/${endpoint}`;\n      " +
      "    \n      " +
      "    const response = await fetch(url, {\n      " +
      "      ...options,\n      " +
      "      headers: {\n      " +
      "        'Content-Type': 'application/json',\n      " +
      "        ...options.headers\n      " +
      "      }\n      " +
      "    });\n      " +
      "    \n      " +
      "    if (!response.ok) {\n      " +
      "      throw new Error(`Service request failed: ${response.status}`);\n      " +
      "    }\n      " +
      "    \n      " +
      "    return response.json();\n      " +
      "  }\n      " +
      "}\n      " +
      "\n      " +
      "export const userService = new ServiceClient(process.env.USER_SERVICE_URL);\n      " +
      "export const orderService = new ServiceClient(process.env.ORDER_SERVICE_URL);\n      " +
      "```\n\n" +
      "**Data Consistency:**\n      " +
      "```javascript\n      " +
      "// lib/event-bus.js\n      " +
      "class EventBus {\n      " +
      "  constructor() {\n      " +
      "    this.listeners = new Map();\n      " +
      "  }\n      " +
      "  \n      " +
      "  subscribe(event, callback) {\n      " +
      "    if (!this.listeners.has(event)) {\n      " +
      "      this.listeners.set(event, []);\n      " +
      "    }\n      " +
      "    this.listeners.get(event).push(callback);\n      " +
      "  }\n      " +
      "  \n      " +
      "  publish(event, data) {\n      " +
      "    const eventListeners = this.listeners.get(event) || [];\n      " +
      "    eventListeners.forEach(callback => callback(data));\n      " +
      "  }\n      " +
      "}\n      " +
      "\n      " +
      "export const eventBus = new EventBus();\n      " +
      "```\n\n" +
      "**Best Practices:**\n      " +
      "- Use API Gateway for routing\n      " +
      "- Implement service discovery\n      " +
      "- Handle service failures gracefully\n      " +
      "- Use event-driven architecture\n      " +
      "- Implement proper logging\n      " +
      "- Monitor service health\n      " +
      "- Use circuit breakers",
    category: "Microservices",
    difficulty: "advanced",
    tags: [
      "microservices",
      "api-gateway",
      "service-communication",
      "data-consistency",
      "event-driven",
    ],
  },
  {
    id: 42,
    question:
      "What is Next.js Hybrid Rendering Strategies? How do you combine SSG, SSR, ISR, and CSR for optimal performance?",
    answer:
      "Next.js Hybrid Rendering Strategies allow you to combine different rendering methods to optimize performance and user experience.\n\n" +
      "**SSG + ISR Combination:**\n" +
      "```javascript\n" +
      "// app/posts/[slug]/page.js\n      " +
      "export async function generateStaticParams() {\n      " +
      "  const posts = await fetch('https://api.example.com/posts').then(res => res.json());\n      " +
      "  return posts.map((post) => ({\n      " +
      "    slug: post.slug,\n      " +
      "  }));\n      " +
      "}\n      " +
      "\n      " +
      "export async function generateMetadata({ params }) {\n      " +
      "  const post = await fetch(`https://api.example.com/posts/${params.slug}`).then(res => res.json());\n      " +
      "  return {\n      " +
      "    title: post.title,\n      " +
      "    description: post.excerpt\n      " +
      "  };\n      " +
      "}\n      " +
      "\n      " +
      "export default async function Post({ params }) {\n      " +
      "  const post = await fetch(`https://api.example.com/posts/${params.slug}`).then(res => res.json());\n      " +
      "  return <div>{post.title}</div>;\n      " +
      "}\n      " +
      "\n      " +
      "// Enable ISR\n      " +
      "export const revalidate = 3600; // Revalidate every hour\n      " +
      "```\n\n" +
      "**SSR + CSR Hybrid:**\n      " +
      "```javascript\n      " +
      "// app/dashboard/page.js\n      " +
      "import { Suspense } from 'react';\n      " +
      "\n      " +
      "// Server-rendered content\n      " +
      "async function ServerContent() {\n      " +
      "  const data = await fetch('https://api.example.com/dashboard', {\n      " +
      "    headers: { 'Authorization': `Bearer ${process.env.API_TOKEN}` }\n      " +
      "  }).then(res => res.json());\n      " +
      "  \n      " +
      "  return <div>Server Data: {data.message}</div>;\n      " +
      "}\n      " +
      "\n      " +
      "// Client-rendered content\n      " +
      "'use client';\n      " +
      "function ClientContent() {\n      " +
      "  const [data, setData] = useState(null);\n      " +
      "  \n      " +
      "  useEffect(() => {\n      " +
      "    fetch('/api/client-data')\n      " +
      "      .then(res => res.json())\n      " +
      "      .then(setData);\n      " +
      "  }, []);\n      " +
      "  \n      " +
      "  return <div>Client Data: {data?.message}</div>;\n      " +
      "}\n      " +
      "\n      " +
      "export default function Dashboard() {\n      " +
      "  return (\n      " +
      "    <div>\n      " +
      "      <h1>Dashboard</h1>\n      " +
      "      <Suspense fallback={<div>Loading server content...</div>}>\n      " +
      "        <ServerContent />\n      " +
      "      </Suspense>\n      " +
      "      <ClientContent />\n      " +
      "    </div>\n      " +
      "  );\n      " +
      "}\n      " +
      "```\n\n" +
      "**Best Practices:**\n      " +
      "- Use SSG for static content\n      " +
      "- Use SSR for dynamic content\n      " +
      "- Use ISR for frequently updated content\n      " +
      "- Use CSR for interactive content\n      " +
      "- Combine strategies based on content type\n      " +
      "- Monitor performance metrics\n      " +
      "- Test rendering strategies",
    category: "Rendering",
    difficulty: "advanced",
    tags: ["hybrid-rendering", "ssg", "ssr", "isr", "csr", "performance"],
  },
  {
    id: 43,
    question:
      "What is Next.js Progressive Web App (PWA)? How do you implement Service Workers, Offline Support, and Manifest?",
    answer:
      "Next.js PWA capabilities enable building web applications that work offline and provide native app-like experiences.\n\n" +
      "**Service Worker Implementation:**\n" +
      "```javascript\n" +
      "// public/sw.js\n      " +
      "const CACHE_NAME = 'app-cache-v1';\n      " +
      "const urlsToCache = [\n      " +
      "  '/',\n      " +
      "  '/static/js/bundle.js',\n      " +
      "  '/static/css/main.css'\n      " +
      "];\n      " +
      "\n      " +
      "self.addEventListener('install', (event) => {\n      " +
      "  event.waitUntil(\n      " +
      "    caches.open(CACHE_NAME)\n      " +
      "      .then((cache) => cache.addAll(urlsToCache))\n      " +
      "  );\n      " +
      "});\n      " +
      "\n      " +
      "self.addEventListener('fetch', (event) => {\n      " +
      "  event.respondWith(\n      " +
      "    caches.match(event.request)\n      " +
      "      .then((response) => {\n      " +
      "        if (response) {\n      " +
      "          return response;\n      " +
      "        }\n      " +
      "        return fetch(event.request);\n      " +
      "      })\n      " +
      "  );\n      " +
      "});\n      " +
      "```\n\n" +
      "**Manifest Configuration:**\n      " +
      "```json\n      " +
      "// public/manifest.json\n      " +
      "{\n      " +
      '  "name": "My PWA App",\n      ' +
      '  "short_name": "PWA App",\n      ' +
      '  "description": "A Progressive Web App",\n      ' +
      '  "start_url": "/",\n      ' +
      '  "display": "standalone",\n      ' +
      '  "background_color": "#ffffff",\n      ' +
      '  "theme_color": "#000000",\n      ' +
      '  "icons": [\n      ' +
      "    {\n      " +
      '      "src": "/icon-192x192.png",\n      ' +
      '      "sizes": "192x192",\n      ' +
      '      "type": "image/png"\n      ' +
      "    },\n      " +
      "    {\n      " +
      '      "src": "/icon-512x512.png",\n      ' +
      '      "sizes": "512x512",\n      ' +
      '      "type": "image/png"\n      ' +
      "    }\n      " +
      "  ]\n      " +
      "}\n      " +
      "```\n\n" +
      "**PWA Setup:**\n      " +
      "```javascript\n      " +
      "// next.config.js\n      " +
      "const withPWA = require('next-pwa')({\n      " +
      "  dest: 'public',\n      " +
      "  register: true,\n      " +
      "  skipWaiting: true\n      " +
      "});\n      " +
      "\n      " +
      "const nextConfig = {\n      " +
      "  // PWA configuration\n      " +
      "};\n      " +
      "\n      " +
      "module.exports = withPWA(nextConfig);\n      " +
      "```\n\n" +
      "**Best Practices:**\n      " +
      "- Implement service workers\n      " +
      "- Add offline support\n      " +
      "- Use proper manifest\n      " +
      "- Test PWA features\n      " +
      "- Monitor PWA metrics\n      " +
      "- Implement push notifications\n      " +
      "- Use app-like UI",
    category: "PWA",
    difficulty: "intermediate",
    tags: ["pwa", "service-workers", "offline-support", "manifest", "progressive-web-app"],
  },
  {
    id: 44,
    question:
      "What is Next.js Error Handling? How do you implement Error Boundaries, Custom Error Pages, and Monitoring?",
    answer:
      "Next.js Error Handling provides robust mechanisms to catch, handle, and monitor errors in production applications.\n\n" +
      "**Error Boundaries:**\n" +
      "```jsx\n" +
      "// app/error.js\n      " +
      "'use client';\n      " +
      "\n      " +
      "import { useEffect } from 'react';\n      " +
      "\n      " +
      "export default function Error({ error, reset }) {\n      " +
      "  useEffect(() => {\n      " +
      "    // Log error to monitoring service\n      " +
      "    console.error(error);\n      " +
      "  }, [error]);\n      " +
      "  \n      " +
      "  return (\n      " +
      "    <div>\n      " +
      "      <h2>Something went wrong!</h2>\n      " +
      "      <button onClick={() => reset()}>Try again</button>\n      " +
      "    </div>\n      " +
      "  );\n      " +
      "}\n      " +
      "```\n\n" +
      "**Custom Error Pages:**\n      " +
      "```jsx\n      " +
      "// app/not-found.js\n      " +
      "export default function NotFound() {\n      " +
      "  return (\n      " +
      "    <div>\n      " +
      "      <h2>404 - Page Not Found</h2>\n      " +
      "      <p>Could not find the requested resource</p>\n      " +
      "      <a href='/'>Go home</a>\n      " +
      "    </div>\n      " +
      "  );\n      " +
      "}\n      " +
      "\n      " +
      "// pages/_error.js (Pages Router)\n      " +
      "function Error({ statusCode }) {\n      " +
      "  return (\n      " +
      "    <p>\n      " +
      "      {statusCode\n      " +
      "        ? `An error ${statusCode} occurred on server`\n      " +
      "        : 'An error occurred on client'}\n      " +
      "    </p>\n      " +
      "  );\n      " +
      "}\n      " +
      "\n      " +
      "Error.getInitialProps = ({ res, err }) => {\n      " +
      "  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;\n      " +
      "  return { statusCode };\n      " +
      "};\n      " +
      "\n      " +
      "export default Error;\n      " +
      "```\n\n" +
      "**Best Practices:**\n      " +
      "- Implement error boundaries\n      " +
      "- Create custom error pages\n      " +
      "- Log errors to monitoring services\n      " +
      "- Handle API errors gracefully\n      " +
      "- Test error scenarios\n      " +
      "- Provide user-friendly messages\n      " +
      "- Monitor error rates",
    category: "Error Handling",
    difficulty: "intermediate",
    tags: ["error-handling", "error-boundaries", "custom-error-pages", "monitoring", "logging"],
  },
  {
    id: 45,
    question:
      "What is Next.js SEO Optimization? How do you implement Meta Tags, Structured Data, and Sitemap?",
    answer:
      "Next.js SEO Optimization helps improve search engine visibility and ranking through proper meta tags, structured data, and sitemaps.\n\n" +
      "**Meta Tags:**\n      " +
      "```jsx\n      " +
      "// app/page.js\n      " +
      "export const metadata = {\n      " +
      "  title: 'My Page Title',\n      " +
      "  description: 'My page description',\n      " +
      "  openGraph: {\n      " +
      "    title: 'My Page Title',\n      " +
      "    description: 'My page description',\n      " +
      "    url: 'https://example.com',\n      " +
      "    siteName: 'My Site',\n      " +
      "    images: [\n      " +
      "      {\n      " +
      "        url: 'https://example.com/og-image.jpg',\n      " +
      "        width: 1200,\n      " +
      "        height: 630,\n      " +
      "      },\n      " +
      "    ],\n      " +
      "    locale: 'en_US',\n      " +
      "    type: 'website',\n      " +
      "  },\n      " +
      "  twitter: {\n      " +
      "    card: 'summary_large_image',\n      " +
      "    title: 'My Page Title',\n      " +
      "    description: 'My page description',\n      " +
      "    images: ['https://example.com/twitter-image.jpg'],\n      " +
      "  },\n      " +
      "};\n      " +
      "```\n\n" +
      "**Structured Data:**\n      " +
      "```jsx\n      " +
      "// app/blog/[slug]/page.js\n      " +
      "export default function BlogPost({ post }) {\n      " +
      "  const jsonLd = {\n      " +
      "    '@context': 'https://schema.org',\n      " +
      "    '@type': 'BlogPosting',\n      " +
      "    headline: post.title,\n      " +
      "    image: post.image,\n      " +
      "    datePublished: post.publishedAt,\n      " +
      "    dateModified: post.updatedAt,\n      " +
      "    author: {\n      " +
      "      '@type': 'Person',\n      " +
      "      name: post.author.name,\n      " +
      "    },\n      " +
      "  };\n      " +
      "  \n      " +
      "  return (\n      " +
      "    <article>\n      " +
      "      <script\n      " +
      "        type='application/ld+json'\n      " +
      "        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}\n      " +
      "      />\n      " +
      "      <h1>{post.title}</h1>\n      " +
      "      <p>{post.content}</p>\n      " +
      "    </article>\n      " +
      "  );\n      " +
      "}\n      " +
      "```\n\n" +
      "**Sitemap Generation:**\n      " +
      "```javascript\n      " +
      "// app/sitemap.js\n      " +
      "export default async function sitemap() {\n      " +
      "  const posts = await fetch('https://api.example.com/posts').then(res => res.json());\n      " +
      "  \n      " +
      "  const postEntries = posts.map((post) => ({\n      " +
      "    url: `https://example.com/blog/${post.slug}`,\n      " +
      "    lastModified: post.updatedAt,\n      " +
      "    changeFrequency: 'weekly',\n      " +
      "    priority: 0.8,\n      " +
      "  }));\n      " +
      "  \n      " +
      "  return [\n      " +
      "    {\n      " +
      "      url: 'https://example.com',\n      " +
      "      lastModified: new Date(),\n      " +
      "      changeFrequency: 'daily',\n      " +
      "      priority: 1,\n      " +
      "    },\n      " +
      "    ...postEntries,\n      " +
      "  ];\n      " +
      "}\n      " +
      "```\n\n" +
      "**Best Practices:**\n      " +
      "- Add proper meta tags\n      " +
      "- Implement structured data\n      " +
      "- Generate dynamic sitemaps\n      " +
      "- Use canonical URLs\n      " +
      "- Optimize page titles\n      " +
      "- Add alt text to images\n      " +
      "- Monitor SEO metrics",
    category: "SEO",
    difficulty: "intermediate",
    tags: ["seo", "meta-tags", "structured-data", "sitemap", "optimization"],
  },
  {
    id: 46,
    question:
      "What is Next.js Internationalization (i18n)? How do you implement Multi-Language Support, Locale Detection, and Translation Management?",
    answer:
      "Next.js i18n enables building multilingual applications with automatic locale detection and routing.\n\n" +
      "**i18n Configuration:**\n      " +
      "```javascript\n      " +
      "// next.config.js\n      " +
      "const nextConfig = {\n      " +
      "  i18n: {\n      " +
      "    locales: ['en', 'fr', 'de', 'es'],\n      " +
      "    defaultLocale: 'en',\n      " +
      "    localeDetection: true,\n      " +
      "  },\n      " +
      "};\n      " +
      "```\n\n" +
      "**Locale Detection:**\n      " +
      "```jsx\n      " +
      "// pages/index.js\n      " +
      "import { useRouter } from 'next/router';\n      " +
      "\n      " +
      "export default function Home() {\n      " +
      "  const router = useRouter();\n      " +
      "  const { locale, locales, defaultLocale } = router;\n      " +
      "  \n      " +
      "  return (\n      " +
      "    <div>\n      " +
      "      <p>Current locale: {locale}</p>\n      " +
      "      <p>Default locale: {defaultLocale}</p>\n      " +
      "      <p>Available locales: {locales.join(', ')}</p>\n      " +
      "    </div>\n      " +
      "  );\n      " +
      "}\n      " +
      "```\n\n" +
      "**Translation Management:**\n      " +
      "```javascript\n      " +
      "// lib/translations.js\n      " +
      "const translations = {\n      " +
      "  en: {\n      " +
      "    welcome: 'Welcome',\n      " +
      "    about: 'About',\n      " +
      "    contact: 'Contact'\n      " +
      "  },\n      " +
      "  fr: {\n      " +
      "    welcome: 'Bienvenue',\n      " +
      "    about: 'À propos',\n      " +
      "    contact: 'Contact'\n      " +
      "  },\n      " +
      "  de: {\n      " +
      "    welcome: 'Willkommen',\n      " +
      "    about: 'Über',\n      " +
      "    contact: 'Kontakt'\n      " +
      "  }\n      " +
      "};\n      " +
      "\n      " +
      "export function useTranslation(locale) {\n      " +
      "  return {\n      " +
      "    t: (key) => translations[locale][key] || key\n      " +
      "  };\n      " +
      "}\n      " +
      "```\n\n" +
      "**Best Practices:**\n      " +
      "- Configure i18n properly\n      " +
      "- Implement locale detection\n      " +
      "- Manage translations centrally\n      " +
      "- Use translation libraries\n      " +
      "- Test all locales\n      " +
      "- Handle RTL languages\n      " +
      "- Optimize translation loading",
    category: "Internationalization",
    difficulty: "intermediate",
    tags: ["i18n", "internationalization", "multi-language", "locale-detection", "translation"],
  },
  {
    id: 47,
    question: "What is Next.js Authentication? How do you implement NextAuth.js, JWT, and OAuth?",
    answer:
      "Next.js Authentication provides secure user authentication using NextAuth.js, JWT tokens, and OAuth providers.\n\n" +
      "**NextAuth.js Setup:**\n      " +
      "```javascript\n      " +
      "// pages/api/auth/[...nextauth].js\n      " +
      "import NextAuth from 'next-auth';\n      " +
      "import GoogleProvider from 'next-auth/providers/google';\n      " +
      "import CredentialsProvider from 'next-auth/providers/credentials';\n      " +
      "\n      " +
      "export default NextAuth({\n      " +
      "  providers: [\n      " +
      "    GoogleProvider({\n      " +
      "      clientId: process.env.GOOGLE_CLIENT_ID,\n      " +
      "      clientSecret: process.env.GOOGLE_CLIENT_SECRET,\n      " +
      "    }),\n      " +
      "    CredentialsProvider({\n      " +
      "      name: 'Credentials',\n      " +
      "      credentials: {\n      " +
      "        email: { label: 'Email', type: 'text' },\n      " +
      "        password: { label: 'Password', type: 'password' }\n      " +
      "      },\n      " +
      "      async authorize(credentials) {\n      " +
      "        // Verify credentials\n      " +
      "        const user = await verifyUser(credentials);\n      " +
      "        if (user) {\n      " +
      "          return user;\n      " +
      "        }\n      " +
      "        return null;\n      " +
      "      }\n      " +
      "    })\n      " +
      "  ],\n      " +
      "  callbacks: {\n      " +
      "    async jwt({ token, user }) {\n      " +
      "      if (user) {\n      " +
      "        token.id = user.id;\n      " +
      "      }\n      " +
      "      return token;\n      " +
      "    },\n      " +
      "    async session({ session, token }) {\n      " +
      "      session.user.id = token.id;\n      " +
      "      return session;\n      " +
      "    }\n      " +
      "  },\n      " +
      "  pages: {\n      " +
      "    signIn: '/auth/signin',\n      " +
      "  },\n      " +
      "  session: {\n      " +
      "    strategy: 'jwt',\n      " +
      "  },\n      " +
      "});\n      " +
      "```\n\n" +
      "**Protected Routes:**\n      " +
      "```jsx\n      " +
      "// pages/dashboard.js\n      " +
      "import { useSession } from 'next-auth/react';\n      " +
      "import { useRouter } from 'next/router';\n      " +
      "\n      " +
      "export default function Dashboard() {\n      " +
      "  const { data: session, status } = useSession();\n      " +
      "  const router = useRouter();\n      " +
      "  \n      " +
      "  if (status === 'loading') {\n      " +
      "    return <div>Loading...</div>;\n      " +
      "  }\n      " +
      "  \n      " +
      "  if (!session) {\n      " +
      "    router.push('/auth/signin');\n      " +
      "    return null;\n      " +
      "  }\n      " +
      "  \n      " +
      "  return (\n      " +
      "    <div>\n      " +
      "      <h1>Welcome, {session.user.name}!</h1>\n      " +
      "    </div>\n      " +
      "  );\n      " +
      "}\n      " +
      "```\n\n" +
      "**Best Practices:**\n      " +
      "- Use NextAuth.js for authentication\n      " +
      "- Implement JWT tokens\n      " +
      "- Add OAuth providers\n      " +
      "- Protect sensitive routes\n      " +
      "- Handle session expiration\n      " +
      "- Use secure cookies\n      " +
      "- Implement refresh tokens",
    category: "Authentication",
    difficulty: "intermediate",
    tags: ["authentication", "nextauth", "jwt", "oauth", "security"],
  },
  {
    id: 48,
    question:
      "What is Next.js Database Integration? How do you implement Prisma, MongoDB, and PostgreSQL connections?",
    answer:
      "Next.js Database Integration enables seamless connection to various databases using modern ORMs and connection pooling.\n\n" +
      "**Prisma Setup:**\n      " +
      "```prisma\n      " +
      "// prisma/schema.prisma\n      " +
      "datasource db {\n      " +
      "  provider = 'postgresql'\n      " +
      "  url      = env('DATABASE_URL')\n      " +
      "}\n      " +
      "\n      " +
      "generator client {\n      " +
      "  provider = 'prisma-client-js'\n      " +
      "}\n      " +
      "\n      " +
      "model User {\n      " +
      "  id        Int      @id @default(autoincrement())\n      " +
      "  email     String   @unique\n      " +
      "  name      String?\n      " +
      "  createdAt DateTime @default(now())\n      " +
      "}\n      " +
      "```\n\n" +
      "**Database Connection:**\n      " +
      "```javascript\n      " +
      "// lib/prisma.js\n      " +
      "import { PrismaClient } from '@prisma/client';\n      " +
      "\n      " +
      "const globalForPrisma = global;\n      " +
      "\n      " +
      "export const prisma = globalForPrisma.prisma || new PrismaClient();\n      " +
      "\n      " +
      "if (process.env.NODE_ENV !== 'production') {\n      " +
      "  globalForPrisma.prisma = prisma;\n      " +
      "}\n      " +
      "```\n\n" +
      "**API Routes with Database:**\n      " +
      "```javascript\n      " +
      "// app/api/users/route.js\n      " +
      "import { prisma } from '@/lib/prisma';\n      " +
      "import { NextResponse } from 'next/server';\n      " +
      "\n      " +
      "export async function GET() {\n      " +
      "  try {\n      " +
      "    const users = await prisma.user.findMany();\n      " +
      "    return NextResponse.json({ users });\n      " +
      "  } catch (error) {\n      " +
      "    return NextResponse.json(\n      " +
      "      { error: 'Failed to fetch users' },\n      " +
      "      { status: 500 }\n      " +
      "    );\n      " +
      "  }\n      " +
      "}\n      " +
      "\n      " +
      "export async function POST(request) {\n      " +
      "  try {\n      " +
      "    const body = await request.json();\n      " +
      "    const user = await prisma.user.create({\n      " +
      "      data: body\n      " +
      "    });\n      " +
      "    return NextResponse.json({ user }, { status: 201 });\n      " +
      "  } catch (error) {\n      " +
      "    return NextResponse.json(\n      " +
      "      { error: 'Failed to create user' },\n      " +
      "      { status: 500 }\n      " +
      "    );\n      " +
      "  }\n      " +
      "}\n      " +
      "```\n\n" +
      "**Best Practices:**\n      " +
      "- Use connection pooling\n      " +
      "- Implement proper error handling\n      " +
      "- Use environment variables\n      " +
      "- Implement migrations\n      " +
      "- Use transactions when needed\n      " +
      "- Monitor database performance\n      " +
      "- Implement proper indexing",
    category: "Database",
    difficulty: "intermediate",
    tags: ["database", "prisma", "mongodb", "postgresql", "orm"],
  },
  {
    id: 49,
    question:
      "What is Next.js State Management? How do you implement Zustand, Redux Toolkit, and Context API?",
    answer:
      "Next.js State Management provides various solutions for managing application state across components.\n\n" +
      "**Zustand Setup:**\n      " +
      "```javascript\n      " +
      "// store/useStore.js\n      " +
      "import { create } from 'zustand';\n      " +
      "\n      " +
      "export const useStore = create((set) => ({\n      " +
      "  user: null,\n      " +
      "  setUser: (user) => set({ user }),\n      " +
      "  removeUser: () => set({ user: null }),\n      " +
      "}));\n      " +
      "```\n\n" +
      "**Redux Toolkit Setup:**\n      " +
      "```javascript\n      " +
      "// store/index.js\n      " +
      "import { configureStore } from '@reduxjs/toolkit';\n      " +
      "import userReducer from './userSlice';\n      " +
      "\n      " +
      "export const store = configureStore({\n      " +
      "  reducer: {\n      " +
      "    user: userReducer,\n      " +
      "  },\n      " +
      "});\n      " +
      "```\n\n" +
      "**Context API:**\n      " +
      "```jsx\n      " +
      "// context/UserContext.js\n      " +
      "import { createContext, useContext, useState } from 'react';\n      " +
      "\n      " +
      "const UserContext = createContext();\n      " +
      "\n      " +
      "export function UserProvider({ children }) {\n      " +
      "  const [user, setUser] = useState(null);\n      " +
      "  \n      " +
      "  return (\n      " +
      "    <UserContext.Provider value={{ user, setUser }}>\n      " +
      "      {children}\n      " +
      "    </UserContext.Provider>\n      " +
      "  );\n      " +
      "}\n      " +
      "\n      " +
      "export const useUser = () => useContext(UserContext);\n      " +
      "```\n\n" +
      "**Best Practices:**\n      " +
      "- Choose appropriate state management\n      " +
      "- Use Context API for simple state\n      " +
      "- Use Zustand for medium complexity\n      " +
      "- Use Redux for complex state\n      " +
      "- Implement proper state structure\n      " +
      "- Avoid unnecessary re-renders\n      " +
      "- Test state management logic",
    category: "State Management",
    difficulty: "intermediate",
    tags: ["state-management", "zustand", "redux-toolkit", "context-api", "react"],
  },
  {
    id: 50,
    question:
      "What is Next.js Testing? How do you implement Jest, React Testing Library, and Playwright for E2E testing?",
    answer:
      "Next.js Testing ensures application reliability through unit tests, integration tests, and end-to-end tests.\n\n" +
      "**Jest Configuration:**\n      " +
      "```javascript\n      " +
      "// jest.config.js\n      " +
      "module.exports = {\n      " +
      "  testEnvironment: 'jsdom',\n      " +
      "  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],\n      " +
      "  moduleNameMapper: {\n      " +
      "    '^@/(.*)$': '<rootDir>/$1',\n      " +
      "  },\n      " +
      "};\n      " +
      "```\n\n" +
      "**React Testing Library:**\n      " +
      "```jsx\n      " +
      "// __tests__/Home.test.js\n      " +
      "import { render, screen } from '@testing-library/react';\n      " +
      "import Home from '../pages/index';\n      " +
      "\n      " +
      "describe('Home', () => {\n      " +
      "  it('renders a heading', () => {\n      " +
      "    render(<Home />);\n      " +
      "    const heading = screen.getByRole('heading', { name: /welcome/i });\n      " +
      "    expect(heading).toBeInTheDocument();\n      " +
      "  });\n      " +
      "});\n      " +
      "```\n\n" +
      "**Playwright E2E Tests:**\n      " +
      "```javascript\n      " +
      "// e2e/home.spec.js\n      " +
      "import { test, expect } from '@playwright/test';\n      " +
      "\n      " +
      "test('home page', async ({ page }) => {\n      " +
      "  await page.goto('http://localhost:3000');\n      " +
      "  await expect(page.locator('h1')).toContainText('Welcome');\n      " +
      "});\n      " +
      "```\n\n" +
      "**Best Practices:**\n      " +
      "- Write comprehensive tests\n      " +
      "- Use React Testing Library\n      " +
      "- Implement E2E tests with Playwright\n      " +
      "- Test edge cases\n      " +
      "- Mock external dependencies\n      " +
      "- Test accessibility\n      " +
      "- Maintain test coverage",
    category: "Testing",
    difficulty: "intermediate",
    tags: ["testing", "jest", "react-testing-library", "playwright", "e2e"],
  },
];

export default NEXTJS_ENHANCED_QUESTIONS;
