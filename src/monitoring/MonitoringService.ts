/**
 * Monitoring and Error Tracking System
 * Provides comprehensive application monitoring and error reporting
 */

export interface ErrorInfo {
  message: string;
  stack?: string;
  component?: string;
  userId?: string;
  timestamp: Date;
  userAgent: string;
  url: string;
  severity: "low" | "medium" | "high" | "critical";
  context?: Record<string, unknown>;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: Date;
  context?: Record<string, unknown>;
}

export interface UserAction {
  action: string;
  component: string;
  timestamp: Date;
  userId?: string;
  metadata?: Record<string, unknown>;
}

interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

interface PerformanceWithMemory extends Performance {
  memory?: MemoryInfo;
}

export class MonitoringService {
  private errors: ErrorInfo[] = [];
  private metrics: PerformanceMetric[] = [];
  private actions: UserAction[] = [];
  private readonly maxStorageSize = 1000; // Maximum items to store in memory

  /**
   * Track application errors
   */
  trackError(error: Error, context?: Record<string, unknown>): void {
    const errorInfo: ErrorInfo = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      severity: this.determineSeverity(error),
      context,
    };

    this.errors.push(errorInfo);
    this.trimStorage("errors");

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Tracked Error:", errorInfo);
    }

    // Send to external service in production
    if (process.env.NODE_ENV === "production") {
      this.sendToExternalService("error", errorInfo);
    }
  }

  /**
   * Track performance metrics
   */
  trackMetric(name: string, value: number, unit: string, context?: Record<string, unknown>): void {
    const metric: PerformanceMetric = {
      name,
      value,
      unit,
      timestamp: new Date(),
      context,
    };

    this.metrics.push(metric);
    this.trimStorage("metrics");

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.warn("Performance Metric:", metric);
    }

    // Send to external service in production
    if (process.env.NODE_ENV === "production") {
      this.sendToExternalService("metric", metric);
    }
  }

  /**
   * Track user actions
   */
  trackAction(action: string, component: string, metadata?: Record<string, unknown>): void {
    const userAction: UserAction = {
      action,
      component,
      timestamp: new Date(),
      metadata,
    };

    this.actions.push(userAction);
    this.trimStorage("actions");

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.warn("User Action:", userAction);
    }

    // Send to external service in production
    if (process.env.NODE_ENV === "production") {
      this.sendToExternalService("action", userAction);
    }
  }

  /**
   * Track Web Vitals
   */
  trackWebVitals(): void {
    // Track Largest Contentful Paint (LCP)
    if ("PerformanceObserver" in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.trackMetric("lcp", lastEntry.startTime, "ms", {
          element: lastEntry.element?.tagName,
        });
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

      // Track First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: PerformanceEntry) => {
          this.trackMetric(
            "fid",
            (entry as PerformanceEventTiming).processingStart - entry.startTime,
            "ms",
            {
              eventType: entry.name,
            }
          );
        });
      });
      fidObserver.observe({ entryTypes: ["first-input"] });

      // Track Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: PerformanceEntry) => {
          const layoutShiftEntry = entry as LayoutShift;
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
          }
        });
        this.trackMetric("cls", clsValue, "score");
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });
    }
  }

  /**
   * Track page load performance
   */
  trackPageLoad(): void {
    if ("performance" in window) {
      const navigation = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;

      this.trackMetric("page_load_time", navigation.loadEventEnd - navigation.loadEventStart, "ms");
      this.trackMetric(
        "dom_content_loaded",
        navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        "ms"
      );
      this.trackMetric("first_byte", navigation.responseStart - navigation.requestStart, "ms");
    }
  }

  /**
   * Track memory usage
   */
  trackMemoryUsage(): void {
    if ("memory" in performance) {
      const memory = (performance as PerformanceWithMemory).memory;
      this.trackMetric("memory_used", memory.usedJSHeapSize, "bytes");
      this.trackMetric("memory_total", memory.totalJSHeapSize, "bytes");
      this.trackMetric("memory_limit", memory.jsHeapSizeLimit, "bytes");
    }
  }

  /**
   * Get error statistics
   */
  getErrorStats(): {
    total: number;
    bySeverity: Record<string, number>;
    recent: ErrorInfo[];
  } {
    const bySeverity = this.errors.reduce(
      (acc, error) => {
        acc[error.severity] = (acc[error.severity] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const recent = this.errors
      .filter((error) => Date.now() - error.timestamp.getTime() < 24 * 60 * 60 * 1000) // Last 24 hours
      .slice(-10); // Last 10 errors

    return {
      total: this.errors.length,
      bySeverity,
      recent,
    };
  }

  /**
   * Get performance statistics
   */
  getPerformanceStats(): {
    total: number;
    byMetric: Record<string, { avg: number; min: number; max: number }>;
    recent: PerformanceMetric[];
  } {
    const byMetric = this.metrics.reduce(
      (acc, metric) => {
        if (!acc[metric.name]) {
          acc[metric.name] = { values: [] };
        }
        acc[metric.name].values.push(metric.value);
        return acc;
      },
      {} as Record<string, { values: number[] }>
    );

    const stats = Object.entries(byMetric).reduce(
      (acc, [name, data]) => {
        acc[name] = {
          avg: data.values.reduce((sum, val) => sum + val, 0) / data.values.length,
          min: Math.min(...data.values),
          max: Math.max(...data.values),
        };
        return acc;
      },
      {} as Record<string, { avg: number; min: number; max: number }>
    );

    const recent = this.metrics
      .filter((metric) => Date.now() - metric.timestamp.getTime() < 24 * 60 * 60 * 1000) // Last 24 hours
      .slice(-20); // Last 20 metrics

    return {
      total: this.metrics.length,
      byMetric: stats,
      recent,
    };
  }

  /**
   * Get user action statistics
   */
  getUserActionStats(): {
    total: number;
    byAction: Record<string, number>;
    byComponent: Record<string, number>;
    recent: UserAction[];
  } {
    const byAction = this.actions.reduce(
      (acc, action) => {
        acc[action.action] = (acc[action.action] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const byComponent = this.actions.reduce(
      (acc, action) => {
        acc[action.component] = (acc[action.component] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const recent = this.actions
      .filter((action) => Date.now() - action.timestamp.getTime() < 24 * 60 * 60 * 1000) // Last 24 hours
      .slice(-50); // Last 50 actions

    return {
      total: this.actions.length,
      byAction,
      byComponent,
      recent,
    };
  }

  /**
   * Clear all stored data
   */
  clearData(): void {
    this.errors = [];
    this.metrics = [];
    this.actions = [];
  }

  /**
   * Export data for analysis
   */
  exportData(): {
    errors: ErrorInfo[];
    metrics: PerformanceMetric[];
    actions: UserAction[];
    timestamp: Date;
  } {
    return {
      errors: [...this.errors],
      metrics: [...this.metrics],
      actions: [...this.actions],
      timestamp: new Date(),
    };
  }

  // Private methods
  private determineSeverity(error: Error): ErrorInfo["severity"] {
    const message = error.message.toLowerCase();

    if (message.includes("network") || message.includes("fetch")) {
      return "medium";
    }

    if (message.includes("memory") || message.includes("out of memory")) {
      return "high";
    }

    if (message.includes("security") || message.includes("unauthorized")) {
      return "critical";
    }

    return "low";
  }

  private trimStorage(type: "errors" | "metrics" | "actions"): void {
    const storage = this[type];
    if (storage.length > this.maxStorageSize) {
      storage.splice(0, storage.length - this.maxStorageSize);
    }
  }

  private async sendToExternalService(type: string, data: unknown): Promise<void> {
    try {
      // In a real application, you would send this to your monitoring service
      // For example: Sentry, LogRocket, DataDog, etc.
      console.warn(`Sending ${type} to external service:`, data);

      // Example implementation:
      // await fetch('/api/monitoring', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ type, data })
      // });
    } catch (error) {
      console.error("Failed to send monitoring data:", error);
    }
  }
}

// Singleton instance
export const monitoringService = new MonitoringService();

// Initialize monitoring
if (typeof window !== "undefined") {
  monitoringService.trackWebVitals();
  monitoringService.trackPageLoad();

  // Track memory usage periodically
  setInterval(() => {
    monitoringService.trackMemoryUsage();
  }, 60000); // Every minute
}
