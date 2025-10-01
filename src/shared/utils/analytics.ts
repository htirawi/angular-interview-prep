// Analytics utilities - Privacy-focused, no PII collection

type EventCategory = "navigation" | "interaction" | "progress" | "search" | "mode";

type AnalyticsEvent = {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
};

class Analytics {
  private isProduction = import.meta.env.PROD;
  private isDevelopment = import.meta.env.DEV;

  /**
   * Track an event (console log in dev, real analytics in prod)
   */
  track(event: AnalyticsEvent) {
    if (this.isDevelopment) {
      // Development mode - log to console for debugging
      // eslint-disable-next-line no-console
      console.log("📊 Analytics:", event);
      return;
    }

    // In production, send to your analytics service
    // Example: Google Analytics, Vercel Analytics, Plausible, etc.
    if (this.isProduction && window.gtag) {
      window.gtag("event", event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      } as Record<string, unknown>);
    }
  }

  // Convenience methods
  trackNavigation(direction: "next" | "prev" | "jump", questionNumber: number) {
    this.track({
      category: "navigation",
      action: `navigate_${direction}`,
      value: questionNumber,
    });
  }

  trackSearch(query: string) {
    this.track({
      category: "search",
      action: "search_query",
      label: query.slice(0, 50), // Truncate for privacy
    });
  }

  trackBookmark(action: "add" | "remove", questionId: number) {
    this.track({
      category: "interaction",
      action: `bookmark_${action}`,
      value: questionId,
    });
  }

  trackModeChange(mode: string) {
    this.track({
      category: "mode",
      action: "change_mode",
      label: mode,
    });
  }

  trackCompletion(questionId: number, totalCompleted: number) {
    this.track({
      category: "progress",
      action: "question_completed",
      value: totalCompleted,
    });
  }

  trackExport(type: "progress" | "notes") {
    this.track({
      category: "interaction",
      action: `export_${type}`,
    });
  }
}

export const analytics = new Analytics();

// TypeScript global declaration for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
