import type { FrameworkId } from "../types";

/**
 * Service for framework-related operations
 * Centralizes framework logic and utilities
 */
export class FrameworkService {
  /**
   * Get framework display name
   */
  static getDisplayName(framework: FrameworkId): string {
    switch (framework) {
      case "angular":
        return "Angular Interview Prep";
      case "react":
        return "React Interview Prep";
      case "nextjs":
        return "Next.js Interview Prep";
      case "redux":
        return "Redux Interview Prep";
      case "random":
        return "Random Topics Interview Prep";
      default:
        return "Interview Prep";
    }
  }

  /**
   * Get framework page title
   */
  static getPageTitle(framework: FrameworkId): string {
    switch (framework) {
      case "angular":
        return "Angular Senior Interview Prep";
      case "react":
        return "React Senior Interview Prep";
      case "nextjs":
        return "Next.js Senior Interview Prep";
      case "redux":
        return "Redux Senior Interview Prep";
      case "random":
        return "Random Topics Interview Prep";
      default:
        return "Senior Interview Prep";
    }
  }

  /**
   * Generate framework-specific storage key
   */
  static getStorageKey(framework: FrameworkId, key: string): string {
    return `${framework}_${key}`;
  }

  /**
   * Validate if framework is supported
   */
  static isValidFramework(framework: string): framework is FrameworkId {
    const validFrameworks: FrameworkId[] = ["angular", "react", "nextjs", "redux", "random"];
    return validFrameworks.includes(framework as FrameworkId);
  }

  /**
   * Get framework icon name
   */
  static getIconName(framework: FrameworkId): string {
    switch (framework) {
      case "angular":
        return "angular";
      case "react":
        return "react";
      case "nextjs":
        return "nextjs";
      case "redux":
        return "redux";
      case "random":
        return "random";
      default:
        return "angular";
    }
  }
}
