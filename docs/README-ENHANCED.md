# 🎯 Angular Senior Interview Prep

> A professional, production-ready interview preparation tool with 100 essential Angular questions for senior-level positions.

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/angular-interview-prep)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/angular-interview-prep)

## ✨ Features

### 🎨 **Professional UI/UX**

- Modern, responsive design with smooth animations
- Dark mode support with system preference detection
- Mobile-first responsive layout
- Accessible (WCAG 2.1 AA compliant)

### 🔍 **Smart Search & Filtering**

- Real-time search across questions, answers, and tags
- Filter by category (Architecture, RxJS, Forms, etc.)
- Filter by difficulty (Intermediate, Advanced, Expert)
- Smart auto-categorization of questions

### ⭐ **Practice Modes**

- **Sequential Mode**: Go through questions in order
- **Random Mode**: Shuffle questions for varied practice
- **Bookmarked Mode**: Focus on saved questions

### 📊 **Progress Tracking**

- Visual progress statistics
- Track completed questions
- Completion percentage
- Persistent state (survives page refresh)

### ⌨️ **Keyboard Shortcuts**

- `←` / `→` - Navigate between questions
- `A` - Toggle answer visibility
- `B` - Bookmark current question
- `Esc` - Clear search

### 🏷️ **Organized Content**

- 100 curated questions covering:
  - Architecture & Fundamentals
  - Reactive Programming (Signals, RxJS)
  - Change Detection & Performance
  - HTTP & Interceptors
  - Routing & Guards
  - Forms & Validation
  - State Management (NgRx)
  - Testing Strategies
  - Security & Authentication
  - Real-time (WebSockets, SignalR)
  - SSR & Hydration
  - Accessibility (a11y)
  - And more...

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run tests
pnpm test

# Lint code
pnpm lint

# Format code
pnpm format
```

## 📦 Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Testing**: Vitest + React Testing Library
- **Code Quality**: ESLint + Prettier
- **State**: LocalStorage with custom hooks

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### GitHub Pages

Push to `main` branch - GitHub Actions will auto-deploy.

### Docker

```bash
# Build image
docker build -t angular-interview-prep .

# Run container
docker run -p 3000:80 angular-interview-prep
```

## 📱 PWA Support

This app can be installed as a Progressive Web App:

1. Visit the deployed site
2. Look for "Install App" in your browser
3. Click install to add to home screen

Works offline after first visit!

## 🎯 How to Use

1. **Start Sequential**: Begin with question 1 and progress through
2. **Search**: Use the search bar to find specific topics
3. **Filter**: Narrow down by category or difficulty
4. **Bookmark**: Save important questions for later review
5. **Random Mode**: Test yourself with shuffled questions
6. **Track Progress**: Monitor your completion rate

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

### Adding Questions

Questions are in `src/data/questions.ts`. Each question should have:

- `id`: Unique number
- `question`: The interview question
- `answer`: Detailed answer with examples
- `category`: Topic category
- `difficulty`: intermediate | advanced | expert
- `tags`: Array of relevant keywords

## 📄 License

MIT License - feel free to use this for your interview prep!

## 🌟 Star History

If this helped you land your dream Angular job, consider giving it a star! ⭐

## 💡 Tips for Interview Success

1. **Understand, Don't Memorize**: Focus on concepts
2. **Practice Explaining**: Talk through answers out loud
3. **Know the "Why"**: Understand tradeoffs and alternatives
4. **Stay Current**: Questions cover Angular 16-19 features
5. **Build Projects**: Nothing beats hands-on experience

## 📧 Contact

Questions? Feedback? Open an issue or reach out!

---

**Good luck with your interview!** 🚀

_Last updated: 2025_
