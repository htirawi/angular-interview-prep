# 🚀 Upgrade Guide - Enhanced Version

This guide will help you switch from the basic to the **enhanced professional version** with all the new features.

## 📋 What's New?

### ✨ Features Added:

1. **Search & Filter** - Find questions by keywords, category, or difficulty
2. **Bookmarking** - Save favorite questions for later review
3. **Progress Tracking** - Visual statistics showing completion rate
4. **Random Mode** - Shuffle questions for varied practice
5. **Smart Categorization** - Auto-categorize questions by topic
6. **Enhanced UI** - Modern gradients, animations, and better spacing
7. **Deployment Ready** - Vercel, Netlify, Docker configs included
8. **PWA Support** - Install as a mobile/desktop app
9. **SEO Optimized** - Meta tags for better discoverability

## 🔄 How to Upgrade

### Step 1: Replace Core Files

Run this command to switch to the enhanced version:

```bash
# Backup originals
cp src/App.tsx src/App-original.tsx
cp src/components/QuestionCard.tsx src/components/QuestionCard-original.tsx

# Use enhanced versions
cp src/App-enhanced.tsx src/App.tsx
cp src/components/QuestionCard-enhanced.tsx src/components/QuestionCard.tsx
```

### Step 2: Test the Application

```bash
# Install any new dependencies (if needed)
pnpm install

# Run development server
pnpm dev

# Run tests
pnpm test
```

### Step 3: Fix any TypeScript errors

The new version adds these fields to questions:

- `category: string`
- `difficulty: "intermediate" | "advanced" | "expert"`
- `tags: string[]`

The `enrichQuestions()` utility auto-generates these for questions that don't have them.

## 🎯 New Keyboard Shortcuts

| Key     | Action             |
| ------- | ------------------ |
| `←` `→` | Navigate questions |
| `A`     | Toggle answer      |
| `B`     | Bookmark question  |
| `Esc`   | Clear search       |

## 📊 New LocalStorage Keys

The enhanced version stores additional data:

- `mockInterview.completed` - Set of completed question IDs
- `mockInterview.bookmarks` - Set of bookmarked question IDs
- `mockInterview.mode` - Current practice mode

## 🚀 Deployment Options

### Vercel (Easiest)

```bash
vercel
```

### Netlify

```bash
netlify deploy --prod
```

### Docker

```bash
docker build -t angular-interview-prep .
docker run -p 3000:80 angular-interview-prep
```

### GitHub Pages

Just push to `main` - GitHub Actions handles the rest!

## 🎨 Customization

### Change Theme Colors

Edit `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: {...} // Customize your brand colors
    }
  }
}
```

### Modify Categories

Edit `src/utils/questionMetadata.ts` to adjust auto-categorization logic.

### Add More Questions

Add to `src/data/questions.ts` with this structure:

```typescript
{
  id: 101,
  question: "Your question here",
  answer: "Detailed answer...",
  category: "Your Category",
  difficulty: "advanced",
  tags: ["tag1", "tag2"]
}
```

## 🐛 Troubleshooting

### Search not working?

- Check that `enrichQuestions()` is imported and used in App.tsx
- Ensure questions have the new fields

### Bookmarks not persisting?

- Check browser localStorage is enabled
- Clear cache: `localStorage.clear()` in console

### Build failing?

```bash
# Clear cache and reinstall
rm -rf node_modules dist
pnpm install
pnpm build
```

## 📱 PWA Setup

To make your app installable:

1. Create icons:
   - `public/icon-192.png` (192x192)
   - `public/icon-512.png` (512x512)

2. Test PWA features:

   ```bash
   pnpm build
   pnpm preview
   # Open in browser and check for install prompt
   ```

3. Lighthouse audit:
   - Open DevTools
   - Run Lighthouse
   - Check PWA score

## 🎓 Tips for Maximum Value

1. **Use Random Mode** for realistic interview simulation
2. **Bookmark** questions you find challenging
3. **Filter by difficulty** as you improve
4. **Search by topic** for targeted practice
5. **Track progress** to stay motivated

## 🔙 Reverting to Basic Version

If you need to go back:

```bash
cp src/App-original.tsx src/App.tsx
cp src/components/QuestionCard-original.tsx src/components/QuestionCard.tsx
```

## 📞 Need Help?

Open an issue on GitHub or check the documentation!

---

**Happy interviewing!** 🚀
