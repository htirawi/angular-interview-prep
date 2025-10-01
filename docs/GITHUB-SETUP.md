# 🚀 GitHub Repository Setup Guide

Follow these steps to create a GitHub repository and push your Angular Interview Prep project.

## 📋 Prerequisites

- GitHub account
- Git installed on your machine
- Terminal access

---

## 🔧 Step-by-Step Instructions

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in the details:
   - **Repository name**: `angular-interview-prep`
   - **Description**: `Professional Angular senior interview preparation with 100 curated questions`
   - **Visibility**: Choose Public or Private
   - **DO NOT** check "Add README" (we already have one)
   - **DO NOT** check "Add .gitignore" (we already have one)
4. Click **"Create repository"**

### Step 2: Run the Setup Script

We've prepared a script that will initialize git, commit all files, and push to GitHub.

**Option A: Run the automated script**

```bash
./push-to-github.sh YOUR_GITHUB_USERNAME
```

**Option B: Manual commands** (if you prefer to do it manually)

Copy and paste these commands one by one:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Angular Senior Interview Prep

- 100 curated Angular interview questions
- Search & filter functionality
- Progress tracking with bookmarks
- Multiple practice modes (Sequential, Random, Bookmarked)
- Professional UI with dark mode
- PWA support
- Comprehensive test coverage (49 tests)
- Production-ready deployment configs"

# Add your GitHub repository as remote
# Replace YOUR_USERNAME and REPO_NAME with your actual values
git remote add origin https://github.com/YOUR_USERNAME/angular-interview-prep.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## ✅ What Gets Pushed

The `.gitignore` file is configured to **include**:

- ✅ All source code (`src/`)
- ✅ Configuration files
- ✅ Tests
- ✅ README.md
- ✅ Deployment configs
- ✅ Public assets

And **exclude**:

- ❌ `node_modules/`
- ❌ `dist/` (build output)
- ❌ Other .md documentation files (except README)
- ❌ Backup files (\*-original.tsx)
- ❌ IDE-specific files

---

## 📊 Repository Statistics

After pushing, your repo will contain:

- **6 test files** with 49 passing tests
- **100 interview questions** with metadata
- **10+ React components**
- **Complete TypeScript** setup
- **Production-ready** deployment configurations

---

## 🎨 Make Your Repository Stand Out

### Add a License

```bash
# Add MIT license
curl -o LICENSE https://raw.githubusercontent.com/licenses/license-templates/master/templates/mit.txt
# Edit LICENSE file to add your name and year
git add LICENSE
git commit -m "Add MIT license"
git push
```

### Add Topics/Tags

Go to your repository on GitHub and add these topics:

- `angular`
- `interview-questions`
- `react`
- `typescript`
- `vite`
- `tailwindcss`
- `interview-prep`
- `pwa`
- `senior-developer`

### Enable GitHub Pages

1. Go to repository Settings → Pages
2. Source: GitHub Actions
3. Your site will be available at: `https://YOUR_USERNAME.github.io/angular-interview-prep`

---

## 🚀 Deploy to Production

After pushing to GitHub, deploy to these platforms:

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
# Follow the prompts and link to your GitHub repo
```

### Netlify

```bash
npm i -g netlify-cli
netlify init
# Choose "Create & configure a new site"
# Link to your GitHub repository
```

---

## 📝 Update README Badges

After deployment, update your README.md badges:

```markdown
[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://your-deployment-url.vercel.app)
[![GitHub Stars](https://img.shields.io/github/stars/YOUR_USERNAME/angular-interview-prep)](https://github.com/YOUR_USERNAME/angular-interview-prep)
[![Test Coverage](https://img.shields.io/badge/tests-49%20passing-brightgreen)]()
```

---

## 🤝 After Pushing

1. **Add repository description** on GitHub
2. **Add topics/tags** for discoverability
3. **Enable GitHub Pages** (free hosting!)
4. **Share on LinkedIn/Twitter**
5. **Star your own repo** (why not? 😊)

---

## 🔄 Making Updates

After making changes:

```bash
# Check what changed
git status

# Add changes
git add .

# Commit with descriptive message
git commit -m "Add new feature: [description]"

# Push to GitHub
git push
```

---

## 🆘 Troubleshooting

### "Permission denied (publickey)"

You need to set up SSH keys or use HTTPS with a personal access token.
[GitHub SSH Setup Guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

### "Updates were rejected"

Someone else pushed changes. Pull first:

```bash
git pull origin main --rebase
git push
```

### "Large files warning"

Check that `node_modules/` is in `.gitignore`:

```bash
echo "node_modules/" >> .gitignore
git rm -r --cached node_modules/
git commit -m "Remove node_modules"
```

---

## 🎉 Success!

Once pushed, your repository will be live at:
**https://github.com/YOUR_USERNAME/angular-interview-prep**

Share it with your network and help others prepare for their Angular interviews!

---

**Questions?** Open an issue on GitHub or check the documentation.

Good luck! 🚀
