/**
 * Performance Monitoring Service
 * Tracks bundle loading, component performance, and user experience metrics
 */

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  type: "navigation" | "resource" | "measure" | "custom";
}

interface BundleLoadMetric {
  module: string;
  loadTime: number;
  size?: number;
  timestamp: number;
}

export class PerformanceService {
  private static metrics: PerformanceMetric[] = [];
  private static bundleMetrics: BundleLoadMetric[] = [];

  /**
   * Track bundle loading performance
   */
  static trackBundleLoad(module: string, loadTime: number, size?: number): void {
    const metric: BundleLoadMetric = {
      module,
      loadTime,
      size,
      timestamp: Date.now(),
    };

    this.bundleMetrics.push(metric);
  }

  /**
   * Track custom performance metrics
   */
  static trackMetric(
    name: string,
    value: number,
    type: PerformanceMetric["type"] = "custom"
  ): void {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      type,
    };

    this.metrics.push(metric);
  }

  /**
   * Measure function execution time
   */
  static async measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    try {
      const result = await fn();
      const duration = performance.now() - start;
      this.trackMetric(name, duration, "measure");
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.trackMetric(`${name}_error`, duration, "measure");
      throw error;
    }
  }

  /**
   * Measure synchronous function execution time
   */
  static measure<T>(name: string, fn: () => T): T {
    const start = performance.now();
    try {
      const result = fn();
      const duration = performance.now() - start;
      this.trackMetric(name, duration, "measure");
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.trackMetric(`${name}_error`, duration, "measure");
      throw error;
    }
  }

  /**
   * Get performance report
   */
  static getPerformanceReport(): {
    bundleMetrics: BundleLoadMetric[];
    customMetrics: PerformanceMetric[];
    summary: {
      totalBundleLoads: number;
      averageBundleLoadTime: number;
      slowestBundle: BundleLoadMetric | null;
      totalMetrics: number;
    };
  } {
    const totalBundleLoads = this.bundleMetrics.length;
    const averageBundleLoadTime =
      totalBundleLoads > 0
        ? this.bundleMetrics.reduce((sum, metric) => sum + metric.loadTime, 0) / totalBundleLoads
        : 0;

    const slowestBundle = this.bundleMetrics.reduce(
      (slowest, current) => (current.loadTime > slowest.loadTime ? current : slowest),
      this.bundleMetrics[0] || { module: "none", loadTime: 0, timestamp: 0 }
    );

    return {
      bundleMetrics: [...this.bundleMetrics],
      customMetrics: [...this.metrics],
      summary: {
        totalBundleLoads,
        averageBundleLoadTime: Math.round(averageBundleLoadTime * 100) / 100,
        slowestBundle: slowestBundle.loadTime > 0 ? slowestBundle : null,
        totalMetrics: this.metrics.length,
      },
    };
  }

  /**
   * Clear all metrics (useful for testing)
   */
  static clearMetrics(): void {
    this.metrics = [];
    this.bundleMetrics = [];
  }

  /**
   * Export metrics for analysis
   */
  static exportMetrics(): string {
    const report = this.getPerformanceReport();
    return JSON.stringify(report, null, 2);
  }

  /**
   * Track page navigation performance
   */
  static trackNavigation(from: string, to: string, duration: number): void {
    this.trackMetric(`navigation_${from}_to_${to}`, duration, "navigation");
  }

  /**
   * Track component render performance
   */
  static trackComponentRender(componentName: string, renderTime: number): void {
    this.trackMetric(`render_${componentName}`, renderTime, "measure");
  }

  /**
   * Track data loading performance
   */
  static trackDataLoad(dataType: string, loadTime: number, recordCount?: number): void {
    this.trackMetric(`data_load_${dataType}`, loadTime, "resource");
    if (recordCount) {
      this.trackMetric(`data_records_${dataType}`, recordCount, "custom");
    }
  }
}
