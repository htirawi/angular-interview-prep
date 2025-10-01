#!/bin/bash

# Activation script for Professional UI/UX Version
# This switches to the expert-level, distraction-free design

echo "🎨 Angular Interview Prep - Professional UI/UX Activation"
echo "=========================================================="
echo ""

echo "🎯 New Professional Design Features:"
echo "  ✓ Sidebar with all controls (left side)"
echo "  ✓ Main content focused ONLY on questions"
echo "  ✓ Answer hidden by default (active learning)"
echo "  ✓ Clear visual separation (question vs answer)"
echo "  ✓ Minimal distractions"
echo "  ✓ Study timer included"
echo "  ✓ Personal notes per question"
echo "  ✓ Toast notifications"
echo "  ✓ Expert UX design"
echo ""

# Backup current version
echo "📦 Backing up current version..."
cp src/App.tsx src/App-current-backup.tsx 2>/dev/null || echo "  (No existing App.tsx)"
echo "  ✅ Backup created: src/App-current-backup.tsx"

echo ""
echo "🔄 Activating Professional UI..."
cp src/App-pro.tsx src/App.tsx
echo "  ✅ Professional App activated"

echo ""
echo "✨ Professional UI Activated!"
echo ""
echo "🎨 What's Different:"
echo "  • Sidebar (left) - All controls, stats, filters"
echo "  • Main content - Question-focused design"
echo "  • Answer hidden by default - Better learning"
echo "  • Show Answer button - Clear call-to-action"
echo "  • Visual separation - Question vs Answer"
echo "  • Study timer - Track your sessions"
echo "  • Notes - Add personal insights"
echo "  • Toast feedback - Non-intrusive notifications"
echo ""
echo "⌨️  Keyboard Shortcuts:"
echo "  • ← → - Navigate questions"
echo "  • A - Toggle answer visibility"
echo "  • B - Bookmark question"
echo ""
echo "📱 Responsive:"
echo "  • Desktop: Sidebar always visible"
echo "  • Mobile: Sidebar toggleable (hamburger menu)"
echo ""
echo "🏃 Next Steps:"
echo "  1. Run: pnpm dev"
echo "  2. Open: http://localhost:5173"
echo "  3. Experience the professional UI!"
echo ""
echo "🔙 To revert:"
echo "  cp src/App-current-backup.tsx src/App.tsx"
echo ""
echo "✅ Ready! Run 'pnpm dev' to see the new design."

