# Development Tools

This folder contains development and deployment tools for the Frontend Interview Prep application.

## 🛠️ Available Tools

### Activation Scripts

- `activate-enhanced.sh` - Activate enhanced mode
- `activate-multi-framework.sh` - Activate multi-framework mode
- `activate-pro-ui.sh` - Activate professional UI mode

### GitHub Management

- `push-to-github.sh` - Automated GitHub push with validation
- `rename-repo.sh` - Repository renaming utility
- `setup-github-repo.sh` - GitHub repository setup
- `update-github-about.sh` - Update GitHub about page

## 🚀 Usage

### Activation Scripts

```bash
# Activate enhanced mode
./scripts/tools/activate-enhanced.sh

# Activate multi-framework mode
./scripts/tools/activate-multi-framework.sh

# Activate professional UI mode
./scripts/tools/activate-pro-ui.sh
```

### GitHub Management

```bash
# Push changes to GitHub
./scripts/tools/push-to-github.sh

# Rename repository
./scripts/tools/rename-repo.sh "new-repo-name"

# Setup GitHub repository
./scripts/tools/setup-github-repo.sh

# Update GitHub about page
./scripts/tools/update-github-about.sh
```

## ⚠️ Important Notes

- **Permissions**: Ensure scripts are executable (`chmod +x *.sh`)
- **Dependencies**: Some scripts require GitHub CLI (`gh`) to be installed
- **Authentication**: GitHub scripts require proper authentication
- **Testing**: Test scripts in a safe environment before production use

## 🔧 Prerequisites

### Required Tools

- **Git**: Version control
- **GitHub CLI**: For GitHub management scripts
- **Bash**: For shell scripts
- **Node.js**: For JavaScript tools

### Installation

```bash
# Install GitHub CLI
brew install gh  # macOS
# or
sudo apt install gh  # Ubuntu

# Authenticate with GitHub
gh auth login
```

## 📚 Documentation

For more detailed information about internal scripts, see:

- [Internal Scripts](../internal/README.md) - Question management scripts
- [Internal Evaluation](../internal/EVALUATION-REPORT.md) - Script safety evaluation

---

_These tools are for development and deployment use. Always test in a safe environment before production use._
