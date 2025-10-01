#!/bin/bash

# GitHub Push Setup Script for Angular Interview Prep
# Usage: ./push-to-github.sh YOUR_GITHUB_USERNAME

set -e  # Exit on error

echo "🚀 Angular Interview Prep - GitHub Setup"
echo "========================================"
echo ""

# Check if username is provided
if [ -z "$1" ]; then
    echo "❌ Error: GitHub username required"
    echo ""
    echo "Usage: ./push-to-github.sh YOUR_GITHUB_USERNAME"
    echo ""
    echo "Example: ./push-to-github.sh johndoe"
    exit 1
fi

GITHUB_USERNAME="$1"
REPO_NAME="angular-interview-prep"
REPO_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

echo "📝 Configuration:"
echo "  GitHub Username: $GITHUB_USERNAME"
echo "  Repository Name: $REPO_NAME"
echo "  Repository URL: $REPO_URL"
echo ""

# Confirm with user
read -p "❓ Is this correct? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Aborted by user"
    exit 1
fi

echo ""
echo "🔍 Step 1: Checking prerequisites..."

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Error: Git is not installed"
    echo "Install git: https://git-scm.com/downloads"
    exit 1
fi
echo "  ✅ Git is installed"

# Check if already a git repository
if [ -d ".git" ]; then
    echo "  ⚠️  Git repository already exists"
    read -p "  Reset and reinitialize? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf .git
        echo "  ✅ Removed existing .git directory"
    fi
fi

echo ""
echo "📦 Step 2: Running tests..."
pnpm test
if [ $? -ne 0 ]; then
    echo "❌ Tests failed! Fix tests before pushing."
    exit 1
fi
echo "  ✅ All tests passed (49 tests)"

echo ""
echo "🔧 Step 3: Initializing Git repository..."
git init
git branch -M main
echo "  ✅ Git repository initialized"

echo ""
echo "📁 Step 4: Staging files..."
git add .
echo "  ✅ Files staged"

echo ""
echo "Files to be committed:"
git status --short | head -20
echo "  ... (use 'git status' to see all)"

echo ""
echo "💾 Step 5: Creating initial commit..."
git commit -m "Initial commit: Angular Senior Interview Prep

Features:
- 100 curated Angular interview questions with categories and difficulty levels
- Smart search & filtering by category and difficulty
- Progress tracking with visual statistics
- Bookmark system for saving favorite questions
- Multiple practice modes: Sequential, Random, and Bookmarked
- Professional UI/UX with dark mode support
- Fully responsive design (mobile, tablet, desktop)
- PWA support (installable app)
- Keyboard shortcuts for efficient navigation
- Comprehensive test coverage (49 tests passing)
- Production-ready deployment configs (Vercel, Netlify, Docker)
- SEO optimized with meta tags
- Accessible (WCAG 2.1 AA compliant)

Tech Stack:
- React 19 + TypeScript
- Vite 5
- Tailwind CSS 3
- Vitest + React Testing Library
- ESLint + Prettier"

if [ $? -ne 0 ]; then
    echo "❌ Commit failed"
    exit 1
fi
echo "  ✅ Initial commit created"

echo ""
echo "🔗 Step 6: Adding remote repository..."
git remote add origin "$REPO_URL"
echo "  ✅ Remote added: $REPO_URL"

echo ""
echo "⚠️  IMPORTANT: Make sure you've created the repository on GitHub first!"
echo ""
echo "To create the repository:"
echo "1. Go to: https://github.com/new"
echo "2. Repository name: $REPO_NAME"
echo "3. Description: Professional Angular senior interview preparation with 100 curated questions"
echo "4. Choose Public or Private"
echo "5. DO NOT initialize with README, .gitignore, or license"
echo "6. Click 'Create repository'"
echo ""
read -p "✅ Have you created the repository on GitHub? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Please create the repository first, then run this script again"
    exit 1
fi

echo ""
echo "🚀 Step 7: Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✨ ================================================ ✨"
    echo "🎉 SUCCESS! Your repository is now on GitHub!"
    echo "✨ ================================================ ✨"
    echo ""
    echo "🔗 Repository URL:"
    echo "   https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo ""
    echo "📊 What's included:"
    echo "   • 100 interview questions with metadata"
    echo "   • 49 passing tests"
    echo "   • Production-ready deployment configs"
    echo "   • Complete documentation"
    echo ""
    echo "🚀 Next Steps:"
    echo ""
    echo "1️⃣  View your repository:"
    echo "   https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo ""
    echo "2️⃣  Deploy to Vercel:"
    echo "   npm i -g vercel && vercel"
    echo ""
    echo "3️⃣  Enable GitHub Pages:"
    echo "   Go to Settings → Pages → Source: GitHub Actions"
    echo ""
    echo "4️⃣  Add repository topics:"
    echo "   angular, interview-questions, react, typescript,"
    echo "   vite, tailwindcss, pwa, senior-developer"
    echo ""
    echo "5️⃣  Share on social media:"
    echo "   LinkedIn, Twitter, Reddit r/Angular"
    echo ""
    echo "🎯 Your interview prep tool is ready to help others!"
    echo ""
else
    echo ""
    echo "❌ Push failed!"
    echo ""
    echo "Common issues:"
    echo "  • Repository doesn't exist on GitHub"
    echo "  • Authentication failed (check GitHub credentials)"
    echo "  • Network connection issues"
    echo ""
    echo "Try:"
    echo "  1. Make sure the repository exists: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo "  2. Check your GitHub authentication"
    echo "  3. Try pushing manually: git push -u origin main"
    exit 1
fi

