/**
 * Command Pattern for User Actions
 * Provides undo/redo functionality and action logging
 */

export interface Command {
  execute(): Promise<void>;
  undo(): Promise<void>;
  canUndo(): boolean;
  getDescription(): string;
}

export interface CommandHistory {
  execute(command: Command): Promise<void>;
  undo(): Promise<void>;
  redo(): Promise<void>;
  canUndo(): boolean;
  canRedo(): boolean;
  getHistory(): Command[];
  clear(): void;
}

export class CommandHistoryManager implements CommandHistory {
  private history: Command[] = [];
  private currentIndex = -1;
  private maxHistorySize = 50;

  async execute(command: Command): Promise<void> {
    try {
      await command.execute();

      // Remove any commands after current index
      this.history = this.history.slice(0, this.currentIndex + 1);

      // Add new command
      this.history.push(command);
      this.currentIndex++;

      // Limit history size
      if (this.history.length > this.maxHistorySize) {
        this.history.shift();
        this.currentIndex--;
      }
    } catch (error) {
      console.error("Command execution failed:", error);
      throw error;
    }
  }

  async undo(): Promise<void> {
    if (!this.canUndo()) {
      throw new Error("Nothing to undo");
    }

    const command = this.history[this.currentIndex];
    await command.undo();
    this.currentIndex--;
  }

  async redo(): Promise<void> {
    if (!this.canRedo()) {
      throw new Error("Nothing to redo");
    }

    this.currentIndex++;
    const command = this.history[this.currentIndex];
    await command.execute();
  }

  canUndo(): boolean {
    return this.currentIndex >= 0 && this.history[this.currentIndex]?.canUndo() === true;
  }

  canRedo(): boolean {
    return this.currentIndex < this.history.length - 1;
  }

  getHistory(): Command[] {
    return [...this.history];
  }

  clear(): void {
    this.history = [];
    this.currentIndex = -1;
  }
}

// Concrete Commands
export class BookmarkQuestionCommand implements Command {
  constructor(
    private questionId: number,
    private framework: string,
    private bookmarkService: { toggleBookmark: (id: number, framework: string) => Promise<void> },
    private wasBookmarked: boolean
  ) {}

  async execute(): Promise<void> {
    await this.bookmarkService.toggleBookmark(this.questionId, this.framework);
  }

  async undo(): Promise<void> {
    if (this.wasBookmarked) {
      await this.bookmarkService.toggleBookmark(this.questionId, this.framework);
    } else {
      await this.bookmarkService.toggleBookmark(this.questionId, this.framework);
    }
  }

  canUndo(): boolean {
    return true;
  }

  getDescription(): string {
    return `Bookmark question ${this.questionId}`;
  }
}

export class CompleteQuestionCommand implements Command {
  constructor(
    private questionId: number,
    private framework: string,
    private progressService: { markCompleted: (id: number, framework: string) => Promise<void> },
    private wasCompleted: boolean
  ) {}

  async execute(): Promise<void> {
    await this.progressService.markCompleted(this.questionId, this.framework);
  }

  async undo(): Promise<void> {
    if (this.wasCompleted) {
      await this.progressService.markCompleted(this.questionId, this.framework);
    } else {
      await this.progressService.markCompleted(this.questionId, this.framework);
    }
  }

  canUndo(): boolean {
    return true;
  }

  getDescription(): string {
    return `Complete question ${this.questionId}`;
  }
}

// Singleton instance
export const commandHistory = new CommandHistoryManager();
