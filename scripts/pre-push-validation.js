#!/usr/bin/env node

/**
 * Pre-push validation script
 * Comprehensive checks for code quality before pushing to repository
 */

import { execSync } from "child_process";
import { existsSync } from "fs";
import { join } from "path";

const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  reset: "\x1b[0m",
  bold: "\x1b[1m",
};

function log(message, color = "white") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log("\n" + "=".repeat(60));
  log(`🔍 ${title}`, "cyan");
  console.log("=".repeat(60));
}

function runCommand(command, description) {
  try {
    log(`\n📋 ${description}`, "blue");
    log(`Running: ${command}`, "gray");

    const output = execSync(command, {
      encoding: "utf8",
      stdio: "pipe",
      cwd: process.cwd(),
    });

    log(`✅ ${description} - PASSED`, "green");
    return { success: true, output };
  } catch (error) {
    log(`❌ ${description} - FAILED`, "red");
    log(`Error: ${error.message}`, "red");
    if (error.stdout) {
      log(`Output: ${error.stdout}`, "yellow");
    }
    if (error.stderr) {
      log(`Error Output: ${error.stderr}`, "red");
    }
    return { success: false, error: error.message };
  }
}

function checkFileExists(filePath) {
  return existsSync(join(process.cwd(), filePath));
}

function main() {
  log("🚀 Starting Pre-Push Validation", "bold");
  log("Ensuring code quality before pushing to repository...", "white");

  const checks = [];

  // 1. TypeScript Compilation Check
  logSection("TypeScript Compilation");
  const typeCheck = runCommand("npx tsc --noEmit", "TypeScript type checking");
  checks.push(typeCheck);

  // 2. ESLint Check (with strict rules)
  logSection("ESLint Code Quality");
  const lintCheck = runCommand(
    "npx eslint src/ --ext ts,tsx --max-warnings 5",
    "ESLint validation (max 5 warnings)"
  );
  checks.push(lintCheck);

  // 3. Prettier Format Check
  logSection("Code Formatting");
  const formatCheck = runCommand("npx prettier --check src/", "Prettier format validation");
  checks.push(formatCheck);

  // 4. Build Check
  logSection("Production Build");
  const buildCheck = runCommand("npm run build", "Production build validation");
  checks.push(buildCheck);

  // 5. Test Suite
  logSection("Test Suite");
  const testCheck = runCommand("npm run test", "Test suite execution");
  checks.push(testCheck);

  // 6. Custom Any Type Check
  logSection("Custom Any Type Detection");
  const anyCheck = runCommand(
    'grep -r "any" src/ --include="*.ts" --include="*.tsx" | grep -v "// eslint-disable" | grep -v "example" | grep -v "snippet" || true',
    "Any type detection"
  );
  if (anyCheck.success && anyCheck.output.trim()) {
    log('⚠️  Found potential "any" types:', "yellow");
    log(anyCheck.output, "yellow");
    checks.push({ success: false, error: 'Found "any" types in source code' });
  } else {
    log('✅ No "any" types found in source code', "green");
    checks.push({ success: true });
  }

  // 7. Unused Variable Check (simplified)
  logSection("Unused Variable Detection");
  const unusedCheck = runCommand(
    'npx eslint src/ --ext ts,tsx --rule "no-unused-vars: error" --quiet',
    "Unused variable detection"
  );
  checks.push(unusedCheck);

  // 8. Console Statement Check
  logSection("Console Statement Detection");
  const consoleCheck = runCommand(
    'grep -r "console\\." src/ --include="*.ts" --include="*.tsx" | grep -v "console.warn" | grep -v "console.error" | grep -v "// eslint-disable" || true',
    "Console statement detection"
  );
  if (consoleCheck.success && consoleCheck.output.trim()) {
    log("⚠️  Found console statements:", "yellow");
    log(consoleCheck.output, "yellow");
    checks.push({ success: false, error: "Found console statements in source code" });
  } else {
    log("✅ No console statements found in source code", "green");
    checks.push({ success: true });
  }

  // 9. Import/Export Check
  logSection("Import/Export Validation");
  const importCheck = runCommand(
    'npx eslint src/ --ext ts,tsx --rule "no-unused-vars: error" --quiet',
    "Unused import detection"
  );
  checks.push(importCheck);

  // Summary
  logSection("Validation Summary");

  const passed = checks.filter((check) => check.success).length;
  const failed = checks.filter((check) => !check.success).length;

  log(`\n📊 Results:`, "bold");
  log(`✅ Passed: ${passed}`, "green");
  log(`❌ Failed: ${failed}`, failed > 0 ? "red" : "green");

  if (failed > 0) {
    log("\n🚫 Pre-push validation FAILED!", "red");
    log("Please fix the issues above before pushing.", "red");
    log("\n💡 Quick fixes:", "yellow");
    log('• Run "npm run lint:fix" to auto-fix linting issues', "white");
    log('• Run "npm run format" to auto-fix formatting issues', "white");
    log('• Check for "any" types and replace with proper types', "white");
    log("• Remove unused variables and imports", "white");
    log("• Replace console.log with console.warn/error or remove", "white");
    process.exit(1);
  } else {
    log("\n🎉 Pre-push validation PASSED!", "green");
    log("✅ Code is ready to be pushed to repository.", "green");
    process.exit(0);
  }
}

// Run the validation
main();
