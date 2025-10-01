#!/bin/bash

# GitHub Repository Enhancement Script
# Run this after creating your repository

echo "🚀 GitHub Repository Enhancement Script"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "ℹ️  GitHub CLI (gh) not found."
    echo ""
    echo "Install it for automated setup:"
    echo "  macOS:   brew install gh"
    echo "  Linux:   sudo apt install gh"
    echo "  Windows: winget install GitHub.cli"
    echo ""
    echo "Or configure manually via GitHub website:"
    echo "  https://github.com/htirawi/angular-interview-prep/settings"
    echo ""
    exit 0
fi

# Check if logged in
if ! gh auth status &> /dev/null; then
    echo "❌ Not logged in to GitHub CLI"
    echo "Run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI found and authenticated"
echo ""

# Update repository description
echo "📝 Updating repository description..."
gh repo edit htirawi/angular-interview-prep \
  --description "🎯 400+ senior-level interview questions for Angular, React, Next.js & Redux. Professional study platform with progress tracking, PWA support, and enterprise architecture. Built with React 19, TypeScript & Tailwind CSS."

echo "✅ Description updated"
echo ""

# Add topics
echo "🏷️  Adding repository topics..."
gh repo edit htirawi/angular-interview-prep \
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
  --add-topic rxjs \
  --add-topic react19 \
  --add-topic vite \
  --add-topic learning-platform

echo "✅ Topics added (15 total)"
echo ""

# Update homepage (update this after deployment)
echo "🌐 Setting homepage URL..."
gh repo edit htirawi/angular-interview-prep \
  --homepage "https://angular-interview-prep.vercel.app"

echo "✅ Homepage set (update after deployment!)"
echo ""

# Enable features
echo "⚙️  Enabling repository features..."
gh repo edit htirawi/angular-interview-prep \
  --enable-issues \
  --enable-wiki=false

echo "✅ Issues enabled, Wiki disabled (we use docs/)"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ GitHub repository enhanced!"
echo ""
echo "Next steps:"
echo "1. Visit: https://github.com/htirawi/angular-interview-prep"
echo "2. Check the About section (should show description + topics)"
echo "3. Deploy to Vercel/Netlify and update homepage URL"
echo "4. (Optional) Upload social preview image (1200x630px)"
echo ""
echo "Your repository is now optimized for discovery! 🎉"
echo ""

