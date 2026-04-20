import { useState } from "react";

interface NoteFormProps {
  onSubmit: (title: string, content: string) => Promise<void>;
  onCancel: () => void;
}

export function NoteForm({ onSubmit, onCancel }: NoteFormProps) {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onSubmit(newTitle, newContent);
      setNewTitle("");
      setNewContent("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create New Note</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Note Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={isSubmitting}
          autoFocus
        />
        <textarea
          placeholder="Write your note here..."
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          rows={4}
          disabled={isSubmitting}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:opacity-50"
        />
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md font-medium transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!newTitle.trim() || !newContent.trim() || isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2"
          >
            {isSubmitting ? "Saving..." : "Save Note"}
          </button>
        </div>
      </form>
    </div>
  );
}
