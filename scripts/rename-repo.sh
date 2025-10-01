#!/bin/bash

# Repository Rename Helper Script
# Run this AFTER renaming on GitHub

echo "🔄 Repository Rename Helper"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if new repo name provided
if [ -z "$1" ]; then
  echo "Usage: ./scripts/rename-repo.sh NEW_REPO_NAME"
  echo ""
  echo "Example:"
  echo "  ./scripts/rename-repo.sh frontend-interview-prep"
  echo ""
  echo "Recommended names:"
  echo "  - frontend-interview-prep  ⭐ (Recommended!)"
  echo "  - interview-prep-platform"
  echo "  - tech-interview-questions"
  echo "  - dev-interview-prep"
  echo ""
  exit 1
fi

NEW_REPO_NAME="$1"
OLD_REPO_NAME="angular-interview-prep"
GITHUB_USER="htirawi"

echo "📝 Renaming references from '$OLD_REPO_NAME' to '$NEW_REPO_NAME'..."
echo ""

# Update package.json
echo "1️⃣ Updating package.json..."
sed -i '' "s/\"name\": \"$OLD_REPO_NAME\"/\"name\": \"$NEW_REPO_NAME\"/" package.json
sed -i '' "s/$OLD_REPO_NAME/$NEW_REPO_NAME/g" package.json
echo "✅ package.json updated"

# Update README.md
echo "2️⃣ Updating README.md..."
sed -i '' "s/$OLD_REPO_NAME/$NEW_REPO_NAME/g" README.md
echo "✅ README.md updated"

# Update documentation files
echo "3️⃣ Updating documentation files..."
find docs/ -name "*.md" -type f -exec sed -i '' "s/$OLD_REPO_NAME/$NEW_REPO_NAME/g" {} \;
echo "✅ Documentation updated"

# Update workflow files
echo "4️⃣ Updating GitHub Actions workflows..."
find .github/workflows/ -name "*.yml" -type f -exec sed -i '' "s/$OLD_REPO_NAME/$NEW_REPO_NAME/g" {} \;
echo "✅ Workflows updated"

# Update constants
echo "5️⃣ Updating app constants..."
find src/ -name "*.ts" -name "*.tsx" -type f -exec sed -i '' "s/$OLD_REPO_NAME/$NEW_REPO_NAME/g" {} \;
echo "✅ Source files updated"

# Update git remote
echo "6️⃣ Updating git remote URL..."
git remote set-url origin "https://github.com/$GITHUB_USER/$NEW_REPO_NAME.git"
echo "✅ Remote URL updated"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Rename complete!"
echo ""
echo "Changes made:"
echo "  ✅ package.json (name, repository)"
echo "  ✅ README.md (all links)"
echo "  ✅ docs/*.md (repository references)"
echo "  ✅ .github/workflows/*.yml (workflow links)"
echo "  ✅ src/ files (if any references)"
echo "  ✅ git remote URL"
echo ""
echo "Next steps:"
echo "1. Review changes: git diff"
echo "2. Test build: pnpm build"
echo "3. Commit: git add -A && git commit -m 'chore: rename repository'"
echo "4. Push: git push -u origin main"
echo ""
echo "New repository URL:"
echo "  https://github.com/$GITHUB_USER/$NEW_REPO_NAME"
echo ""

