/**
 * Analytics and tracking types
 */

export type EventCategory = "navigation" | "interaction" | "progress" | "search" | "mode";

export interface AnalyticsEvent {
  action: string;
  category: EventCategory;
  label?: string;
  value?: number;
}
