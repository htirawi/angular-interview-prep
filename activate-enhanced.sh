#!/bin/bash

# Activation script for Enhanced Version
# This script switches your app to use the enhanced professional features

echo "🚀 Angular Interview Prep - Enhanced Version Activation"
echo "========================================================"
echo ""

# Check if enhanced files exist
if [ ! -f "src/App-enhanced.tsx" ]; then
    echo "❌ Error: Enhanced files not found"
    echo "Please ensure you have all the enhanced component files"
    exit 1
fi

echo "📦 Step 1: Backing up original files..."
cp src/App.tsx src/App-original.tsx 2>/dev/null || echo "  ⚠️  No original App.tsx to backup"
cp src/components/QuestionCard.tsx src/components/QuestionCard-original.tsx 2>/dev/null || echo "  ⚠️  No original QuestionCard.tsx to backup"
echo "  ✅ Backups created"

echo ""
echo "🔄 Step 2: Activating enhanced components..."
cp src/App-enhanced.tsx src/App.tsx
cp src/components/QuestionCard-enhanced.tsx src/components/QuestionCard.tsx
echo "  ✅ Enhanced components activated"

echo ""
echo "📚 Step 3: Installing dependencies..."
pnpm install
echo "  ✅ Dependencies installed"

echo ""
echo "✨ Enhancement Complete!"
echo ""
echo "🎯 New Features Activated:"
echo "  • Search & Filter by category/difficulty"
echo "  • Bookmark system"
echo "  • Progress tracking with statistics"
echo "  • Random/Sequential/Bookmarked modes"
echo "  • Enhanced UI with modern design"
echo "  • PWA support (installable app)"
echo "  • Deployment ready (Vercel/Netlify/Docker)"
echo ""
echo "⌨️  New Keyboard Shortcuts:"
echo "  • B - Bookmark question"
echo "  • ← → - Navigate"
echo "  • A - Toggle answer"
echo ""
echo "📖 Documentation:"
echo "  • UPGRADE-GUIDE.md - Feature details"
echo "  • DEPLOYMENT.md - Deployment instructions"
echo "  • README-ENHANCED.md - Complete documentation"
echo ""
echo "🏃 Next Steps:"
echo "  1. Run: pnpm dev"
echo "  2. Open: http://localhost:5173"
echo "  3. Test the new features!"
echo ""
echo "  To deploy:"
echo "  • Vercel: vercel"
echo "  • Netlify: netlify deploy --prod"
echo "  • Docker: docker build -t angular-prep ."
echo ""
echo "🔙 To revert to basic version:"
echo "  • Run: cp src/App-original.tsx src/App.tsx"
echo "  • Run: cp src/components/QuestionCard-original.tsx src/components/QuestionCard.tsx"
echo ""
echo "✅ Ready to go! Run 'pnpm dev' to start."

