/**
 * Performance Dashboard - Monitor application performance metrics
 */

import { useState, useEffect } from "react";
import { PerformanceService } from "../../services/PerformanceService";

interface PerformanceDashboardProps {
  isVisible: boolean;
  onClose: () => void;
}

export function PerformanceDashboard({ isVisible, onClose }: PerformanceDashboardProps) {
  const [report, setReport] = useState(PerformanceService.getPerformanceReport());

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setReport(PerformanceService.getPerformanceReport());
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="mx-4 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-800">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            🚀 Performance Dashboard
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {report.summary.totalBundleLoads}
            </div>
            <div className="text-sm text-blue-800 dark:text-blue-300">Bundle Loads</div>
          </div>

          <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {report.summary.averageBundleLoadTime}ms
            </div>
            <div className="text-sm text-green-800 dark:text-green-300">Avg Load Time</div>
          </div>

          <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {report.summary.totalMetrics}
            </div>
            <div className="text-sm text-purple-800 dark:text-purple-300">Total Metrics</div>
          </div>

          <div className="rounded-lg bg-orange-50 p-4 dark:bg-orange-900/20">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {report.summary.slowestBundle?.module || "N/A"}
            </div>
            <div className="text-sm text-orange-800 dark:text-orange-300">Slowest Bundle</div>
          </div>
        </div>

        {/* Bundle Load Metrics */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            📦 Bundle Load Performance
          </h3>
          <div className="space-y-2">
            {report.bundleMetrics.map((metric, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700"
              >
                <div className="font-medium text-gray-900 dark:text-white">{metric.module}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {metric.loadTime}ms
                  {metric.size && ` (${metric.size}KB)`}
                </div>
              </div>
            ))}
            {report.bundleMetrics.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400">No bundle loads recorded yet.</p>
            )}
          </div>
        </div>

        {/* Custom Metrics */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            📊 Custom Metrics
          </h3>
          <div className="space-y-2">
            {report.customMetrics.slice(-10).map((metric, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700"
              >
                <div className="font-medium text-gray-900 dark:text-white">{metric.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {metric.value}ms ({metric.type})
                </div>
              </div>
            ))}
            {report.customMetrics.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400">No custom metrics recorded yet.</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => {
              const data = PerformanceService.exportMetrics();
              const blob = new Blob([data], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "performance-metrics.json";
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Export Metrics
          </button>

          <button
            onClick={() => {
              PerformanceService.clearMetrics();
              setReport(PerformanceService.getPerformanceReport());
            }}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Clear Metrics
          </button>
        </div>
      </div>
    </div>
  );
}
