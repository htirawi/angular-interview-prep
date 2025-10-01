#!/bin/bash

echo "🎨 Activating Multi-Framework Support..."
echo ""

# Backup current App
if [ ! -f "src/App-single-framework-backup.tsx" ]; then
  cp src/App.tsx src/App-single-framework-backup.tsx
  echo "✅ Backed up current App.tsx"
fi

# Note: Multi-framework version needs some fixes before activation
echo "⚠️  Multi-framework version needs minor fixes"
echo ""
echo "Files created:"
echo "  ✅ src/components/FrameworkSelector.tsx"
echo "  ✅ src/components/FrameworkSwitcher.tsx"
echo "  ✅ src/App-multi-framework.tsx (draft)"
echo "  ✅ docs/MULTI-FRAMEWORK-UX-DESIGN.md"
echo ""
echo "📖 Read docs/MULTI-FRAMEWORK-UX-DESIGN.md for UX design details!"
echo ""
echo "To activate, we need to:"
echo "1. Fix TypeScript errors in App-multi-framework.tsx"
echo "2. Test the new components"
echo "3. Run: cp src/App-multi-framework.tsx src/App.tsx"
echo ""
