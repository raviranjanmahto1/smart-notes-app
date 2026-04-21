import { useState } from "react";
import { Note } from "@/types/note";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="h-32 w-full animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md"></div>,
});

interface NoteFormProps {
  initialNote?: Note;
  onSubmit: (title: string, content: string, tags?: string[], id?: string) => Promise<void>;
  onCancel: () => void;
}

export function NoteForm({ initialNote, onSubmit, onCancel }: NoteFormProps) {
  const [newTitle, setNewTitle] = useState(initialNote?.title || "");
  const [newContent, setNewContent] = useState(initialNote?.content || "");
  const [newTags, setNewTags] = useState(initialNote?.tags?.join(", ") || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const plainContent = newContent.replace(/<[^>]+>/g, '').trim();
    if (!newTitle.trim() || !plainContent || isSubmitting) return;

    const tagsArray = newTags
      .split(",")
      .map(t => t.trim())
      .filter(t => t.length > 0);

    try {
      setIsSubmitting(true);
      await onSubmit(newTitle, newContent, tagsArray, initialNote?.id);
      if (!initialNote) {
        setNewTitle("");
        setNewContent("");
        setNewTags("");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
        {initialNote ? "Edit Note" : "Create New Note"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Note Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={isSubmitting}
          autoFocus
        />
        <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md mb-2">
          <ReactQuill
            theme="snow"
            value={newContent}
            onChange={setNewContent}
            readOnly={isSubmitting}
            placeholder="Write your note here..."
            className="prose dark:prose-invert max-w-none w-full"
          />
        </div>
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={newTags}
          onChange={(e) => setNewTags(e.target.value)}
          className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={isSubmitting}
        />
        <div className="flex justify-end gap-2 mt-1">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md font-medium transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!newTitle.trim() || !newContent.replace(/<[^>]+>/g, '').trim() || isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-3 py-1.5 text-sm rounded-md font-medium transition-colors"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
