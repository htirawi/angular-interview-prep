#!/bin/bash

# GitHub About Section Setup Script
# Uses GitHub CLI to automatically configure repository

echo "📝 GitHub About Section Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Detect repository name from git remote
REPO_URL=$(git config --get remote.origin.url)
REPO_NAME=$(echo "$REPO_URL" | sed -E 's|.*/(.+)\.git|\1|')

if [ -z "$REPO_NAME" ]; then
  REPO_NAME="angular-interview-prep"
  echo "⚠️  Could not detect repo name, using default: $REPO_NAME"
fi

echo "Repository: htirawi/$REPO_NAME"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) not found."
    echo ""
    echo "Please install it:"
    echo "  macOS:   brew install gh"
    echo "  Linux:   sudo apt install gh"
    echo "  Windows: winget install GitHub.cli"
    echo ""
    echo "Or configure manually:"
    echo "  https://github.com/htirawi/$REPO_NAME/settings"
    echo ""
    exit 1
fi

# Check if logged in
if ! gh auth status &> /dev/null; then
    echo "❌ Not logged in to GitHub CLI"
    echo "Run: gh auth login"
    echo ""
    exit 1
fi

echo "✅ GitHub CLI ready"
echo ""

# Update description
echo "📝 Setting description..."
gh repo edit "htirawi/$REPO_NAME" \
  --description "🎯 Master 400+ senior-level interview questions for Angular, React, Next.js & Redux. Professional study platform featuring beautiful UI, progress tracking, practice modes, and PWA support. Built with React 19, TypeScript & Tailwind CSS."

echo "✅ Description set"
echo ""

# Add topics
echo "🏷️  Adding topics..."
gh repo edit "htirawi/$REPO_NAME" \
  --add-topic angular \
  --add-topic react \
  --add-topic nextjs \
  --add-topic redux \
  --add-topic interview-questions \
  --add-topic interview-prep \
  --add-topic typescript \
  --add-topic tailwindcss \
  --add-topic pwa \
  --add-topic study-tool \
  --add-topic senior-developer \
  --add-topic frontend \
  --add-topic react19 \
  --add-topic vite \
  --add-topic learning-platform

echo "✅ Topics added (15 total)"
echo ""

# Update homepage (change after deployment!)
echo "🌐 Setting homepage..."
gh repo edit "htirawi/$REPO_NAME" \
  --homepage "https://github.com/htirawi/$REPO_NAME"

echo "✅ Homepage set (update after deployment!)"
echo ""

# Enable features
echo "⚙️  Configuring features..."
gh repo edit "htirawi/$REPO_NAME" \
  --enable-issues \
  --enable-wiki=false

echo "✅ Features configured"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 GitHub About section configured!"
echo ""
echo "Check it out:"
echo "  https://github.com/htirawi/$REPO_NAME"
echo ""
echo "Next steps:"
echo "1. Deploy to Vercel/Netlify"
echo "2. Update homepage URL: gh repo edit htirawi/$REPO_NAME --homepage YOUR_URL"
echo "3. (Optional) Enable Discussions for Q&A"
echo ""
echo "Your repository is now discoverable! 🚀"
echo ""

