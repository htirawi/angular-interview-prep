import type { QA } from "../types/question";

export const RANDOM_ENHANCED_QUESTIONS: QA[] = [
  // Git Topics (5-10 questions)
  {
    id: 1,
    question: "What is Git cherry-pick? How do you use it and when should you avoid it?",
    answer:
      "Git cherry-pick allows you to apply specific commits from one branch to another branch. It creates a new commit with the same changes but a different commit hash.\n\n" +
      "**Basic Usage:**\n" +
      "```bash\n" +
      "git checkout target-branch\n" +
      "git cherry-pick <commit-hash>\n" +
      "```\n" +
      "To cherry-pick multiple commits:\n" +
      "```bash\n" +
      "git cherry-pick <commit-hash-1> <commit-hash-2> ...\n" +
      "```\n" +
      "To cherry-pick a range of commits (exclusive..inclusive):\n" +
      "```bash\n" +
      "git cherry-pick A..B\n" +
      "```\n" +
      "To cherry-pick a range of commits (inclusive..inclusive):\n" +
      "```bash\n" +
      "git cherry-pick A^..B\n" +
      "```\n\n" +
      "**Potential Drawbacks:**\n" +
      "- **Duplicate Commits**: Cherry-picking creates duplicate commits with different hashes, which can lead to confusion and make history harder to follow, especially if the original branch is later merged.\n" +
      "- **Merge Conflicts**: If the changes in the cherry-picked commit conflict with the target branch, you'll need to resolve them manually.\n" +
      "- **Loss of Context**: The new commit doesn't inherently carry the full context of its original branch, which might be important for understanding the change.\n" +
      "- **Code Duplication**: If the original branch is eventually merged, the cherry-picked changes will appear twice in the history (once as the cherry-pick, once as part of the merge), though Git usually handles this gracefully.\n\n" +
      "**Best Practices:**\n" +
      "- Use sparingly for small, isolated changes.\n" +
      "- Prefer merging or rebasing for integrating entire features or branches.\n" +
      "- Communicate with your team when cherry-picking to avoid confusion.\n" +
      "- Consider `git revert` if you need to undo a specific commit that has already been shared.",
    category: "Git",
    difficulty: "intermediate",
    tags: ["git", "version-control", "cherry-pick", "hotfix", "branching"],
  },
  {
    id: 2,
    question: "What is Git stash? How do you use it effectively in your workflow?",
    answer:
      "Git stash temporarily saves uncommitted changes so you can work on something else, then come back and re-apply them later.\n\n" +
      "**Basic Commands:**\n" +
      "```bash\n" +
      "# Stash current changes\n" +
      "git stash\n\n" +
      "# Stash with a message\n" +
      'git stash push -m "WIP: working on feature X"\n\n' +
      "# List all stashes\n" +
      "git stash list\n\n" +
      "# Apply the most recent stash\n" +
      "git stash apply\n\n" +
      "# Apply and remove the most recent stash\n" +
      "git stash pop\n\n" +
      "# Apply a specific stash\n" +
      "git stash apply stash@{2}\n\n" +
      "# Drop a specific stash\n" +
      "git stash drop stash@{1}\n\n" +
      "# Clear all stashes\n" +
      "git stash clear\n" +
      "```\n\n" +
      "**Advanced Usage:**\n" +
      "```bash\n" +
      "# Stash only staged changes\n" +
      "git stash --staged\n\n" +
      "# Stash only unstaged changes\n" +
      "git stash --keep-index\n\n" +
      "# Stash including untracked files\n" +
      "git stash -u\n\n" +
      "# Stash including ignored files\n" +
      "git stash -a\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Use descriptive messages when stashing\n" +
      "- Regularly clean up old stashes\n" +
      "- Use `git stash pop` when you're sure you want to apply and remove\n" +
      "- Use `git stash apply` when you want to keep the stash for later",
    category: "Git",
    difficulty: "intermediate",
    tags: ["git", "stash", "workflow", "temporary-changes"],
  },
  {
    id: 3,
    question: "What is Git revert? How does it differ from reset and when should you use it?",
    answer:
      "Git revert creates a new commit that undoes the changes from a previous commit, while keeping the commit history intact.\n\n" +
      "**Basic Usage:**\n" +
      "```bash\n" +
      "# Revert a specific commit\n" +
      "git revert <commit-hash>\n\n" +
      "# Revert multiple commits\n" +
      "git revert <commit-hash-1> <commit-hash-2>\n\n" +
      "# Revert a merge commit\n" +
      "git revert -m 1 <merge-commit-hash>\n" +
      "```\n\n" +
      "**Git Revert vs Reset vs Rebase:**\n" +
      "- **Revert**: Creates new commits, safe for shared branches, preserves history\n" +
      "- **Reset**: Moves branch pointer, dangerous for shared branches, rewrites history\n" +
      "- **Rebase**: Rewrites commits, dangerous for shared branches, creates linear history\n\n" +
      "**When to Use Revert:**\n" +
      "- Undoing changes that have been pushed to shared repositories\n" +
      "- Fixing bugs in production without losing history\n" +
      "- When you need to maintain a clear audit trail\n" +
      "- Rolling back specific commits while keeping others\n\n" +
      "**Example Workflow:**\n" +
      "```bash\n" +
      "# Accidentally committed a bug\n" +
      "git log --oneline\n" +
      "# abc1234 Fix user authentication\n" +
      "# def5678 Add new feature\n" +
      "# ghi9012 Bug: memory leak\n" +
      "\n" +
      "# Revert the buggy commit\n" +
      "git revert ghi9012\n" +
      "\n" +
      "# Push the revert\n" +
      "git push origin main\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Always use revert for shared/public commits\n" +
      "- Write clear commit messages for reverts\n" +
      "- Test the revert before pushing\n" +
      "- Consider the impact on other developers",
    category: "Git",
    difficulty: "intermediate",
    tags: ["git", "revert", "reset", "history", "undo"],
  },
  {
    id: 4,
    question:
      "How do you remove a commit from a branch using Git? Explain different approaches and their implications.",
    answer:
      "There are several ways to remove commits from a branch, each with different implications for your repository history.\n\n" +
      "**1. Git Reset (Local Branches Only):**\n" +
      "```bash\n" +
      "# Soft reset - keeps changes staged\n" +
      "git reset --soft HEAD~1\n\n" +
      "# Mixed reset (default) - keeps changes unstaged\n" +
      "git reset HEAD~1\n" +
      "git reset --mixed HEAD~1\n\n" +
      "# Hard reset - completely removes changes\n" +
      "git reset --hard HEAD~1\n\n" +
      "# Reset to specific commit\n" +
      "git reset --hard <commit-hash>\n" +
      "```\n\n" +
      "**2. Git Rebase Interactive (Local Branches Only):**\n" +
      "```bash\n" +
      "# Interactive rebase to edit last 3 commits\n" +
      "git rebase -i HEAD~3\n" +
      "\n" +
      "# In the editor, change 'pick' to 'drop' for commits to remove\n" +
      "# pick abc1234 First commit\n" +
      "# drop def5678 Second commit (will be removed)\n" +
      "# pick ghi9012 Third commit\n" +
      "```\n\n" +
      "**3. Git Revert (Safe for Shared Branches):**\n" +
      "```bash\n" +
      "# Creates new commit that undoes changes\n" +
      "git revert <commit-hash>\n" +
      "```\n\n" +
      "**4. Force Push (Dangerous - Use with Caution):**\n" +
      "```bash\n" +
      "# After local reset/rebase, force push to update remote\n" +
      "git push --force-with-lease origin branch-name\n" +
      "```\n\n" +
      "**Implications and Risks:**\n" +
      "- **Reset/Rebase**: Rewrites history, can cause issues for other developers\n" +
      "- **Force Push**: Can overwrite others' work, use `--force-with-lease` for safety\n" +
      "- **Revert**: Safe but creates additional commits\n\n" +
      "**Best Practices:**\n" +
      "- Use revert for shared/public commits\n" +
      "- Use reset/rebase only for local commits\n" +
      "- Communicate with team before force pushing\n" +
      "- Always backup important work before destructive operations",
    category: "Git",
    difficulty: "advanced",
    tags: ["git", "reset", "rebase", "revert", "history", "force-push"],
  },
  {
    id: 5,
    question:
      "Explain Git branching strategies. What are the differences between Git Flow, GitHub Flow, and GitLab Flow?",
    answer:
      "Different branching strategies provide different approaches to managing code changes and releases in Git repositories.\n\n" +
      "**Git Flow:**\n" +
      "```bash\n" +
      "# Main branches\n" +
      "main/master    # Production-ready code\n" +
      "develop        # Integration branch for features\n" +
      "\n" +
      "# Supporting branches\n" +
      "feature/*      # New features\n" +
      "release/*      # Preparing releases\n" +
      "hotfix/*       # Emergency fixes\n" +
      "```\n" +
      "- **Pros**: Clear structure, good for complex projects, supports multiple releases\n" +
      "- **Cons**: Complex, many branches to manage, can slow down development\n" +
      "- **Best for**: Large teams, complex projects with multiple releases\n\n" +
      "**GitHub Flow:**\n" +
      "```bash\n" +
      "# Simple structure\n" +
      "main          # Production-ready code\n" +
      "feature/*     # Feature branches\n" +
      "```\n" +
      "- **Pros**: Simple, fast deployment, easy to understand\n" +
      "- **Cons**: No release branches, requires good CI/CD\n" +
      "- **Best for**: Web applications, continuous deployment\n\n" +
      "**GitLab Flow:**\n" +
      "```bash\n" +
      "# Environment-based\n" +
      "main          # Production\n" +
      "staging       # Pre-production testing\n" +
      "pre-production # Additional testing\n" +
      "feature/*     # Feature branches\n" +
      "```\n" +
      "- **Pros**: Environment-based, good for complex deployments\n" +
      "- **Cons**: More complex than GitHub Flow\n" +
      "- **Best for**: Enterprise applications, complex deployment pipelines\n\n" +
      "**Choosing a Strategy:**\n" +
      "- **Small teams, simple projects**: GitHub Flow\n" +
      "- **Large teams, complex projects**: Git Flow\n" +
      "- **Enterprise, complex deployments**: GitLab Flow\n" +
      "- **Open source projects**: GitHub Flow or Git Flow\n\n" +
      "**Best Practices:**\n" +
      "- Choose one strategy and stick to it\n" +
      "- Document your branching strategy\n" +
      "- Use pull/merge requests for code review\n" +
      "- Automate testing and deployment",
    category: "Git",
    difficulty: "advanced",
    tags: ["git", "branching", "workflow", "gitflow", "github-flow", "gitlab-flow"],
  },
  {
    id: 6,
    question:
      "What are CSS units? Explain the differences between px, em, rem, vw, vh, and when to use each.",
    answer:
      "CSS units determine how elements are sized and positioned. Understanding different units is crucial for responsive design.\n\n" +
      "**Absolute Units:**\n" +
      "```css\n" +
      "/* Pixels - fixed size, not scalable */\n" +
      ".fixed-size {\n" +
      "  width: 200px;\n" +
      "  height: 100px;\n" +
      "  font-size: 16px;\n" +
      "}\n" +
      "```\n" +
      "- **px**: Fixed size, not affected by user settings\n" +
      "- **pt**: Points (1/72 inch), mainly for print\n" +
      "- **in, cm, mm**: Physical measurements\n\n" +
      "**Relative Units:**\n" +
      "```css\n" +
      "/* em - relative to parent element's font-size */\n" +
      ".parent {\n" +
      "  font-size: 20px;\n" +
      "}\n" +
      ".child {\n" +
      "  font-size: 1.5em; /* 30px (20px * 1.5) */\n" +
      "  margin: 2em; /* 40px (20px * 2) */\n" +
      "}\n" +
      "\n" +
      "/* rem - relative to root element's font-size */\n" +
      "html {\n" +
      "  font-size: 16px;\n" +
      "}\n" +
      ".element {\n" +
      "  font-size: 1.5rem; /* 24px (16px * 1.5) */\n" +
      "  margin: 2rem; /* 32px (16px * 2) */\n" +
      "}\n" +
      "```\n\n" +
      "**Viewport Units:**\n" +
      "```css\n" +
      "/* Viewport width and height */\n" +
      ".fullscreen {\n" +
      "  width: 100vw; /* 100% of viewport width */\n" +
      "  height: 100vh; /* 100% of viewport height */\n" +
      "}\n" +
      "\n" +
      "/* Responsive text */\n" +
      ".responsive-text {\n" +
      "  font-size: 4vw; /* Scales with viewport width */\n" +
      "}\n" +
      "\n" +
      "/* Minimum and maximum viewport */\n" +
      ".min-max {\n" +
      "  width: 50vmin; /* 50% of smaller viewport dimension */\n" +
      "  height: 50vmax; /* 50% of larger viewport dimension */\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use Each:**\n" +
      "- **px**: Fixed layouts, borders, precise positioning\n" +
      "- **em**: Relative to parent, component-level scaling\n" +
      "- **rem**: Relative to root, consistent scaling across components\n" +
      "- **vw/vh**: Full-screen layouts, responsive typography\n" +
      "- **%**: Relative to parent container\n\n" +
      "**Best Practices:**\n" +
      "- Use rem for font-sizes and spacing\n" +
      "- Use em for component-relative sizing\n" +
      "- Use vw/vh for responsive layouts\n" +
      "- Use px for borders and precise measurements\n" +
      "- Combine units for flexible designs",
    category: "CSS",
    difficulty: "intermediate",
    tags: ["css", "units", "responsive", "px", "em", "rem", "vw", "vh"],
  },
  {
    id: 7,
    question:
      "What is the CSS Box Model? Explain content, padding, border, and margin with examples.",
    answer:
      "The CSS Box Model describes how elements are rendered, consisting of content, padding, border, and margin layers.\n\n" +
      "**Box Model Components:**\n" +
      "```css\n" +
      ".box {\n" +
      "  /* Content area */\n" +
      "  width: 200px;\n" +
      "  height: 100px;\n" +
      "  background-color: lightblue;\n" +
      "  \n" +
      "  /* Padding - space inside the element */\n" +
      "  padding: 20px;\n" +
      "  \n" +
      "  /* Border - line around the element */\n" +
      "  border: 2px solid black;\n" +
      "  \n" +
      "  /* Margin - space outside the element */\n" +
      "  margin: 10px;\n" +
      "}\n" +
      "```\n\n" +
      "**Box Sizing:**\n" +
      "```css\n" +
      "/* Default box-sizing: content-box */\n" +
      ".content-box {\n" +
      "  width: 200px;\n" +
      "  padding: 20px;\n" +
      "  border: 2px solid black;\n" +
      "  /* Total width = 200px + 40px (padding) + 4px (border) = 244px */\n" +
      "}\n" +
      "\n" +
      "/* Border-box includes padding and border in width */\n" +
      ".border-box {\n" +
      "  box-sizing: border-box;\n" +
      "  width: 200px;\n" +
      "  padding: 20px;\n" +
      "  border: 2px solid black;\n" +
      "  /* Total width = 200px (includes padding and border) */\n" +
      "}\n" +
      "```\n\n" +
      "**Margin Collapse:**\n" +
      "```css\n" +
      "/* Vertical margins collapse to the larger value */\n" +
      ".box1 {\n" +
      "  margin-bottom: 20px;\n" +
      "}\n" +
      ".box2 {\n" +
      "  margin-top: 30px;\n" +
      "  /* Total space between boxes = 30px (not 50px) */\n" +
      "}\n" +
      "\n" +
      "/* Horizontal margins don't collapse */\n" +
      ".inline-box {\n" +
      "  margin-left: 10px;\n" +
      "  margin-right: 15px;\n" +
      "  /* Total space = 25px */\n" +
      "}\n" +
      "```\n\n" +
      "**Practical Examples:**\n" +
      "```css\n" +
      "/* Card component */\n" +
      ".card {\n" +
      "  width: 300px;\n" +
      "  padding: 20px;\n" +
      "  border: 1px solid #ddd;\n" +
      "  border-radius: 8px;\n" +
      "  margin: 16px;\n" +
      "  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n" +
      "}\n" +
      "\n" +
      "/* Button with consistent spacing */\n" +
      ".button {\n" +
      "  padding: 12px 24px;\n" +
      "  border: 2px solid transparent;\n" +
      "  margin: 8px;\n" +
      "  border-radius: 4px;\n" +
      "}\n" +
      "\n" +
      "/* Layout with box-sizing reset */\n" +
      "* {\n" +
      "  box-sizing: border-box;\n" +
      "}\n" +
      "\n" +
      ".container {\n" +
      "  width: 100%;\n" +
      "  max-width: 1200px;\n" +
      "  margin: 0 auto;\n" +
      "  padding: 0 20px;\n" +
      "}\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Use `box-sizing: border-box` for predictable layouts\n" +
      "- Understand margin collapse behavior\n" +
      "- Use padding for internal spacing\n" +
      "- Use margin for external spacing\n" +
      "- Consider using CSS Grid or Flexbox for complex layouts",
    category: "CSS",
    difficulty: "intermediate",
    tags: ["css", "box-model", "padding", "border", "margin", "box-sizing"],
  },
  {
    id: 8,
    question:
      "What is Angular Material? How do you implement and customize Material Design components?",
    answer:
      "Angular Material is a UI component library that implements Google's Material Design principles for Angular applications.\n\n" +
      "**Installation:**\n" +
      "```bash\n" +
      "# Install Angular Material\n" +
      "ng add @angular/material\n" +
      "\n" +
      "# Choose theme, animations, and typography\n" +
      "# Select pre-built theme (e.g., Indigo/Pink)\n" +
      "# Set up HammerJS for gestures\n" +
      "# Set up browser animations\n" +
      "```\n\n" +
      "**Basic Setup:**\n" +
      "```typescript\n" +
      "// app.module.ts\n" +
      "import { NgModule } from '@angular/core';\n" +
      "import { MatButtonModule } from '@angular/material/button';\n" +
      "import { MatCardModule } from '@angular/material/card';\n" +
      "import { MatInputModule } from '@angular/material/input';\n" +
      "import { MatFormFieldModule } from '@angular/material/form-field';\n" +
      "\n" +
      "@NgModule({\n" +
      "  imports: [\n" +
      "    MatButtonModule,\n" +
      "    MatCardModule,\n" +
      "    MatInputModule,\n" +
      "    MatFormFieldModule\n" +
      "  ]\n" +
      "})\n" +
      "export class AppModule { }\n" +
      "```\n\n" +
      "**Component Usage:**\n" +
      "```html\n" +
      "<!-- Basic Material components -->\n" +
      "<mat-card>\n" +
      "  <mat-card-header>\n" +
      "    <mat-card-title>User Profile</mat-card-title>\n" +
      "  </mat-card-header>\n" +
      "  <mat-card-content>\n" +
      "    <mat-form-field>\n" +
      "      <mat-label>Name</mat-label>\n" +
      '      <input matInput [(ngModel)]="user.name">\n' +
      "    </mat-form-field>\n" +
      "  </mat-card-content>\n" +
      "  <mat-card-actions>\n" +
      '    <button mat-raised-button color="primary">Save</button>\n' +
      "    <button mat-button>Cancel</button>\n" +
      "  </mat-card-actions>\n" +
      "</mat-card>\n" +
      "```\n\n" +
      "**Theming and Customization:**\n" +
      "```scss\n" +
      "// styles.scss\n" +
      "@import '~@angular/material/theming';\n" +
      "\n" +
      "// Define custom theme\n" +
      "$custom-primary: mat-palette($mat-blue, 600);\n" +
      "$custom-accent: mat-palette($mat-orange, 500);\n" +
      "$custom-warn: mat-palette($mat-red, 500);\n" +
      "\n" +
      "$custom-theme: mat-light-theme(\n" +
      "  $custom-primary,\n" +
      "  $custom-accent,\n" +
      "  $custom-warn\n" +
      ");\n" +
      "\n" +
      "@include angular-material-theme($custom-theme);\n" +
      "\n" +
      "// Dark theme\n" +
      "$dark-theme: mat-dark-theme(\n" +
      "  $custom-primary,\n" +
      "  $custom-accent,\n" +
      "  $custom-warn\n" +
      ");\n" +
      "\n" +
      ".dark-theme {\n" +
      "  @include angular-material-theme($dark-theme);\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Components:**\n" +
      "```html\n" +
      "<!-- Data table -->\n" +
      '<mat-table [dataSource]="dataSource">\n' +
      '  <ng-container matColumnDef="name">\n' +
      "    <mat-header-cell *matHeaderCellDef>Name</mat-header-cell>\n" +
      '    <mat-cell *matCellDef="let element">{{element.name}}</mat-cell>\n' +
      "  </ng-container>\n" +
      "  \n" +
      '  <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>\n' +
      '  <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>\n' +
      "</mat-table>\n" +
      "\n" +
      "<!-- Dialog -->\n" +
      '<button mat-raised-button (click)="openDialog()">Open Dialog</button>\n' +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Import only needed modules to reduce bundle size\n" +
      "- Use consistent theming across the application\n" +
      "- Follow Material Design guidelines\n" +
      "- Implement proper accessibility features\n" +
      "- Use Angular CDK for custom components",
    category: "Angular Material",
    difficulty: "intermediate",
    tags: ["angular-material", "material-design", "ui-components", "theming", "angular"],
  },
  {
    id: 9,
    question:
      "How do you handle large datasets (1000+ records) in Angular? Explain lazy loading, ngFor optimization, trackBy functions, virtual scrolling, pagination, and performance strategies.",
    answer:
      "Handling large datasets in Angular requires multiple optimization strategies to maintain performance and provide a smooth user experience. Here's a comprehensive approach:\n\n" +
      "**1. TrackBy Function (Critical for ngFor):**\n" +
      "```typescript\n" +
      "// component.ts\n" +
      "export class DataTableComponent {\n" +
      "  items: Item[] = [];\n" +
      "  \n" +
      "  // TrackBy function - Angular uses this to identify items\n" +
      "  trackByFn(index: number, item: Item): number {\n" +
      "    return item.id; // Use unique identifier\n" +
      "  }\n" +
      "  \n" +
      "  // Alternative: Track by index (less efficient)\n" +
      "  trackByIndex(index: number, item: Item): number {\n" +
      "    return index;\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "```html\n" +
      "<!-- component.html -->\n" +
      "<!-- Without trackBy - Angular recreates all DOM elements -->\n" +
      '<div *ngFor="let item of items">\n' +
      "  {{ item.name }}\n" +
      "</div>\n" +
      "\n" +
      "<!-- With trackBy - Angular reuses existing DOM elements -->\n" +
      '<div *ngFor="let item of items; trackBy: trackByFn">\n' +
      "  {{ item.name }}\n" +
      "</div>\n" +
      "```\n\n" +
      "**2. Virtual Scrolling (CDK):**\n" +
      "```bash\n" +
      "# Install Angular CDK\n" +
      "ng add @angular/cdk\n" +
      "```\n\n" +
      "```typescript\n" +
      "// app.module.ts\n" +
      "import { ScrollingModule } from '@angular/cdk/scrolling';\n" +
      "\n" +
      "@NgModule({\n" +
      "  imports: [ScrollingModule]\n" +
      "})\n" +
      "export class AppModule { }\n" +
      "```\n\n" +
      "```html\n" +
      "<!-- Only renders visible items (typically 10-20 DOM elements) -->\n" +
      "<cdk-virtual-scroll-viewport \n" +
      '  itemSize="50" \n' +
      '  class="viewport"\n' +
      '  style="height: 400px;">\n' +
      '  <div *cdkVirtualFor="let item of items; trackBy: trackByFn">\n' +
      '    <div class="item-row">\n' +
      "      <span>{{ item.name }}</span>\n" +
      "      <span>{{ item.email }}</span>\n" +
      "    </div>\n" +
      "  </div>\n" +
      "</cdk-virtual-scroll-viewport>\n" +
      "```\n\n" +
      "**Performance Tips Summary:**\n" +
      "- **Always use trackBy** for ngFor loops\n" +
      "- **Implement virtual scrolling** for lists > 100 items\n" +
      "- **Use OnPush change detection** for list items\n" +
      "- **Implement pagination** or infinite scroll\n" +
      "- **Cache data** to avoid repeated API calls\n" +
      "- **Use Web Workers** for heavy data processing\n" +
      "- **Monitor performance** with browser dev tools\n" +
      "- **Consider server-side filtering/sorting**\n" +
      "- **Implement debouncing** for search/filter inputs\n" +
      "- **Use lazy loading** for components and modules",
    category: "Angular Performance",
    difficulty: "advanced",
    tags: ["angular", "performance", "ngfor", "trackby", "virtual-scrolling", "lazy-loading"],
  },
  {
    id: 10,
    question:
      "What is SASS? How do you use variables, mixins, nesting, partials, and built-in functions? Why use SASS over CSS?",
    answer:
      "SASS (Syntactically Awesome Style Sheets) is a CSS preprocessor that extends CSS with programming features like variables, nesting, mixins, functions, and more. It compiles to standard CSS.\n\n" +
      "**Why Use SASS Over CSS:**\n" +
      "- **DRY Principle**: Don't Repeat Yourself - reduce code duplication\n" +
      "- **Maintainability**: Easier to maintain and update styles\n" +
      "- **Organization**: Better code organization with partials\n" +
      "- **Power**: Advanced features like loops, conditionals, functions\n" +
      "- **Performance**: Smaller compiled CSS files\n" +
      "- **Team Collaboration**: Easier for teams to work on styles\n\n" +
      "**Variables:**\n" +
      "```scss\n" +
      "// Define variables\n" +
      "$primary-color: #3498db;\n" +
      "$secondary-color: #2ecc71;\n" +
      "$font-size-base: 16px;\n" +
      "$border-radius: 4px;\n" +
      "$breakpoints: (\n" +
      "  'small': 768px,\n" +
      "  'medium': 1024px,\n" +
      "  'large': 1200px\n" +
      ");\n\n" +
      "// Use variables\n" +
      ".button {\n" +
      "  background-color: $primary-color;\n" +
      "  font-size: $font-size-base;\n" +
      "  border-radius: $border-radius;\n" +
      "}\n" +
      "```\n\n" +
      "**Mixins (Reusable Code Blocks):**\n" +
      "```scss\n" +
      "// Define mixin with parameters\n" +
      "@mixin button-style($bg-color, $text-color: white, $padding: 10px 20px) {\n" +
      "  background-color: $bg-color;\n" +
      "  color: $text-color;\n" +
      "  padding: $padding;\n" +
      "  border: none;\n" +
      "  border-radius: $border-radius;\n" +
      "  cursor: pointer;\n" +
      "  transition: all 0.3s ease;\n" +
      "  \n" +
      "  &:hover {\n" +
      "    opacity: 0.8;\n" +
      "    transform: translateY(-2px);\n" +
      "  }\n" +
      "  \n" +
      "  &:active {\n" +
      "    transform: translateY(0);\n" +
      "  }\n" +
      "}\n\n" +
      "// Responsive mixin\n" +
      "@mixin respond-to($breakpoint) {\n" +
      "  @if map-has-key($breakpoints, $breakpoint) {\n" +
      "    @media (min-width: map-get($breakpoints, $breakpoint)) {\n" +
      "      @content;\n" +
      "    }\n" +
      "  }\n" +
      "}\n\n" +
      "// Use mixins\n" +
      ".primary-button {\n" +
      "  @include button-style($primary-color);\n" +
      "}\n\n" +
      ".secondary-button {\n" +
      "  @include button-style($secondary-color, black, 15px 30px);\n" +
      "}\n\n" +
      ".responsive-container {\n" +
      "  padding: 20px;\n" +
      "  \n" +
      "  @include respond-to('medium') {\n" +
      "    padding: 40px;\n" +
      "  }\n" +
      "  \n" +
      "  @include respond-to('large') {\n" +
      "    padding: 60px;\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Use meaningful variable names\n" +
      "- Keep mixins focused and reusable\n" +
      "- Don't nest too deeply (max 3-4 levels)\n" +
      "- Use partials to organize code\n" +
      "- Leverage built-in functions for calculations\n" +
      "- Use loops and conditionals sparingly\n" +
      "- Comment your complex SASS code",
    category: "SASS",
    difficulty: "advanced",
    tags: [
      "sass",
      "scss",
      "variables",
      "mixins",
      "nesting",
      "functions",
      "partials",
      "preprocessor",
    ],
  },
  {
    id: 11,
    question: "What is Git merge vs rebase? When should you use each and what are the differences?",
    answer:
      "Git merge and rebase are two different ways to integrate changes from one branch into another, each with distinct characteristics and use cases.\n\n" +
      "**Git Merge:**\n" +
      "```bash\n" +
      "# Merge feature branch into main\n" +
      "git checkout main\n" +
      "git merge feature-branch\n" +
      "\n" +
      "# Creates a merge commit\n" +
      "git log --oneline --graph\n" +
      "# *   abc1234 Merge branch 'feature-branch'\n" +
      "# |\\\n" +
      "# | * def5678 Add new feature\n" +
      "# | * ghi9012 Fix bug\n" +
      "# |/\n" +
      "# * jkl3456 Previous commit\n" +
      "```\n\n" +
      "**Git Rebase:**\n" +
      "```bash\n" +
      "# Rebase feature branch onto main\n" +
      "git checkout feature-branch\n" +
      "git rebase main\n" +
      "\n" +
      "# Creates linear history\n" +
      "git log --oneline --graph\n" +
      "# * def5678 Add new feature\n" +
      "# * ghi9012 Fix bug\n" +
      "# * jkl3456 Previous commit\n" +
      "```\n\n" +
      "**Key Differences:**\n" +
      "- **Merge**: Preserves branch history, creates merge commits\n" +
      "- **Rebase**: Rewrites history, creates linear timeline\n" +
      "- **Merge**: Safe for shared branches\n" +
      "- **Rebase**: Dangerous for shared branches\n\n" +
      "**When to Use Merge:**\n" +
      "- Integrating feature branches\n" +
      "- Shared/public branches\n" +
      "- When you want to preserve context\n" +
      "- Team collaboration\n\n" +
      "**When to Use Rebase:**\n" +
      "- Cleaning up local commits\n" +
      "- Updating feature branches\n" +
      "- Creating clean history\n" +
      "- Before merging to main\n\n" +
      "**Interactive Rebase:**\n" +
      "```bash\n" +
      "# Interactive rebase to edit commits\n" +
      "git rebase -i HEAD~3\n" +
      "\n" +
      "# In the editor:\n" +
      "# pick abc1234 First commit\n" +
      "# squash def5678 Second commit  # Combines with previous\n" +
      "# edit ghi9012 Third commit     # Stops to allow editing\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Use merge for shared branches\n" +
      "- Use rebase for local cleanup\n" +
      "- Never rebase public history\n" +
      "- Communicate with team about strategy",
    category: "Git",
    difficulty: "advanced",
    tags: ["merge", "rebase", "git", "history", "collaboration"],
  },
  {
    id: 12,
    question:
      "What is Webpack? How does it work and what are its key features for modern frontend development?",
    answer:
      "Webpack is a static module bundler for modern JavaScript applications. It takes modules with dependencies and generates static assets representing those modules.\n\n" +
      "**How Webpack Works:**\n" +
      "```javascript\n" +
      "// webpack.config.js\n" +
      "const path = require('path');\n" +
      "const HtmlWebpackPlugin = require('html-webpack-plugin');\n" +
      "\n" +
      "module.exports = {\n" +
      "  entry: './src/index.js',\n" +
      "  output: {\n" +
      "    path: path.resolve(__dirname, 'dist'),\n" +
      "    filename: 'bundle.[contenthash].js',\n" +
      "    clean: true\n" +
      "  },\n" +
      "  module: {\n" +
      "    rules: [\n" +
      "      {\n" +
      "        test: /\\.js$/,\n" +
      "        exclude: /node_modules/,\n" +
      "        use: {\n" +
      "          loader: 'babel-loader',\n" +
      "          options: {\n" +
      "            presets: ['@babel/preset-env']\n" +
      "          }\n" +
      "        }\n" +
      "      },\n" +
      "      {\n" +
      "        test: /\\.css$/,\n" +
      "        use: ['style-loader', 'css-loader']\n" +
      "      }\n" +
      "    ]\n" +
      "  },\n" +
      "  plugins: [\n" +
      "    new HtmlWebpackPlugin({\n" +
      "      template: './src/index.html'\n" +
      "    })\n" +
      "  ],\n" +
      "  optimization: {\n" +
      "    splitChunks: {\n" +
      "      chunks: 'all'\n" +
      "    }\n" +
      "  }\n" +
      "};\n" +
      "```\n\n" +
      "**Key Features:**\n" +
      "- **Module Bundling**: Combines multiple files into optimized bundles\n" +
      "- **Code Splitting**: Divides code into smaller chunks for lazy loading\n" +
      "- **Tree Shaking**: Removes unused code from the final bundle\n" +
      "- **Hot Module Replacement**: Updates modules without full page reload\n" +
      "- **Asset Management**: Handles images, fonts, and other assets\n" +
      "- **Source Maps**: Maps compiled code back to original source\n\n" +
      "**Best Practices:**\n" +
      "- Use production mode for smaller bundles\n" +
      "- Implement code splitting for better caching\n" +
      "- Use compression plugins (gzip, brotli)\n" +
      "- Optimize images with loaders\n" +
      "- Enable tree shaking for unused code removal",
    category: "Build Tools",
    difficulty: "advanced",
    tags: ["webpack", "bundler", "build-tools", "optimization", "modules"],
  },
  {
    id: 13,
    question:
      "What is Docker? How do you containerize a frontend application and what are the benefits?",
    answer:
      "Docker is a containerization platform that packages applications and their dependencies into lightweight, portable containers.\n\n" +
      "**Basic Dockerfile for Frontend:**\n" +
      "```dockerfile\n" +
      "# Multi-stage build for React app\n" +
      "FROM node:18-alpine AS builder\n" +
      "\n" +
      "# Set working directory\n" +
      "WORKDIR /app\n" +
      "\n" +
      "# Copy package files\n" +
      "COPY package*.json ./\n" +
      "\n" +
      "# Install dependencies\n" +
      "RUN npm ci --only=production\n" +
      "\n" +
      "# Copy source code\n" +
      "COPY . .\n" +
      "\n" +
      "# Build the application\n" +
      "RUN npm run build\n" +
      "\n" +
      "# Production stage\n" +
      "FROM nginx:alpine\n" +
      "\n" +
      "# Copy built files to nginx\n" +
      "COPY --from=builder /app/dist /usr/share/nginx/html\n" +
      "\n" +
      "# Expose port\n" +
      "EXPOSE 80\n" +
      "\n" +
      "# Start nginx\n" +
      'CMD ["nginx", "-g", "daemon off;"]\n' +
      "```\n\n" +
      "**Benefits of Docker:**\n" +
      "- **Consistency**: Same environment across development, staging, production\n" +
      "- **Isolation**: Applications don't interfere with each other\n" +
      "- **Portability**: Run anywhere Docker is installed\n" +
      "- **Scalability**: Easy to scale horizontally\n" +
      "- **Resource Efficiency**: Shared OS kernel, smaller footprint\n\n" +
      "**Docker Commands:**\n" +
      "```bash\n" +
      "# Build image\n" +
      "docker build -t my-frontend-app .\n" +
      "\n" +
      "# Run container\n" +
      "docker run -p 3000:80 my-frontend-app\n" +
      "\n" +
      "# Run with docker-compose\n" +
      "docker-compose up --build\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Use multi-stage builds to reduce image size\n" +
      "- Use .dockerignore to exclude unnecessary files\n" +
      "- Use specific base image versions\n" +
      "- Run containers as non-root user",
    category: "DevOps",
    difficulty: "intermediate",
    tags: ["docker", "containerization", "devops", "deployment", "nginx"],
  },
  {
    id: 14,
    question:
      "What is TypeScript? How does it improve JavaScript development and what are its key features?",
    answer:
      "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.\n\n" +
      "**Key Features:**\n" +
      "```typescript\n" +
      "// Static typing\n" +
      "interface User {\n" +
      "  id: number;\n" +
      "  name: string;\n" +
      "  email: string;\n" +
      "  isActive?: boolean; // Optional property\n" +
      "}\n" +
      "\n" +
      "// Type annotations\n" +
      "function getUser(id: number): User | null {\n" +
      "  return null;\n" +
      "}\n" +
      "\n" +
      "// Generic types\n" +
      "interface ApiResponse<T> {\n" +
      "  data: T;\n" +
      "  status: number;\n" +
      "  message: string;\n" +
      "}\n" +
      "\n" +
      "// Union types\n" +
      "type Status = 'loading' | 'success' | 'error';\n" +
      "\n" +
      "// Enums\n" +
      "enum UserRole {\n" +
      "  ADMIN = 'admin',\n" +
      "  USER = 'user',\n" +
      "  GUEST = 'guest'\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- **Type Safety**: Catch errors at compile time\n" +
      "- **Better IDE Support**: IntelliSense, autocomplete, refactoring\n" +
      "- **Documentation**: Types serve as inline documentation\n" +
      "- **Refactoring**: Safe code changes across large codebases\n" +
      "- **Team Collaboration**: Clear contracts between modules\n" +
      "- **Gradual Adoption**: Can be adopted incrementally\n\n" +
      "**Best Practices:**\n" +
      "- Use strict mode for better type checking\n" +
      "- Prefer interfaces over types for object shapes\n" +
      "- Use generic types for reusable components\n" +
      "- Avoid 'any' type when possible\n" +
      "- Use utility types for common transformations",
    category: "TypeScript",
    difficulty: "intermediate",
    tags: ["typescript", "types", "javascript", "compiler", "tooling"],
  },
  {
    id: 15,
    question: "What is GraphQL? How does it differ from REST and when should you use it?",
    answer:
      "GraphQL is a query language and runtime for APIs that allows clients to request exactly the data they need.\n\n" +
      "**GraphQL vs REST:**\n" +
      "```javascript\n" +
      "// REST API - Multiple requests\n" +
      "GET /api/users/1\n" +
      "GET /api/users/1/posts\n" +
      "GET /api/users/1/followers\n" +
      "\n" +
      "// GraphQL - Single request\n" +
      "query {\n" +
      "  user(id: 1) {\n" +
      "    name\n" +
      "    email\n" +
      "    posts {\n" +
      "      title\n" +
      "      content\n" +
      "    }\n" +
      "    followers {\n" +
      "      name\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use GraphQL:**\n" +
      "- **Over-fetching/Under-fetching**: When REST APIs return too much or too little data\n" +
      "- **Multiple Platforms**: When serving web, mobile, and other clients\n" +
      "- **Rapid Development**: When API requirements change frequently\n" +
      "- **Real-time Features**: When you need subscriptions\n" +
      "- **Complex Data Relationships**: When data is highly interconnected\n\n" +
      "**When NOT to Use GraphQL:**\n" +
      "- **Simple APIs**: When REST is sufficient\n" +
      "- **Caching Requirements**: When HTTP caching is critical\n" +
      "- **File Uploads**: When handling large file uploads\n" +
      "- **Learning Curve**: When team lacks GraphQL expertise\n\n" +
      "**Best Practices:**\n" +
      "- Use DataLoader to prevent N+1 queries\n" +
      "- Implement proper error handling\n" +
      "- Use fragments for reusable query parts\n" +
      "- Implement query complexity analysis\n" +
      "- Use persisted queries for production",
    category: "API Design",
    difficulty: "advanced",
    tags: ["graphql", "api", "rest", "query-language", "apollo"],
  },
  {
    id: 16,
    question: "What is CSS Grid? How does it differ from Flexbox and when should you use each?",
    answer:
      "CSS Grid is a two-dimensional layout system that allows you to create complex layouts with rows and columns.\n\n" +
      "**CSS Grid vs Flexbox:**\n" +
      "- **Grid**: 2D layout (rows + columns), better for overall page layout\n" +
      "- **Flexbox**: 1D layout (row OR column), better for component-level layout\n\n" +
      "**Grid Example:**\n" +
      "```css\n" +
      ".grid-container {\n" +
      "  display: grid;\n" +
      "  grid-template-columns: 200px 1fr 200px;\n" +
      "  grid-template-rows: auto 1fr auto;\n" +
      "  grid-template-areas:\n" +
      '    "header header header"\n' +
      '    "sidebar main aside"\n' +
      '    "footer footer footer";\n' +
      "  gap: 20px;\n" +
      "  height: 100vh;\n" +
      "}\n" +
      "\n" +
      ".header { grid-area: header; }\n" +
      ".sidebar { grid-area: sidebar; }\n" +
      ".main { grid-area: main; }\n" +
      ".aside { grid-area: aside; }\n" +
      ".footer { grid-area: footer; }\n" +
      "```\n\n" +
      "**When to Use Grid:**\n" +
      "- Overall page layout\n" +
      "- Complex 2D layouts\n" +
      "- When you need precise control over both dimensions\n\n" +
      "**When to Use Flexbox:**\n" +
      "- Component-level layouts\n" +
      "- One-dimensional layouts\n" +
      "- Aligning items within containers",
    category: "CSS",
    difficulty: "intermediate",
    tags: ["css", "grid", "flexbox", "layout", "2d"],
  },
  {
    id: 17,
    question:
      "What is CSS Flexbox? Explain the main properties and how to create responsive layouts.",
    answer:
      "Flexbox is a one-dimensional layout method for arranging items in rows or columns.\n\n" +
      "**Main Flexbox Properties:**\n" +
      "```css\n" +
      ".flex-container {\n" +
      "  display: flex;\n" +
      "  flex-direction: row; /* row, row-reverse, column, column-reverse */\n" +
      "  flex-wrap: nowrap; /* nowrap, wrap, wrap-reverse */\n" +
      "  justify-content: center; /* flex-start, center, flex-end, space-between, space-around */\n" +
      "  align-items: stretch; /* flex-start, center, flex-end, stretch, baseline */\n" +
      "  align-content: flex-start; /* flex-start, center, flex-end, stretch, space-between */\n" +
      "  gap: 20px;\n" +
      "}\n" +
      "\n" +
      ".flex-item {\n" +
      "  flex-grow: 1; /* How much item should grow */\n" +
      "  flex-shrink: 1; /* How much item should shrink */\n" +
      "  flex-basis: 200px; /* Initial size */\n" +
      "  flex: 1 1 200px; /* Shorthand: grow shrink basis */\n" +
      "  align-self: center; /* Override align-items for this item */\n" +
      "}\n" +
      "```\n\n" +
      "**Responsive Flexbox Layout:**\n" +
      "```css\n" +
      ".responsive-grid {\n" +
      "  display: flex;\n" +
      "  flex-wrap: wrap;\n" +
      "  gap: 20px;\n" +
      "}\n" +
      "\n" +
      ".card {\n" +
      "  flex: 1 1 300px; /* Grow, shrink, basis */\n" +
      "  min-width: 0; /* Prevent overflow */\n" +
      "}\n" +
      "\n" +
      "@media (max-width: 768px) {\n" +
      "  .card {\n" +
      "    flex: 1 1 100%; /* Full width on mobile */\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Common Flexbox Patterns:**\n" +
      "- Centering content\n" +
      "- Equal height columns\n" +
      "- Sticky footer\n" +
      "- Responsive navigation",
    category: "CSS",
    difficulty: "intermediate",
    tags: ["css", "flexbox", "layout", "responsive", "1d"],
  },
  {
    id: 18,
    question: "What are CSS Custom Properties (CSS Variables)? How do you use them effectively?",
    answer:
      "CSS Custom Properties (CSS Variables) allow you to store values that can be reused throughout your stylesheet.\n\n" +
      "**Basic Usage:**\n" +
      "```css\n" +
      ":root {\n" +
      "  --primary-color: #3498db;\n" +
      "  --secondary-color: #2ecc71;\n" +
      "  --font-size-base: 16px;\n" +
      "  --spacing-unit: 8px;\n" +
      "  --border-radius: 4px;\n" +
      "}\n" +
      "\n" +
      ".button {\n" +
      "  background-color: var(--primary-color);\n" +
      "  font-size: var(--font-size-base);\n" +
      "  padding: var(--spacing-unit) calc(var(--spacing-unit) * 2);\n" +
      "  border-radius: var(--border-radius);\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Usage:**\n" +
      "```css\n" +
      "/* Fallback values */\n" +
      ".element {\n" +
      "  color: var(--text-color, #333); /* Fallback to #333 */\n" +
      "}\n" +
      "\n" +
      "/* Dynamic values with calc() */\n" +
      ".container {\n" +
      "  --base-size: 100px;\n" +
      "  width: calc(var(--base-size) * 2);\n" +
      "  height: calc(var(--base-size) + 50px);\n" +
      "}\n" +
      "\n" +
      "/* Theme switching */\n" +
      '[data-theme="dark"] {\n' +
      "  --bg-color: #1a1a1a;\n" +
      "  --text-color: #ffffff;\n" +
      "  --border-color: #333333;\n" +
      "}\n" +
      "\n" +
      '[data-theme="light"] {\n' +
      "  --bg-color: #ffffff;\n" +
      "  --text-color: #333333;\n" +
      "  --border-color: #cccccc;\n" +
      "}\n" +
      "```\n\n" +
      "**JavaScript Integration:**\n" +
      "```javascript\n" +
      "// Get CSS variable value\n" +
      "const primaryColor = getComputedStyle(document.documentElement)\n" +
      "  .getPropertyValue('--primary-color');\n" +
      "\n" +
      "// Set CSS variable value\n" +
      "document.documentElement.style.setProperty('--primary-color', '#ff0000');\n" +
      "\n" +
      "// Dynamic theme switching\n" +
      "function switchTheme(theme) {\n" +
      "  document.documentElement.setAttribute('data-theme', theme);\n" +
      "}\n" +
      "```\n\n" +
      "**Benefits:**\n" +
      "- Dynamic theming\n" +
      "- Consistent design system\n" +
      "- Runtime value changes\n" +
      "- Better maintainability",
    category: "CSS",
    difficulty: "intermediate",
    tags: ["css", "variables", "custom-properties", "theming", "dynamic"],
  },
  {
    id: 19,
    question: "What is CSS Specificity? How does it work and how do you calculate it?",
    answer:
      "CSS Specificity determines which CSS rule is applied when multiple rules target the same element.\n\n" +
      "**Specificity Calculation:**\n" +
      "Specificity is calculated as: (inline styles, IDs, classes/attributes/pseudo-classes, elements/pseudo-elements)\n\n" +
      "```css\n" +
      "/* Specificity: 0,0,0,1 (1 element) */\n" +
      "div { color: red; }\n" +
      "\n" +
      "/* Specificity: 0,0,1,0 (1 class) */\n" +
      ".my-class { color: blue; }\n" +
      "\n" +
      "/* Specificity: 0,1,0,0 (1 ID) */\n" +
      "#my-id { color: green; }\n" +
      "\n" +
      "/* Specificity: 1,0,0,0 (inline style) */\n" +
      '<div style="color: purple;">\n' +
      "\n" +
      "/* Specificity: 0,0,2,1 (2 classes + 1 element) */\n" +
      "div.my-class.another-class { color: orange; }\n" +
      "\n" +
      "/* Specificity: 0,0,1,2 (1 class + 2 elements) */\n" +
      "div p.my-class { color: pink; }\n" +
      "```\n\n" +
      "**Specificity Examples:**\n" +
      "```css\n" +
      "/* This will win - higher specificity */\n" +
      "div#header .nav-item { color: blue; } /* 0,1,1,1 */\n" +
      "\n" +
      "/* This will lose - lower specificity */\n" +
      ".nav-item { color: red; } /* 0,0,1,0 */\n" +
      "\n" +
      "/* !important overrides everything */\n" +
      ".nav-item { color: red !important; } /* Wins over everything */\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Avoid !important unless absolutely necessary\n" +
      "- Use classes instead of IDs for styling\n" +
      "- Keep specificity low for maintainability\n" +
      "- Use CSS custom properties for dynamic values\n" +
      "- Understand cascade order (source order matters)",
    category: "CSS",
    difficulty: "intermediate",
    tags: ["css", "specificity", "cascade", "selectors", "important"],
  },
  {
    id: 20,
    question: "What are CSS Animations and Transitions? How do you create smooth animations?",
    answer:
      "CSS Animations and Transitions allow you to create smooth, performant animations without JavaScript.\n\n" +
      "**CSS Transitions:**\n" +
      "```css\n" +
      ".button {\n" +
      "  background-color: #3498db;\n" +
      "  transition: background-color 0.3s ease;\n" +
      "  /* Shorthand: property duration timing-function delay */\n" +
      "}\n" +
      "\n" +
      ".button:hover {\n" +
      "  background-color: #2980b9;\n" +
      "}\n" +
      "\n" +
      "/* Multiple properties */\n" +
      ".card {\n" +
      "  transform: scale(1);\n" +
      "  opacity: 1;\n" +
      "  transition: transform 0.3s ease, opacity 0.3s ease;\n" +
      "}\n" +
      "\n" +
      ".card:hover {\n" +
      "  transform: scale(1.05);\n" +
      "  opacity: 0.9;\n" +
      "}\n" +
      "```\n\n" +
      "**CSS Animations:**\n" +
      "```css\n" +
      "@keyframes slideIn {\n" +
      "  0% {\n" +
      "    transform: translateX(-100%);\n" +
      "    opacity: 0;\n" +
      "  }\n" +
      "  50% {\n" +
      "    transform: translateX(0);\n" +
      "    opacity: 0.5;\n" +
      "  }\n" +
      "  100% {\n" +
      "    transform: translateX(0);\n" +
      "    opacity: 1;\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      ".slide-in {\n" +
      "  animation: slideIn 1s ease-in-out;\n" +
      "  /* Shorthand: name duration timing-function delay iteration-count direction fill-mode */\n" +
      "}\n" +
      "\n" +
      "/* Animation properties */\n" +
      ".bounce {\n" +
      "  animation-name: bounce;\n" +
      "  animation-duration: 2s;\n" +
      "  animation-timing-function: ease-in-out;\n" +
      "  animation-delay: 0.5s;\n" +
      "  animation-iteration-count: infinite;\n" +
      "  animation-direction: alternate;\n" +
      "  animation-fill-mode: both;\n" +
      "}\n" +
      "```\n\n" +
      "**Performance Tips:**\n" +
      "- Use transform and opacity for smooth animations\n" +
      "- Avoid animating layout properties (width, height, margin)\n" +
      "- Use will-change property for optimization\n" +
      "- Prefer CSS animations over JavaScript when possible",
    category: "CSS",
    difficulty: "intermediate",
    tags: ["css", "animations", "transitions", "keyframes", "performance"],
  },
  {
    id: 21,
    question:
      "What is CSS Positioning? Explain static, relative, absolute, fixed, and sticky positioning.",
    answer:
      "CSS positioning determines how elements are positioned in the document flow.\n\n" +
      "**Position Values:**\n" +
      "```css\n" +
      "/* Static - Default positioning */\n" +
      ".static {\n" +
      "  position: static; /* Normal document flow */\n" +
      "}\n" +
      "\n" +
      "/* Relative - Positioned relative to its normal position */\n" +
      ".relative {\n" +
      "  position: relative;\n" +
      "  top: 20px;\n" +
      "  left: 30px;\n" +
      "  /* Moves 20px down and 30px right from normal position */\n" +
      "}\n" +
      "\n" +
      "/* Absolute - Positioned relative to nearest positioned ancestor */\n" +
      ".absolute {\n" +
      "  position: absolute;\n" +
      "  top: 0;\n" +
      "  right: 0;\n" +
      "  /* Positioned at top-right of positioned parent */\n" +
      "}\n" +
      "\n" +
      "/* Fixed - Positioned relative to viewport */\n" +
      ".fixed {\n" +
      "  position: fixed;\n" +
      "  bottom: 20px;\n" +
      "  right: 20px;\n" +
      "  /* Always 20px from bottom-right of viewport */\n" +
      "}\n" +
      "\n" +
      "/* Sticky - Switches between relative and fixed */\n" +
      ".sticky {\n" +
      "  position: sticky;\n" +
      "  top: 0;\n" +
      "  /* Sticks to top when scrolling */\n" +
      "}\n" +
      "```\n\n" +
      "**Z-Index and Stacking Context:**\n" +
      "```css\n" +
      ".modal {\n" +
      "  position: fixed;\n" +
      "  top: 0;\n" +
      "  left: 0;\n" +
      "  width: 100%;\n" +
      "  height: 100%;\n" +
      "  background-color: rgba(0, 0, 0, 0.5);\n" +
      "  z-index: 1000; /* Higher z-index appears on top */\n" +
      "}\n" +
      "\n" +
      ".modal-content {\n" +
      "  position: relative;\n" +
      "  z-index: 1001;\n" +
      "}\n" +
      "```\n\n" +
      "**Common Use Cases:**\n" +
      "- **Relative**: Fine-tuning element position\n" +
      "- **Absolute**: Overlays, tooltips, dropdowns\n" +
      "- **Fixed**: Navigation bars, floating buttons\n" +
      "- **Sticky**: Table headers, navigation menus",
    category: "CSS",
    difficulty: "intermediate",
    tags: ["css", "positioning", "static", "relative", "absolute", "fixed", "sticky"],
  },
  {
    id: 22,
    question: "What are CSS Pseudo-classes and Pseudo-elements? Provide examples and use cases.",
    answer:
      "Pseudo-classes and pseudo-elements allow you to style specific parts of elements or elements in specific states.\n\n" +
      "**Pseudo-classes (state-based):**\n" +
      "```css\n" +
      "/* Link states */\n" +
      "a:link { color: blue; } /* Unvisited links */\n" +
      "a:visited { color: purple; } /* Visited links */\n" +
      "a:hover { color: red; } /* Mouse over */\n" +
      "a:active { color: green; } /* Being clicked */\n" +
      "a:focus { outline: 2px solid orange; } /* Keyboard focus */\n" +
      "\n" +
      "/* Form states */\n" +
      "input:focus { border-color: blue; }\n" +
      "input:invalid { border-color: red; }\n" +
      "input:valid { border-color: green; }\n" +
      "input:disabled { opacity: 0.5; }\n" +
      "\n" +
      "/* Structural pseudo-classes */\n" +
      "li:first-child { font-weight: bold; }\n" +
      "li:last-child { border-bottom: none; }\n" +
      "li:nth-child(odd) { background-color: #f0f0f0; }\n" +
      "li:nth-child(3n) { color: red; } /* Every 3rd item */\n" +
      "li:only-child { text-align: center; }\n" +
      "\n" +
      "/* Content pseudo-classes */\n" +
      "p:empty { display: none; }\n" +
      "div:not(.hidden) { display: block; }\n" +
      "```\n\n" +
      "**Pseudo-elements (content-based):**\n" +
      "```css\n" +
      "/* ::before and ::after */\n" +
      ".quote::before {\n" +
      "  content: '\"'; /* Add opening quote */\n" +
      "  font-size: 2em;\n" +
      "  color: #ccc;\n" +
      "}\n" +
      "\n" +
      ".quote::after {\n" +
      "  content: '\"'; /* Add closing quote */\n" +
      "  font-size: 2em;\n" +
      "  color: #ccc;\n" +
      "}\n" +
      "\n" +
      "/* ::first-line and ::first-letter */\n" +
      "p::first-line {\n" +
      "  font-weight: bold;\n" +
      "  text-transform: uppercase;\n" +
      "}\n" +
      "\n" +
      "p::first-letter {\n" +
      "  font-size: 3em;\n" +
      "  float: left;\n" +
      "  margin-right: 5px;\n" +
      "}\n" +
      "\n" +
      "/* ::selection */\n" +
      "::selection {\n" +
      "  background-color: yellow;\n" +
      "  color: black;\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Examples:**\n" +
      "```css\n" +
      "/* Custom checkbox */\n" +
      ".custom-checkbox {\n" +
      "  position: relative;\n" +
      "  padding-left: 25px;\n" +
      "}\n" +
      "\n" +
      ".custom-checkbox input {\n" +
      "  opacity: 0;\n" +
      "}\n" +
      "\n" +
      ".custom-checkbox::before {\n" +
      "  content: '';\n" +
      "  position: absolute;\n" +
      "  left: 0;\n" +
      "  top: 2px;\n" +
      "  width: 16px;\n" +
      "  height: 16px;\n" +
      "  border: 2px solid #ccc;\n" +
      "  background-color: white;\n" +
      "}\n" +
      "\n" +
      ".custom-checkbox input:checked + label::after {\n" +
      "  content: '✓';\n" +
      "  position: absolute;\n" +
      "  left: 3px;\n" +
      "  top: 0;\n" +
      "  color: green;\n" +
      "  font-weight: bold;\n" +
      "}\n" +
      "```",
    category: "CSS",
    difficulty: "intermediate",
    tags: ["css", "pseudo-classes", "pseudo-elements", "before", "after", "hover"],
  },
  {
    id: 23,
    question: "What is CSS Media Queries? How do you create responsive designs?",
    answer:
      "Media queries allow you to apply different styles based on device characteristics like screen size, orientation, and resolution.\n\n" +
      "**Basic Media Query Syntax:**\n" +
      "```css\n" +
      "/* Mobile first approach */\n" +
      ".container {\n" +
      "  width: 100%;\n" +
      "  padding: 10px;\n" +
      "}\n" +
      "\n" +
      "/* Tablet and up */\n" +
      "@media (min-width: 768px) {\n" +
      "  .container {\n" +
      "    width: 750px;\n" +
      "    margin: 0 auto;\n" +
      "    padding: 20px;\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "/* Desktop and up */\n" +
      "@media (min-width: 1024px) {\n" +
      "  .container {\n" +
      "    width: 1200px;\n" +
      "    padding: 30px;\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Common Breakpoints:**\n" +
      "```css\n" +
      "/* Mobile */\n" +
      "@media (max-width: 767px) { /* Styles for mobile */ }\n" +
      "\n" +
      "/* Tablet */\n" +
      "@media (min-width: 768px) and (max-width: 1023px) { /* Styles for tablet */ }\n" +
      "\n" +
      "/* Desktop */\n" +
      "@media (min-width: 1024px) { /* Styles for desktop */ }\n" +
      "\n" +
      "/* Large Desktop */\n" +
      "@media (min-width: 1440px) { /* Styles for large screens */ }\n" +
      "```\n\n" +
      "**Advanced Media Queries:**\n" +
      "```css\n" +
      "/* Orientation */\n" +
      "@media (orientation: landscape) {\n" +
      "  .sidebar { width: 200px; }\n" +
      "}\n" +
      "\n" +
      "@media (orientation: portrait) {\n" +
      "  .sidebar { width: 100%; }\n" +
      "}\n" +
      "\n" +
      "/* Resolution */\n" +
      "@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {\n" +
      "  .logo { background-image: url('logo@2x.png'); }\n" +
      "}\n" +
      "\n" +
      "/* Print styles */\n" +
      "@media print {\n" +
      "  .no-print { display: none; }\n" +
      "  body { font-size: 12pt; }\n" +
      "}\n" +
      "\n" +
      "/* Dark mode */\n" +
      "@media (prefers-color-scheme: dark) {\n" +
      "  body { background-color: #1a1a1a; color: #fff; }\n" +
      "}\n" +
      "\n" +
      "/* Reduced motion */\n" +
      "@media (prefers-reduced-motion: reduce) {\n" +
      "  * { animation: none !important; transition: none !important; }\n" +
      "}\n" +
      "```\n\n" +
      "**Responsive Grid Example:**\n" +
      "```css\n" +
      ".grid {\n" +
      "  display: grid;\n" +
      "  gap: 20px;\n" +
      "  grid-template-columns: 1fr; /* Single column on mobile */\n" +
      "}\n" +
      "\n" +
      "@media (min-width: 768px) {\n" +
      "  .grid {\n" +
      "    grid-template-columns: repeat(2, 1fr); /* 2 columns on tablet */\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "@media (min-width: 1024px) {\n" +
      "  .grid {\n" +
      "    grid-template-columns: repeat(3, 1fr); /* 3 columns on desktop */\n" +
      "  }\n" +
      "}\n" +
      "```",
    category: "CSS",
    difficulty: "intermediate",
    tags: ["css", "media-queries", "responsive", "breakpoints", "mobile-first"],
  },
  {
    id: 24,
    question: "What is CSS Transform? How do you use translate, rotate, scale, and skew?",
    answer:
      "CSS Transform allows you to modify the coordinate space of elements, enabling rotation, scaling, translation, and skewing.\n\n" +
      "**Transform Functions:**\n" +
      "```css\n" +
      "/* Translation - Move element */\n" +
      ".translate {\n" +
      "  transform: translate(50px, 100px); /* Move 50px right, 100px down */\n" +
      "  transform: translateX(50px); /* Move only horizontally */\n" +
      "  transform: translateY(100px); /* Move only vertically */\n" +
      "  transform: translateZ(20px); /* Move in 3D space */\n" +
      "}\n" +
      "\n" +
      "/* Rotation - Rotate element */\n" +
      ".rotate {\n" +
      "  transform: rotate(45deg); /* Rotate 45 degrees clockwise */\n" +
      "  transform: rotateX(45deg); /* Rotate around X-axis */\n" +
      "  transform: rotateY(45deg); /* Rotate around Y-axis */\n" +
      "  transform: rotateZ(45deg); /* Rotate around Z-axis */\n" +
      "}\n" +
      "\n" +
      "/* Scaling - Resize element */\n" +
      ".scale {\n" +
      "  transform: scale(2); /* Double the size */\n" +
      "  transform: scale(0.5); /* Half the size */\n" +
      "  transform: scale(2, 1.5); /* Scale X by 2, Y by 1.5 */\n" +
      "  transform: scaleX(2); /* Scale only horizontally */\n" +
      "  transform: scaleY(1.5); /* Scale only vertically */\n" +
      "}\n" +
      "\n" +
      "/* Skewing - Distort element */\n" +
      ".skew {\n" +
      "  transform: skew(30deg, 20deg); /* Skew X by 30deg, Y by 20deg */\n" +
      "  transform: skewX(30deg); /* Skew only horizontally */\n" +
      "  transform: skewY(20deg); /* Skew only vertically */\n" +
      "}\n" +
      "```\n\n" +
      "**Multiple Transforms:**\n" +
      "```css\n" +
      ".multiple {\n" +
      "  transform: translate(50px, 50px) rotate(45deg) scale(1.2);\n" +
      "  /* Apply multiple transforms in order */\n" +
      "}\n" +
      "\n" +
      "/* Transform origin - Change rotation/scaling point */\n" +
      ".origin {\n" +
      "  transform-origin: center center; /* Default */\n" +
      "  transform-origin: top left; /* Rotate from top-left corner */\n" +
      "  transform-origin: 50% 50%; /* Center */\n" +
      "  transform-origin: 100px 50px; /* Specific coordinates */\n" +
      "}\n" +
      "```\n\n" +
      "**3D Transforms:**\n" +
      "```css\n" +
      ".container {\n" +
      "  perspective: 1000px; /* Enable 3D perspective */\n" +
      "}\n" +
      "\n" +
      ".card {\n" +
      "  transform-style: preserve-3d; /* Preserve 3D positioning */\n" +
      "  transition: transform 0.6s;\n" +
      "}\n" +
      "\n" +
      ".card:hover {\n" +
      "  transform: rotateY(180deg); /* Flip card on hover */\n" +
      "}\n" +
      "\n" +
      "/* 3D cube example */\n" +
      ".cube {\n" +
      "  transform-style: preserve-3d;\n" +
      "  animation: rotate 5s infinite linear;\n" +
      "}\n" +
      "\n" +
      "@keyframes rotate {\n" +
      "  0% { transform: rotateX(0deg) rotateY(0deg); }\n" +
      "  100% { transform: rotateX(360deg) rotateY(360deg); }\n" +
      "}\n" +
      "```\n\n" +
      "**Performance Tips:**\n" +
      "- Use transform instead of changing position properties\n" +
      "- Transform doesn't trigger layout reflow\n" +
      "- Use will-change: transform for optimization\n" +
      "- Combine transforms for better performance",
    category: "CSS",
    difficulty: "intermediate",
    tags: ["css", "transform", "translate", "rotate", "scale", "skew", "3d"],
  },
  {
    id: 25,
    question: "What is CSS Selectors specificity and how do you write efficient selectors?",
    answer:
      "CSS selectors determine which elements styles are applied to. Understanding specificity and efficiency is crucial for maintainable CSS.\n\n" +
      "**Selector Types and Specificity:**\n" +
      "```css\n" +
      "/* Universal selector - 0,0,0,0 */\n" +
      "* { margin: 0; padding: 0; }\n" +
      "\n" +
      "/* Element selector - 0,0,0,1 */\n" +
      "div { color: black; }\n" +
      "p { margin: 1em 0; }\n" +
      "\n" +
      "/* Class selector - 0,0,1,0 */\n" +
      ".button { background: blue; }\n" +
      ".primary { background: green; }\n" +
      "\n" +
      "/* ID selector - 0,1,0,0 */\n" +
      "#header { background: red; }\n" +
      "#footer { background: gray; }\n" +
      "\n" +
      "/* Attribute selector - 0,0,1,0 */\n" +
      '[type="text"] { border: 1px solid #ccc; }\n' +
      "[disabled] { opacity: 0.5; }\n" +
      "\n" +
      "/* Pseudo-class - 0,0,1,0 */\n" +
      ":hover { background: yellow; }\n" +
      ":focus { outline: 2px solid blue; }\n" +
      "\n" +
      "/* Pseudo-element - 0,0,0,1 */\n" +
      "::before { content: ''; }\n" +
      "::after { content: ''; }\n" +
      "```\n\n" +
      "**Complex Selectors:**\n" +
      "```css\n" +
      "/* Descendant selector */\n" +
      ".container p { color: blue; } /* All p inside .container */\n" +
      "\n" +
      "/* Child selector */\n" +
      ".container > p { color: red; } /* Direct children only */\n" +
      "\n" +
      "/* Adjacent sibling */\n" +
      "h1 + p { margin-top: 0; } /* p immediately after h1 */\n" +
      "\n" +
      "/* General sibling */\n" +
      "h1 ~ p { color: green; } /* All p siblings after h1 */\n" +
      "\n" +
      "/* Multiple selectors */\n" +
      "h1, h2, h3 { font-weight: bold; }\n" +
      "\n" +
      "/* Combined selectors */\n" +
      "div.button.primary { background: purple; } /* div with both classes */\n" +
      "```\n\n" +
      "**Efficient Selector Writing:**\n" +
      "```css\n" +
      "/* Good - Specific and efficient */\n" +
      ".nav-item { color: blue; }\n" +
      ".nav-item:hover { color: red; }\n" +
      "\n" +
      "/* Avoid - Too specific */\n" +
      "div.container ul.navigation li.nav-item a.link { color: blue; }\n" +
      "\n" +
      "/* Better - Less specific */\n" +
      ".nav-link { color: blue; }\n" +
      "\n" +
      "/* Good - Use classes for styling */\n" +
      ".btn-primary { background: blue; }\n" +
      ".btn-secondary { background: gray; }\n" +
      "\n" +
      "/* Avoid - Using IDs for styling */\n" +
      "#submit-button { background: blue; }\n" +
      "```\n\n" +
      "**Performance Tips:**\n" +
      "- Use classes instead of complex selectors\n" +
      "- Avoid universal selectors in large documents\n" +
      "- Keep selectors shallow (avoid deep nesting)\n" +
      "- Use specific selectors for better performance\n" +
      "- Consider CSS-in-JS for component-scoped styles",
    category: "CSS",
    difficulty: "intermediate",
    tags: ["css", "selectors", "specificity", "performance", "efficiency"],
  },
  {
    id: 26,
    question:
      "What are SASS Mixins? How do you create reusable mixins with parameters and content blocks?",
    answer:
      "SASS Mixins are reusable blocks of CSS that can be included in other selectors, similar to functions in programming languages.\n\n" +
      "**Basic Mixins:**\n" +
      "```scss\n" +
      "@mixin button-base {\n" +
      "  padding: 10px 20px;\n" +
      "  border: none;\n" +
      "  border-radius: 4px;\n" +
      "  cursor: pointer;\n" +
      "  font-size: 16px;\n" +
      "  transition: all 0.3s ease;\n" +
      "}\n" +
      "\n" +
      ".primary-button {\n" +
      "  @include button-base;\n" +
      "  background-color: #3498db;\n" +
      "  color: white;\n" +
      "}\n" +
      "```\n\n" +
      "**Mixins with Parameters:**\n" +
      "```scss\n" +
      "@mixin button-style($bg-color, $text-color: white, $padding: 10px 20px) {\n" +
      "  @include button-base;\n" +
      "  background-color: $bg-color;\n" +
      "  color: $text-color;\n" +
      "  padding: $padding;\n" +
      "  \n" +
      "  &:hover {\n" +
      "    background-color: darken($bg-color, 10%);\n" +
      "  }\n" +
      "  \n" +
      "  &:active {\n" +
      "    background-color: darken($bg-color, 20%);\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      ".success-button {\n" +
      "  @include button-style(#2ecc71);\n" +
      "}\n" +
      "\n" +
      ".warning-button {\n" +
      "  @include button-style(#f39c12, black, 15px 30px);\n" +
      "}\n" +
      "```\n\n" +
      "**Mixins with Content Blocks:**\n" +
      "```scss\n" +
      "@mixin media-query($breakpoint) {\n" +
      "  @if $breakpoint == mobile {\n" +
      "    @media (max-width: 767px) {\n" +
      "      @content;\n" +
      "    }\n" +
      "  } @else if $breakpoint == tablet {\n" +
      "    @media (min-width: 768px) and (max-width: 1023px) {\n" +
      "      @content;\n" +
      "    }\n" +
      "  } @else if $breakpoint == desktop {\n" +
      "    @media (min-width: 1024px) {\n" +
      "      @content;\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      ".responsive-container {\n" +
      "  padding: 20px;\n" +
      "  \n" +
      "  @include media-query(mobile) {\n" +
      "    padding: 10px;\n" +
      "    font-size: 14px;\n" +
      "  }\n" +
      "  \n" +
      "  @include media-query(tablet) {\n" +
      "    padding: 30px;\n" +
      "    font-size: 16px;\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Mixin Examples:**\n" +
      "```scss\n" +
      "@mixin flex-center($direction: row) {\n" +
      "  display: flex;\n" +
      "  flex-direction: $direction;\n" +
      "  justify-content: center;\n" +
      "  align-items: center;\n" +
      "}\n" +
      "\n" +
      "@mixin clearfix {\n" +
      "  &::after {\n" +
      "    content: '';\n" +
      "    display: table;\n" +
      "    clear: both;\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "@mixin text-truncate {\n" +
      "  overflow: hidden;\n" +
      "  text-overflow: ellipsis;\n" +
      "  white-space: nowrap;\n" +
      "}\n" +
      "```",
    category: "SASS",
    difficulty: "intermediate",
    tags: ["sass", "mixins", "parameters", "content-blocks", "reusable"],
  },
  {
    id: 27,
    question:
      "What are SASS Functions? How do you create custom functions and use built-in functions?",
    answer:
      "SASS Functions allow you to define reusable logic that returns values, similar to functions in programming languages.\n\n" +
      "**Custom Functions:**\n" +
      "```scss\n" +
      "// Calculate rem values\n" +
      "@function rem($size, $base: 16px) {\n" +
      "  @return $size / $base * 1rem;\n" +
      "}\n" +
      "\n" +
      "// Usage\n" +
      ".text-large {\n" +
      "  font-size: rem(24px); // 1.5rem\n" +
      "}\n" +
      "\n" +
      "// Calculate responsive font sizes\n" +
      "@function responsive-font($min-size, $max-size, $min-width: 320px, $max-width: 1200px) {\n" +
      "  @return calc(#{$min-size} + #{strip-unit($max-size - $min-size)} * ((100vw - #{$min-width}) / #{strip-unit($max-width - $min-width)}));\n" +
      "}\n" +
      "\n" +
      "@function strip-unit($value) {\n" +
      "  @return $value / ($value * 0 + 1);\n" +
      "}\n" +
      "\n" +
      "// Usage\n" +
      ".responsive-text {\n" +
      "  font-size: responsive-font(14px, 18px);\n" +
      "}\n" +
      "```\n\n" +
      "**Built-in Functions:**\n" +
      "```scss\n" +
      "// Color functions\n" +
      "$primary: #3498db;\n" +
      "$light-primary: lighten($primary, 20%);\n" +
      "$dark-primary: darken($primary, 20%);\n" +
      "$saturated-primary: saturate($primary, 30%);\n" +
      "$desaturated-primary: desaturate($primary, 30%);\n" +
      "$transparent-primary: rgba($primary, 0.5);\n" +
      "$mix-colors: mix($primary, #2ecc71, 50%);\n" +
      "\n" +
      "// Math functions\n" +
      "$base-size: 16px;\n" +
      "$double-size: $base-size * 2;\n" +
      "$half-size: $base-size / 2;\n" +
      "$percentage: percentage(2/3); // 66.66667%\n" +
      "$rounded: round(3.7); // 4\n" +
      "$ceiled: ceil(3.2); // 4\n" +
      "$floored: floor(3.8); // 3\n" +
      "\n" +
      "// String functions\n" +
      "$font-family: 'Helvetica Neue', Arial, sans-serif;\n" +
      "$quoted: quote($font-family);\n" +
      "$unquoted: unquote('\"Hello\"');\n" +
      "$uppercase: to-upper-case('hello'); // HELLO\n" +
      "$lowercase: to-lower-case('HELLO'); // hello\n" +
      "\n" +
      "// List functions\n" +
      "$colors: red, green, blue;\n" +
      "$first-color: nth($colors, 1); // red\n" +
      "$last-color: nth($colors, -1); // blue\n" +
      "$color-count: length($colors); // 3\n" +
      "$joined-colors: join($colors, (yellow, orange));\n" +
      "```\n\n" +
      "**Advanced Function Examples:**\n" +
      "```scss\n" +
      "// Generate color palette\n" +
      "@function generate-palette($base-color) {\n" +
      "  $palette: ();\n" +
      "  \n" +
      "  @for $i from 1 through 5 {\n" +
      "    $palette: map-merge($palette, (\n" +
      "      'shade-#{$i}': darken($base-color, $i * 10%)\n" +
      "    ));\n" +
      "  }\n" +
      "  \n" +
      "  @return $palette;\n" +
      "}\n" +
      "\n" +
      "$blue-palette: generate-palette(#3498db);\n" +
      "\n" +
      "// Calculate contrast ratio\n" +
      "@function contrast-ratio($color1, $color2) {\n" +
      "  $l1: luminance($color1);\n" +
      "  $l2: luminance($color2);\n" +
      "  \n" +
      "  @if $l1 > $l2 {\n" +
      "    @return ($l1 + 0.05) / ($l2 + 0.05);\n" +
      "  } @else {\n" +
      "    @return ($l2 + 0.05) / ($l1 + 0.05);\n" +
      "  }\n" +
      "}\n" +
      "```",
    category: "SASS",
    difficulty: "advanced",
    tags: ["sass", "functions", "custom-functions", "built-in-functions", "math"],
  },
  {
    id: 28,
    question: "What is SASS Nesting? How do you nest selectors effectively and avoid deep nesting?",
    answer:
      "SASS Nesting allows you to write CSS selectors in a hierarchical structure, making stylesheets more organized and readable.\n\n" +
      "**Basic Nesting:**\n" +
      "```scss\n" +
      ".card {\n" +
      "  padding: 20px;\n" +
      "  border: 1px solid #ddd;\n" +
      "  border-radius: 8px;\n" +
      "  \n" +
      "  .card-header {\n" +
      "    font-weight: bold;\n" +
      "    margin-bottom: 10px;\n" +
      "    \n" +
      "    h2 {\n" +
      "      color: #333;\n" +
      "      margin: 0;\n" +
      "      font-size: 1.5rem;\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  .card-body {\n" +
      "    line-height: 1.6;\n" +
      "    \n" +
      "    p {\n" +
      "      margin-bottom: 10px;\n" +
      "      \n" +
      "      &:last-child {\n" +
      "        margin-bottom: 0;\n" +
      "      }\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  &:hover {\n" +
      "    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n" +
      "  }\n" +
      "  \n" +
      "  &.featured {\n" +
      "    border-color: #3498db;\n" +
      "    background-color: lighten(#3498db, 45%);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Parent Selector (&):**\n" +
      "```scss\n" +
      ".button {\n" +
      "  padding: 10px 20px;\n" +
      "  border: none;\n" +
      "  border-radius: 4px;\n" +
      "  \n" +
      "  &--primary {\n" +
      "    background-color: #3498db;\n" +
      "    color: white;\n" +
      "  }\n" +
      "  \n" +
      "  &--secondary {\n" +
      "    background-color: #95a5a6;\n" +
      "    color: white;\n" +
      "  }\n" +
      "  \n" +
      "  &__icon {\n" +
      "    margin-right: 8px;\n" +
      "  }\n" +
      "  \n" +
      "  &:hover {\n" +
      "    opacity: 0.8;\n" +
      "  }\n" +
      "  \n" +
      "  &:disabled {\n" +
      "    opacity: 0.5;\n" +
      "    cursor: not-allowed;\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Nesting Best Practices:**\n" +
      "```scss\n" +
      "// Good - Shallow nesting (max 3-4 levels)\n" +
      ".navigation {\n" +
      "  display: flex;\n" +
      "  \n" +
      "  &__list {\n" +
      "    display: flex;\n" +
      "    list-style: none;\n" +
      "  }\n" +
      "  \n" +
      "  &__item {\n" +
      "    margin-right: 20px;\n" +
      "  }\n" +
      "  \n" +
      "  &__link {\n" +
      "    text-decoration: none;\n" +
      "    color: #333;\n" +
      "    \n" +
      "    &:hover {\n" +
      "      color: #3498db;\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Avoid - Deep nesting\n" +
      ".container {\n" +
      "  .wrapper {\n" +
      "    .content {\n" +
      "      .section {\n" +
      "        .article {\n" +
      "          .paragraph {\n" +
      "            .text {\n" +
      "              color: red; // Too deep!\n" +
      "            }\n" +
      "          }\n" +
      "        }\n" +
      "      }\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Nesting with Media Queries:**\n" +
      "```scss\n" +
      ".responsive-container {\n" +
      "  padding: 20px;\n" +
      "  \n" +
      "  @media (min-width: 768px) {\n" +
      "    padding: 40px;\n" +
      "    \n" +
      "    .sidebar {\n" +
      "      width: 200px;\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  @media (min-width: 1024px) {\n" +
      "    padding: 60px;\n" +
      "    \n" +
      "    .sidebar {\n" +
      "      width: 250px;\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Performance Considerations:**\n" +
      "- Keep nesting shallow (max 3-4 levels)\n" +
      "- Use BEM methodology for class naming\n" +
      "- Avoid nesting for performance-critical selectors\n" +
      "- Use parent selector (&) for modifiers and states",
    category: "SASS",
    difficulty: "intermediate",
    tags: ["sass", "nesting", "parent-selector", "bem", "performance"],
  },
  {
    id: 29,
    question: "What are SASS Partials and Imports? How do you organize large SASS projects?",
    answer:
      "SASS Partials are separate files that contain snippets of CSS, and imports allow you to include them in your main stylesheet.\n\n" +
      "**File Structure:**\n" +
      "```\n" +
      "scss/\n" +
      "├── main.scss\n" +
      "├── abstracts/\n" +
      "│   ├── _variables.scss\n" +
      "│   ├── _functions.scss\n" +
      "│   └── _mixins.scss\n" +
      "├── base/\n" +
      "│   ├── _reset.scss\n" +
      "│   ├── _typography.scss\n" +
      "│   └── _base.scss\n" +
      "├── components/\n" +
      "│   ├── _buttons.scss\n" +
      "│   ├── _cards.scss\n" +
      "│   └── _forms.scss\n" +
      "├── layout/\n" +
      "│   ├── _header.scss\n" +
      "│   ├── _footer.scss\n" +
      "│   └── _grid.scss\n" +
      "└── pages/\n" +
      "    ├── _home.scss\n" +
      "    └── _about.scss\n" +
      "```\n\n" +
      "**Main SCSS File:**\n" +
      "```scss\n" +
      "// main.scss\n" +
      "// Abstracts\n" +
      "@import 'abstracts/variables';\n" +
      "@import 'abstracts/functions';\n" +
      "@import 'abstracts/mixins';\n" +
      "\n" +
      "// Base\n" +
      "@import 'base/reset';\n" +
      "@import 'base/typography';\n" +
      "@import 'base/base';\n" +
      "\n" +
      "// Layout\n" +
      "@import 'layout/header';\n" +
      "@import 'layout/footer';\n" +
      "@import 'layout/grid';\n" +
      "\n" +
      "// Components\n" +
      "@import 'components/buttons';\n" +
      "@import 'components/cards';\n" +
      "@import 'components/forms';\n" +
      "\n" +
      "// Pages\n" +
      "@import 'pages/home';\n" +
      "@import 'pages/about';\n" +
      "```\n\n" +
      "**Variables Partial:**\n" +
      "```scss\n" +
      "// _variables.scss\n" +
      "// Colors\n" +
      "$primary-color: #3498db;\n" +
      "$secondary-color: #2ecc71;\n" +
      "$accent-color: #e74c3c;\n" +
      "$text-color: #333333;\n" +
      "$background-color: #ffffff;\n" +
      "\n" +
      "// Typography\n" +
      "$font-family-primary: 'Helvetica Neue', Arial, sans-serif;\n" +
      "$font-family-secondary: Georgia, serif;\n" +
      "$font-size-base: 16px;\n" +
      "$line-height-base: 1.5;\n" +
      "\n" +
      "// Spacing\n" +
      "$spacing-unit: 8px;\n" +
      "$spacing-xs: $spacing-unit * 0.5;\n" +
      "$spacing-sm: $spacing-unit;\n" +
      "$spacing-md: $spacing-unit * 2;\n" +
      "$spacing-lg: $spacing-unit * 3;\n" +
      "$spacing-xl: $spacing-unit * 4;\n" +
      "\n" +
      "// Breakpoints\n" +
      "$breakpoints: (\n" +
      "  'mobile': 320px,\n" +
      "  'tablet': 768px,\n" +
      "  'desktop': 1024px,\n" +
      "  'large': 1200px\n" +
      ");\n" +
      "```\n\n" +
      "**Mixins Partial:**\n" +
      "```scss\n" +
      "// _mixins.scss\n" +
      "@import 'variables';\n" +
      "\n" +
      "// Responsive mixins\n" +
      "@mixin respond-to($breakpoint) {\n" +
      "  @if map-has-key($breakpoints, $breakpoint) {\n" +
      "    @media (min-width: map-get($breakpoints, $breakpoint)) {\n" +
      "      @content;\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Layout mixins\n" +
      "@mixin flex-center($direction: row) {\n" +
      "  display: flex;\n" +
      "  flex-direction: $direction;\n" +
      "  justify-content: center;\n" +
      "  align-items: center;\n" +
      "}\n" +
      "\n" +
      "@mixin clearfix {\n" +
      "  &::after {\n" +
      "    content: '';\n" +
      "    display: table;\n" +
      "    clear: both;\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Typography mixins\n" +
      "@mixin heading($size: 2rem, $weight: bold) {\n" +
      "  font-size: $size;\n" +
      "  font-weight: $weight;\n" +
      "  line-height: 1.2;\n" +
      "  margin-bottom: $spacing-md;\n" +
      "}\n" +
      "```\n\n" +
      "**Component Partial:**\n" +
      "```scss\n" +
      "// _buttons.scss\n" +
      "@import '../abstracts/variables';\n" +
      "@import '../abstracts/mixins';\n" +
      "\n" +
      ".button {\n" +
      "  @include flex-center;\n" +
      "  padding: $spacing-sm $spacing-md;\n" +
      "  border: none;\n" +
      "  border-radius: 4px;\n" +
      "  font-family: $font-family-primary;\n" +
      "  font-size: $font-size-base;\n" +
      "  cursor: pointer;\n" +
      "  transition: all 0.3s ease;\n" +
      "  \n" +
      "  &--primary {\n" +
      "    background-color: $primary-color;\n" +
      "    color: white;\n" +
      "    \n" +
      "    &:hover {\n" +
      "      background-color: darken($primary-color, 10%);\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  &--secondary {\n" +
      "    background-color: transparent;\n" +
      "    color: $primary-color;\n" +
      "    border: 2px solid $primary-color;\n" +
      "    \n" +
      "    &:hover {\n" +
      "      background-color: $primary-color;\n" +
      "      color: white;\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Use underscores for partial filenames\n" +
      "- Organize files by functionality\n" +
      "- Import order matters (variables first)\n" +
      "- Use relative imports\n" +
      "- Keep partials focused and small",
    category: "SASS",
    difficulty: "intermediate",
    tags: ["sass", "partials", "imports", "organization", "architecture"],
  },
  {
    id: 30,
    question: "What are SASS Loops and Conditionals? How do you use @for, @each, @while, and @if?",
    answer:
      "SASS provides control structures like loops and conditionals to generate CSS dynamically and reduce repetition.\n\n" +
      "**@for Loops:**\n" +
      "```scss\n" +
      "// Generate margin classes\n" +
      "@for $i from 1 through 5 {\n" +
      "  .margin-#{$i} {\n" +
      "    margin: #{$i * 10}px;\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Generate responsive grid columns\n" +
      "@for $i from 1 through 12 {\n" +
      "  .col-#{$i} {\n" +
      "    width: percentage($i / 12);\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Generate font sizes\n" +
      "@for $i from 1 through 6 {\n" +
      "  h#{$i} {\n" +
      "    font-size: #{3 - ($i - 1) * 0.5}rem;\n" +
      "    margin-bottom: 1rem;\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**@each Loops:**\n" +
      "```scss\n" +
      "// Generate color classes\n" +
      "$colors: (\n" +
      "  'primary': #3498db,\n" +
      "  'secondary': #2ecc71,\n" +
      "  'success': #27ae60,\n" +
      "  'warning': #f39c12,\n" +
      "  'danger': #e74c3c\n" +
      ");\n" +
      "\n" +
      "@each $name, $color in $colors {\n" +
      "  .text-#{$name} {\n" +
      "    color: $color;\n" +
      "  }\n" +
      "  \n" +
      "  .bg-#{$name} {\n" +
      "    background-color: $color;\n" +
      "  }\n" +
      "  \n" +
      "  .btn-#{$name} {\n" +
      "    background-color: $color;\n" +
      "    color: white;\n" +
      "    \n" +
      "    &:hover {\n" +
      "      background-color: darken($color, 10%);\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Generate social media colors\n" +
      "$social-colors: facebook #3b5998, twitter #1da1f2, instagram #e4405f, linkedin #0077b5;\n" +
      "\n" +
      "@each $social, $color in $social-colors {\n" +
      "  .social-#{$social} {\n" +
      "    color: $color;\n" +
      "    \n" +
      "    &:hover {\n" +
      "      background-color: $color;\n" +
      "      color: white;\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**@while Loops:**\n" +
      "```scss\n" +
      "// Generate z-index values\n" +
      "$z-index: 1;\n" +
      "@while $z-index <= 10 {\n" +
      "  .z-#{$z-index} {\n" +
      "    z-index: $z-index;\n" +
      "  }\n" +
      "  $z-index: $z-index + 1;\n" +
      "}\n" +
      "\n" +
      "// Generate spacing scale\n" +
      "$spacing: 0;\n" +
      "@while $spacing <= 100 {\n" +
      "  .p-#{$spacing} { padding: #{$spacing}px; }\n" +
      "  .m-#{$spacing} { margin: #{$spacing}px; }\n" +
      "  $spacing: $spacing + 5;\n" +
      "}\n" +
      "```\n\n" +
      "**@if Conditionals:**\n" +
      "```scss\n" +
      "// Theme-based styling\n" +
      "$theme: 'dark';\n" +
      "\n" +
      "@mixin theme-colors($bg, $text) {\n" +
      "  @if $theme == 'dark' {\n" +
      "    background-color: darken($bg, 20%);\n" +
      "    color: lighten($text, 20%);\n" +
      "  } @else if $theme == 'light' {\n" +
      "    background-color: lighten($bg, 20%);\n" +
      "    color: darken($text, 20%);\n" +
      "  } @else {\n" +
      "    background-color: $bg;\n" +
      "    color: $text;\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Responsive mixin with conditions\n" +
      "@mixin responsive($property, $mobile, $tablet, $desktop) {\n" +
      "  #{$property}: $mobile;\n" +
      "  \n" +
      "  @if $tablet {\n" +
      "    @media (min-width: 768px) {\n" +
      "      #{$property}: $tablet;\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  @if $desktop {\n" +
      "    @media (min-width: 1024px) {\n" +
      "      #{$property}: $desktop;\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Usage\n" +
      ".container {\n" +
      "  @include responsive(font-size, 14px, 16px, 18px);\n" +
      "  @include responsive(padding, 10px, 20px, 30px);\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Examples:**\n" +
      "```scss\n" +
      "// Generate CSS Grid template\n" +
      "@mixin grid-template($columns) {\n" +
      "  $template: '';\n" +
      "  @for $i from 1 through $columns {\n" +
      "    $template: $template + '1fr ';\n" +
      "  }\n" +
      "  grid-template-columns: unquote($template);\n" +
      "}\n" +
      "\n" +
      "// Generate animation delays\n" +
      "@for $i from 1 through 5 {\n" +
      "  .animate-delay-#{$i} {\n" +
      "    animation-delay: #{$i * 0.1}s;\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Use loops for repetitive patterns\n" +
      "- Keep loops simple and readable\n" +
      "- Avoid infinite loops with @while\n" +
      "- Use conditionals for theme variations\n" +
      "- Combine loops with maps for complex data",
    category: "SASS",
    difficulty: "advanced",
    tags: ["sass", "loops", "conditionals", "for", "each", "while", "if"],
  },
  {
    id: 31,
    question: "What are SASS Maps? How do you use them for data structures and configuration?",
    answer:
      "SASS Maps are key-value data structures that allow you to store and manipulate complex data in your stylesheets.\n\n" +
      "**Basic Map Syntax:**\n" +
      "```scss\n" +
      "// Define a map\n" +
      "$colors: (\n" +
      "  'primary': #3498db,\n" +
      "  'secondary': #2ecc71,\n" +
      "  'accent': #e74c3c,\n" +
      "  'text': #333333,\n" +
      "  'background': #ffffff\n" +
      ");\n" +
      "\n" +
      "// Access map values\n" +
      ".primary-button {\n" +
      "  background-color: map-get($colors, 'primary');\n" +
      "  color: map-get($colors, 'background');\n" +
      "}\n" +
      "\n" +
      "// Check if key exists\n" +
      "@if map-has-key($colors, 'primary') {\n" +
      "  .text-primary {\n" +
      "    color: map-get($colors, 'primary');\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Map Functions:**\n" +
      "```scss\n" +
      "$breakpoints: (\n" +
      "  'mobile': 320px,\n" +
      "  'tablet': 768px,\n" +
      "  'desktop': 1024px,\n" +
      "  'large': 1200px\n" +
      ");\n" +
      "\n" +
      "// Get all keys\n" +
      "$all-breakpoints: map-keys($breakpoints);\n" +
      "\n" +
      "// Get all values\n" +
      "$all-values: map-values($breakpoints);\n" +
      "\n" +
      "// Merge maps\n" +
      "$additional-breakpoints: (\n" +
      "  'xlarge': 1440px,\n" +
      "  'xxlarge': 1920px\n" +
      ");\n" +
      "\n" +
      "$all-breakpoints: map-merge($breakpoints, $additional-breakpoints);\n" +
      "\n" +
      "// Remove key\n" +
      "$mobile-breakpoints: map-remove($breakpoints, 'large');\n" +
      "```\n\n" +
      "**Advanced Map Usage:**\n" +
      "```scss\n" +
      "// Nested maps for complex data\n" +
      "$theme-config: (\n" +
      "  'light': (\n" +
      "    'background': #ffffff,\n" +
      "    'text': #333333,\n" +
      "    'primary': #3498db,\n" +
      "    'secondary': #2ecc71\n" +
      "  ),\n" +
      "  'dark': (\n" +
      "    'background': #1a1a1a,\n" +
      "    'text': #ffffff,\n" +
      "    'primary': #5dade2,\n" +
      "    'secondary': #58d68d\n" +
      "  )\n" +
      ");\n" +
      "\n" +
      "// Function to get theme color\n" +
      "@function theme-color($theme, $color) {\n" +
      "  $theme-map: map-get($theme-config, $theme);\n" +
      "  @return map-get($theme-map, $color);\n" +
      "}\n" +
      "\n" +
      "// Usage\n" +
      ".light-theme {\n" +
      "  background-color: theme-color('light', 'background');\n" +
      "  color: theme-color('light', 'text');\n" +
      "}\n" +
      "\n" +
      ".dark-theme {\n" +
      "  background-color: theme-color('dark', 'background');\n" +
      "  color: theme-color('dark', 'text');\n" +
      "}\n" +
      "```\n\n" +
      "**Map with Loops:**\n" +
      "```scss\n" +
      "$spacing-scale: (\n" +
      "  'xs': 4px,\n" +
      "  'sm': 8px,\n" +
      "  'md': 16px,\n" +
      "  'lg': 24px,\n" +
      "  'xl': 32px,\n" +
      "  'xxl': 48px\n" +
      ");\n" +
      "\n" +
      "@each $name, $value in $spacing-scale {\n" +
      "  .p-#{$name} { padding: $value; }\n" +
      "  .m-#{$name} { margin: $value; }\n" +
      "  .pt-#{$name} { padding-top: $value; }\n" +
      "  .pb-#{$name} { padding-bottom: $value; }\n" +
      "  .pl-#{$name} { padding-left: $value; }\n" +
      "  .pr-#{$name} { padding-right: $value; }\n" +
      "}\n" +
      "```\n\n" +
      "**Configuration Maps:**\n" +
      "```scss\n" +
      "$component-config: (\n" +
      "  'button': (\n" +
      "    'padding': 10px 20px,\n" +
      "    'border-radius': 4px,\n" +
      "    'font-size': 16px,\n" +
      "    'transition': all 0.3s ease\n" +
      "  ),\n" +
      "  'card': (\n" +
      "    'padding': 20px,\n" +
      "    'border-radius': 8px,\n" +
      "    'box-shadow': 0 2px 4px rgba(0,0,0,0.1)\n" +
      "  )\n" +
      ");\n" +
      "\n" +
      "@mixin component-style($component) {\n" +
      "  $config: map-get($component-config, $component);\n" +
      "  \n" +
      "  @each $property, $value in $config {\n" +
      "    #{$property}: $value;\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      ".button {\n" +
      "  @include component-style('button');\n" +
      "}\n" +
      "\n" +
      ".card {\n" +
      "  @include component-style('card');\n" +
      "}\n" +
      "```",
    category: "SASS",
    difficulty: "advanced",
    tags: ["sass", "maps", "data-structures", "configuration", "key-value"],
  },
  {
    id: 32,
    question: "What is SASS Interpolation? How do you use #{} for dynamic values and selectors?",
    answer:
      "SASS Interpolation allows you to inject variables and expressions into CSS properties, selectors, and other values using the #{} syntax.\n\n" +
      "**Basic Interpolation:**\n" +
      "```scss\n" +
      "$property: 'margin';\n" +
      "$direction: 'top';\n" +
      "$value: 20px;\n" +
      "\n" +
      ".element {\n" +
      "  #{$property}-#{$direction}: $value;\n" +
      "  // Outputs: margin-top: 20px;\n" +
      "}\n" +
      "\n" +
      "$prefix: 'my';\n" +
      "$suffix: 'component';\n" +
      "\n" +
      ".#{$prefix}-#{$suffix} {\n" +
      "  color: red;\n" +
      "  // Outputs: .my-component { color: red; }\n" +
      "}\n" +
      "```\n\n" +
      "**Dynamic Selectors:**\n" +
      "```scss\n" +
      "$components: 'button', 'input', 'select';\n" +
      "\n" +
      "@each $component in $components {\n" +
      "  .#{$component} {\n" +
      "    border: 1px solid #ccc;\n" +
      "    padding: 10px;\n" +
      "  }\n" +
      "  \n" +
      "  .#{$component}--primary {\n" +
      "    background-color: #3498db;\n" +
      "    color: white;\n" +
      "  }\n" +
      "  \n" +
      "  .#{$component}:hover {\n" +
      "    opacity: 0.8;\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Generates:\n" +
      "// .button { ... }\n" +
      "// .button--primary { ... }\n" +
      "// .button:hover { ... }\n" +
      "// .input { ... }\n" +
      "// etc.\n" +
      "```\n\n" +
      "**Dynamic Properties:**\n" +
      "```scss\n" +
      "$properties: 'margin', 'padding';\n" +
      "$directions: 'top', 'right', 'bottom', 'left';\n" +
      "$values: 5px, 10px, 15px, 20px;\n" +
      "\n" +
      "@each $property in $properties {\n" +
      "  @each $direction in $directions {\n" +
      "    @for $i from 1 through length($values) {\n" +
      "      $value: nth($values, $i);\n" +
      "      \n" +
      "      .#{$property}-#{$direction}-#{$i} {\n" +
      "        #{$property}-#{$direction}: $value;\n" +
      "      }\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Generates classes like:\n" +
      "// .margin-top-1 { margin-top: 5px; }\n" +
      "// .margin-top-2 { margin-top: 10px; }\n" +
      "// .padding-left-4 { padding-left: 20px; }\n" +
      "```\n\n" +
      "**URL and Content Interpolation:**\n" +
      "```scss\n" +
      "$image-path: '/assets/images';\n" +
      "$image-name: 'logo';\n" +
      "$image-extension: 'png';\n" +
      "\n" +
      ".logo {\n" +
      "  background-image: url('#{$image-path}/#{$image-name}.#{$image-extension}');\n" +
      "  // Outputs: url('/assets/images/logo.png')\n" +
      "}\n" +
      "\n" +
      "$icon-name: 'arrow';\n" +
      "$icon-size: '24';\n" +
      "\n" +
      ".icon-#{$icon-name}::before {\n" +
      "  content: '#{$icon-name}-#{$icon-size}';\n" +
      "  // Outputs: content: 'arrow-24';\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Interpolation:**\n" +
      "```scss\n" +
      "// Generate responsive classes\n" +
      "$breakpoints: (\n" +
      "  'sm': 576px,\n" +
      "  'md': 768px,\n" +
      "  'lg': 992px,\n" +
      "  'xl': 1200px\n" +
      ");\n" +
      "\n" +
      "@each $name, $value in $breakpoints {\n" +
      "  @media (min-width: $value) {\n" +
      "    .container-#{$name} {\n" +
      "      max-width: $value;\n" +
      "    }\n" +
      "    \n" +
      "    .d-#{$name}-none { display: none; }\n" +
      "    .d-#{$name}-block { display: block; }\n" +
      "    .d-#{$name}-flex { display: flex; }\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Generate animation classes\n" +
      "$animations: 'fade', 'slide', 'bounce', 'rotate';\n" +
      "$durations: 0.3s, 0.5s, 0.7s, 1s;\n" +
      "\n" +
      "@each $animation in $animations {\n" +
      "  @for $i from 1 through length($durations) {\n" +
      "    $duration: nth($durations, $i);\n" +
      "    \n" +
      "    .animate-#{$animation}-#{$i} {\n" +
      "      animation: #{$animation} #{$duration} ease-in-out;\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Use interpolation for dynamic selectors and properties\n" +
      "- Combine with loops for generating utility classes\n" +
      "- Use for responsive design patterns\n" +
      "- Avoid overusing interpolation for performance\n" +
      "- Keep interpolated values readable",
    category: "SASS",
    difficulty: "advanced",
    tags: ["sass", "interpolation", "dynamic-selectors", "dynamic-properties", "loops"],
  },
  {
    id: 33,
    question:
      "What is SASS Inheritance and @extend? How do you use it effectively and avoid issues?",
    answer:
      "SASS Inheritance allows you to share styles between selectors using @extend, creating efficient CSS output by grouping selectors.\n\n" +
      "**Basic @extend Usage:**\n" +
      "```scss\n" +
      "// Base class\n" +
      ".button-base {\n" +
      "  padding: 10px 20px;\n" +
      "  border: none;\n" +
      "  border-radius: 4px;\n" +
      "  cursor: pointer;\n" +
      "  font-size: 16px;\n" +
      "  transition: all 0.3s ease;\n" +
      "}\n" +
      "\n" +
      "// Extend the base class\n" +
      ".primary-button {\n" +
      "  @extend .button-base;\n" +
      "  background-color: #3498db;\n" +
      "  color: white;\n" +
      "}\n" +
      "\n" +
      ".secondary-button {\n" +
      "  @extend .button-base;\n" +
      "  background-color: #95a5a6;\n" +
      "  color: white;\n" +
      "}\n" +
      "\n" +
      "// Output CSS:\n" +
      "// .button-base, .primary-button, .secondary-button {\n" +
      "//   padding: 10px 20px;\n" +
      "//   border: none;\n" +
      "//   ...\n" +
      "// }\n" +
      "// .primary-button { background-color: #3498db; color: white; }\n" +
      "// .secondary-button { background-color: #95a5a6; color: white; }\n" +
      "```\n\n" +
      "**Placeholder Selectors:**\n" +
      "```scss\n" +
      "// Placeholder selector (starts with %)\n" +
      "%button-base {\n" +
      "  padding: 10px 20px;\n" +
      "  border: none;\n" +
      "  border-radius: 4px;\n" +
      "  cursor: pointer;\n" +
      "  font-size: 16px;\n" +
      "  transition: all 0.3s ease;\n" +
      "}\n" +
      "\n" +
      "// Extend placeholder\n" +
      ".primary-button {\n" +
      "  @extend %button-base;\n" +
      "  background-color: #3498db;\n" +
      "  color: white;\n" +
      "}\n" +
      "\n" +
      ".secondary-button {\n" +
      "  @extend %button-base;\n" +
      "  background-color: #95a5a6;\n" +
      "  color: white;\n" +
      "}\n" +
      "\n" +
      "// Output CSS (no .button-base class generated):\n" +
      "// .primary-button, .secondary-button {\n" +
      "//   padding: 10px 20px;\n" +
      "//   ...\n" +
      "// }\n" +
      "```\n\n" +
      "**Multiple Inheritance:**\n" +
      "```scss\n" +
      "%flex-center {\n" +
      "  display: flex;\n" +
      "  justify-content: center;\n" +
      "  align-items: center;\n" +
      "}\n" +
      "\n" +
      "%text-center {\n" +
      "  text-align: center;\n" +
      "}\n" +
      "\n" +
      "%rounded {\n" +
      "  border-radius: 8px;\n" +
      "}\n" +
      "\n" +
      ".card {\n" +
      "  @extend %flex-center;\n" +
      "  @extend %text-center;\n" +
      "  @extend %rounded;\n" +
      "  padding: 20px;\n" +
      "  background-color: white;\n" +
      "  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n" +
      "}\n" +
      "```\n\n" +
      "**@extend vs @include:**\n" +
      "```scss\n" +
      "// Using @extend (inheritance)\n" +
      "%button-base {\n" +
      "  padding: 10px 20px;\n" +
      "  border: none;\n" +
      "  border-radius: 4px;\n" +
      "}\n" +
      "\n" +
      ".primary-button {\n" +
      "  @extend %button-base;\n" +
      "  background-color: #3498db;\n" +
      "}\n" +
      "\n" +
      "// Using @include (mixins)\n" +
      "@mixin button-base {\n" +
      "  padding: 10px 20px;\n" +
      "  border: none;\n" +
      "  border-radius: 4px;\n" +
      "}\n" +
      "\n" +
      ".secondary-button {\n" +
      "  @include button-base;\n" +
      "  background-color: #95a5a6;\n" +
      "}\n" +
      "\n" +
      "// @extend: Groups selectors, smaller CSS output\n" +
      "// @include: Duplicates code, larger CSS output but more flexible\n" +
      "```\n\n" +
      "**Best Practices and Limitations:**\n" +
      "```scss\n" +
      "// Good: Use placeholders for shared styles\n" +
      "%clearfix {\n" +
      "  &::after {\n" +
      "    content: '';\n" +
      "    display: table;\n" +
      "    clear: both;\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      ".container {\n" +
      "  @extend %clearfix;\n" +
      "}\n" +
      "\n" +
      "// Avoid: Extending across media queries\n" +
      ".base-class {\n" +
      "  color: red;\n" +
      "}\n" +
      "\n" +
      "@media (min-width: 768px) {\n" +
      "  .extended-class {\n" +
      "    @extend .base-class; // This can cause issues\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Better: Use mixins for media query scenarios\n" +
      "@mixin base-styles {\n" +
      "  color: red;\n" +
      "}\n" +
      "\n" +
      "@media (min-width: 768px) {\n" +
      "  .responsive-class {\n" +
      "    @include base-styles;\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**When to Use @extend vs @include:**\n" +
      "- **Use @extend**: For shared base styles, utility classes\n" +
      "- **Use @include**: For parameterized styles, media queries, complex logic\n" +
      "- **Avoid @extend**: Across media queries, with complex selectors\n" +
      "- **Prefer placeholders**: Over regular classes for @extend",
    category: "SASS",
    difficulty: "intermediate",
    tags: ["sass", "extend", "inheritance", "placeholders", "mixins"],
  },
  {
    id: 34,
    question:
      "What is SASS Error Handling and Debugging? How do you debug SASS compilation issues?",
    answer:
      "SASS provides several tools and techniques for error handling and debugging compilation issues.\n\n" +
      "**Common SASS Errors:**\n" +
      "```scss\n" +
      "// Syntax errors\n" +
      "$color: #3498db; // Missing semicolon\n" +
      ".button {\n" +
      "  background-color: $color\n" +
      "  // Missing semicolon\n" +
      "}\n" +
      "\n" +
      "// Undefined variable errors\n" +
      ".element {\n" +
      "  color: $undefined-variable; // Error: Undefined variable\n" +
      "}\n" +
      "\n" +
      "// Division errors\n" +
      "$width: 100px;\n" +
      "$height: 0px;\n" +
      "$ratio: $width / $height; // Error: Division by zero\n" +
      "\n" +
      "// Import errors\n" +
      "@import 'nonexistent-file'; // Error: File not found\n" +
      "```\n\n" +
      "**Error Handling Functions:**\n" +
      "```scss\n" +
      "// Check if variable exists\n" +
      "@function safe-get($map, $key, $default: null) {\n" +
      "  @if map-has-key($map, $key) {\n" +
      "    @return map-get($map, $key);\n" +
      "  } @else {\n" +
      "    @warn 'Key #{$key} not found in map';\n" +
      "    @return $default;\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "$colors: (\n" +
      "  'primary': #3498db,\n" +
      "  'secondary': #2ecc71\n" +
      ");\n" +
      "\n" +
      ".button {\n" +
      "  background-color: safe-get($colors, 'primary', #ccc);\n" +
      "  color: safe-get($colors, 'nonexistent', #333); // Uses fallback\n" +
      "}\n" +
      "\n" +
      "// Safe division function\n" +
      "@function safe-divide($numerator, $denominator) {\n" +
      "  @if $denominator == 0 {\n" +
      "    @error 'Division by zero is not allowed';\n" +
      "  }\n" +
      "  @return $numerator / $denominator;\n" +
      "}\n" +
      "\n" +
      "$ratio: safe-divide(100px, 50px); // 2\n" +
      "// $invalid-ratio: safe-divide(100px, 0px); // Error\n" +
      "```\n\n" +
      "**Debugging Functions:**\n" +
      "```scss\n" +
      "// Debug function to inspect values\n" +
      "@function debug-value($value) {\n" +
      "  @debug 'Value: #{$value}, Type: #{type-of($value)}';\n" +
      "  @return $value;\n" +
      "}\n" +
      "\n" +
      "$debug-color: debug-value(#3498db);\n" +
      "// Output: Value: #3498db, Type: color\n" +
      "\n" +
      "// Debug map contents\n" +
      "@function debug-map($map) {\n" +
      "  @debug 'Map keys: #{map-keys($map)}';\n" +
      "  @debug 'Map values: #{map-values($map)}';\n" +
      "  @return $map;\n" +
      "}\n" +
      "\n" +
      "$breakpoints: (\n" +
      "  'mobile': 320px,\n" +
      "  'tablet': 768px\n" +
      ");\n" +
      "\n" +
      "$debug-breakpoints: debug-map($breakpoints);\n" +
      "```\n\n" +
      "**Warning and Error Messages:**\n" +
      "```scss\n" +
      "// @warn - Shows warning but continues compilation\n" +
      "@mixin deprecated-mixin {\n" +
      "  @warn 'This mixin is deprecated. Use the new mixin instead.';\n" +
      "  // Old code here\n" +
      "}\n" +
      "\n" +
      "// @error - Stops compilation with error\n" +
      "@mixin validate-color($color) {\n" +
      "  @if type-of($color) != color {\n" +
      "    @error 'Expected color, got #{type-of($color)}';\n" +
      "  }\n" +
      "  color: $color;\n" +
      "}\n" +
      "\n" +
      "// @debug - Shows debug information\n" +
      "@mixin debug-mixin($param) {\n" +
      "  @debug 'Mixin called with: #{$param}';\n" +
      "  // Mixin code\n" +
      "}\n" +
      "```\n\n" +
      "**Compilation Options:**\n" +
      "```bash\n" +
      "# Enable source maps for debugging\n" +
      "sass --source-map input.scss output.css\n" +
      "\n" +
      "# Watch mode with error reporting\n" +
      "sass --watch input.scss:output.css --source-map\n" +
      "\n" +
      "# Verbose output\n" +
      "sass --verbose input.scss output.css\n" +
      "\n" +
      "# Stop on first error\n" +
      "sass --stop-on-error input.scss output.css\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Use @warn for deprecation notices\n" +
      "- Use @error for critical validation\n" +
      "- Use @debug for development debugging\n" +
      "- Enable source maps for easier debugging\n" +
      "- Validate inputs in functions and mixins\n" +
      "- Use meaningful error messages\n" +
      "- Test edge cases and error conditions",
    category: "SASS",
    difficulty: "intermediate",
    tags: ["sass", "debugging", "error-handling", "warnings", "source-maps"],
  },
  {
    id: 35,
    question: "What is SASS Performance Optimization? How do you write efficient SASS code?",
    answer:
      "SASS performance optimization involves writing efficient code that compiles quickly and produces optimized CSS output.\n\n" +
      "**Efficient Selector Writing:**\n" +
      "```scss\n" +
      "// Good - Simple selectors\n" +
      ".button {\n" +
      "  padding: 10px 20px;\n" +
      "  \n" +
      "  &--primary {\n" +
      "    background-color: #3498db;\n" +
      "  }\n" +
      "  \n" +
      "  &:hover {\n" +
      "    opacity: 0.8;\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Avoid - Complex nested selectors\n" +
      ".container {\n" +
      "  .wrapper {\n" +
      "    .content {\n" +
      "      .section {\n" +
      "        .article {\n" +
      "          .paragraph {\n" +
      "            .text {\n" +
      "              color: red; // Too deep!\n" +
      "            }\n" +
      "          }\n" +
      "        }\n" +
      "      }\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Optimized Mixins:**\n" +
      "```scss\n" +
      "// Good - Simple mixins\n" +
      "@mixin flex-center {\n" +
      "  display: flex;\n" +
      "  justify-content: center;\n" +
      "  align-items: center;\n" +
      "}\n" +
      "\n" +
      "@mixin button-base {\n" +
      "  padding: 10px 20px;\n" +
      "  border: none;\n" +
      "  border-radius: 4px;\n" +
      "  cursor: pointer;\n" +
      "}\n" +
      "\n" +
      "// Avoid - Complex mixins with many parameters\n" +
      "@mixin mega-mixin($color, $size, $weight, $spacing, $border, $shadow, $animation) {\n" +
      "  color: $color;\n" +
      "  font-size: $size;\n" +
      "  font-weight: $weight;\n" +
      "  margin: $spacing;\n" +
      "  border: $border;\n" +
      "  box-shadow: $shadow;\n" +
      "  animation: $animation;\n" +
      "  // Too many responsibilities!\n" +
      "}\n" +
      "```\n\n" +
      "**Efficient Loops:**\n" +
      "```scss\n" +
      "// Good - Simple loops\n" +
      "@for $i from 1 through 5 {\n" +
      "  .margin-#{$i} {\n" +
      "    margin: #{$i * 10}px;\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Avoid - Nested loops with complex logic\n" +
      "@for $i from 1 through 100 {\n" +
      "  @for $j from 1 through 100 {\n" +
      "    @for $k from 1 through 100 {\n" +
      "      .class-#{$i}-#{$j}-#{$k} {\n" +
      "        // This will generate 1,000,000 classes!\n" +
      "      }\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Optimized Imports:**\n" +
      "```scss\n" +
      "// Good - Organized imports\n" +
      "// main.scss\n" +
      "@import 'variables';\n" +
      "@import 'mixins';\n" +
      "@import 'base';\n" +
      "@import 'components';\n" +
      "@import 'utilities';\n" +
      "\n" +
      "// Avoid - Circular imports\n" +
      "// file1.scss\n" +
      "@import 'file2';\n" +
      "\n" +
      "// file2.scss\n" +
      "@import 'file1'; // Circular dependency!\n" +
      "```\n\n" +
      "**Memory Optimization:**\n" +
      "```scss\n" +
      "// Good - Use maps efficiently\n" +
      "$colors: (\n" +
      "  'primary': #3498db,\n" +
      "  'secondary': #2ecc71\n" +
      ");\n" +
      "\n" +
      "@function get-color($name) {\n" +
      "  @return map-get($colors, $name);\n" +
      "}\n" +
      "\n" +
      "// Avoid - Large maps with unused values\n" +
      "$huge-map: (\n" +
      "  'color1': #000,\n" +
      "  'color2': #111,\n" +
      "  // ... 1000 more colors that are never used\n" +
      ");\n" +
      "```\n\n" +
      "**Compilation Optimization:**\n" +
      "```bash\n" +
      "# Use Dart Sass for better performance\n" +
      "npm install -g sass\n" +
      "\n" +
      "# Compile with optimizations\n" +
      "sass --style=compressed input.scss output.css\n" +
      "\n" +
      "# Use watch mode efficiently\n" +
      "sass --watch src:dist --style=compressed\n" +
      "\n" +
      "# Exclude unnecessary files\n" +
      "sass --watch src:dist --exclude='**/test/**' --exclude='**/debug/**'\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Keep nesting shallow (max 3-4 levels)\n" +
      "- Use @extend for shared styles\n" +
      "- Avoid complex calculations in loops\n" +
      "- Use maps instead of multiple variables\n" +
      "- Minimize @import statements\n" +
      "- Use compressed output for production\n" +
      "- Profile compilation time\n" +
      "- Use Dart Sass over Ruby Sass\n" +
      "- Avoid circular dependencies\n" +
      "- Keep mixins focused and simple",
    category: "SASS",
    difficulty: "advanced",
    tags: ["sass", "performance", "optimization", "compilation", "efficiency"],
  },
  {
    id: 36,
    question:
      "What is the difference between TypeScript interfaces and types? When should you use each?",
    answer:
      "TypeScript interfaces and types are both used to define object shapes, but they have important differences in behavior and use cases.\n\n" +
      "**Key Differences:**\n\n" +
      "**1. Declaration Merging:**\n" +
      "```typescript\n" +
      "// Interfaces can be merged\n" +
      "interface User {\n" +
      "  name: string;\n" +
      "}\n" +
      "\n" +
      "interface User {\n" +
      "  age: number;\n" +
      "}\n" +
      "\n" +
      "// Result: User has both name and age\n" +
      "const user: User = {\n" +
      "  name: 'John',\n" +
      "  age: 30\n" +
      "};\n" +
      "\n" +
      "// Types cannot be merged\n" +
      "type UserType = {\n" +
      "  name: string;\n" +
      "};\n" +
      "\n" +
      "// This would cause an error\n" +
      "// type UserType = {\n" +
      "//   age: number;\n" +
      "// };\n" +
      "```\n\n" +
      "**2. Extensibility:**\n" +
      "```typescript\n" +
      "// Interface extension\n" +
      "interface Animal {\n" +
      "  name: string;\n" +
      "}\n" +
      "\n" +
      "interface Dog extends Animal {\n" +
      "  breed: string;\n" +
      "}\n" +
      "\n" +
      "// Type intersection\n" +
      "type AnimalType = {\n" +
      "  name: string;\n" +
      "};\n" +
      "\n" +
      "type DogType = AnimalType & {\n" +
      "  breed: string;\n" +
      "};\n" +
      "```\n\n" +
      "**3. Union Types:**\n" +
      "```typescript\n" +
      "// Types can represent unions\n" +
      "type Status = 'loading' | 'success' | 'error';\n" +
      "type ID = string | number;\n" +
      "\n" +
      "// Interfaces cannot represent unions\n" +
      "// interface Status {\n" +
      "//   'loading' | 'success' | 'error'; // This is invalid\n" +
      "// }\n" +
      "```\n\n" +
      "**4. Computed Properties:**\n" +
      "```typescript\n" +
      "// Types support computed properties\n" +
      "type Keys = 'name' | 'age' | 'email';\n" +
      "type User = {\n" +
      "  [K in Keys]: string;\n" +
      "};\n" +
      "\n" +
      "// Interfaces don't support mapped types directly\n" +
      "// interface User {\n" +
      "//   [K in Keys]: string; // This is invalid\n" +
      "// }\n" +
      "```\n\n" +
      "**5. Primitives and Literals:**\n" +
      "```typescript\n" +
      "// Types can represent primitives\n" +
      "type StringType = string;\n" +
      "type NumberType = number;\n" +
      "type BooleanType = boolean;\n" +
      "\n" +
      "// Interfaces cannot represent primitives\n" +
      "// interface StringInterface = string; // This is invalid\n" +
      "```\n\n" +
      "**When to Use Interfaces:**\n" +
      "- Object shapes that might be extended\n" +
      "- Public API definitions\n" +
      "- When you need declaration merging\n" +
      "- Class implementations\n" +
      "\n" +
      "**When to Use Types:**\n" +
      "- Union types\n" +
      "- Computed/mapped types\n" +
      "- Primitives and literals\n" +
      "- Complex type transformations\n" +
      "- When you need more flexibility",
    category: "TypeScript",
    difficulty: "intermediate",
    tags: ["typescript", "interfaces", "types", "differences", "best-practices"],
  },
  {
    id: 37,
    question:
      "What are TypeScript Iterators and Generators? How do you implement custom iterables?",
    answer:
      "TypeScript iterators and generators provide powerful ways to create custom iteration behavior and lazy evaluation.\n\n" +
      "**Iterators:**\n" +
      "```typescript\n" +
      "// Iterator interface\n" +
      "interface Iterator<T> {\n" +
      "  next(): IteratorResult<T>;\n" +
      "  return?(value?: any): IteratorResult<T>;\n" +
      "  throw?(e?: any): IteratorResult<T>;\n" +
      "}\n" +
      "\n" +
      "interface IteratorResult<T> {\n" +
      "  done: boolean;\n" +
      "  value: T;\n" +
      "}\n" +
      "\n" +
      "// Custom iterator\n" +
      "class NumberRange implements Iterable<number> {\n" +
      "  constructor(\n" +
      "    private start: number,\n" +
      "    private end: number,\n" +
      "    private step: number = 1\n" +
      "  ) {}\n" +
      "\n" +
      "  [Symbol.iterator](): Iterator<number> {\n" +
      "    let current = this.start;\n" +
      "    const end = this.end;\n" +
      "    const step = this.step;\n" +
      "\n" +
      "    return {\n" +
      "      next(): IteratorResult<number> {\n" +
      "        if (current < end) {\n" +
      "          const value = current;\n" +
      "          current += step;\n" +
      "          return { done: false, value };\n" +
      "        }\n" +
      "        return { done: true, value: undefined };\n" +
      "      }\n" +
      "    };\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Usage\n" +
      "const range = new NumberRange(1, 10, 2);\n" +
      "for (const num of range) {\n" +
      "  console.log(num); // 1, 3, 5, 7, 9\n" +
      "}\n" +
      "```\n\n" +
      "**Generators:**\n" +
      "```typescript\n" +
      "// Generator function\n" +
      "function* fibonacci(): Generator<number> {\n" +
      "  let a = 0;\n" +
      "  let b = 1;\n" +
      "\n" +
      "  while (true) {\n" +
      "    yield a;\n" +
      "    [a, b] = [b, a + b];\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Usage\n" +
      "const fib = fibonacci();\n" +
      "console.log(fib.next().value); // 0\n" +
      "console.log(fib.next().value); // 1\n" +
      "console.log(fib.next().value); // 1\n" +
      "console.log(fib.next().value); // 2\n" +
      "console.log(fib.next().value); // 3\n" +
      "\n" +
      "// Generator with parameters\n" +
      "function* counter(start: number = 0): Generator<number> {\n" +
      "  let current = start;\n" +
      "  \n" +
      "  while (true) {\n" +
      "    const reset = yield current++;\n" +
      "    if (reset) {\n" +
      "      current = start;\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "const count = counter(10);\n" +
      "console.log(count.next().value); // 10\n" +
      "console.log(count.next().value); // 11\n" +
      "console.log(count.next(true).value); // 10 (reset)\n" +
      "```\n\n" +
      "**Advanced Generator Patterns:**\n" +
      "```typescript\n" +
      "// Generator for async operations\n" +
      "async function* asyncGenerator(): AsyncGenerator<string> {\n" +
      "  const urls = ['url1', 'url2', 'url3'];\n" +
      "  \n" +
      "  for (const url of urls) {\n" +
      "    try {\n" +
      "      const response = await fetch(url);\n" +
      "      const data = await response.text();\n" +
      "      yield data;\n" +
      "    } catch (error) {\n" +
      "      yield `Error fetching ${url}`;\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Usage\n" +
      "for await (const data of asyncGenerator()) {\n" +
      "  console.log(data);\n" +
      "}\n" +
      "\n" +
      "// Generator for data processing pipeline\n" +
      "function* dataPipeline<T>(data: T[]): Generator<T> {\n" +
      "  for (const item of data) {\n" +
      "    // Process item\n" +
      "    const processed = processItem(item);\n" +
      "    yield processed;\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "function processItem<T>(item: T): T {\n" +
      "  // Processing logic\n" +
      "  return item;\n" +
      "}\n" +
      "```\n\n" +
      "**Custom Iterable with Generators:**\n" +
      "```typescript\n" +
      "class Tree<T> implements Iterable<T> {\n" +
      "  constructor(\n" +
      "    public value: T,\n" +
      "    public children: Tree<T>[] = []\n" +
      "  ) {}\n" +
      "\n" +
      "  *[Symbol.iterator](): Generator<T> {\n" +
      "    yield this.value;\n" +
      "    for (const child of this.children) {\n" +
      "      yield* child;\n" +
      "    }\n" +
      "  }\n" +
      "\n" +
      "  // Depth-first traversal\n" +
      "  *depthFirst(): Generator<T> {\n" +
      "    yield this.value;\n" +
      "    for (const child of this.children) {\n" +
      "      yield* child.depthFirst();\n" +
      "    }\n" +
      "  }\n" +
      "\n" +
      "  // Breadth-first traversal\n" +
      "  *breadthFirst(): Generator<T> {\n" +
      "    const queue: Tree<T>[] = [this];\n" +
      "    \n" +
      "    while (queue.length > 0) {\n" +
      "      const node = queue.shift()!;\n" +
      "      yield node.value;\n" +
      "      queue.push(...node.children);\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Usage\n" +
      "const tree = new Tree(1, [\n" +
      "  new Tree(2, [new Tree(4), new Tree(5)]),\n" +
      "  new Tree(3, [new Tree(6)])\n" +
      "]);\n" +
      "\n" +
      "console.log([...tree]); // [1, 2, 4, 5, 3, 6]\n" +
      "console.log([...tree.depthFirst()]); // [1, 2, 4, 5, 3, 6]\n" +
      "console.log([...tree.breadthFirst()]); // [1, 2, 3, 4, 5, 6]\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Use generators for lazy evaluation\n" +
      "- Implement Symbol.iterator for custom iterables\n" +
      "- Use async generators for async operations\n" +
      "- Consider memory usage with infinite generators\n" +
      "- Use yield* for delegating to other generators",
    category: "TypeScript",
    difficulty: "advanced",
    tags: ["typescript", "iterators", "generators", "iterables", "async-generators"],
  },
  {
    id: 38,
    question:
      "What are TypeScript Generics? How do you use them for type safety and code reusability?",
    answer:
      "TypeScript generics allow you to create reusable components that work with multiple types while maintaining type safety.\n\n" +
      "**Basic Generics:**\n" +
      "```typescript\n" +
      "// Generic function\n" +
      "function identity<T>(arg: T): T {\n" +
      "  return arg;\n" +
      "}\n" +
      "\n" +
      "// Usage with explicit type\n" +
      "const stringResult = identity<string>('hello');\n" +
      "const numberResult = identity<number>(42);\n" +
      "\n" +
      "// Type inference\n" +
      "const inferredString = identity('hello'); // T is inferred as string\n" +
      "const inferredNumber = identity(42); // T is inferred as number\n" +
      "\n" +
      "// Generic interface\n" +
      "interface Container<T> {\n" +
      "  value: T;\n" +
      "  getValue(): T;\n" +
      "  setValue(value: T): void;\n" +
      "}\n" +
      "\n" +
      "class Box<T> implements Container<T> {\n" +
      "  constructor(public value: T) {}\n" +
      "\n" +
      "  getValue(): T {\n" +
      "    return this.value;\n" +
      "  }\n" +
      "\n" +
      "  setValue(value: T): void {\n" +
      "    this.value = value;\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "const stringBox = new Box<string>('hello');\n" +
      "const numberBox = new Box<number>(42);\n" +
      "```\n\n" +
      "**Generic Constraints:**\n" +
      "```typescript\n" +
      "// Constraint with extends\n" +
      "interface Lengthwise {\n" +
      "  length: number;\n" +
      "}\n" +
      "\n" +
      "function logLength<T extends Lengthwise>(arg: T): T {\n" +
      "  console.log(arg.length);\n" +
      "  return arg;\n" +
      "}\n" +
      "\n" +
      "logLength('hello'); // OK, string has length\n" +
      "logLength([1, 2, 3]); // OK, array has length\n" +
      "// logLength(42); // Error, number doesn't have length\n" +
      "\n" +
      "// Multiple constraints\n" +
      "interface Serializable {\n" +
      "  serialize(): string;\n" +
      "}\n" +
      "\n" +
      "function process<T extends Lengthwise & Serializable>(arg: T): string {\n" +
      "  console.log('Length:', arg.length);\n" +
      "  return arg.serialize();\n" +
      "}\n" +
      "```\n\n" +
      "**Generic Classes:**\n" +
      "```typescript\n" +
      "class GenericNumber<T> {\n" +
      "  zeroValue: T;\n" +
      "  add: (x: T, y: T) => T;\n" +
      "\n" +
      "  constructor(zeroValue: T, addFunction: (x: T, y: T) => T) {\n" +
      "    this.zeroValue = zeroValue;\n" +
      "    this.add = addFunction;\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "const myGenericNumber = new GenericNumber<number>(0, (x, y) => x + y);\n" +
      "const myGenericString = new GenericNumber<string>('', (x, y) => x + y);\n" +
      "\n" +
      "// Generic with default type\n" +
      "class Container<T = string> {\n" +
      "  constructor(public value: T) {}\n" +
      "}\n" +
      "\n" +
      "const defaultContainer = new Container('hello'); // T is string\n" +
      "const numberContainer = new Container<number>(42); // T is number\n" +
      "```\n\n" +
      "**Advanced Generic Patterns:**\n" +
      "```typescript\n" +
      "// Conditional types\n" +
      "type NonNullable<T> = T extends null | undefined ? never : T;\n" +
      "\n" +
      "// Mapped types\n" +
      "type Partial<T> = {\n" +
      "  [P in keyof T]?: T[P];\n" +
      "};\n" +
      "\n" +
      "type Readonly<T> = {\n" +
      "  readonly [P in keyof T]: T[P];\n" +
      "};\n" +
      "\n" +
      "// Generic utility functions\n" +
      "function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n" +
      "  return obj[key];\n" +
      "}\n" +
      "\n" +
      "const person = { name: 'John', age: 30, city: 'New York' };\n" +
      "const name = getProperty(person, 'name'); // string\n" +
      "const age = getProperty(person, 'age'); // number\n" +
      "\n" +
      "// Generic with function overloads\n" +
      "function createArray<T>(length: number, value: T): T[];\n" +
      "function createArray<T>(length: number): T[];\n" +
      "function createArray<T>(length: number, value?: T): T[] {\n" +
      "  const result: T[] = [];\n" +
      "  for (let i = 0; i < length; i++) {\n" +
      "    result.push(value as T);\n" +
      "  }\n" +
      "  return result;\n" +
      "}\n" +
      "\n" +
      "const numbers = createArray<number>(5, 0); // [0, 0, 0, 0, 0]\n" +
      "const strings = createArray<string>(3, 'hello'); // ['hello', 'hello', 'hello']\n" +
      "```\n\n" +
      "**Generic API Design:**\n" +
      "```typescript\n" +
      "// Generic API response\n" +
      "interface ApiResponse<T> {\n" +
      "  data: T;\n" +
      "  status: number;\n" +
      "  message: string;\n" +
      "  success: boolean;\n" +
      "}\n" +
      "\n" +
      "// Generic API client\n" +
      "class ApiClient {\n" +
      "  async get<T>(url: string): Promise<ApiResponse<T>> {\n" +
      "    const response = await fetch(url);\n" +
      "    const data = await response.json();\n" +
      "    return {\n" +
      "      data: data as T,\n" +
      "      status: response.status,\n" +
      "      message: 'Success',\n" +
      "      success: response.ok\n" +
      "    };\n" +
      "  }\n" +
      "\n" +
      "  async post<T, R>(url: string, data: T): Promise<ApiResponse<R>> {\n" +
      "    const response = await fetch(url, {\n" +
      "      method: 'POST',\n" +
      "      headers: { 'Content-Type': 'application/json' },\n" +
      "      body: JSON.stringify(data)\n" +
      "    });\n" +
      "    const result = await response.json();\n" +
      "    return {\n" +
      "      data: result as R,\n" +
      "      status: response.status,\n" +
      "      message: 'Success',\n" +
      "      success: response.ok\n" +
      "    };\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Usage\n" +
      "interface User {\n" +
      "  id: number;\n" +
      "  name: string;\n" +
      "  email: string;\n" +
      "}\n" +
      "\n" +
      "const apiClient = new ApiClient();\n" +
      "const userResponse = await apiClient.get<User>('/users/1');\n" +
      "const createUserResponse = await apiClient.post<Partial<User>, User>('/users', {\n" +
      "  name: 'John',\n" +
      "  email: 'john@example.com'\n" +
      "});\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Use descriptive generic parameter names (T, U, V for simple cases)\n" +
      "- Prefer type inference when possible\n" +
      "- Use constraints to limit generic types\n" +
      "- Consider default generic parameters\n" +
      "- Use generics for reusable components\n" +
      "- Avoid over-genericizing simple cases",
    category: "TypeScript",
    difficulty: "advanced",
    tags: ["typescript", "generics", "type-safety", "constraints", "reusability"],
  },
  {
    id: 39,
    question:
      "What are TypeScript Utility Types? Explain Partial, Required, Readonly, Pick, Omit, and Exclude.",
    answer:
      "TypeScript utility types are built-in generic types that provide common type transformations for better type safety and code reusability.\n\n" +
      "**Partial<T>:**\n" +
      "```typescript\n" +
      "interface User {\n" +
      "  id: number;\n" +
      "  name: string;\n" +
      "  email: string;\n" +
      "  age: number;\n" +
      "}\n" +
      "\n" +
      "// Partial makes all properties optional\n" +
      "type PartialUser = Partial<User>;\n" +
      "// Equivalent to:\n" +
      "// type PartialUser = {\n" +
      "//   id?: number;\n" +
      "//   name?: string;\n" +
      "//   email?: string;\n" +
      "//   age?: number;\n" +
      "// }\n" +
      "\n" +
      "function updateUser(id: number, updates: Partial<User>): void {\n" +
      "  // Update user with partial data\n" +
      "  console.log('Updating user', id, 'with:', updates);\n" +
      "}\n" +
      "\n" +
      "updateUser(1, { name: 'John' }); // OK\n" +
      "updateUser(1, { email: 'john@example.com', age: 30 }); // OK\n" +
      "```\n\n" +
      "**Required<T>:**\n" +
      "```typescript\n" +
      "interface Config {\n" +
      "  apiUrl?: string;\n" +
      "  timeout?: number;\n" +
      "  retries?: number;\n" +
      "}\n" +
      "\n" +
      "// Required makes all properties mandatory\n" +
      "type RequiredConfig = Required<Config>;\n" +
      "// Equivalent to:\n" +
      "// type RequiredConfig = {\n" +
      "//   apiUrl: string;\n" +
      "//   timeout: number;\n" +
      "//   retries: number;\n" +
      "// }\n" +
      "\n" +
      "function initializeApp(config: RequiredConfig): void {\n" +
      "  // All properties are guaranteed to be present\n" +
      "  console.log('API URL:', config.apiUrl);\n" +
      "  console.log('Timeout:', config.timeout);\n" +
      "  console.log('Retries:', config.retries);\n" +
      "}\n" +
      "```\n\n" +
      "**Readonly<T>:**\n" +
      "```typescript\n" +
      "interface MutableData {\n" +
      "  value: string;\n" +
      "  count: number;\n" +
      "}\n" +
      "\n" +
      "// Readonly makes all properties immutable\n" +
      "type ReadonlyData = Readonly<MutableData>;\n" +
      "// Equivalent to:\n" +
      "// type ReadonlyData = {\n" +
      "//   readonly value: string;\n" +
      "//   readonly count: number;\n" +
      "// }\n" +
      "\n" +
      "function processData(data: ReadonlyData): void {\n" +
      "  console.log(data.value, data.count);\n" +
      "  // data.value = 'new'; // Error: Cannot assign to readonly property\n" +
      "}\n" +
      "\n" +
      "// Deep readonly\n" +
      "type DeepReadonly<T> = {\n" +
      "  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];\n" +
      "};\n" +
      "\n" +
      "interface NestedData {\n" +
      "  user: {\n" +
      "    name: string;\n" +
      "    settings: {\n" +
      "      theme: string;\n" +
      "    };\n" +
      "  };\n" +
      "}\n" +
      "\n" +
      "type ImmutableData = DeepReadonly<NestedData>;\n" +
      "```\n\n" +
      "**Pick<T, K>:**\n" +
      "```typescript\n" +
      "interface Product {\n" +
      "  id: number;\n" +
      "  name: string;\n" +
      "  price: number;\n" +
      "  description: string;\n" +
      "  category: string;\n" +
      "  inStock: boolean;\n" +
      "}\n" +
      "\n" +
      "// Pick selects specific properties\n" +
      "type ProductSummary = Pick<Product, 'id' | 'name' | 'price'>;\n" +
      "// Equivalent to:\n" +
      "// type ProductSummary = {\n" +
      "//   id: number;\n" +
      "//   name: string;\n" +
      "//   price: number;\n" +
      "// }\n" +
      "\n" +
      "function displayProductSummary(product: ProductSummary): void {\n" +
      "  console.log(`${product.name} - $${product.price}`);\n" +
      "}\n" +
      "\n" +
      "// Dynamic picking\n" +
      "type ProductKeys = keyof Product;\n" +
      "type ProductDisplay = Pick<Product, 'name' | 'price' | 'inStock'>;\n" +
      "```\n\n" +
      "**Omit<T, K>:**\n" +
      "```typescript\n" +
      "interface UserForm {\n" +
      "  id: number;\n" +
      "  name: string;\n" +
      "  email: string;\n" +
      "  password: string;\n" +
      "  createdAt: Date;\n" +
      "  updatedAt: Date;\n" +
      "}\n" +
      "\n" +
      "// Omit removes specific properties\n" +
      "type CreateUserData = Omit<UserForm, 'id' | 'createdAt' | 'updatedAt'>;\n" +
      "// Equivalent to:\n" +
      "// type CreateUserData = {\n" +
      "//   name: string;\n" +
      "//   email: string;\n" +
      "//   password: string;\n" +
      "// }\n" +
      "\n" +
      "function createUser(userData: CreateUserData): UserForm {\n" +
      "  return {\n" +
      "    id: Math.random(),\n" +
      "    ...userData,\n" +
      "    createdAt: new Date(),\n" +
      "    updatedAt: new Date()\n" +
      "  };\n" +
      "}\n" +
      "\n" +
      "// Omit with union types\n" +
      "type UpdateUserData = Omit<UserForm, 'id' | 'createdAt'> & {\n" +
      "  updatedAt: Date;\n" +
      "};\n" +
      "```\n\n" +
      "**Exclude<T, U>:**\n" +
      "```typescript\n" +
      "// Exclude removes types from a union\n" +
      "type AllColors = 'red' | 'green' | 'blue' | 'yellow' | 'purple';\n" +
      "type PrimaryColors = Exclude<AllColors, 'yellow' | 'purple'>;\n" +
      "// Result: 'red' | 'green' | 'blue'\n" +
      "\n" +
      "type AllStatuses = 'pending' | 'loading' | 'success' | 'error' | 'cancelled';\n" +
      "type ActiveStatuses = Exclude<AllStatuses, 'cancelled' | 'error'>;\n" +
      "// Result: 'pending' | 'loading' | 'success'\n" +
      "\n" +
      "// Exclude with function types\n" +
      "type AllFunctions = (() => void) | ((x: number) => void) | ((x: string) => void);\n" +
      "type NumberFunctions = Exclude<AllFunctions, (() => void) | ((x: string) => void)>;\n" +
      "// Result: (x: number) => void\n" +
      "```\n\n" +
      "**Combining Utility Types:**\n" +
      "```typescript\n" +
      "interface DatabaseEntity {\n" +
      "  id: number;\n" +
      "  createdAt: Date;\n" +
      "  updatedAt: Date;\n" +
      "  deletedAt?: Date;\n" +
      "}\n" +
      "\n" +
      "interface User extends DatabaseEntity {\n" +
      "  name: string;\n" +
      "  email: string;\n" +
      "  password: string;\n" +
      "  role: 'admin' | 'user' | 'guest';\n" +
      "}\n" +
      "\n" +
      "// Create user input (omit auto-generated fields)\n" +
      "type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;\n" +
      "\n" +
      "// Update user input (make all fields optional except id)\n" +
      "type UpdateUserInput = Partial<Omit<User, 'id'>> & { id: number };\n" +
      "\n" +
      "// User display (pick only displayable fields)\n" +
      "type UserDisplay = Pick<User, 'id' | 'name' | 'email' | 'role'>;\n" +
      "\n" +
      "// Public user (exclude sensitive fields)\n" +
      "type PublicUser = Omit<User, 'password' | 'deletedAt'>;\n" +
      "\n" +
      "// Readonly user for API responses\n" +
      "type ReadonlyUser = Readonly<PublicUser>;\n" +
      "```\n\n" +
      "**Custom Utility Types:**\n" +
      "```typescript\n" +
      "// Extract function return type\n" +
      "type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;\n" +
      "\n" +
      "// Extract function parameters\n" +
      "type Parameters<T> = T extends (...args: infer P) => any ? P : never;\n" +
      "\n" +
      "// Make specific properties required\n" +
      "type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;\n" +
      "\n" +
      "// Make specific properties optional\n" +
      "type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;\n" +
      "\n" +
      "// Deep partial\n" +
      "type DeepPartial<T> = {\n" +
      "  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];\n" +
      "};\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Use Partial for update operations\n" +
      "- Use Required for configuration objects\n" +
      "- Use Readonly for immutable data\n" +
      "- Use Pick for focused interfaces\n" +
      "- Use Omit to remove unwanted properties\n" +
      "- Use Exclude for union type filtering\n" +
      "- Combine utility types for complex transformations",
    category: "TypeScript",
    difficulty: "advanced",
    tags: [
      "typescript",
      "utility-types",
      "partial",
      "required",
      "readonly",
      "pick",
      "omit",
      "exclude",
    ],
  },
  {
    id: 40,
    question:
      "What is the Intersection Observer API? How do you use it for performance optimization and lazy loading?",
    answer:
      "The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with the top-level document's viewport.\n\n" +
      "**Basic Usage:**\n" +
      "```javascript\n" +
      "// Create observer\n" +
      "const observer = new IntersectionObserver((entries) => {\n" +
      "  entries.forEach(entry => {\n" +
      "    if (entry.isIntersecting) {\n" +
      "      console.log('Element is visible');\n" +
      "      // Load content or trigger animation\n" +
      "    } else {\n" +
      "      console.log('Element is not visible');\n" +
      "    }\n" +
      "  });\n" +
      "}, {\n" +
      "  root: null, // viewport\n" +
      "  rootMargin: '0px',\n" +
      "  threshold: 0.1 // 10% visible\n" +
      "});\n" +
      "\n" +
      "// Observe elements\n" +
      "const elements = document.querySelectorAll('.lazy-load');\n" +
      "elements.forEach(el => observer.observe(el));\n" +
      "```\n\n" +
      "**Lazy Loading Images:**\n" +
      "```javascript\n" +
      "const imageObserver = new IntersectionObserver((entries) => {\n" +
      "  entries.forEach(entry => {\n" +
      "    if (entry.isIntersecting) {\n" +
      "      const img = entry.target;\n" +
      "      img.src = img.dataset.src;\n" +
      "      img.classList.remove('lazy');\n" +
      "      imageObserver.unobserve(img);\n" +
      "    }\n" +
      "  });\n" +
      "}, {\n" +
      "  rootMargin: '50px 0px'\n" +
      "});\n" +
      "\n" +
      "document.querySelectorAll('img[data-src]').forEach(img => {\n" +
      "  imageObserver.observe(img);\n" +
      "});\n" +
      "```\n\n" +
      "**Infinite Scroll:**\n" +
      "```javascript\n" +
      "const infiniteScrollObserver = new IntersectionObserver((entries) => {\n" +
      "  entries.forEach(entry => {\n" +
      "    if (entry.isIntersecting) {\n" +
      "      loadMoreContent();\n" +
      "    }\n" +
      "  });\n" +
      "}, {\n" +
      "  rootMargin: '100px'\n" +
      "});\n" +
      "\n" +
      "const sentinel = document.querySelector('.load-more-trigger');\n" +
      "infiniteScrollObserver.observe(sentinel);\n" +
      "```\n\n" +
      "**Animation Triggers:**\n" +
      "```javascript\n" +
      "const animationObserver = new IntersectionObserver((entries) => {\n" +
      "  entries.forEach(entry => {\n" +
      "    if (entry.isIntersecting) {\n" +
      "      entry.target.classList.add('animate-in');\n" +
      "    } else {\n" +
      "      entry.target.classList.remove('animate-in');\n" +
      "    }\n" +
      "  });\n" +
      "}, {\n" +
      "  threshold: 0.5\n" +
      "});\n" +
      "```\n\n" +
      "**Performance Benefits:**\n" +
      "- Non-blocking: Doesn't run on main thread\n" +
      "- Efficient: Only triggers when visibility changes\n" +
      "- Battery friendly: Reduces unnecessary computations\n" +
      "- Better UX: Smooth scrolling performance",
    category: "Web APIs",
    difficulty: "intermediate",
    tags: ["intersection-observer", "performance", "lazy-loading", "infinite-scroll", "animations"],
  },
  {
    id: 41,
    question:
      "What is the WebSocket API? How do you implement real-time communication and handle connection states?",
    answer:
      "The WebSocket API provides a persistent connection between client and server, enabling real-time bidirectional communication.\n\n" +
      "**Basic WebSocket Connection:**\n" +
      "```javascript\n" +
      "class WebSocketManager {\n" +
      "  constructor(url) {\n" +
      "    this.url = url;\n" +
      "    this.ws = null;\n" +
      "    this.reconnectAttempts = 0;\n" +
      "    this.maxReconnectAttempts = 5;\n" +
      "    this.reconnectDelay = 1000;\n" +
      "  }\n" +
      "\n" +
      "  connect() {\n" +
      "    try {\n" +
      "      this.ws = new WebSocket(this.url);\n" +
      "      this.setupEventListeners();\n" +
      "    } catch (error) {\n" +
      "      console.error('WebSocket connection failed:', error);\n" +
      "    }\n" +
      "  }\n" +
      "\n" +
      "  setupEventListeners() {\n" +
      "    this.ws.onopen = (event) => {\n" +
      "      console.log('WebSocket connected');\n" +
      "      this.reconnectAttempts = 0;\n" +
      "      this.onConnectionOpen(event);\n" +
      "    };\n" +
      "\n" +
      "    this.ws.onmessage = (event) => {\n" +
      "      try {\n" +
      "        const data = JSON.parse(event.data);\n" +
      "        this.handleMessage(data);\n" +
      "      } catch (error) {\n" +
      "        console.error('Failed to parse message:', error);\n" +
      "      }\n" +
      "    };\n" +
      "\n" +
      "    this.ws.onclose = (event) => {\n" +
      "      console.log('WebSocket disconnected:', event.code, event.reason);\n" +
      "      this.onConnectionClose(event);\n" +
      "      this.handleReconnect();\n" +
      "    };\n" +
      "\n" +
      "    this.ws.onerror = (error) => {\n" +
      "      console.error('WebSocket error:', error);\n" +
      "      this.onConnectionError(error);\n" +
      "    };\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Message Handling:**\n" +
      "```javascript\n" +
      "handleMessage(data) {\n" +
      "  switch (data.type) {\n" +
      "    case 'chat':\n" +
      "      this.displayChatMessage(data.message);\n" +
      "      break;\n" +
      "    case 'notification':\n" +
      "      this.showNotification(data.content);\n" +
      "      break;\n" +
      "    case 'user_joined':\n" +
      "      this.updateUserList(data.users);\n" +
      "      break;\n" +
      "    case 'heartbeat':\n" +
      "      this.sendHeartbeat();\n" +
      "      break;\n" +
      "    default:\n" +
      "      console.log('Unknown message type:', data.type);\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "sendMessage(type, payload) {\n" +
      "  if (this.ws && this.ws.readyState === WebSocket.OPEN) {\n" +
      "    const message = {\n" +
      "      type,\n" +
      "      payload,\n" +
      "      timestamp: Date.now()\n" +
      "    };\n" +
      "    this.ws.send(JSON.stringify(message));\n" +
      "  } else {\n" +
      "    console.warn('WebSocket not connected');\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Connection State Management:**\n" +
      "```javascript\n" +
      "getConnectionState() {\n" +
      "  if (!this.ws) return 'CLOSED';\n" +
      "  \n" +
      "  switch (this.ws.readyState) {\n" +
      "    case WebSocket.CONNECTING: return 'CONNECTING';\n" +
      "    case WebSocket.OPEN: return 'OPEN';\n" +
      "    case WebSocket.CLOSING: return 'CLOSING';\n" +
      "    case WebSocket.CLOSED: return 'CLOSED';\n" +
      "    default: return 'UNKNOWN';\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "handleReconnect() {\n" +
      "  if (this.reconnectAttempts < this.maxReconnectAttempts) {\n" +
      "    this.reconnectAttempts++;\n" +
      "    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);\n" +
      "    \n" +
      "    setTimeout(() => {\n" +
      "      console.log(`Reconnecting... (attempt ${this.reconnectAttempts})`);\n" +
      "      this.connect();\n" +
      "    }, delay);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Usage Example:**\n" +
      "```javascript\n" +
      "const wsManager = new WebSocketManager('wss://api.example.com/ws');\n" +
      "wsManager.connect();\n" +
      "\n" +
      "// Send chat message\n" +
      "wsManager.sendMessage('chat', {\n" +
      "  text: 'Hello world!',\n" +
      "  userId: 'user123'\n" +
      "});\n" +
      "\n" +
      "// Check connection state\n" +
      "console.log(wsManager.getConnectionState()); // 'OPEN'\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Implement reconnection logic\n" +
      "- Handle connection state changes\n" +
      "- Use heartbeat for connection monitoring\n" +
      "- Implement message queuing for offline scenarios\n" +
      "- Handle different message types appropriately",
    category: "Web APIs",
    difficulty: "intermediate",
    tags: ["websocket", "real-time", "bidirectional", "connection-management", "reconnection"],
  },
  {
    id: 42,
    question:
      "What is the Fetch API? How do you handle different HTTP methods, error handling, and request/response processing?",
    answer:
      "The Fetch API provides a modern, promise-based interface for making HTTP requests, replacing the older XMLHttpRequest.\n\n" +
      "**Basic GET Request:**\n" +
      "```javascript\n" +
      "// Simple GET request\n" +
      "fetch('https://api.example.com/users')\n" +
      "  .then(response => {\n" +
      "    if (!response.ok) {\n" +
      "      throw new Error(`HTTP error! status: ${response.status}`);\n" +
      "    }\n" +
      "    return response.json();\n" +
      "  })\n" +
      "  .then(data => console.log(data))\n" +
      "  .catch(error => console.error('Error:', error));\n" +
      "\n" +
      "// Using async/await\n" +
      "async function fetchUsers() {\n" +
      "  try {\n" +
      "    const response = await fetch('https://api.example.com/users');\n" +
      "    if (!response.ok) {\n" +
      "      throw new Error(`HTTP error! status: ${response.status}`);\n" +
      "    }\n" +
      "    const users = await response.json();\n" +
      "    return users;\n" +
      "  } catch (error) {\n" +
      "    console.error('Failed to fetch users:', error);\n" +
      "    throw error;\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**POST Request with JSON:**\n" +
      "```javascript\n" +
      "async function createUser(userData) {\n" +
      "  try {\n" +
      "    const response = await fetch('https://api.example.com/users', {\n" +
      "      method: 'POST',\n" +
      "      headers: {\n" +
      "        'Content-Type': 'application/json',\n" +
      "        'Authorization': `Bearer ${token}`\n" +
      "      },\n" +
      "      body: JSON.stringify(userData)\n" +
      "    });\n" +
      "\n" +
      "    if (!response.ok) {\n" +
      "      const errorData = await response.json();\n" +
      "      throw new Error(errorData.message || 'Failed to create user');\n" +
      "    }\n" +
      "\n" +
      "    const newUser = await response.json();\n" +
      "    return newUser;\n" +
      "  } catch (error) {\n" +
      "    console.error('Error creating user:', error);\n" +
      "    throw error;\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**File Upload:**\n" +
      "```javascript\n" +
      "async function uploadFile(file) {\n" +
      "  const formData = new FormData();\n" +
      "  formData.append('file', file);\n" +
      "  formData.append('description', 'Profile picture');\n" +
      "\n" +
      "  try {\n" +
      "    const response = await fetch('https://api.example.com/upload', {\n" +
      "      method: 'POST',\n" +
      "      headers: {\n" +
      "        'Authorization': `Bearer ${token}`\n" +
      "      },\n" +
      "      body: formData\n" +
      "    });\n" +
      "\n" +
      "    if (!response.ok) {\n" +
      "      throw new Error('Upload failed');\n" +
      "    }\n" +
      "\n" +
      "    const result = await response.json();\n" +
      "    return result.url;\n" +
      "  } catch (error) {\n" +
      "    console.error('Upload error:', error);\n" +
      "    throw error;\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Request Configuration:**\n" +
      "```javascript\n" +
      "class ApiClient {\n" +
      "  constructor(baseURL, defaultHeaders = {}) {\n" +
      "    this.baseURL = baseURL;\n" +
      "    this.defaultHeaders = {\n" +
      "      'Content-Type': 'application/json',\n" +
      "      ...defaultHeaders\n" +
      "    };\n" +
      "  }\n" +
      "\n" +
      "  async request(endpoint, options = {}) {\n" +
      "    const url = `${this.baseURL}${endpoint}`;\n" +
      "    const config = {\n" +
      "      headers: {\n" +
      "        ...this.defaultHeaders,\n" +
      "        ...options.headers\n" +
      "      },\n" +
      "      ...options\n" +
      "    };\n" +
      "\n" +
      "    try {\n" +
      "      const response = await fetch(url, config);\n" +
      "      \n" +
      "      if (!response.ok) {\n" +
      "        const errorData = await response.json().catch(() => ({}));\n" +
      "        throw new ApiError(\n" +
      "          errorData.message || 'Request failed',\n" +
      "          response.status,\n" +
      "          errorData\n" +
      "        );\n" +
      "      }\n" +
      "\n" +
      "      return await response.json();\n" +
      "    } catch (error) {\n" +
      "      if (error instanceof ApiError) {\n" +
      "        throw error;\n" +
      "      }\n" +
      "      throw new ApiError('Network error', 0, { originalError: error });\n" +
      "    }\n" +
      "  }\n" +
      "\n" +
      "  get(endpoint, options = {}) {\n" +
      "    return this.request(endpoint, { ...options, method: 'GET' });\n" +
      "  }\n" +
      "\n" +
      "  post(endpoint, data, options = {}) {\n" +
      "    return this.request(endpoint, {\n" +
      "      ...options,\n" +
      "      method: 'POST',\n" +
      "      body: JSON.stringify(data)\n" +
      "    });\n" +
      "  }\n" +
      "\n" +
      "  put(endpoint, data, options = {}) {\n" +
      "    return this.request(endpoint, {\n" +
      "      ...options,\n" +
      "      method: 'PUT',\n" +
      "      body: JSON.stringify(data)\n" +
      "    });\n" +
      "  }\n" +
      "\n" +
      "  delete(endpoint, options = {}) {\n" +
      "    return this.request(endpoint, { ...options, method: 'DELETE' });\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "class ApiError extends Error {\n" +
      "  constructor(message, status, data) {\n" +
      "    super(message);\n" +
      "    this.name = 'ApiError';\n" +
      "    this.status = status;\n" +
      "    this.data = data;\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Response Processing:**\n" +
      "```javascript\n" +
      "async function handleResponse(response) {\n" +
      "  const contentType = response.headers.get('content-type');\n" +
      "  \n" +
      "  if (contentType && contentType.includes('application/json')) {\n" +
      "    return await response.json();\n" +
      "  } else if (contentType && contentType.includes('text/')) {\n" +
      "    return await response.text();\n" +
      "  } else if (contentType && contentType.includes('image/')) {\n" +
      "    return await response.blob();\n" +
      "  } else {\n" +
      "    return await response.arrayBuffer();\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Usage\n" +
      "const api = new ApiClient('https://api.example.com', {\n" +
      "  'Authorization': `Bearer ${token}`\n" +
      "});\n" +
      "\n" +
      "try {\n" +
      "  const users = await api.get('/users');\n" +
      "  const newUser = await api.post('/users', { name: 'John', email: 'john@example.com' });\n" +
      "} catch (error) {\n" +
      "  if (error instanceof ApiError) {\n" +
      "    console.error(`API Error ${error.status}: ${error.message}`);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Always check response.ok before processing\n" +
      "- Handle different content types appropriately\n" +
      "- Implement proper error handling\n" +
      "- Use request/response interceptors for common logic\n" +
      "- Implement timeout handling\n" +
      "- Use AbortController for request cancellation",
    category: "Web APIs",
    difficulty: "intermediate",
    tags: ["fetch", "http", "api", "async", "error-handling"],
  },
  {
    id: 43,
    question:
      "What are Web Storage APIs? Explain localStorage, sessionStorage, and IndexedDB with their use cases and limitations.",
    answer:
      "Web Storage APIs provide different ways to store data on the client side, each with specific characteristics and use cases.\n\n" +
      "**localStorage:**\n" +
      "```javascript\n" +
      "// localStorage - persists until explicitly cleared\n" +
      "class LocalStorageManager {\n" +
      "  static setItem(key, value) {\n" +
      "    try {\n" +
      "      const serializedValue = JSON.stringify(value);\n" +
      "      localStorage.setItem(key, serializedValue);\n" +
      "    } catch (error) {\n" +
      "      console.error('Error saving to localStorage:', error);\n" +
      "    }\n" +
      "  }\n" +
      "\n" +
      "  static getItem(key, defaultValue = null) {\n" +
      "    try {\n" +
      "      const item = localStorage.getItem(key);\n" +
      "      return item ? JSON.parse(item) : defaultValue;\n" +
      "    } catch (error) {\n" +
      "      console.error('Error reading from localStorage:', error);\n" +
      "      return defaultValue;\n" +
      "    }\n" +
      "  }\n" +
      "\n" +
      "  static removeItem(key) {\n" +
      "    localStorage.removeItem(key);\n" +
      "  }\n" +
      "\n" +
      "  static clear() {\n" +
      "    localStorage.clear();\n" +
      "  }\n" +
      "\n" +
      "  static getStorageSize() {\n" +
      "    let total = 0;\n" +
      "    for (let key in localStorage) {\n" +
      "      if (localStorage.hasOwnProperty(key)) {\n" +
      "        total += localStorage[key].length + key.length;\n" +
      "      }\n" +
      "    }\n" +
      "    return total;\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Usage\n" +
      "LocalStorageManager.setItem('userPreferences', {\n" +
      "  theme: 'dark',\n" +
      "  language: 'en',\n" +
      "  notifications: true\n" +
      "});\n" +
      "\n" +
      "const preferences = LocalStorageManager.getItem('userPreferences', {});\n" +
      "```\n\n" +
      "**sessionStorage:**\n" +
      "```javascript\n" +
      "// sessionStorage - cleared when tab is closed\n" +
      "class SessionStorageManager {\n" +
      "  static setItem(key, value) {\n" +
      "    try {\n" +
      "      sessionStorage.setItem(key, JSON.stringify(value));\n" +
      "    } catch (error) {\n" +
      "      console.error('Error saving to sessionStorage:', error);\n" +
      "    }\n" +
      "  }\n" +
      "\n" +
      "  static getItem(key, defaultValue = null) {\n" +
      "    try {\n" +
      "      const item = sessionStorage.getItem(key);\n" +
      "      return item ? JSON.parse(item) : defaultValue;\n" +
      "    } catch (error) {\n" +
      "      console.error('Error reading from sessionStorage:', error);\n" +
      "      return defaultValue;\n" +
      "    }\n" +
      "  }\n" +
      "\n" +
      "  static removeItem(key) {\n" +
      "    sessionStorage.removeItem(key);\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Usage for temporary data\n" +
      "SessionStorageManager.setItem('shoppingCart', [\n" +
      "  { id: 1, name: 'Product 1', quantity: 2 },\n" +
      "  { id: 2, name: 'Product 2', quantity: 1 }\n" +
      "]);\n" +
      "\n" +
      "const cart = SessionStorageManager.getItem('shoppingCart', []);\n" +
      "```\n\n" +
      "**IndexedDB:**\n" +
      "```javascript\n" +
      "// IndexedDB - for large amounts of structured data\n" +
      "class IndexedDBManager {\n" +
      "  constructor(dbName, version) {\n" +
      "    this.dbName = dbName;\n" +
      "    this.version = version;\n" +
      "    this.db = null;\n" +
      "  }\n" +
      "\n" +
      "  async open() {\n" +
      "    return new Promise((resolve, reject) => {\n" +
      "      const request = indexedDB.open(this.dbName, this.version);\n" +
      "\n" +
      "      request.onerror = () => reject(request.error);\n" +
      "      request.onsuccess = () => {\n" +
      "        this.db = request.result;\n" +
      "        resolve(this.db);\n" +
      "      };\n" +
      "\n" +
      "      request.onupgradeneeded = (event) => {\n" +
      "        const db = event.target.result;\n" +
      "        \n" +
      "        // Create object stores\n" +
      "        if (!db.objectStoreNames.contains('users')) {\n" +
      "          const userStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });\n" +
      "          userStore.createIndex('email', 'email', { unique: true });\n" +
      "        }\n" +
      "\n" +
      "        if (!db.objectStoreNames.contains('products')) {\n" +
      "          const productStore = db.createObjectStore('products', { keyPath: 'id' });\n" +
      "          productStore.createIndex('category', 'category', { unique: false });\n" +
      "        }\n" +
      "      };\n" +
      "    });\n" +
      "  }\n" +
      "\n" +
      "  async add(storeName, data) {\n" +
      "    const transaction = this.db.transaction([storeName], 'readwrite');\n" +
      "    const store = transaction.objectStore(storeName);\n" +
      "    return store.add(data);\n" +
      "  }\n" +
      "\n" +
      "  async get(storeName, key) {\n" +
      "    const transaction = this.db.transaction([storeName], 'readonly');\n" +
      "    const store = transaction.objectStore(storeName);\n" +
      "    return store.get(key);\n" +
      "  }\n" +
      "\n" +
      "  async getAll(storeName) {\n" +
      "    const transaction = this.db.transaction([storeName], 'readonly');\n" +
      "    const store = transaction.objectStore(storeName);\n" +
      "    return store.getAll();\n" +
      "  }\n" +
      "\n" +
      "  async update(storeName, data) {\n" +
      "    const transaction = this.db.transaction([storeName], 'readwrite');\n" +
      "    const store = transaction.objectStore(storeName);\n" +
      "    return store.put(data);\n" +
      "  }\n" +
      "\n" +
      "  async delete(storeName, key) {\n" +
      "    const transaction = this.db.transaction([storeName], 'readwrite');\n" +
      "    const store = transaction.objectStore(storeName);\n" +
      "    return store.delete(key);\n" +
      "  }\n" +
      "\n" +
      "  async search(storeName, indexName, value) {\n" +
      "    const transaction = this.db.transaction([storeName], 'readonly');\n" +
      "    const store = transaction.objectStore(storeName);\n" +
      "    const index = store.index(indexName);\n" +
      "    return index.getAll(value);\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Usage\n" +
      "const dbManager = new IndexedDBManager('MyAppDB', 1);\n" +
      "\n" +
      "async function initDB() {\n" +
      "  await dbManager.open();\n" +
      "  \n" +
      "  // Add user\n" +
      "  await dbManager.add('users', {\n" +
      "    name: 'John Doe',\n" +
      "    email: 'john@example.com',\n" +
      "    age: 30\n" +
      "  });\n" +
      "\n" +
      "  // Get all users\n" +
      "  const users = await dbManager.getAll('users');\n" +
      "  \n" +
      "  // Search by email\n" +
      "  const userByEmail = await dbManager.search('users', 'email', 'john@example.com');\n" +
      "}\n" +
      "```\n\n" +
      "**Comparison and Use Cases:**\n" +
      "```javascript\n" +
      "// localStorage: User preferences, settings, theme\n" +
      "localStorage.setItem('theme', 'dark');\n" +
      "localStorage.setItem('language', 'en');\n" +
      "\n" +
      "// sessionStorage: Temporary data, form data, shopping cart\n" +
      "sessionStorage.setItem('formData', JSON.stringify(formData));\n" +
      "sessionStorage.setItem('currentStep', '2');\n" +
      "\n" +
      "// IndexedDB: Large datasets, offline data, complex queries\n" +
      "// - Offline-first applications\n" +
      "// - Caching API responses\n" +
      "// - Storing user-generated content\n" +
      "// - Complex data relationships\n" +
      "```\n\n" +
      "**Limitations:**\n" +
      "- **localStorage/sessionStorage**: ~5-10MB per origin\n" +
      "- **IndexedDB**: Much larger (50% of available disk space)\n" +
      "- **Synchronous**: localStorage/sessionStorage are synchronous\n" +
      "- **String only**: localStorage/sessionStorage only store strings\n" +
      "- **Same-origin**: All storage is origin-specific\n" +
      "- **Browser limits**: Can be cleared by user or browser",
    category: "Web APIs",
    difficulty: "intermediate",
    tags: ["localStorage", "sessionStorage", "indexeddb", "client-storage", "persistence"],
  },
  {
    id: 44,
    question:
      "What is the History API? How do you implement client-side routing and manage browser history?",
    answer:
      "The History API allows web applications to manipulate the browser's session history, enabling client-side routing and navigation without page reloads.\n\n" +
      "**Basic History Operations:**\n" +
      "```javascript\n" +
      "// Navigate forward/backward\n" +
      "window.history.back();     // Go back one page\n" +
      "window.history.forward();  // Go forward one page\n" +
      "window.history.go(-2);     // Go back 2 pages\n" +
      "window.history.go(1);      // Go forward 1 page\n" +
      "\n" +
      "// Get current state\n" +
      "console.log(window.history.length); // Number of entries\n" +
      "console.log(window.history.state);  // Current state object\n" +
      "```\n\n" +
      "**pushState and replaceState:**\n" +
      "```javascript\n" +
      "// Add new entry to history\n" +
      "window.history.pushState(\n" +
      "  { page: 'profile', userId: 123 }, // state object\n" +
      "  'User Profile',                    // title (ignored by most browsers)\n" +
      "  '/profile/123'                     // URL\n" +
      ");\n" +
      "\n" +
      "// Replace current entry\n" +
      "window.history.replaceState(\n" +
      "  { page: 'home' },\n" +
      "  'Home Page',\n" +
      "  '/home'\n" +
      ");\n" +
      "\n" +
      "// Update URL without adding history entry\n" +
      "window.history.replaceState(\n" +
      "  window.history.state,\n" +
      "  '',\n" +
      "  window.location.pathname + '?updated=true'\n" +
      ");\n" +
      "```\n\n" +
      "**Client-Side Router Implementation:**\n" +
      "```javascript\n" +
      "class ClientRouter {\n" +
      "  constructor() {\n" +
      "    this.routes = new Map();\n" +
      "    this.currentRoute = null;\n" +
      "    this.init();\n" +
      "  }\n" +
      "\n" +
      "  init() {\n" +
      "    // Handle browser back/forward buttons\n" +
      "    window.addEventListener('popstate', (event) => {\n" +
      "      this.handleRouteChange(event.state);\n" +
      "    });\n" +
      "\n" +
      "    // Handle initial page load\n" +
      "    this.handleRouteChange(window.history.state);\n" +
      "  }\n" +
      "\n" +
      "  addRoute(path, handler) {\n" +
      "    this.routes.set(path, handler);\n" +
      "  }\n" +
      "\n" +
      "  navigate(path, state = {}) {\n" +
      "    const fullPath = this.resolvePath(path);\n" +
      "    \n" +
      "    // Update URL and history\n" +
      "    window.history.pushState(\n" +
      "      { path: fullPath, ...state },\n" +
      "      '',\n" +
      "      fullPath\n" +
      "    );\n" +
      "\n" +
      "    // Handle route change\n" +
      "    this.handleRouteChange({ path: fullPath, ...state });\n" +
      "  }\n" +
      "\n" +
      "  replace(path, state = {}) {\n" +
      "    const fullPath = this.resolvePath(path);\n" +
      "    \n" +
      "    window.history.replaceState(\n" +
      "      { path: fullPath, ...state },\n" +
      "      '',\n" +
      "      fullPath\n" +
      "    );\n" +
      "\n" +
      "    this.handleRouteChange({ path: fullPath, ...state });\n" +
      "  }\n" +
      "\n" +
      "  handleRouteChange(state) {\n" +
      "    if (!state || !state.path) {\n" +
      "      state = { path: window.location.pathname };\n" +
      "    }\n" +
      "\n" +
      "    const route = this.matchRoute(state.path);\n" +
      "    if (route) {\n" +
      "      this.currentRoute = route;\n" +
      "      route.handler(state);\n" +
      "    } else {\n" +
      "      this.handleNotFound(state.path);\n" +
      "    }\n" +
      "  }\n" +
      "\n" +
      "  matchRoute(path) {\n" +
      "    for (const [routePath, handler] of this.routes) {\n" +
      "      if (this.pathMatches(routePath, path)) {\n" +
      "        return { path: routePath, handler };\n" +
      "      }\n" +
      "    }\n" +
      "    return null;\n" +
      "  }\n" +
      "\n" +
      "  pathMatches(routePath, currentPath) {\n" +
      "    // Simple exact match (can be extended for parameters)\n" +
      "    return routePath === currentPath;\n" +
      "  }\n" +
      "\n" +
      "  resolvePath(path) {\n" +
      "    if (path.startsWith('/')) {\n" +
      "      return path;\n" +
      "    }\n" +
      "    return window.location.pathname + '/' + path;\n" +
      "  }\n" +
      "\n" +
      "  handleNotFound(path) {\n" +
      "    console.warn(`Route not found: ${path}`);\n" +
      "    // Handle 404 or redirect to default route\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Usage Example:**\n" +
      "```javascript\n" +
      "const router = new ClientRouter();\n" +
      "\n" +
      "// Define routes\n" +
      "router.addRoute('/', (state) => {\n" +
      "  document.getElementById('content').innerHTML = '<h1>Home Page</h1>';\n" +
      "});\n" +
      "\n" +
      "router.addRoute('/about', (state) => {\n" +
      "  document.getElementById('content').innerHTML = '<h1>About Page</h1>';\n" +
      "});\n" +
      "\n" +
      "router.addRoute('/profile', (state) => {\n" +
      "  document.getElementById('content').innerHTML = \n" +
      "    `<h1>Profile Page</h1><p>User ID: ${state.userId}</p>`;\n" +
      "});\n" +
      "\n" +
      "// Navigation\n" +
      "document.getElementById('home-link').addEventListener('click', (e) => {\n" +
      "  e.preventDefault();\n" +
      "  router.navigate('/');\n" +
      "});\n" +
      "\n" +
      "document.getElementById('profile-link').addEventListener('click', (e) => {\n" +
      "  e.preventDefault();\n" +
      "  router.navigate('/profile', { userId: 123 });\n" +
      "});\n" +
      "```\n\n" +
      "**Advanced Features:**\n" +
      "```javascript\n" +
      "// URL parameters\n" +
      "function parseUrlParams(url) {\n" +
      "  const params = new URLSearchParams(url.split('?')[1]);\n" +
      "  const result = {};\n" +
      "  for (const [key, value] of params) {\n" +
      "    result[key] = value;\n" +
      "  }\n" +
      "  return result;\n" +
      "}\n" +
      "\n" +
      "// Scroll restoration\n" +
      "if ('scrollRestoration' in history) {\n" +
      "  history.scrollRestoration = 'manual';\n" +
      "}\n" +
      "\n" +
      "// Save scroll position\n" +
      "window.addEventListener('beforeunload', () => {\n" +
      "  const scrollPos = window.pageYOffset;\n" +
      "  sessionStorage.setItem('scrollPos', scrollPos.toString());\n" +
      "});\n" +
      "\n" +
      "// Restore scroll position\n" +
      "window.addEventListener('load', () => {\n" +
      "  const scrollPos = sessionStorage.getItem('scrollPos');\n" +
      "  if (scrollPos) {\n" +
      "    window.scrollTo(0, parseInt(scrollPos));\n" +
      "  }\n" +
      "});\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Always handle popstate events for back/forward navigation\n" +
      "- Use pushState for navigation, replaceState for redirects\n" +
      "- Implement proper error handling for invalid routes\n" +
      "- Consider SEO implications of client-side routing\n" +
      "- Handle scroll restoration appropriately",
    category: "Web APIs",
    difficulty: "intermediate",
    tags: ["history-api", "client-side-routing", "spa", "navigation", "browser-history"],
  },
  {
    id: 45,
    question:
      "What is the Geolocation API? How do you get user location and handle location-based features?",
    answer:
      "The Geolocation API allows web applications to access the user's geographical location, enabling location-based services and features.\n\n" +
      "**Basic Location Access:**\n" +
      "```javascript\n" +
      "// Check if geolocation is supported\n" +
      "if ('geolocation' in navigator) {\n" +
      "  console.log('Geolocation is supported');\n" +
      "} else {\n" +
      "  console.log('Geolocation is not supported');\n" +
      "}\n" +
      "\n" +
      "// Get current position\n" +
      "navigator.geolocation.getCurrentPosition(\n" +
      "  (position) => {\n" +
      "    console.log('Latitude:', position.coords.latitude);\n" +
      "    console.log('Longitude:', position.coords.longitude);\n" +
      "    console.log('Accuracy:', position.coords.accuracy);\n" +
      "    console.log('Timestamp:', position.timestamp);\n" +
      "  },\n" +
      "  (error) => {\n" +
      "    console.error('Error getting location:', error.message);\n" +
      "  },\n" +
      "  {\n" +
      "    enableHighAccuracy: true,\n" +
      "    timeout: 10000,\n" +
      "    maximumAge: 60000\n" +
      "  }\n" +
      ");\n" +
      "```\n\n" +
      "**Advanced Location Manager:**\n" +
      "```javascript\n" +
      "class LocationManager {\n" +
      "  constructor() {\n" +
      "    this.watchId = null;\n" +
      "    this.currentPosition = null;\n" +
      "    this.callbacks = [];\n" +
      "  }\n" +
      "\n" +
      "  async getCurrentLocation(options = {}) {\n" +
      "    const defaultOptions = {\n" +
      "      enableHighAccuracy: true,\n" +
      "      timeout: 10000,\n" +
      "      maximumAge: 300000 // 5 minutes\n" +
      "    };\n" +
      "\n" +
      "    return new Promise((resolve, reject) => {\n" +
      "      navigator.geolocation.getCurrentPosition(\n" +
      "        (position) => {\n" +
      "          this.currentPosition = position;\n" +
      "          resolve(position);\n" +
      "        },\n" +
      "        (error) => {\n" +
      "          reject(this.handleLocationError(error));\n" +
      "        },\n" +
      "        { ...defaultOptions, ...options }\n" +
      "      );\n" +
      "    });\n" +
      "  }\n" +
      "\n" +
      "  startWatching(callback, options = {}) {\n" +
      "    if (this.watchId) {\n" +
      "      this.stopWatching();\n" +
      "    }\n" +
      "\n" +
      "    this.callbacks.push(callback);\n" +
      "\n" +
      "    this.watchId = navigator.geolocation.watchPosition(\n" +
      "      (position) => {\n" +
      "        this.currentPosition = position;\n" +
      "        this.callbacks.forEach(cb => cb(position));\n" +
      "      },\n" +
      "      (error) => {\n" +
      "        console.error('Location watch error:', error);\n" +
      "      },\n" +
      "      {\n" +
      "        enableHighAccuracy: true,\n" +
      "        timeout: 10000,\n" +
      "        maximumAge: 60000\n" +
      "      }\n" +
      "    );\n" +
      "\n" +
      "    return this.watchId;\n" +
      "  }\n" +
      "\n" +
      "  stopWatching() {\n" +
      "    if (this.watchId) {\n" +
      "      navigator.geolocation.clearWatch(this.watchId);\n" +
      "      this.watchId = null;\n" +
      "      this.callbacks = [];\n" +
      "    }\n" +
      "  }\n" +
      "\n" +
      "  handleLocationError(error) {\n" +
      "    switch (error.code) {\n" +
      "      case error.PERMISSION_DENIED:\n" +
      "        return new Error('Location access denied by user');\n" +
      "      case error.POSITION_UNAVAILABLE:\n" +
      "        return new Error('Location information unavailable');\n" +
      "      case error.TIMEOUT:\n" +
      "        return new Error('Location request timed out');\n" +
      "      default:\n" +
      "        return new Error('Unknown location error');\n" +
      "    }\n" +
      "  }\n" +
      "\n" +
      "  calculateDistance(lat1, lon1, lat2, lon2) {\n" +
      "    const R = 6371; // Earth's radius in kilometers\n" +
      "    const dLat = this.toRadians(lat2 - lat1);\n" +
      "    const dLon = this.toRadians(lon2 - lon1);\n" +
      "    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +\n" +
      "              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *\n" +
      "              Math.sin(dLon / 2) * Math.sin(dLon / 2);\n" +
      "    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));\n" +
      "    return R * c;\n" +
      "  }\n" +
      "\n" +
      "  toRadians(degrees) {\n" +
      "    return degrees * (Math.PI / 180);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Location-Based Features:**\n" +
      "```javascript\n" +
      "class LocationBasedApp {\n" +
      "  constructor() {\n" +
      "    this.locationManager = new LocationManager();\n" +
      "    this.nearbyPlaces = [];\n" +
      "  }\n" +
      "\n" +
      "  async initialize() {\n" +
      "    try {\n" +
      "      const position = await this.locationManager.getCurrentLocation();\n" +
      "      await this.loadNearbyPlaces(position);\n" +
      "      this.setupLocationTracking();\n" +
      "    } catch (error) {\n" +
      "      this.handleLocationError(error);\n" +
      "    }\n" +
      "  }\n" +
      "\n" +
      "  async loadNearbyPlaces(position) {\n" +
      "    const { latitude, longitude } = position.coords;\n" +
      "    \n" +
      "    try {\n" +
      "      const response = await fetch(\n" +
      "        `/api/places/nearby?lat=${latitude}&lng=${longitude}&radius=1000`\n" +
      "      );\n" +
      "      this.nearbyPlaces = await response.json();\n" +
      "      this.displayNearbyPlaces();\n" +
      "    } catch (error) {\n" +
      "      console.error('Failed to load nearby places:', error);\n" +
      "    }\n" +
      "  }\n" +
      "\n" +
      "  setupLocationTracking() {\n" +
      "    this.locationManager.startWatching((position) => {\n" +
      "      this.updateLocationDisplay(position);\n" +
      "      this.checkForNearbyUpdates(position);\n" +
      "    });\n" +
      "  }\n" +
      "\n" +
      "  updateLocationDisplay(position) {\n" +
      "    const { latitude, longitude, accuracy } = position.coords;\n" +
      "    \n" +
      "    document.getElementById('current-location').textContent = \n" +
      "      `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;\n" +
      "    \n" +
      "    document.getElementById('accuracy').textContent = \n" +
      "      `Accuracy: ${Math.round(accuracy)}m`;\n" +
      "  }\n" +
      "\n" +
      "  checkForNearbyUpdates(position) {\n" +
      "    const { latitude, longitude } = position.coords;\n" +
      "    const currentLocation = { lat: latitude, lng: longitude };\n" +
      "    \n" +
      "    // Check if user moved significantly\n" +
      "    const lastLocation = this.lastKnownLocation;\n" +
      "    if (lastLocation) {\n" +
      "      const distance = this.locationManager.calculateDistance(\n" +
      "        lastLocation.lat, lastLocation.lng,\n" +
      "        latitude, longitude\n" +
      "      );\n" +
      "      \n" +
      "      if (distance > 0.1) { // 100 meters\n" +
      "        this.loadNearbyPlaces(position);\n" +
      "      }\n" +
      "    }\n" +
      "    \n" +
      "    this.lastKnownLocation = currentLocation;\n" +
      "  }\n" +
      "\n" +
      "  displayNearbyPlaces() {\n" +
      "    const container = document.getElementById('nearby-places');\n" +
      "    container.innerHTML = '';\n" +
      "    \n" +
      "    this.nearbyPlaces.forEach(place => {\n" +
      "      const placeElement = document.createElement('div');\n" +
      "      placeElement.className = 'place-item';\n" +
      "      placeElement.innerHTML = `\n" +
      "        <h3>${place.name}</h3>\n" +
      "        <p>${place.address}</p>\n" +
      "        <p>Distance: ${place.distance.toFixed(2)} km</p>\n" +
      "      `;\n" +
      "      container.appendChild(placeElement);\n" +
      "    });\n" +
      "  }\n" +
      "\n" +
      "  handleLocationError(error) {\n" +
      "    const errorMessage = document.getElementById('location-error');\n" +
      "    errorMessage.textContent = error.message;\n" +
      "    errorMessage.style.display = 'block';\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Privacy and Permissions:**\n" +
      "```javascript\n" +
      "// Request permission with user-friendly message\n" +
      "async function requestLocationPermission() {\n" +
      "  if (!('geolocation' in navigator)) {\n" +
      "    throw new Error('Geolocation not supported');\n" +
      "  }\n" +
      "\n" +
      "  try {\n" +
      "    const position = await new Promise((resolve, reject) => {\n" +
      "      navigator.geolocation.getCurrentPosition(resolve, reject, {\n" +
      "        enableHighAccuracy: true,\n" +
      "        timeout: 10000\n" +
      "      });\n" +
      "    });\n" +
      "    \n" +
      "    return position;\n" +
      "  } catch (error) {\n" +
      "    if (error.code === error.PERMISSION_DENIED) {\n" +
      "      // Show permission request UI\n" +
      "      showLocationPermissionDialog();\n" +
      "    }\n" +
      "    throw error;\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "function showLocationPermissionDialog() {\n" +
      "  const dialog = document.createElement('div');\n" +
      "  dialog.className = 'permission-dialog';\n" +
      "  dialog.innerHTML = `\n" +
      "    <h3>Location Access Required</h3>\n" +
      "    <p>This app needs access to your location to show nearby places and provide location-based services.</p>\n" +
      '    <button onclick="requestLocationAgain()">Allow Location Access</button>\n' +
      '    <button onclick="this.parentElement.remove()">Cancel</button>\n' +
      "  `;\n" +
      "  document.body.appendChild(dialog);\n" +
      "}\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Always request permission with clear explanation\n" +
      "- Handle all error cases gracefully\n" +
      "- Use appropriate accuracy settings\n" +
      "- Implement timeout handling\n" +
      "- Consider battery usage with continuous tracking\n" +
      "- Respect user privacy and provide opt-out options",
    category: "Web APIs",
    difficulty: "intermediate",
    tags: ["geolocation", "location-based", "gps", "coordinates", "privacy"],
  },
  {
    id: 46,
    question:
      "What is the Intl API? Explain Intl.DisplayNames, Intl.DateTimeFormat, Intl.Locale, Intl.PluralRules, and other internationalization features.",
    answer:
      "The Intl API provides internationalization and localization features for JavaScript, enabling applications to work with different languages, regions, and cultural conventions.\n\n" +
      "**Intl.Locale:**\n" +
      "```javascript\n" +
      "// Create locale objects\n" +
      "const usLocale = new Intl.Locale('en-US');\n" +
      "const frLocale = new Intl.Locale('fr-FR');\n" +
      "const jpLocale = new Intl.Locale('ja-JP');\n" +
      "\n" +
      "console.log(usLocale.language); // 'en'\n" +
      "console.log(usLocale.region);   // 'US'\n" +
      "console.log(usLocale.calendar); // undefined\n" +
      "\n" +
      "// Extended locale with options\n" +
      "const extendedLocale = new Intl.Locale('en-US', {\n" +
      "  calendar: 'gregory',\n" +
      "  numberingSystem: 'latn',\n" +
      "  hourCycle: 'h12'\n" +
      "});\n" +
      "\n" +
      "// Get supported locales\n" +
      "const supportedLocales = Intl.Locale.supportedLocalesOf(['en-US', 'fr-FR', 'zh-CN']);\n" +
      "console.log(supportedLocales); // ['en-US', 'fr-FR', 'zh-CN']\n" +
      "```\n\n" +
      "**Intl.DisplayNames:**\n" +
      "```javascript\n" +
      "// Language display names\n" +
      "const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });\n" +
      "console.log(languageNames.of('en')); // 'English'\n" +
      "console.log(languageNames.of('fr')); // 'French'\n" +
      "console.log(languageNames.of('zh')); // 'Chinese'\n" +
      "\n" +
      "// Region display names\n" +
      "const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });\n" +
      "console.log(regionNames.of('US')); // 'United States'\n" +
      "console.log(regionNames.of('GB')); // 'United Kingdom'\n" +
      "console.log(regionNames.of('JP')); // 'Japan'\n" +
      "\n" +
      "// Script display names\n" +
      "const scriptNames = new Intl.DisplayNames(['en'], { type: 'script' });\n" +
      "console.log(scriptNames.of('Latn')); // 'Latin'\n" +
      "console.log(scriptNames.of('Hira')); // 'Hiragana'\n" +
      "\n" +
      "// Currency display names\n" +
      "const currencyNames = new Intl.DisplayNames(['en'], { type: 'currency' });\n" +
      "console.log(currencyNames.of('USD')); // 'US Dollar'\n" +
      "console.log(currencyNames.of('EUR')); // 'Euro'\n" +
      "\n" +
      "// Localized display names\n" +
      "const frenchLanguageNames = new Intl.DisplayNames(['fr'], { type: 'language' });\n" +
      "console.log(frenchLanguageNames.of('en')); // 'anglais'\n" +
      "console.log(frenchLanguageNames.of('de')); // 'allemand'\n" +
      "```\n\n" +
      "**Intl.DateTimeFormat:**\n" +
      "```javascript\n" +
      "// Basic date formatting\n" +
      "const date = new Date('2023-12-25T15:30:00Z');\n" +
      "\n" +
      "// US format\n" +
      "const usFormatter = new Intl.DateTimeFormat('en-US');\n" +
      "console.log(usFormatter.format(date)); // '12/25/2023'\n" +
      "\n" +
      "// UK format\n" +
      "const ukFormatter = new Intl.DateTimeFormat('en-GB');\n" +
      "console.log(ukFormatter.format(date)); // '25/12/2023'\n" +
      "\n" +
      "// German format\n" +
      "const deFormatter = new Intl.DateTimeFormat('de-DE');\n" +
      "console.log(deFormatter.format(date)); // '25.12.2023'\n" +
      "\n" +
      "// Custom formatting options\n" +
      "const customFormatter = new Intl.DateTimeFormat('en-US', {\n" +
      "  weekday: 'long',\n" +
      "  year: 'numeric',\n" +
      "  month: 'long',\n" +
      "  day: 'numeric',\n" +
      "  hour: '2-digit',\n" +
      "  minute: '2-digit',\n" +
      "  second: '2-digit',\n" +
      "  timeZoneName: 'short'\n" +
      "});\n" +
      "console.log(customFormatter.format(date)); // 'Monday, December 25, 2023 at 03:30:00 PM EST'\n" +
      "\n" +
      "// Relative time formatting\n" +
      "const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });\n" +
      "console.log(rtf.format(-1, 'day'));  // 'yesterday'\n" +
      "console.log(rtf.format(1, 'day'));     // 'tomorrow'\n" +
      "console.log(rtf.format(-2, 'week'));  // '2 weeks ago'\n" +
      "\n" +
      "// Format date parts\n" +
      "const parts = customFormatter.formatToParts(date);\n" +
      "console.log(parts);\n" +
      "// [\n" +
      "//   { type: 'weekday', value: 'Monday' },\n" +
      "//   { type: 'literal', value: ', ' },\n" +
      "//   { type: 'month', value: 'December' },\n" +
      "//   ...\n" +
      "// ]\n" +
      "```\n\n" +
      "**Intl.PluralRules:**\n" +
      "```javascript\n" +
      "// English plural rules\n" +
      "const enPluralRules = new Intl.PluralRules('en');\n" +
      "console.log(enPluralRules.select(0));  // 'other'\n" +
      "console.log(enPluralRules.select(1));  // 'one'\n" +
      "console.log(enPluralRules.select(2));  // 'other'\n" +
      "\n" +
      "// Polish plural rules (more complex)\n" +
      "const plPluralRules = new Intl.PluralRules('pl');\n" +
      "console.log(plPluralRules.select(1));   // 'one'\n" +
      "console.log(plPluralRules.select(2));   // 'few'\n" +
      "console.log(plPluralRules.select(5));  // 'many'\n" +
      "console.log(plPluralRules.select(11)); // 'many'\n" +
      "\n" +
      "// Plural rules with options\n" +
      "const cardinalRules = new Intl.PluralRules('en', { type: 'cardinal' });\n" +
      "const ordinalRules = new Intl.PluralRules('en', { type: 'ordinal' });\n" +
      "\n" +
      "console.log(cardinalRules.select(1)); // 'one'\n" +
      "console.log(ordinalRules.select(1));  // 'one'\n" +
      "console.log(ordinalRules.select(2));  // 'two'\n" +
      "console.log(ordinalRules.select(3));  // 'few'\n" +
      "\n" +
      "// Practical usage\n" +
      "function formatCount(count, locale = 'en') {\n" +
      "  const pluralRules = new Intl.PluralRules(locale);\n" +
      "  const rule = pluralRules.select(count);\n" +
      "  \n" +
      "  const messages = {\n" +
      "    en: {\n" +
      "      one: `${count} item`,\n" +
      "      other: `${count} items`\n" +
      "    },\n" +
      "    pl: {\n" +
      "      one: `${count} element`,\n" +
      "      few: `${count} elementy`,\n" +
      "      many: `${count} elementów`,\n" +
      "      other: `${count} elementów`\n" +
      "    }\n" +
      "  };\n" +
      "  \n" +
      "  return messages[locale]?.[rule] || `${count} items`;\n" +
      "}\n" +
      "\n" +
      "console.log(formatCount(1, 'en'));  // '1 item'\n" +
      "console.log(formatCount(5, 'en'));  // '5 items'\n" +
      "console.log(formatCount(1, 'pl'));  // '1 element'\n" +
      "console.log(formatCount(2, 'pl'));  // '2 elementy'\n" +
      "console.log(formatCount(5, 'pl'));  // '5 elementów'\n" +
      "```\n\n" +
      "**Intl.NumberFormat:**\n" +
      "```javascript\n" +
      "// Currency formatting\n" +
      "const usCurrency = new Intl.NumberFormat('en-US', {\n" +
      "  style: 'currency',\n" +
      "  currency: 'USD'\n" +
      "});\n" +
      "console.log(usCurrency.format(1234.56)); // '$1,234.56'\n" +
      "\n" +
      "const euCurrency = new Intl.NumberFormat('de-DE', {\n" +
      "  style: 'currency',\n" +
      "  currency: 'EUR'\n" +
      "});\n" +
      "console.log(euCurrency.format(1234.56)); // '1.234,56 €'\n" +
      "\n" +
      "// Number formatting\n" +
      "const usNumber = new Intl.NumberFormat('en-US');\n" +
      "console.log(usNumber.format(1234567.89)); // '1,234,567.89'\n" +
      "\n" +
      "const deNumber = new Intl.NumberFormat('de-DE');\n" +
      "console.log(deNumber.format(1234567.89)); // '1.234.567,89'\n" +
      "\n" +
      "// Percentage formatting\n" +
      "const percentage = new Intl.NumberFormat('en-US', {\n" +
      "  style: 'percent',\n" +
      "  minimumFractionDigits: 2\n" +
      "});\n" +
      "console.log(percentage.format(0.1234)); // '12.34%'\n" +
      "\n" +
      "// Unit formatting\n" +
      "const temperature = new Intl.NumberFormat('en-US', {\n" +
      "  style: 'unit',\n" +
      "  unit: 'celsius'\n" +
      "});\n" +
      "console.log(temperature.format(25)); // '25°C'\n" +
      "```\n\n" +
      "**Intl.Collator:**\n" +
      "```javascript\n" +
      "// String sorting\n" +
      "const words = ['café', 'cafe', 'cafeteria', 'coffee'];\n" +
      "\n" +
      "// Default sorting\n" +
      "console.log(words.sort()); // ['cafe', 'café', 'cafeteria', 'coffee']\n" +
      "\n" +
      "// Locale-aware sorting\n" +
      "const collator = new Intl.Collator('en');\n" +
      "console.log(words.sort(collator.compare)); // ['cafe', 'café', 'cafeteria', 'coffee']\n" +
      "\n" +
      "// German sorting (different rules)\n" +
      "const germanCollator = new Intl.Collator('de');\n" +
      "const germanWords = ['äpfel', 'apfel', 'zebra', 'äpfel'];\n" +
      "console.log(germanWords.sort(germanCollator.compare));\n" +
      "\n" +
      "// Case-insensitive sorting\n" +
      "const caseInsensitiveCollator = new Intl.Collator('en', {\n" +
      "  sensitivity: 'base'\n" +
      "});\n" +
      "const mixedCase = ['Apple', 'banana', 'Cherry'];\n" +
      "console.log(mixedCase.sort(caseInsensitiveCollator.compare));\n" +
      "```\n\n" +
      "**Comprehensive Internationalization Example:**\n" +
      "```javascript\n" +
      "class InternationalizationManager {\n" +
      "  constructor(locale = 'en-US') {\n" +
      "    this.locale = locale;\n" +
      "    this.setupFormatters();\n" +
      "  }\n" +
      "\n" +
      "  setupFormatters() {\n" +
      "    this.dateFormatter = new Intl.DateTimeFormat(this.locale, {\n" +
      "      year: 'numeric',\n" +
      "      month: 'long',\n" +
      "      day: 'numeric'\n" +
      "    });\n" +
      "\n" +
      "    this.timeFormatter = new Intl.DateTimeFormat(this.locale, {\n" +
      "      hour: '2-digit',\n" +
      "      minute: '2-digit'\n" +
      "    });\n" +
      "\n" +
      "    this.numberFormatter = new Intl.NumberFormat(this.locale);\n" +
      "    this.currencyFormatter = new Intl.NumberFormat(this.locale, {\n" +
      "      style: 'currency',\n" +
      "      currency: this.getCurrencyForLocale()\n" +
      "    });\n" +
      "\n" +
      "    this.pluralRules = new Intl.PluralRules(this.locale);\n" +
      "    this.displayNames = new Intl.DisplayNames(this.locale, { type: 'language' });\n" +
      "  }\n" +
      "\n" +
      "  getCurrencyForLocale() {\n" +
      "    const currencyMap = {\n" +
      "      'en-US': 'USD',\n" +
      "      'en-GB': 'GBP',\n" +
      "      'de-DE': 'EUR',\n" +
      "      'fr-FR': 'EUR',\n" +
      "      'ja-JP': 'JPY'\n" +
      "    };\n" +
      "    return currencyMap[this.locale] || 'USD';\n" +
      "  }\n" +
      "\n" +
      "  formatDate(date) {\n" +
      "    return this.dateFormatter.format(date);\n" +
      "  }\n" +
      "\n" +
      "  formatTime(date) {\n" +
      "    return this.timeFormatter.format(date);\n" +
      "  }\n" +
      "\n" +
      "  formatNumber(number) {\n" +
      "    return this.numberFormatter.format(number);\n" +
      "  }\n" +
      "\n" +
      "  formatCurrency(amount) {\n" +
      "    return this.currencyFormatter.format(amount);\n" +
      "  }\n" +
      "\n" +
      "  formatPlural(count, forms) {\n" +
      "    const rule = this.pluralRules.select(count);\n" +
      "    return forms[rule] || forms.other;\n" +
      "  }\n" +
      "\n" +
      "  getLanguageName(code) {\n" +
      "    return this.displayNames.of(code);\n" +
      "  }\n" +
      "\n" +
      "  changeLocale(newLocale) {\n" +
      "    this.locale = newLocale;\n" +
      "    this.setupFormatters();\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Usage\n" +
      "const i18n = new InternationalizationManager('en-US');\n" +
      "\n" +
      "console.log(i18n.formatDate(new Date())); // 'December 25, 2023'\n" +
      "console.log(i18n.formatCurrency(1234.56)); // '$1,234.56'\n" +
      "console.log(i18n.formatPlural(1, { one: 'item', other: 'items' })); // 'item'\n" +
      "console.log(i18n.formatPlural(5, { one: 'item', other: 'items' })); // 'items'\n" +
      "console.log(i18n.getLanguageName('fr')); // 'French'\n" +
      "\n" +
      "// Switch to German\n" +
      "i18n.changeLocale('de-DE');\n" +
      "console.log(i18n.formatDate(new Date())); // '25. Dezember 2023'\n" +
      "console.log(i18n.formatCurrency(1234.56)); // '1.234,56 €'\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Always specify locale explicitly\n" +
      "- Use appropriate plural rules for different languages\n" +
      "- Handle locale-specific formatting differences\n" +
      "- Consider RTL (Right-to-Left) languages\n" +
      "- Test with different locales and edge cases\n" +
      "- Use Intl.supportedValuesOf() to check feature support",
    category: "Web APIs",
    difficulty: "advanced",
    tags: [
      "intl",
      "internationalization",
      "localization",
      "displaynames",
      "datetimeformat",
      "pluralrules",
      "locale",
    ],
  },
  {
    id: 47,
    question:
      "What are Service Workers? How do you implement offline functionality, caching strategies, and push notifications?",
    answer:
      "Service Workers are background scripts that run independently of web pages, enabling offline functionality, background sync, and push notifications.\n\n" +
      "**Basic Service Worker Setup:**\n" +
      "```javascript\n" +
      "// sw.js - Service Worker file\n" +
      "const CACHE_NAME = 'app-cache-v1';\n" +
      "const urlsToCache = [\n" +
      "  '/',\n" +
      "  '/static/js/bundle.js',\n" +
      "  '/static/css/main.css',\n" +
      "  '/manifest.json'\n" +
      "];\n" +
      "\n" +
      "// Install event - cache resources\n" +
      "self.addEventListener('install', (event) => {\n" +
      "  event.waitUntil(\n" +
      "    caches.open(CACHE_NAME)\n" +
      "      .then((cache) => {\n" +
      "        console.log('Opened cache');\n" +
      "        return cache.addAll(urlsToCache);\n" +
      "      })\n" +
      "  );\n" +
      "});\n" +
      "\n" +
      "// Fetch event - serve cached content\n" +
      "self.addEventListener('fetch', (event) => {\n" +
      "  event.respondWith(\n" +
      "    caches.match(event.request)\n" +
      "      .then((response) => {\n" +
      "        // Return cached version or fetch from network\n" +
      "        return response || fetch(event.request);\n" +
      "      })\n" +
      "  );\n" +
      "});\n" +
      "\n" +
      "// Register Service Worker\n" +
      "if ('serviceWorker' in navigator) {\n" +
      "  window.addEventListener('load', () => {\n" +
      "    navigator.serviceWorker.register('/sw.js')\n" +
      "      .then((registration) => {\n" +
      "        console.log('SW registered: ', registration);\n" +
      "      })\n" +
      "      .catch((registrationError) => {\n" +
      "        console.log('SW registration failed: ', registrationError);\n" +
      "      });\n" +
      "  });\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Caching Strategies:**\n" +
      "```javascript\n" +
      "// Cache First Strategy\n" +
      "self.addEventListener('fetch', (event) => {\n" +
      "  if (event.request.destination === 'image') {\n" +
      "    event.respondWith(\n" +
      "      caches.match(event.request)\n" +
      "        .then((response) => {\n" +
      "          if (response) {\n" +
      "            return response;\n" +
      "          }\n" +
      "          return fetch(event.request).then((response) => {\n" +
      "            if (!response || response.status !== 200) {\n" +
      "              return response;\n" +
      "            }\n" +
      "            const responseToCache = response.clone();\n" +
      "            caches.open(CACHE_NAME)\n" +
      "              .then((cache) => {\n" +
      "                cache.put(event.request, responseToCache);\n" +
      "              });\n" +
      "            return response;\n" +
      "          });\n" +
      "        })\n" +
      "    );\n" +
      "  }\n" +
      "});\n" +
      "\n" +
      "// Network First Strategy\n" +
      "self.addEventListener('fetch', (event) => {\n" +
      "  if (event.request.url.includes('/api/')) {\n" +
      "    event.respondWith(\n" +
      "      fetch(event.request)\n" +
      "        .then((response) => {\n" +
      "          const responseToCache = response.clone();\n" +
      "          caches.open(CACHE_NAME)\n" +
      "            .then((cache) => {\n" +
      "              cache.put(event.request, responseToCache);\n" +
      "            });\n" +
      "          return response;\n" +
      "        })\n" +
      "        .catch(() => {\n" +
      "          return caches.match(event.request);\n" +
      "        })\n" +
      "    );\n" +
      "  }\n" +
      "});\n" +
      "\n" +
      "// Stale While Revalidate Strategy\n" +
      "self.addEventListener('fetch', (event) => {\n" +
      "  event.respondWith(\n" +
      "    caches.match(event.request)\n" +
      "      .then((response) => {\n" +
      "        const fetchPromise = fetch(event.request).then((networkResponse) => {\n" +
      "          const responseToCache = networkResponse.clone();\n" +
      "          caches.open(CACHE_NAME)\n" +
      "            .then((cache) => {\n" +
      "              cache.put(event.request, responseToCache);\n" +
      "            });\n" +
      "          return networkResponse;\n" +
      "        });\n" +
      "        return response || fetchPromise;\n" +
      "      })\n" +
      "  );\n" +
      "});\n" +
      "```\n\n" +
      "**Background Sync:**\n" +
      "```javascript\n" +
      "// Register background sync\n" +
      "navigator.serviceWorker.ready.then((registration) => {\n" +
      "  return registration.sync.register('background-sync');\n" +
      "});\n" +
      "\n" +
      "// Handle background sync in Service Worker\n" +
      "self.addEventListener('sync', (event) => {\n" +
      "  if (event.tag === 'background-sync') {\n" +
      "    event.waitUntil(doBackgroundSync());\n" +
      "  }\n" +
      "});\n" +
      "\n" +
      "async function doBackgroundSync() {\n" +
      "  try {\n" +
      "    const offlineData = await getOfflineData();\n" +
      "    for (const item of offlineData) {\n" +
      "      await syncItem(item);\n" +
      "    }\n" +
      "    await clearOfflineData();\n" +
      "  } catch (error) {\n" +
      "    console.error('Background sync failed:', error);\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Push Notifications:**\n" +
      "```javascript\n" +
      "// Request notification permission\n" +
      "async function requestNotificationPermission() {\n" +
      "  const permission = await Notification.requestPermission();\n" +
      "  if (permission === 'granted') {\n" +
      "    const registration = await navigator.serviceWorker.ready;\n" +
      "    const subscription = await registration.pushManager.subscribe({\n" +
      "      userVisibleOnly: true,\n" +
      "      applicationServerKey: 'your-vapid-public-key'\n" +
      "    });\n" +
      "    \n" +
      "    // Send subscription to server\n" +
      "    await fetch('/api/subscribe', {\n" +
      "      method: 'POST',\n" +
      "      headers: { 'Content-Type': 'application/json' },\n" +
      "      body: JSON.stringify(subscription)\n" +
      "    });\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Handle push messages in Service Worker\n" +
      "self.addEventListener('push', (event) => {\n" +
      "  const options = {\n" +
      "    body: event.data ? event.data.text() : 'New notification',\n" +
      "    icon: '/icon-192x192.png',\n" +
      "    badge: '/badge-72x72.png',\n" +
      "    vibrate: [100, 50, 100],\n" +
      "    data: {\n" +
      "      dateOfArrival: Date.now(),\n" +
      "      primaryKey: 1\n" +
      "    },\n" +
      "    actions: [\n" +
      "      {\n" +
      "        action: 'explore',\n" +
      "        title: 'View details',\n" +
      "        icon: '/checkmark.png'\n" +
      "      },\n" +
      "      {\n" +
      "        action: 'close',\n" +
      "        title: 'Close',\n" +
      "        icon: '/xmark.png'\n" +
      "      }\n" +
      "    ]\n" +
      "  };\n" +
      "\n" +
      "  event.waitUntil(\n" +
      "    self.registration.showNotification('App Notification', options)\n" +
      "  );\n" +
      "});\n" +
      "\n" +
      "// Handle notification clicks\n" +
      "self.addEventListener('notificationclick', (event) => {\n" +
      "  event.notification.close();\n" +
      "  \n" +
      "  if (event.action === 'explore') {\n" +
      "    event.waitUntil(\n" +
      "      clients.openWindow('/explore')\n" +
      "    );\n" +
      "  } else if (event.action === 'close') {\n" +
      "    // Just close the notification\n" +
      "  } else {\n" +
      "    event.waitUntil(\n" +
      "      clients.openWindow('/')\n" +
      "    );\n" +
      "  }\n" +
      "});\n" +
      "```\n\n" +
      "**Cache Management:**\n" +
      "```javascript\n" +
      "// Update cache version\n" +
      "self.addEventListener('activate', (event) => {\n" +
      "  event.waitUntil(\n" +
      "    caches.keys().then((cacheNames) => {\n" +
      "      return Promise.all(\n" +
      "        cacheNames.map((cacheName) => {\n" +
      "          if (cacheName !== CACHE_NAME) {\n" +
      "            return caches.delete(cacheName);\n" +
      "          }\n" +
      "        })\n" +
      "      );\n" +
      "    })\n" +
      "  );\n" +
      "});\n" +
      "\n" +
      "// Cache size management\n" +
      "async function manageCacheSize() {\n" +
      "  const cache = await caches.open(CACHE_NAME);\n" +
      "  const requests = await cache.keys();\n" +
      "  \n" +
      "  if (requests.length > 100) {\n" +
      "    const oldestRequests = requests.slice(0, 20);\n" +
      "    await Promise.all(\n" +
      "      oldestRequests.map(request => cache.delete(request))\n" +
      "    );\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Use appropriate caching strategies for different content types\n" +
      "- Implement cache versioning for updates\n" +
      "- Handle offline scenarios gracefully\n" +
      "- Test Service Worker in different network conditions\n" +
      "- Monitor Service Worker performance\n" +
      "- Use HTTPS for Service Worker registration",
    category: "Web APIs",
    difficulty: "advanced",
    tags: ["service-workers", "offline", "caching", "push-notifications", "background-sync"],
  },
  {
    id: 48,
    question:
      "What are Web Workers? How do you implement background processing, shared workers, and message passing?",
    answer:
      "Web Workers allow JavaScript to run in background threads, enabling CPU-intensive tasks without blocking the main UI thread.\n\n" +
      "**Dedicated Web Worker:**\n" +
      "```javascript\n" +
      "// main.js - Main thread\n" +
      "const worker = new Worker('worker.js');\n" +
      "\n" +
      "// Send message to worker\n" +
      "worker.postMessage({ type: 'CALCULATE', data: [1, 2, 3, 4, 5] });\n" +
      "\n" +
      "// Listen for messages from worker\n" +
      "worker.onmessage = (event) => {\n" +
      "  const { type, result } = event.data;\n" +
      "  \n" +
      "  switch (type) {\n" +
      "    case 'CALCULATION_COMPLETE':\n" +
      "      console.log('Result:', result);\n" +
      "      break;\n" +
      "    case 'PROGRESS':\n" +
      "      updateProgressBar(result);\n" +
      "      break;\n" +
      "  }\n" +
      "};\n" +
      "\n" +
      "// Handle worker errors\n" +
      "worker.onerror = (error) => {\n" +
      "  console.error('Worker error:', error);\n" +
      "};\n" +
      "\n" +
      "// Terminate worker when done\n" +
      "worker.terminate();\n" +
      "\n" +
      "// worker.js - Worker thread\n" +
      "self.onmessage = (event) => {\n" +
      "  const { type, data } = event.data;\n" +
      "  \n" +
      "  switch (type) {\n" +
      "    case 'CALCULATE':\n" +
      "      const result = performHeavyCalculation(data);\n" +
      "      self.postMessage({ type: 'CALCULATION_COMPLETE', result });\n" +
      "      break;\n" +
      "  }\n" +
      "};\n" +
      "\n" +
      "function performHeavyCalculation(numbers) {\n" +
      "  let result = 0;\n" +
      "  \n" +
      "  for (let i = 0; i < numbers.length; i++) {\n" +
      "    // Simulate heavy computation\n" +
      "    for (let j = 0; j < 1000000; j++) {\n" +
      "      result += Math.sqrt(numbers[i] * j);\n" +
      "    }\n" +
      "    \n" +
      "    // Send progress update\n" +
      "    const progress = ((i + 1) / numbers.length) * 100;\n" +
      "    self.postMessage({ type: 'PROGRESS', result: progress });\n" +
      "  }\n" +
      "  \n" +
      "  return result;\n" +
      "}\n" +
      "```\n\n" +
      "**Shared Web Worker:**\n" +
      "```javascript\n" +
      "// main.js - Multiple pages can share this worker\n" +
      "const sharedWorker = new SharedWorker('shared-worker.js', 'worker-name');\n" +
      "\n" +
      "// Connect to shared worker\n" +
      "sharedWorker.port.start();\n" +
      "\n" +
      "// Send message\n" +
      "sharedWorker.port.postMessage({ type: 'INIT', pageId: 'page-1' });\n" +
      "\n" +
      "// Listen for messages\n" +
      "sharedWorker.port.onmessage = (event) => {\n" +
      "  const { type, data } = event.data;\n" +
      "  \n" +
      "  switch (type) {\n" +
      "    case 'BROADCAST':\n" +
      "      console.log('Broadcast message:', data);\n" +
      "      break;\n" +
      "    case 'RESPONSE':\n" +
      "      console.log('Response:', data);\n" +
      "      break;\n" +
      "  }\n" +
      "};\n" +
      "\n" +
      "// shared-worker.js - Shared worker\n" +
      "const connections = new Map();\n" +
      "let connectionId = 0;\n" +
      "\n" +
      "self.onconnect = (event) => {\n" +
      "  const port = event.ports[0];\n" +
      "  const id = ++connectionId;\n" +
      "  \n" +
      "  connections.set(id, port);\n" +
      "  \n" +
      "  port.onmessage = (event) => {\n" +
      "    const { type, data } = event.data;\n" +
      "    \n" +
      "    switch (type) {\n" +
      "      case 'INIT':\n" +
      "        port.postMessage({ type: 'CONNECTED', connectionId: id });\n" +
      "        break;\n" +
      "      case 'BROADCAST':\n" +
      "        // Send to all connected ports\n" +
      "        connections.forEach((conn, connId) => {\n" +
      "          if (connId !== id) {\n" +
      "            conn.postMessage({ type: 'BROADCAST', data });\n" +
      "          }\n" +
      "        });\n" +
      "        break;\n" +
      "      case 'CALCULATE':\n" +
      "        const result = performCalculation(data);\n" +
      "        port.postMessage({ type: 'RESPONSE', data: result });\n" +
      "        break;\n" +
      "    }\n" +
      "  };\n" +
      "  \n" +
      "  port.onerror = (error) => {\n" +
      "    console.error('Port error:', error);\n" +
      "    connections.delete(id);\n" +
      "  };\n" +
      "};\n" +
      "\n" +
      "function performCalculation(data) {\n" +
      "  // Perform calculation\n" +
      "  return data.reduce((sum, num) => sum + num, 0);\n" +
      "}\n" +
      "```\n\n" +
      "**Worker Pool Pattern:**\n" +
      "```javascript\n" +
      "class WorkerPool {\n" +
      "  constructor(workerScript, poolSize = navigator.hardwareConcurrency || 4) {\n" +
      "    this.workerScript = workerScript;\n" +
      "    this.poolSize = poolSize;\n" +
      "    this.workers = [];\n" +
      "    this.queue = [];\n" +
      "    this.busyWorkers = new Set();\n" +
      "    \n" +
      "    this.initializeWorkers();\n" +
      "  }\n" +
      "  \n" +
      "  initializeWorkers() {\n" +
      "    for (let i = 0; i < this.poolSize; i++) {\n" +
      "      const worker = new Worker(this.workerScript);\n" +
      "      worker.id = i;\n" +
      "      \n" +
      "      worker.onmessage = (event) => {\n" +
      "        this.handleWorkerMessage(worker, event);\n" +
      "      };\n" +
      "      \n" +
      "      worker.onerror = (error) => {\n" +
      "        console.error(`Worker ${worker.id} error:`, error);\n" +
      "        this.busyWorkers.delete(worker);\n" +
      "        this.processQueue();\n" +
      "      };\n" +
      "      \n" +
      "      this.workers.push(worker);\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  execute(task, onComplete, onProgress) {\n" +
      "    return new Promise((resolve, reject) => {\n" +
      "      const taskWrapper = {\n" +
      "        task,\n" +
      "        onComplete: resolve,\n" +
      "        onProgress,\n" +
      "        onError: reject\n" +
      "      };\n" +
      "      \n" +
      "      this.queue.push(taskWrapper);\n" +
      "      this.processQueue();\n" +
      "    });\n" +
      "  }\n" +
      "  \n" +
      "  processQueue() {\n" +
      "    if (this.queue.length === 0) return;\n" +
      "    \n" +
      "    const availableWorker = this.workers.find(\n" +
      "      worker => !this.busyWorkers.has(worker)\n" +
      "    );\n" +
      "    \n" +
      "    if (availableWorker) {\n" +
      "      const taskWrapper = this.queue.shift();\n" +
      "      this.busyWorkers.add(availableWorker);\n" +
      "      \n" +
      "      availableWorker.currentTask = taskWrapper;\n" +
      "      availableWorker.postMessage(taskWrapper.task);\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  handleWorkerMessage(worker, event) {\n" +
      "    const { type, data } = event.data;\n" +
      "    const taskWrapper = worker.currentTask;\n" +
      "    \n" +
      "    switch (type) {\n" +
      "      case 'COMPLETE':\n" +
      "        this.busyWorkers.delete(worker);\n" +
      "        delete worker.currentTask;\n" +
      "        taskWrapper.onComplete(data);\n" +
      "        this.processQueue();\n" +
      "        break;\n" +
      "      case 'PROGRESS':\n" +
      "        if (taskWrapper.onProgress) {\n" +
      "          taskWrapper.onProgress(data);\n" +
      "        }\n" +
      "        break;\n" +
      "      case 'ERROR':\n" +
      "        this.busyWorkers.delete(worker);\n" +
      "        delete worker.currentTask;\n" +
      "        taskWrapper.onError(new Error(data));\n" +
      "        this.processQueue();\n" +
      "        break;\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  terminate() {\n" +
      "    this.workers.forEach(worker => worker.terminate());\n" +
      "    this.workers = [];\n" +
      "    this.busyWorkers.clear();\n" +
      "    this.queue = [];\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Usage\n" +
      "const pool = new WorkerPool('calculation-worker.js', 4);\n" +
      "\n" +
      "// Execute multiple tasks\n" +
      "const tasks = [\n" +
      "  { numbers: [1, 2, 3, 4, 5] },\n" +
      "  { numbers: [6, 7, 8, 9, 10] },\n" +
      "  { numbers: [11, 12, 13, 14, 15] }\n" +
      "];\n" +
      "\n" +
      "const promises = tasks.map(task => \n" +
      "  pool.execute(\n" +
      "    task,\n" +
      "    (result) => console.log('Task completed:', result),\n" +
      "    (progress) => console.log('Progress:', progress)\n" +
      "  )\n" +
      ");\n" +
      "\n" +
      "Promise.all(promises).then(() => {\n" +
      "  console.log('All tasks completed');\n" +
      "  pool.terminate();\n" +
      "});\n" +
      "```\n\n" +
      "**Transferable Objects:**\n" +
      "```javascript\n" +
      "// Transfer large data efficiently\n" +
      "const largeArray = new Uint8Array(1024 * 1024); // 1MB array\n" +
      "const largeBuffer = largeArray.buffer;\n" +
      "\n" +
      "// Transfer ownership to worker (main thread loses access)\n" +
      "worker.postMessage({ data: largeBuffer }, [largeBuffer]);\n" +
      "\n" +
      "// Worker receives the buffer\n" +
      "self.onmessage = (event) => {\n" +
      "  const { data } = event.data;\n" +
      "  const array = new Uint8Array(data);\n" +
      "  \n" +
      "  // Process the array\n" +
      "  for (let i = 0; i < array.length; i++) {\n" +
      "    array[i] = array[i] * 2;\n" +
      "  }\n" +
      "  \n" +
      "  // Transfer back to main thread\n" +
      "  self.postMessage({ result: data }, [data]);\n" +
      "};\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Use workers for CPU-intensive tasks\n" +
      "- Implement proper error handling\n" +
      "- Use transferable objects for large data\n" +
      "- Consider worker pool for multiple tasks\n" +
      "- Clean up workers when done\n" +
      "- Test worker performance and memory usage",
    category: "Web APIs",
    difficulty: "advanced",
    tags: [
      "web-workers",
      "background-processing",
      "shared-workers",
      "message-passing",
      "worker-pool",
    ],
  },
  {
    id: 49,
    question:
      "What is the JavaScript Event Loop? Explain microtasks, macrotasks, and how async/await works under the hood.",
    answer:
      "The JavaScript Event Loop is the mechanism that handles asynchronous operations, managing the call stack, callback queue, and microtask queue.\n\n" +
      "**Event Loop Components:**\n" +
      "```javascript\n" +
      "// Call Stack - Synchronous execution\n" +
      "function first() {\n" +
      "  console.log('First');\n" +
      "  second();\n" +
      "}\n" +
      "\n" +
      "function second() {\n" +
      "  console.log('Second');\n" +
      "  third();\n" +
      "}\n" +
      "\n" +
      "function third() {\n" +
      "  console.log('Third');\n" +
      "}\n" +
      "\n" +
      "first(); // Call stack: first -> second -> third\n" +
      "```\n\n" +
      "**Macrotasks vs Microtasks:**\n" +
      "```javascript\n" +
      "console.log('Start');\n" +
      "\n" +
      "// Macrotask (Task Queue)\n" +
      "setTimeout(() => console.log('Macrotask 1'), 0);\n" +
      "setTimeout(() => console.log('Macrotask 2'), 0);\n" +
      "\n" +
      "// Microtask (Microtask Queue)\n" +
      "Promise.resolve().then(() => console.log('Microtask 1'));\n" +
      "Promise.resolve().then(() => console.log('Microtask 2'));\n" +
      "\n" +
      "console.log('End');\n" +
      "\n" +
      "// Output:\n" +
      "// Start\n" +
      "// End\n" +
      "// Microtask 1\n" +
      "// Microtask 2\n" +
      "// Macrotask 1\n" +
      "// Macrotask 2\n" +
      "```\n\n" +
      "**Event Loop Execution Order:**\n" +
      "```javascript\n" +
      "console.log('1');\n" +
      "\n" +
      "setTimeout(() => console.log('2'), 0);\n" +
      "\n" +
      "Promise.resolve().then(() => {\n" +
      "  console.log('3');\n" +
      "  return Promise.resolve();\n" +
      "}).then(() => console.log('4'));\n" +
      "\n" +
      "setTimeout(() => console.log('5'), 0);\n" +
      "\n" +
      "console.log('6');\n" +
      "\n" +
      "// Output: 1, 6, 3, 4, 2, 5\n" +
      "// 1. Execute all synchronous code\n" +
      "// 2. Execute all microtasks (Promises)\n" +
      "// 3. Execute one macrotask (setTimeout)\n" +
      "// 4. Repeat step 2-3\n" +
      "```\n\n" +
      "**Async/Await Under the Hood:**\n" +
      "```javascript\n" +
      "// Async/await is syntactic sugar for Promises\n" +
      "async function fetchData() {\n" +
      "  try {\n" +
      "    const response = await fetch('/api/data');\n" +
      "    const data = await response.json();\n" +
      "    return data;\n" +
      "  } catch (error) {\n" +
      "    console.error('Error:', error);\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Equivalent Promise-based code\n" +
      "function fetchDataPromise() {\n" +
      "  return fetch('/api/data')\n" +
      "    .then(response => response.json())\n" +
      "    .catch(error => console.error('Error:', error));\n" +
      "}\n" +
      "\n" +
      "// Async function always returns a Promise\n" +
      "async function example() {\n" +
      "  return 'Hello';\n" +
      "}\n" +
      "\n" +
      "console.log(example()); // Promise { 'Hello' }\n" +
      "example().then(result => console.log(result)); // 'Hello'\n" +
      "```\n\n" +
      "**Advanced Event Loop Example:**\n" +
      "```javascript\n" +
      "console.log('A');\n" +
      "\n" +
      "setTimeout(() => console.log('B'), 0);\n" +
      "\n" +
      "Promise.resolve()\n" +
      "  .then(() => {\n" +
      "    console.log('C');\n" +
      "    return Promise.resolve();\n" +
      "  })\n" +
      "  .then(() => {\n" +
      "    console.log('D');\n" +
      "    setTimeout(() => console.log('E'), 0);\n" +
      "  });\n" +
      "\n" +
      "setTimeout(() => {\n" +
      "  console.log('F');\n" +
      "  Promise.resolve().then(() => console.log('G'));\n" +
      "}, 0);\n" +
      "\n" +
      "console.log('H');\n" +
      "\n" +
      "// Output: A, H, C, D, B, F, G, E\n" +
      "// Explanation:\n" +
      "// 1. A, H (synchronous)\n" +
      "// 2. C, D (microtasks)\n" +
      "// 3. B (macrotask)\n" +
      "// 4. F (macrotask), then G (microtask)\n" +
      "// 5. E (macrotask)\n" +
      "```\n\n" +
      "**Event Loop with Different APIs:**\n" +
      "```javascript\n" +
      "// Different types of tasks\n" +
      "console.log('Start');\n" +
      "\n" +
      "// Macrotasks\n" +
      "setTimeout(() => console.log('setTimeout'), 0);\n" +
      "setInterval(() => console.log('setInterval'), 1000);\n" +
      "\n" +
      "// Microtasks\n" +
      "Promise.resolve().then(() => console.log('Promise'));\n" +
      "queueMicrotask(() => console.log('queueMicrotask'));\n" +
      "\n" +
      "// Request Animation Frame (runs before next repaint)\n" +
      "requestAnimationFrame(() => console.log('requestAnimationFrame'));\n" +
      "\n" +
      "// Message Channel (macrotask)\n" +
      "const channel = new MessageChannel();\n" +
      "channel.port1.onmessage = () => console.log('MessageChannel');\n" +
      "channel.port2.postMessage('test');\n" +
      "\n" +
      "console.log('End');\n" +
      "```\n\n" +
      "**Event Loop Visualization:**\n" +
      "```javascript\n" +
      "function visualizeEventLoop() {\n" +
      "  console.log('=== Event Loop Visualization ===');\n" +
      "  \n" +
      "  // Step 1: Synchronous code\n" +
      "  console.log('1. Synchronous code execution');\n" +
      "  \n" +
      "  // Step 2: Microtasks\n" +
      "  Promise.resolve().then(() => {\n" +
      "    console.log('2. Microtask execution (Promise)');\n" +
      "  });\n" +
      "  \n" +
      "  queueMicrotask(() => {\n" +
      "    console.log('3. Microtask execution (queueMicrotask)');\n" +
      "  });\n" +
      "  \n" +
      "  // Step 3: Macrotasks\n" +
      "  setTimeout(() => {\n" +
      "    console.log('4. Macrotask execution (setTimeout)');\n" +
      "  }, 0);\n" +
      "  \n" +
      "  // Step 4: Render (if needed)\n" +
      "  requestAnimationFrame(() => {\n" +
      "    console.log('5. Render phase (requestAnimationFrame)');\n" +
      "  });\n" +
      "}\n" +
      "\n" +
      "visualizeEventLoop();\n" +
      "```\n\n" +
      "**Common Event Loop Pitfalls:**\n" +
      "```javascript\n" +
      "// Infinite microtask loop\n" +
      "function infiniteMicrotaskLoop() {\n" +
      "  Promise.resolve().then(() => {\n" +
      "    console.log('Microtask');\n" +
      "    infiniteMicrotaskLoop(); // This will block the event loop!\n" +
      "  });\n" +
      "}\n" +
      "\n" +
      "// Blocking the event loop\n" +
      "function blockingLoop() {\n" +
      "  const start = Date.now();\n" +
      "  while (Date.now() - start < 5000) {\n" +
      "    // This blocks the event loop for 5 seconds\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Proper way to handle heavy computation\n" +
      "function nonBlockingLoop() {\n" +
      "  let count = 0;\n" +
      "  const maxCount = 1000000;\n" +
      "  \n" +
      "  function processChunk() {\n" +
      "    const chunkSize = 1000;\n" +
      "    for (let i = 0; i < chunkSize && count < maxCount; i++) {\n" +
      "      count++;\n" +
      "      // Do some work\n" +
      "    }\n" +
      "    \n" +
      "    if (count < maxCount) {\n" +
      "      // Use setTimeout to yield control back to event loop\n" +
      "      setTimeout(processChunk, 0);\n" +
      "    } else {\n" +
      "      console.log('Processing complete');\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  processChunk();\n" +
      "}\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Understand the difference between microtasks and macrotasks\n" +
      "- Avoid blocking the event loop with heavy computations\n" +
      "- Use Web Workers for CPU-intensive tasks\n" +
      "- Be careful with infinite microtask loops\n" +
      "- Use setTimeout(0) to yield control to the event loop\n" +
      "- Understand that async/await is Promise-based",
    category: "JavaScript",
    difficulty: "advanced",
    tags: ["event-loop", "microtasks", "macrotasks", "async-await", "promises", "concurrency"],
  },
  {
    id: 50,
    question:
      "What is JavaScript Memory Management? How do you identify and prevent memory leaks, and use garbage collection effectively?",
    answer:
      "JavaScript uses automatic garbage collection to manage memory, but developers need to understand how it works to prevent memory leaks and optimize performance.\n\n" +
      "**Memory Lifecycle:**\n" +
      "```javascript\n" +
      "// 1. Allocation\n" +
      "let obj = { name: 'John', age: 30 }; // Memory allocated\n" +
      "let arr = new Array(1000).fill(0);   // Large array allocated\n" +
      "\n" +
      "// 2. Usage\n" +
      "console.log(obj.name); // Using the object\n" +
      "arr.forEach(item => console.log(item)); // Using the array\n" +
      "\n" +
      "// 3. Deallocation (automatic)\n" +
      "obj = null; // Reference removed, eligible for GC\n" +
      "arr = null; // Reference removed, eligible for GC\n" +
      "```\n\n" +
      "**Common Memory Leak Patterns:**\n" +
      "```javascript\n" +
      "// 1. Global Variables\n" +
      "function createLeak() {\n" +
      "  // This creates a global variable (memory leak)\n" +
      "  globalVar = new Array(1000000).fill('leak');\n" +
      "}\n" +
      "\n" +
      "// 2. Closures holding references\n" +
      "function createClosureLeak() {\n" +
      "  const largeData = new Array(1000000).fill('data');\n" +
      "  \n" +
      "  return function() {\n" +
      "    // This closure holds reference to largeData\n" +
      "    console.log('Closure executed');\n" +
      "    // largeData is never released!\n" +
      "  };\n" +
      "}\n" +
      "\n" +
      "// 3. Event Listeners not removed\n" +
      "function addEventListenerLeak() {\n" +
      "  const button = document.getElementById('button');\n" +
      "  const largeData = new Array(1000000).fill('data');\n" +
      "  \n" +
      "  button.addEventListener('click', () => {\n" +
      "    console.log('Button clicked');\n" +
      "    // largeData is held in closure\n" +
      "  });\n" +
      "  \n" +
      "  // Memory leak: event listener not removed\n" +
      "  // button.removeEventListener('click', handler);\n" +
      "}\n" +
      "\n" +
      "// 4. DOM references\n" +
      "function domReferenceLeak() {\n" +
      "  const elements = [];\n" +
      "  \n" +
      "  for (let i = 0; i < 1000; i++) {\n" +
      "    const element = document.createElement('div');\n" +
      "    elements.push(element); // Holding DOM references\n" +
      "  }\n" +
      "  \n" +
      "  // elements array holds references to DOM nodes\n" +
      "  // Even if nodes are removed from DOM, they won't be GC'd\n" +
      "}\n" +
      "```\n\n" +
      "**Memory Leak Prevention:**\n" +
      "```javascript\n" +
      "// 1. Proper closure management\n" +
      "function createSafeClosure() {\n" +
      "  const largeData = new Array(1000000).fill('data');\n" +
      "  \n" +
      "  return function() {\n" +
      "    console.log('Safe closure');\n" +
      "    // Don't reference largeData in closure\n" +
      "  };\n" +
      "}\n" +
      "\n" +
      "// 2. Event listener cleanup\n" +
      "class EventManager {\n" +
      "  constructor() {\n" +
      "    this.listeners = new Map();\n" +
      "  }\n" +
      "  \n" +
      "  addEventListener(element, event, handler) {\n" +
      "    element.addEventListener(event, handler);\n" +
      "    \n" +
      "    if (!this.listeners.has(element)) {\n" +
      "      this.listeners.set(element, []);\n" +
      "    }\n" +
      "    this.listeners.get(element).push({ event, handler });\n" +
      "  }\n" +
      "  \n" +
      "  removeAllListeners(element) {\n" +
      "    const elementListeners = this.listeners.get(element);\n" +
      "    if (elementListeners) {\n" +
      "      elementListeners.forEach(({ event, handler }) => {\n" +
      "        element.removeEventListener(event, handler);\n" +
      "      });\n" +
      "      this.listeners.delete(element);\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  cleanup() {\n" +
      "    this.listeners.forEach((listeners, element) => {\n" +
      "      this.removeAllListeners(element);\n" +
      "    });\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// 3. WeakMap and WeakSet for weak references\n" +
      "const weakMap = new WeakMap();\n" +
      "const weakSet = new WeakSet();\n" +
      "\n" +
      "function useWeakReferences() {\n" +
      "  const obj = { data: 'large data' };\n" +
      "  \n" +
      "  // WeakMap doesn't prevent garbage collection\n" +
      "  weakMap.set(obj, 'metadata');\n" +
      "  weakSet.add(obj);\n" +
      "  \n" +
      "  // When obj goes out of scope, it can be GC'd\n" +
      "  // even though it's in WeakMap/WeakSet\n" +
      "}\n" +
      "```\n\n" +
      "**Memory Profiling:**\n" +
      "```javascript\n" +
      "// Memory usage monitoring\n" +
      "function getMemoryUsage() {\n" +
      "  if (performance.memory) {\n" +
      "    return {\n" +
      "      used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),\n" +
      "      total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),\n" +
      "      limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)\n" +
      "    };\n" +
      "  }\n" +
      "  return null;\n" +
      "}\n" +
      "\n" +
      "// Memory leak detection\n" +
      "class MemoryMonitor {\n" +
      "  constructor() {\n" +
      "    this.baseline = getMemoryUsage();\n" +
      "    this.measurements = [];\n" +
      "  }\n" +
      "  \n" +
      "  measure() {\n" +
      "    const usage = getMemoryUsage();\n" +
      "    if (usage) {\n" +
      "      this.measurements.push({\n" +
      "        timestamp: Date.now(),\n" +
      "        ...usage\n" +
      "      });\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  detectLeak() {\n" +
      "    if (this.measurements.length < 10) return false;\n" +
      "    \n" +
      "    const recent = this.measurements.slice(-10);\n" +
      "    const trend = recent.map(m => m.used);\n" +
      "    \n" +
      "    // Check if memory usage is consistently increasing\n" +
      "    const isIncreasing = trend.every((val, i) => \n" +
      "      i === 0 || val >= trend[i - 1]\n" +
      "    );\n" +
      "    \n" +
      "    return isIncreasing && trend[trend.length - 1] > this.baseline.used * 1.5;\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Usage\n" +
      "const monitor = new MemoryMonitor();\n" +
      "setInterval(() => {\n" +
      "  monitor.measure();\n" +
      "  if (monitor.detectLeak()) {\n" +
      "    console.warn('Potential memory leak detected!');\n" +
      "  }\n" +
      "}, 5000);\n" +
      "```\n\n" +
      "**Garbage Collection Optimization:**\n" +
      "```javascript\n" +
      "// 1. Object pooling\n" +
      "class ObjectPool {\n" +
      "  constructor(createFn, resetFn, initialSize = 10) {\n" +
      "    this.createFn = createFn;\n" +
      "    this.resetFn = resetFn;\n" +
      "    this.pool = [];\n" +
      "    \n" +
      "    // Pre-create objects\n" +
      "    for (let i = 0; i < initialSize; i++) {\n" +
      "      this.pool.push(this.createFn());\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  acquire() {\n" +
      "    if (this.pool.length > 0) {\n" +
      "      return this.pool.pop();\n" +
      "    }\n" +
      "    return this.createFn();\n" +
      "  }\n" +
      "  \n" +
      "  release(obj) {\n" +
      "    this.resetFn(obj);\n" +
      "    this.pool.push(obj);\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// Usage\n" +
      "const pool = new ObjectPool(\n" +
      "  () => ({ x: 0, y: 0, active: false }),\n" +
      "  (obj) => { obj.x = 0; obj.y = 0; obj.active = false; }\n" +
      ");\n" +
      "\n" +
      "// 2. Lazy initialization\n" +
      "class LazyInitializer {\n" +
      "  constructor() {\n" +
      "    this._data = null;\n" +
      "  }\n" +
      "  \n" +
      "  get data() {\n" +
      "    if (!this._data) {\n" +
      "      this._data = this.initializeData();\n" +
      "    }\n" +
      "    return this._data;\n" +
      "  }\n" +
      "  \n" +
      "  initializeData() {\n" +
      "    // Expensive initialization\n" +
      "    return new Array(1000000).fill(0).map((_, i) => i);\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// 3. Manual garbage collection trigger (Chrome DevTools)\n" +
      "function forceGC() {\n" +
      "  if (window.gc) {\n" +
      "    window.gc();\n" +
      "  } else {\n" +
      "    console.warn('Manual GC not available');\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Avoid global variables\n" +
      "- Remove event listeners when done\n" +
      "- Use WeakMap/WeakSet for weak references\n" +
      "- Implement object pooling for frequently created objects\n" +
      "- Monitor memory usage in production\n" +
      "- Use lazy initialization for expensive resources\n" +
      "- Avoid circular references\n" +
      "- Clean up timers and intervals",
    category: "JavaScript",
    difficulty: "advanced",
    tags: ["memory-management", "garbage-collection", "memory-leaks", "performance", "profiling"],
  },
  {
    id: 51,
    question:
      "What is Vite? How does it work and what are its advantages over traditional bundlers like Webpack?",
    answer:
      "Vite is a modern build tool that provides fast development server startup and hot module replacement (HMR) using native ES modules.\n\n" +
      "**Vite Architecture:**\n" +
      "```javascript\n" +
      "// vite.config.js\n" +
      "import { defineConfig } from 'vite';\n" +
      "import react from '@vitejs/plugin-react';\n" +
      "import { resolve } from 'path';\n" +
      "\n" +
      "export default defineConfig({\n" +
      "  plugins: [react()],\n" +
      "  \n" +
      "  // Development server configuration\n" +
      "  server: {\n" +
      "    port: 3000,\n" +
      "    open: true,\n" +
      "    cors: true,\n" +
      "    proxy: {\n" +
      "      '/api': {\n" +
      "        target: 'http://localhost:8080',\n" +
      "        changeOrigin: true,\n" +
      "        rewrite: (path) => path.replace(/^\\/api/, '')\n" +
      "      }\n" +
      "    }\n" +
      "  },\n" +
      "  \n" +
      "  // Build configuration\n" +
      "  build: {\n" +
      "    outDir: 'dist',\n" +
      "    sourcemap: true,\n" +
      "    rollupOptions: {\n" +
      "      input: {\n" +
      "        main: resolve(__dirname, 'index.html'),\n" +
      "        admin: resolve(__dirname, 'admin.html')\n" +
      "      },\n" +
      "      output: {\n" +
      "        manualChunks: {\n" +
      "          vendor: ['react', 'react-dom'],\n" +
      "          utils: ['lodash', 'moment']\n" +
      "        }\n" +
      "      }\n" +
      "    }\n" +
      "  },\n" +
      "  \n" +
      "  // CSS configuration\n" +
      "  css: {\n" +
      "    preprocessorOptions: {\n" +
      "      scss: {\n" +
      '        additionalData: `@import "@/styles/variables.scss";`\n' +
      "      }\n" +
      "    }\n" +
      "  },\n" +
      "  \n" +
      "  // Path aliases\n" +
      "  resolve: {\n" +
      "    alias: {\n" +
      "      '@': resolve(__dirname, 'src'),\n" +
      "      '@components': resolve(__dirname, 'src/components'),\n" +
      "      '@utils': resolve(__dirname, 'src/utils')\n" +
      "    }\n" +
      "  }\n" +
      "});\n" +
      "```\n\n" +
      "**Development vs Production:**\n" +
      "```javascript\n" +
      "// Development: Native ES modules\n" +
      "// index.html\n" +
      "<!DOCTYPE html>\n" +
      "<html>\n" +
      "<head>\n" +
      "  <title>Vite App</title>\n" +
      "</head>\n" +
      "<body>\n" +
      '  <div id="root"></div>\n' +
      '  <script type="module" src="/src/main.jsx"></script>\n' +
      "</body>\n" +
      "</html>\n" +
      "\n" +
      "// main.jsx - Direct ES module imports\n" +
      "import React from 'react';\n" +
      "import ReactDOM from 'react-dom/client';\n" +
      "import App from './App';\n" +
      "\n" +
      "ReactDOM.createRoot(document.getElementById('root')).render(<App />);\n" +
      "\n" +
      "// Production: Bundled with Rollup\n" +
      "// Vite uses Rollup for production builds\n" +
      "// Automatically handles:\n" +
      "// - Tree shaking\n" +
      "// - Code splitting\n" +
      "// - Asset optimization\n" +
      "// - CSS extraction\n" +
      "```\n\n" +
      "**Plugin System:**\n" +
      "```javascript\n" +
      "// Custom Vite plugin\n" +
      "function myPlugin() {\n" +
      "  return {\n" +
      "    name: 'my-plugin',\n" +
      "    \n" +
      "    // Transform code\n" +
      "    transform(code, id) {\n" +
      "      if (id.endsWith('.custom')) {\n" +
      "        return {\n" +
      "          code: `export default ${JSON.stringify(code)}`,\n" +
      "          map: null\n" +
      "        };\n" +
      "      }\n" +
      "    },\n" +
      "    \n" +
      "    // Handle file loading\n" +
      "    load(id) {\n" +
      "      if (id.endsWith('.custom')) {\n" +
      "        return `export default 'custom content'`;\n" +
      "      }\n" +
      "    },\n" +
      "    \n" +
      "    // Configure dev server\n" +
      "    configureServer(server) {\n" +
      "      server.middlewares.use('/api', (req, res, next) => {\n" +
      "        res.setHeader('Access-Control-Allow-Origin', '*');\n" +
      "        next();\n" +
      "      });\n" +
      "    },\n" +
      "    \n" +
      "    // Handle HMR\n" +
      "    handleHotUpdate(ctx) {\n" +
      "      if (ctx.file.endsWith('.custom')) {\n" +
      "        ctx.server.ws.send({\n" +
      "          type: 'full-reload'\n" +
      "        });\n" +
      "        return [];\n" +
      "      }\n" +
      "    }\n" +
      "  };\n" +
      "}\n" +
      "\n" +
      "// Usage in vite.config.js\n" +
      "export default defineConfig({\n" +
      "  plugins: [myPlugin()]\n" +
      "});\n" +
      "```\n\n" +
      "**Environment Variables:**\n" +
      "```javascript\n" +
      "// .env files\n" +
      "// .env\n" +
      "VITE_API_URL=https://api.example.com\n" +
      "VITE_APP_TITLE=My App\n" +
      "\n" +
      "// .env.local\n" +
      "VITE_API_URL=http://localhost:3001\n" +
      "\n" +
      "// .env.production\n" +
      "VITE_API_URL=https://api.production.com\n" +
      "\n" +
      "// Usage in code\n" +
      "const apiUrl = import.meta.env.VITE_API_URL;\n" +
      "const appTitle = import.meta.env.VITE_APP_TITLE;\n" +
      "\n" +
      "// TypeScript support\n" +
      "// vite-env.d.ts\n" +
      '/// <reference types="vite/client" />\n' +
      "\n" +
      "interface ImportMetaEnv {\n" +
      "  readonly VITE_API_URL: string;\n" +
      "  readonly VITE_APP_TITLE: string;\n" +
      "}\n" +
      "\n" +
      "interface ImportMeta {\n" +
      "  readonly env: ImportMetaEnv;\n" +
      "}\n" +
      "```\n\n" +
      "**Performance Optimizations:**\n" +
      "```javascript\n" +
      "// vite.config.js - Performance optimizations\n" +
      "export default defineConfig({\n" +
      "  // Dependency pre-bundling\n" +
      "  optimizeDeps: {\n" +
      "    include: ['react', 'react-dom', 'lodash'],\n" +
      "    exclude: ['@my-org/my-package']\n" +
      "  },\n" +
      "  \n" +
      "  // Build optimizations\n" +
      "  build: {\n" +
      "    // Enable gzip compression\n" +
      "    minify: 'terser',\n" +
      "    terserOptions: {\n" +
      "      compress: {\n" +
      "        drop_console: true,\n" +
      "        drop_debugger: true\n" +
      "      }\n" +
      "    },\n" +
      "    \n" +
      "    // Chunk splitting strategy\n" +
      "    rollupOptions: {\n" +
      "      output: {\n" +
      "        manualChunks: (id) => {\n" +
      "          if (id.includes('node_modules')) {\n" +
      "            if (id.includes('react')) {\n" +
      "              return 'react-vendor';\n" +
      "            }\n" +
      "            if (id.includes('lodash')) {\n" +
      "              return 'utils-vendor';\n" +
      "            }\n" +
      "            return 'vendor';\n" +
      "          }\n" +
      "        }\n" +
      "      }\n" +
      "    }\n" +
      "  }\n" +
      "});\n" +
      "```\n\n" +
      "**Vite vs Webpack Comparison:**\n" +
      "```javascript\n" +
      "// Vite advantages:\n" +
      "// 1. Faster dev server startup (no bundling)\n" +
      "// 2. Instant HMR (native ES modules)\n" +
      "// 3. Simpler configuration\n" +
      "// 4. Built-in TypeScript support\n" +
      "// 5. Modern tooling (Rollup, esbuild)\n" +
      "\n" +
      "// Webpack advantages:\n" +
      "// 1. More mature ecosystem\n" +
      "// 2. Extensive plugin system\n" +
      "// 3. Better for complex applications\n" +
      "// 4. More configuration options\n" +
      "// 5. Better for legacy code\n" +
      "\n" +
      "// Migration from Webpack to Vite\n" +
      "// webpack.config.js -> vite.config.js\n" +
      "const webpackConfig = {\n" +
      "  entry: './src/index.js',\n" +
      "  output: {\n" +
      "    path: path.resolve(__dirname, 'dist'),\n" +
      "    filename: 'bundle.js'\n" +
      "  },\n" +
      "  module: {\n" +
      "    rules: [\n" +
      "      {\n" +
      "        test: /\\.js$/,\n" +
      "        use: 'babel-loader'\n" +
      "      }\n" +
      "    ]\n" +
      "  }\n" +
      "};\n" +
      "\n" +
      "// Equivalent Vite config\n" +
      "const viteConfig = {\n" +
      "  build: {\n" +
      "    outDir: 'dist',\n" +
      "    rollupOptions: {\n" +
      "      input: './src/index.js'\n" +
      "    }\n" +
      "  }\n" +
      "};\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Use Vite for new projects\n" +
      "- Leverage native ES modules in development\n" +
      "- Configure proper chunk splitting\n" +
      "- Use environment variables for configuration\n" +
      "- Implement proper TypeScript support\n" +
      "- Optimize dependencies with optimizeDeps\n" +
      "- Use plugins for framework-specific features",
    category: "Build Tools",
    difficulty: "advanced",
    tags: ["vite", "bundling", "hmr", "es-modules", "rollup", "development"],
  },
  {
    id: 52,
    question: "What is ESBuild? How does it provide fast bundling and what are its use cases?",
    answer:
      "ESBuild is an extremely fast JavaScript bundler and minifier written in Go, designed to be a drop-in replacement for other bundlers.\n\n" +
      "**ESBuild Features:**\n" +
      "```javascript\n" +
      "// esbuild.config.js\n" +
      "import { build } from 'esbuild';\n" +
      "\n" +
      "const config = {\n" +
      "  entryPoints: ['src/index.js'],\n" +
      "  bundle: true,\n" +
      "  outfile: 'dist/bundle.js',\n" +
      "  \n" +
      "  // Transpilation options\n" +
      "  target: 'es2020',\n" +
      "  format: 'esm',\n" +
      "  platform: 'browser',\n" +
      "  \n" +
      "  // Optimization\n" +
      "  minify: true,\n" +
      "  sourcemap: true,\n" +
      "  \n" +
      "  // External dependencies\n" +
      "  external: ['react', 'react-dom'],\n" +
      "  \n" +
      "  // Loaders\n" +
      "  loader: {\n" +
      "    '.js': 'jsx',\n" +
      "    '.ts': 'ts',\n" +
      "    '.tsx': 'tsx',\n" +
      "    '.css': 'css',\n" +
      "    '.png': 'file',\n" +
      "    '.svg': 'text'\n" +
      "  },\n" +
      "  \n" +
      "  // Plugins\n" +
      "  plugins: [\n" +
      "    // Custom plugin example\n" +
      "    {\n" +
      "      name: 'my-plugin',\n" +
      "      setup(build) {\n" +
      "        build.onResolve({ filter: /^env$/ }, args => ({\n" +
      "          path: args.path,\n" +
      "          namespace: 'env-ns'\n" +
      "        }));\n" +
      "        \n" +
      "        build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => ({\n" +
      "          contents: JSON.stringify(process.env),\n" +
      "          loader: 'json'\n" +
      "        }));\n" +
      "      }\n" +
      "    }\n" +
      "  ]\n" +
      "};\n" +
      "\n" +
      "// Build function\n" +
      "async function buildApp() {\n" +
      "  try {\n" +
      "    const result = await build(config);\n" +
      "    console.log('Build completed:', result);\n" +
      "  } catch (error) {\n" +
      "    console.error('Build failed:', error);\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "buildApp();\n" +
      "```\n\n" +
      "**Development Server:**\n" +
      "```javascript\n" +
      "import { serve } from 'esbuild';\n" +
      "\n" +
      "const serveConfig = {\n" +
      "  port: 3000,\n" +
      "  servedir: 'public',\n" +
      "  \n" +
      "  onRequest: (args) => {\n" +
      "    console.log(`${args.method} ${args.path}`);\n" +
      "  }\n" +
      "};\n" +
      "\n" +
      "// Start development server\n" +
      "serve(serveConfig, {\n" +
      "  entryPoints: ['src/index.js'],\n" +
      "  bundle: true,\n" +
      "  outfile: 'public/bundle.js',\n" +
      "  target: 'es2020',\n" +
      "  format: 'esm'\n" +
      "}).then(server => {\n" +
      "  console.log(`Server running at http://localhost:${server.port}`);\n" +
      "  \n" +
      "  // Stop server after 10 seconds\n" +
      "  setTimeout(() => {\n" +
      "    server.stop();\n" +
      "  }, 10000);\n" +
      "});\n" +
      "```\n\n" +
      "**Watch Mode:**\n" +
      "```javascript\n" +
      "import { build, context } from 'esbuild';\n" +
      "\n" +
      "// Watch mode for development\n" +
      "async function watchMode() {\n" +
      "  const ctx = await context({\n" +
      "    entryPoints: ['src/index.js'],\n" +
      "    bundle: true,\n" +
      "    outfile: 'dist/bundle.js',\n" +
      "    minify: false,\n" +
      "    sourcemap: true\n" +
      "  });\n" +
      "  \n" +
      "  // Watch for changes\n" +
      "  await ctx.watch();\n" +
      "  console.log('Watching for changes...');\n" +
      "  \n" +
      "  // Serve the built files\n" +
      "  await ctx.serve({\n" +
      "    port: 3000,\n" +
      "    servedir: 'dist'\n" +
      "  });\n" +
      "}\n" +
      "\n" +
      "watchMode();\n" +
      "```\n\n" +
      "**Performance Comparison:**\n" +
      "```javascript\n" +
      "// ESBuild vs other bundlers (approximate times)\n" +
      "const benchmarks = {\n" +
      "  'esbuild': '0.1s',\n" +
      "  'webpack': '10s',\n" +
      "  'rollup': '5s',\n" +
      "  'parcel': '3s'\n" +
      "};\n" +
      "\n" +
      "// Why ESBuild is fast:\n" +
      "// 1. Written in Go (compiled language)\n" +
      "// 2. Parallel processing\n" +
      "// 3. No JavaScript overhead\n" +
      "// 4. Optimized algorithms\n" +
      "// 5. Single-pass bundling\n" +
      "\n" +
      "// Performance test\n" +
      "import { performance } from 'perf_hooks';\n" +
      "\n" +
      "async function performanceTest() {\n" +
      "  const start = performance.now();\n" +
      "  \n" +
      "  await build({\n" +
      "    entryPoints: ['src/index.js'],\n" +
      "    bundle: true,\n" +
      "    outfile: 'dist/bundle.js',\n" +
      "    minify: true\n" +
      "  });\n" +
      "  \n" +
      "  const end = performance.now();\n" +
      "  console.log(`Build time: ${end - start}ms`);\n" +
      "}\n" +
      "```\n\n" +
      "**Advanced Configuration:**\n" +
      "```javascript\n" +
      "// Multi-entry build\n" +
      "const multiEntryConfig = {\n" +
      "  entryPoints: {\n" +
      "    'app': 'src/app.js',\n" +
      "    'admin': 'src/admin.js',\n" +
      "    'worker': 'src/worker.js'\n" +
      "  },\n" +
      "  \n" +
      "  outdir: 'dist',\n" +
      "  bundle: true,\n" +
      "  \n" +
      "  // Different formats for different entry points\n" +
      "  format: 'esm',\n" +
      "  \n" +
      "  // Conditional compilation\n" +
      "  define: {\n" +
      "    'process.env.NODE_ENV': '\"production\"',\n" +
      "    'global': 'globalThis'\n" +
      "  },\n" +
      "  \n" +
      "  // Tree shaking\n" +
      "  treeShaking: true,\n" +
      "  \n" +
      "  // Code splitting\n" +
      "  splitting: true,\n" +
      "  \n" +
      "  // Metafile for analysis\n" +
      "  metafile: true\n" +
      "};\n" +
      "\n" +
      "// Build with metafile\n" +
      "const result = await build(multiEntryConfig);\n" +
      "console.log('Build metafile:', result.metafile);\n" +
      "```\n\n" +
      "**Integration with Other Tools:**\n" +
      "```javascript\n" +
      "// Integration with Vite\n" +
      "// vite.config.js\n" +
      "import { defineConfig } from 'vite';\n" +
      "import { esbuild } from 'vite-plugin-esbuild';\n" +
      "\n" +
      "export default defineConfig({\n" +
      "  plugins: [\n" +
      "    esbuild({\n" +
      "      target: 'es2020',\n" +
      "      minify: true\n" +
      "    })\n" +
      "  ]\n" +
      "});\n" +
      "\n" +
      "// Integration with Webpack\n" +
      "// webpack.config.js\n" +
      "const ESBuildPlugin = require('esbuild-webpack-plugin');\n" +
      "\n" +
      "module.exports = {\n" +
      "  plugins: [\n" +
      "    new ESBuildPlugin({\n" +
      "      target: 'es2020',\n" +
      "      minify: true\n" +
      "    })\n" +
      "  ]\n" +
      "};\n" +
      "\n" +
      "// CLI usage\n" +
      "// package.json\n" +
      "{\n" +
      '  "scripts": {\n' +
      '    "build": "esbuild src/index.js --bundle --outfile=dist/bundle.js",\n' +
      '    "dev": "esbuild src/index.js --bundle --outfile=dist/bundle.js --watch",\n' +
      '    "serve": "esbuild src/index.js --bundle --outfile=dist/bundle.js --serve --servedir=dist"\n' +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Best Practices:**\n" +
      "- Use ESBuild for fast builds in CI/CD\n" +
      "- Leverage its speed for development\n" +
      "- Combine with other tools for complex scenarios\n" +
      "- Use metafile for bundle analysis\n" +
      "- Configure proper target and format\n" +
      "- Use plugins for custom transformations\n" +
      "- Monitor build performance",
    category: "Build Tools",
    difficulty: "advanced",
    tags: ["esbuild", "bundling", "performance", "go", "minification", "transpilation"],
  },
];

export default RANDOM_ENHANCED_QUESTIONS;
