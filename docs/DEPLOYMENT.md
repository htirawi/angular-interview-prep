# 🚀 Deployment Guide

Complete guide for deploying your Angular Interview Prep app to various platforms.

## 📦 Prerequisites

```bash
# Ensure your app builds successfully
pnpm build

# Test the production build locally
pnpm preview
```

## 1️⃣ Vercel (Recommended - Easiest)

### Option A: CLI Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option B: Git Integration

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel auto-detects Vite config
6. Click "Deploy"

**Your site will be live at**: `https://your-project.vercel.app`

### Custom Domain

1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as shown

---

## 2️⃣ Netlify

### Option A: CLI Deployment

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### Option B: Git Integration

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your repository
5. Build settings (auto-detected from `netlify.toml`):
   - Build command: `pnpm build`
   - Publish directory: `dist`
6. Click "Deploy"

**Your site will be live at**: `https://your-project.netlify.app`

---

## 3️⃣ GitHub Pages

### Setup

1. Enable GitHub Pages in repo settings
2. Set source to "GitHub Actions"
3. Push to `main` branch

The `.github/workflows/deploy.yml` file handles automatic deployment!

**Your site will be live at**: `https://username.github.io/repo-name`

### Custom Domain

1. Add `CNAME` file to `public/` folder:
   ```
   your-domain.com
   ```
2. Update DNS records:
   - Type: `A`
   - Name: `@`
   - Value: GitHub Pages IPs

---

## 4️⃣ Docker Deployment

### Build & Run Locally

```bash
# Build image
docker build -t frontend-interview-prep .

# Run container
docker run -p 3000:80 frontend-interview-prep

# Access at http://localhost:3000
```

### Deploy to Cloud

#### Docker Hub

```bash
# Tag image
docker tag frontend-interview-prep username/frontend-interview-prep

# Push to Docker Hub
docker push username/frontend-interview-prep

# Pull and run anywhere
docker pull username/frontend-interview-prep
docker run -d -p 80:80 username/frontend-interview-prep
```

#### AWS ECS

```bash
# Tag for ECR
docker tag frontend-interview-prep:latest AWS_ACCOUNT.dkr.ecr.region.amazonaws.com/frontend-interview-prep:latest

# Push to ECR
docker push AWS_ACCOUNT.dkr.ecr.region.amazonaws.com/frontend-interview-prep:latest
```

#### Google Cloud Run

```bash
# Build and deploy
gcloud builds submit --tag gcr.io/PROJECT_ID/frontend-interview-prep
gcloud run deploy --image gcr.io/PROJECT_ID/frontend-interview-prep --platform managed
```

---

## 5️⃣ Firebase Hosting

```bash
# Install Firebase CLI
npm i -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Build your app
pnpm build

# Deploy
firebase deploy
```

**Your site will be live at**: `https://your-project.web.app`

---

## 6️⃣ Cloudflare Pages

1. Push code to GitHub
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
3. Connect repository
4. Build settings:
   - Build command: `pnpm build`
   - Build output: `dist`
5. Deploy

**Your site will be live at**: `https://your-project.pages.dev`

---

## 🔒 Security Checklist

Before going live:

- [ ] Update `vercel.json` / `netlify.toml` with proper headers
- [ ] Test all routes work correctly
- [ ] Verify PWA installation works
- [ ] Check responsive design on mobile
- [ ] Run Lighthouse audit (Performance, SEO, Best Practices, PWA)
- [ ] Test dark mode
- [ ] Verify all keyboard shortcuts work
- [ ] Check search and filters
- [ ] Test bookmark persistence

---

## ⚡ Performance Tips

### Vercel

```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

### Netlify

Headers are already configured in `netlify.toml`

---

## 🌐 Custom Domain Setup

### DNS Records

```
Type: A
Name: @
Value: [Platform IP]

Type: CNAME
Name: www
Value: [Platform domain]
```

### SSL/HTTPS

All platforms provide free SSL certificates automatically!

---

## 📊 Analytics (Optional)

Add analytics to track usage:

### Google Analytics

```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_ID");
</script>
```

### Vercel Analytics

```bash
pnpm add @vercel/analytics
```

```typescript
// src/main.tsx
import { Analytics } from '@vercel/analytics/react';

<App />
<Analytics />
```

---

## 🐛 Troubleshooting

### Build fails

```bash
# Clear cache
rm -rf node_modules dist .next
pnpm install
pnpm build
```

### 404 errors on routes

Ensure SPA fallback is configured (already done in configs)

### Slow load times

- Enable compression (configured in `nginx.conf`)
- Use CDN (Vercel/Netlify/Cloudflare provide this)
- Optimize images

---

## 📈 Monitoring

### Vercel

Built-in analytics at: `https://vercel.com/dashboard/analytics`

### Netlify

Built-in analytics at: `https://app.netlify.com/[site]/analytics`

### Uptime Monitoring

Use [UptimeRobot](https://uptimerobot.com) or [Better Uptime](https://betteruptime.com)

---

## 🎉 You're Live!

Share your deployed site:

```
🎯 Angular Senior Interview Prep
📚 100 curated questions
🚀 Now live at: [your-url]
```

Tweet it, share on LinkedIn, add to your portfolio!

---

**Questions? Open an issue on GitHub!**
