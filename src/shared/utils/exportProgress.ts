type ProgressData = {
  completed: number[];
  bookmarks: number[];
  notes: Record<number, string>;
  timestamp: string;
  version: string;
};

export function exportProgress(
  completed: Set<number>,
  bookmarks: Set<number>,
  notes: Record<number, string>
): void {
  const data: ProgressData = {
    completed: Array.from(completed),
    bookmarks: Array.from(bookmarks),
    notes,
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `angular-interview-progress-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function importProgress(file: File): Promise<ProgressData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as ProgressData;

        // Validate structure
        if (!Array.isArray(data.completed) || !Array.isArray(data.bookmarks)) {
          throw new Error("Invalid progress file format");
        }

        resolve(data);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}
