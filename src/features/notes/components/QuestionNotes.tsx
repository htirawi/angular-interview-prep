import { useState } from "react";
import type { QuestionNotesProps } from "../../../types";

export default function QuestionNotes({
  questionId,
  initialNote = "",
  onSave,
}: QuestionNotesProps) {
  const [note, setNote] = useState(initialNote);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    onSave(questionId, note);
    setIsEditing(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Your Notes
        </h3>
        {isSaved && (
          <span className="animate-fade-in text-xs font-medium text-green-600 dark:text-green-400">
            ✓ Saved
          </span>
        )}
      </div>

      {isEditing ? (
        <div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add your notes, insights, or reminders for this question..."
            className="mb-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            rows={4}
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Save Note
            </button>
            <button
              onClick={() => {
                setNote(initialNote);
                setIsEditing(false);
              }}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          {note ? (
            <p className="mb-2 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
              {note}
            </p>
          ) : (
            <p className="mb-2 text-sm italic text-gray-500 dark:text-gray-500">
              No notes yet. Click "Add Note" to write your thoughts...
            </p>
          )}
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {note ? "Edit Note" : "Add Note"}
          </button>
        </div>
      )}
    </div>
  );
}
