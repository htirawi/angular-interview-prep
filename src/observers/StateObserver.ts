/**
 * Observer Pattern for State Management
 * Provides reactive state updates across components
 */

export interface Observer<T> {
  update(data: T): void;
}

export interface Observable<T> {
  subscribe(observer: Observer<T>): () => void;
  unsubscribe(observer: Observer<T>): void;
  notify(data: T): void;
}

export class Subject<T> implements Observable<T> {
  private observers: Set<Observer<T>> = new Set();

  subscribe(observer: Observer<T>): () => void {
    this.observers.add(observer);
    return () => this.unsubscribe(observer);
  }

  unsubscribe(observer: Observer<T>): void {
    this.observers.delete(observer);
  }

  notify(data: T): void {
    this.observers.forEach((observer) => {
      try {
        observer.update(data);
      } catch (error) {
        console.error("Observer update failed:", error);
      }
    });
  }

  getObserverCount(): number {
    return this.observers.size;
  }
}

// Application State Management
export interface AppState {
  currentFramework: string;
  currentQuestionId: number;
  completedQuestions: Set<number>;
  bookmarkedQuestions: Set<number>;
  searchQuery: string;
  selectedCategory: string;
  selectedDifficulty: string;
  practiceMode: string;
}

export class AppStateManager extends Subject<AppState> {
  private state: AppState = {
    currentFramework: "angular",
    currentQuestionId: 0,
    completedQuestions: new Set(),
    bookmarkedQuestions: new Set(),
    searchQuery: "",
    selectedCategory: "",
    selectedDifficulty: "",
    practiceMode: "sequential",
  };

  getState(): AppState {
    return { ...this.state };
  }

  updateState(updates: Partial<AppState>): void {
    this.state = { ...this.state, ...updates };
    this.notify(this.state);
  }

  setCurrentFramework(framework: string): void {
    this.updateState({ currentFramework: framework });
  }

  setCurrentQuestion(id: number): void {
    this.updateState({ currentQuestionId: id });
  }

  toggleBookmark(questionId: number): void {
    const bookmarkedQuestions = new Set(this.state.bookmarkedQuestions);
    if (bookmarkedQuestions.has(questionId)) {
      bookmarkedQuestions.delete(questionId);
    } else {
      bookmarkedQuestions.add(questionId);
    }
    this.updateState({ bookmarkedQuestions });
  }

  toggleCompleted(questionId: number): void {
    const completedQuestions = new Set(this.state.completedQuestions);
    if (completedQuestions.has(questionId)) {
      completedQuestions.delete(questionId);
    } else {
      completedQuestions.add(questionId);
    }
    this.updateState({ completedQuestions });
  }

  setSearchQuery(query: string): void {
    this.updateState({ searchQuery: query });
  }

  setFilters(category: string, difficulty: string): void {
    this.updateState({ selectedCategory: category, selectedDifficulty: difficulty });
  }

  setPracticeMode(mode: string): void {
    this.updateState({ practiceMode: mode });
  }
}

// Singleton instance
export const appStateManager = new AppStateManager();
