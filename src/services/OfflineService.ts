/**
 * Offline Service
 * Handles offline support, caching, and sync functionality
 */

export interface CacheItem {
  key: string;
  data: unknown;
  timestamp: number;
  expiry: number;
}

export interface OfflineQueueItem {
  id: string;
  action: string;
  data: unknown;
  timestamp: number;
  retries: number;
}

class OfflineService {
  private cache: Map<string, CacheItem> = new Map();
  private offlineQueue: OfflineQueueItem[] = [];
  private isOnline: boolean = navigator.onLine;
  private syncInProgress: boolean = false;

  constructor() {
    this.initializeService();
    this.setupEventListeners();
    this.loadFromStorage();
  }

  private initializeService() {
    // Register service worker for offline support
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.warn("Service Worker registered:", registration);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }

  private setupEventListeners() {
    window.addEventListener("online", () => {
      this.isOnline = true;
      this.syncOfflineQueue();
    });

    window.addEventListener("offline", () => {
      this.isOnline = false;
    });
  }

  private loadFromStorage() {
    try {
      const cachedData = localStorage.getItem("offlineCache");
      if (cachedData) {
        const parsed = JSON.parse(cachedData);
        this.cache = new Map(Object.entries(parsed));
      }

      const queueData = localStorage.getItem("offlineQueue");
      if (queueData) {
        this.offlineQueue = JSON.parse(queueData);
      }
    } catch (error) {
      console.error("Failed to load offline data:", error);
    }
  }

  private saveToStorage() {
    try {
      const cacheObject = Object.fromEntries(this.cache);
      localStorage.setItem("offlineCache", JSON.stringify(cacheObject));
      localStorage.setItem("offlineQueue", JSON.stringify(this.offlineQueue));
    } catch (error) {
      console.error("Failed to save offline data:", error);
    }
  }

  /**
   * Cache data for offline access
   */
  cacheData(key: string, data: unknown, expiryHours: number = 24): void {
    const now = Date.now();
    const expiry = now + expiryHours * 60 * 60 * 1000;

    const cacheItem: CacheItem = {
      key,
      data,
      timestamp: now,
      expiry,
    };

    this.cache.set(key, cacheItem);
    this.saveToStorage();
  }

  /**
   * Get cached data
   */
  getCachedData(key: string): unknown | null {
    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    // Check if expired
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      this.saveToStorage();
      return null;
    }

    return item.data;
  }

  /**
   * Clear expired cache items
   */
  clearExpiredCache(): void {
    const now = Date.now();
    const expiredKeys: string[] = [];

    this.cache.forEach((item, key) => {
      if (now > item.expiry) {
        expiredKeys.push(key);
      }
    });

    expiredKeys.forEach((key) => this.cache.delete(key));

    if (expiredKeys.length > 0) {
      this.saveToStorage();
    }
  }

  /**
   * Add action to offline queue
   */
  addToOfflineQueue(action: string, data: unknown): void {
    const queueItem: OfflineQueueItem = {
      id: Date.now().toString(),
      action,
      data,
      timestamp: Date.now(),
      retries: 0,
    };

    this.offlineQueue.push(queueItem);
    this.saveToStorage();
  }

  /**
   * Process offline queue when online
   */
  private async syncOfflineQueue(): Promise<void> {
    if (this.syncInProgress || this.offlineQueue.length === 0) {
      return;
    }

    this.syncInProgress = true;

    try {
      const itemsToProcess = [...this.offlineQueue];
      this.offlineQueue = [];

      for (const item of itemsToProcess) {
        try {
          await this.processQueueItem(item);
        } catch (error) {
          console.error("Failed to process queue item:", item, error);

          // Retry logic
          if (item.retries < 3) {
            item.retries++;
            this.offlineQueue.push(item);
          }
        }
      }

      this.saveToStorage();
    } finally {
      this.syncInProgress = false;
    }
  }

  /**
   * Process individual queue item
   */
  private async processQueueItem(item: OfflineQueueItem): Promise<void> {
    // Implement specific actions based on item.action
    switch (item.action) {
      case "bookmark":
        // Sync bookmark changes
        break;
      case "note":
        // Sync note changes
        break;
      case "rating":
        // Sync rating changes
        break;
      case "progress":
        // Sync progress updates
        break;
      default:
        console.warn("Unknown queue action:", item.action);
    }
  }

  /**
   * Get offline status
   */
  isOffline(): boolean {
    return !this.isOnline;
  }

  /**
   * Get queue status
   */
  getQueueStatus(): { pending: number; failed: number } {
    const pending = this.offlineQueue.length;
    const failed = this.offlineQueue.filter((item) => item.retries >= 3).length;

    return { pending, failed };
  }

  /**
   * Clear all offline data
   */
  clearOfflineData(): void {
    this.cache.clear();
    this.offlineQueue = [];
    localStorage.removeItem("offlineCache");
    localStorage.removeItem("offlineQueue");
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { totalItems: number; totalSize: number; oldestItem: number } {
    const totalItems = this.cache.size;
    const totalSize = JSON.stringify(Object.fromEntries(this.cache)).length;
    const oldestItem = Math.min(...Array.from(this.cache.values()).map((item) => item.timestamp));

    return {
      totalItems,
      totalSize,
      oldestItem: oldestItem || 0,
    };
  }

  /**
   * Preload critical data for offline use
   */
  async preloadCriticalData(): Promise<void> {
    const criticalKeys = [
      "questions-angular",
      "questions-react",
      "questions-nextjs",
      "questions-redux",
      "user-progress",
      "bookmarks",
    ];

    for (const key of criticalKeys) {
      const cached = this.getCachedData(key);
      if (!cached) {
        // In a real app, you would fetch this data from your API
        // await this.fetchAndCache(key);
      }
    }
  }
}

// Export singleton instance
export const offlineService = new OfflineService();

/**
 * Hook for offline functionality
 */
export function useOffline() {
  return {
    isOffline: () => offlineService.isOffline(),
    cacheData: (key: string, data: unknown, expiryHours?: number) =>
      offlineService.cacheData(key, data, expiryHours),
    getCachedData: (key: string) => offlineService.getCachedData(key),
    addToQueue: (action: string, data: unknown) => offlineService.addToOfflineQueue(action, data),
    getQueueStatus: () => offlineService.getQueueStatus(),
    getCacheStats: () => offlineService.getCacheStats(),
    clearExpiredCache: () => offlineService.clearExpiredCache(),
    preloadCriticalData: () => offlineService.preloadCriticalData(),
  };
}
