# Frontend Interview Prep

A professional, multi-framework interview preparation application built with React, TypeScript, and Tailwind CSS. Practice with curated questions for Angular, React, Next.js, and Redux.

## 🚀 Features

- **Multi-Framework Support**: Practice questions for Angular, React, Next.js, and Redux
- **Enhanced Question Cards**: Rich markdown rendering with syntax highlighting
- **Study Features**: Bookmarks, notes, progress tracking, and study timer
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark Mode**: Toggle between light and dark themes
- **PWA Support**: Install as a Progressive Web App
- **Keyboard Shortcuts**: Navigate efficiently with keyboard controls

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Testing**: Vitest, Testing Library
- **Code Quality**: ESLint, Prettier, Husky
- **Deployment**: Vercel, Netlify ready

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
├── data/               # Question data and framework definitions
├── features/           # Feature-specific components (notes, study)
├── hooks/              # Custom React hooks
├── shared/             # Shared utilities, components, and constants
├── types/              # TypeScript type definitions
├── utils/               # Utility functions
└── styles/             # Global styles and animations

docs/                   # Documentation
├── guides/             # Setup and usage guides
├── management/         # Project management docs
└── status/             # Project status and completion docs

scripts/                # Development and deployment scripts
questions/              # Question data files (CSV, JSON)
```

## 🚀 Quick Start

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Start development server**:

   ```bash
   pnpm dev
   ```

3. **Build for production**:
   ```bash
   pnpm build
   ```

## 🎯 Usage

1. **Select Framework**: Choose from Angular, React, Next.js, or Redux
2. **Practice Questions**: Navigate through questions with keyboard shortcuts
3. **Track Progress**: Bookmark questions and add personal notes
4. **Study Modes**: Sequential, random, or bookmarked-only practice

## ⌨️ Keyboard Shortcuts

- `←` `→` Navigate between questions
- `A` Toggle answer visibility
- `B` Bookmark/unbookmark question

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

## 🔧 Development

```bash
# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Type check
pnpm type-check

# Validate everything
pnpm validate
```

## 📚 Documentation

- **[📖 Complete Documentation](./docs/README.md)** - Comprehensive documentation index
- [Architecture](./docs/development/ARCHITECTURE.md) - System design and architecture
- [Features](./docs/development/FEATURES.md) - Detailed feature documentation
- [Deployment](./docs/deployment/DEPLOYMENT.md) - Deployment guides
- [Project Structure](./docs/development/PROJECT-STRUCTURE.md) - Detailed project organization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

## 👨‍💻 Author

**Hussein Tirawi** - [GitHub](https://github.com/htirawi)

---

Built with ❤️ for the frontend developer community.
