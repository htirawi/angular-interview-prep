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

# 5. Make changes, test, commit, push
# (pre-push validation runs automatically!)
```

---

## 📖 Related Documentation

- `../docs/START-HERE.md` - Quick start guide
- `../docs/ARCHITECTURE.md` - Technical architecture
- `../.husky/` - Git hooks (automated scripts)

---

**All scripts are designed to make your workflow easier!** ⚡

_Keep scripts organized and documented for team collaboration._
