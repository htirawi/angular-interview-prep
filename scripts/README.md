# 🔧 Scripts Directory

Utility scripts for the Angular Interview Prep project.

---

## 📜 Available Scripts

### **activate-enhanced.sh**

Activates the enhanced version with all features.

```bash
./scripts/activate-enhanced.sh
```

**What it does:**

- Backs up current version
- Switches to enhanced App.tsx with all features
- Shows what's new

---

### **activate-pro-ui.sh**

Activates the professional UI with sidebar layout.

```bash
./scripts/activate-pro-ui.sh
```

**What it does:**

- Backs up current version
- Switches to professional UI (sidebar + focused content)
- Answer hidden by default
- Expert UX design

**Recommended!** ⭐ This is the best UX version.

---

### **push-to-github.sh**

Automated GitHub repository setup and push.

```bash
./scripts/push-to-github.sh YOUR_GITHUB_USERNAME
```

**What it does:**

- Validates prerequisites
- Runs tests
- Initializes git
- Creates initial commit
- Pushes to GitHub
- Shows next steps

**Example:**

```bash
./scripts/push-to-github.sh htirawi
```

---

### **convert-md-to-ts.cjs** ⚡ **New!**

Converts markdown interview questions to TypeScript.

```bash
node scripts/convert-md-to-ts.cjs
```

**What it does:**

- Parses markdown question files (\*.md)
- Extracts questions and answers
- Generates TypeScript files with proper types
- Creates one .ts file per framework

**Input format:**

```markdown
### 1) Question here?

**Answer (senior-level):**

- Point 1
- Point 2
```

**Output format:**

```typescript
export const FRAMEWORK_QUESTIONS: QA[] = [
  {
    id: 1,
    question: `Question here?`,
    answer: `Point 1\nPoint 2`,
  },
];
```

**Supported frameworks:**

- Next.js → `nextjs.ts`
- React → `react.ts`
- Redux → `redux.ts`

---

## 🎯 Which Script Should I Use?

### First Time Setup

```bash
# 1. Activate professional UI (recommended)
./scripts/activate-pro-ui.sh

# 2. Test locally
pnpm dev

# 3. If you haven't pushed to GitHub yet
./scripts/push-to-github.sh YOUR_USERNAME
```

### Already on GitHub?

```bash
# Just activate the pro UI
./scripts/activate-pro-ui.sh
pnpm dev
```

### Adding New Questions?

```bash
# 1. Add/edit markdown file in src/data/*.md
# 2. Run converter
node scripts/convert-md-to-ts.cjs
# 3. TypeScript files auto-generated!
```

---

## 🔍 Script Details

### activate-enhanced.sh

- **Purpose**: Feature-rich version (all features visible)
- **Best for**: Showcasing all features
- **UI**: All controls in main area
- **Backup**: Creates `src/App-enhanced-backup.tsx`

### activate-pro-ui.sh ⭐ **Recommended**

- **Purpose**: Professional, distraction-free design
- **Best for**: Actual studying & portfolio showcase
- **UI**: Sidebar + focused question area
- **Backup**: Creates `src/App-current-backup.tsx`
- **Benefits**:
  - Better learning (answer hidden)
  - Less cognitive load
  - Professional appearance
  - Mobile-friendly

### push-to-github.sh

- **Purpose**: One-command GitHub setup
- **Best for**: Initial repository setup
- **Requires**: GitHub repo already created
- **Automated**:
  - Git initialization
  - Comprehensive commit message
  - Push to remote
  - Success confirmation

### convert-md-to-ts.cjs

- **Purpose**: Convert markdown questions to TypeScript
- **Best for**: Adding new question sets (frameworks)
- **Automated**:
  - Parse markdown format
  - Generate typed TypeScript
  - Handle 100+ questions per file
  - Proper escaping of special characters

---

## 🛠️ Making Scripts Executable

If scripts aren't executable:

```bash
chmod +x scripts/*.sh
```

Or individually:

```bash
chmod +x scripts/activate-pro-ui.sh
chmod +x scripts/push-to-github.sh
```

---

## 📝 Adding New Scripts

When adding new scripts:

1. **Create in `scripts/` folder**

   ```bash
   touch scripts/my-script.sh
   ```

2. **Add shebang** at the top

   ```bash
   #!/bin/bash
   ```

3. **Make executable**

   ```bash
   chmod +x scripts/my-script.sh
   ```

4. **Document it** here in this README

5. **Test it** before committing

---

## 🔧 Adding New Question Sets

Want to add TypeScript, Vue, or other framework questions?

1. **Create markdown file** in `src/data/`

   ```bash
   # Format: framework-100-questions.md
   touch src/data/typescript-100-questions.md
   ```

2. **Follow this format:**

   ````markdown
   # Framework Name — 100 Mock Interview Questions

   ---

   ### 1) First question?

   **Answer (senior-level):**

   - Answer point 1
   - Answer point 2

   ### 2) Second question?

   **Answer (senior-level):**

   - Answer here

   ```

   ```
   ````

3. **Update converter script** (`convert-md-to-ts.cjs`):

   ```javascript
   const frameworks = [
     { name: "angular", file: "angular-100-questions.md" },
     { name: "typescript", file: "typescript-100-questions.md" }, // Add this
   ];
   ```

4. **Run converter:**

   ```bash
   node scripts/convert-md-to-ts.cjs
   ```

5. **Update `src/data/index.ts`** to export new questions

---

## 🔒 Security

These scripts:

- ✅ Run locally only
- ✅ No external downloads
- ✅ No secrets required
- ✅ Safe to execute
- ✅ Can be reviewed (plain text)

---

## 🎯 Recommended Workflow

```bash
# 1. Clone repo
git clone https://github.com/htirawi/angular-interview-prep.git
cd angular-interview-prep

# 2. Install dependencies
pnpm install

# 3. Activate professional UI
./scripts/activate-pro-ui.sh

# 4. Start development
pnpm dev

# 5. Add new questions (optional)
# Edit src/data/new-framework-100-questions.md
node scripts/convert-md-to-ts.cjs

# 6. Make changes, test, commit, push
# (pre-push validation runs automatically!)
```

---

## 📊 Script Statistics

```
Total Scripts:        4
Shell Scripts:        3
Node.js Scripts:      1
Lines of Code:        ~250
Questions Processed:  300+ (100 per framework)
Time Saved:          Hours of manual typing!
```

---

## 📖 Related Documentation

- `../docs/START-HERE.md` - Quick start guide
- `../docs/ARCHITECTURE.md` - Technical architecture
- `../.husky/` - Git hooks (automated scripts)

---

**All scripts are designed to make your workflow easier!** ⚡

_Keep scripts organized and documented for team collaboration._
