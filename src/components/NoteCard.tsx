import { useState } from "react";
import { Note } from "@/types/note";
import { Pencil, Trash2 } from "lucide-react";
import { NoteForm } from "./NoteForm";
import "react-quill-new/dist/quill.snow.css";

interface NoteCardProps {
  note: Note;
  onUpdate: (id: string, title: string, content: string, tags?: string[]) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function NoteCard({ note, onUpdate, onDelete }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async (title: string, content: string, tags?: string[]) => {
    await onUpdate(note.id, title, content, tags);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(note.id);
    setIsDeleting(false);
  };

  if (isEditing) {
    return (
      <NoteForm
        initialNote={note}
        onSubmit={handleUpdate}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="group bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow flex flex-col h-full relative">
      <div className="flex justify-between items-start mb-2 gap-2">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-1 flex-1">
          {note.title}
        </h3>
        <div className="flex items-center opacity-80 group-hover:opacity-100 transition-opacity gap-1.5">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 border border-gray-200 dark:border-gray-600 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-200 dark:hover:border-blue-800 rounded-md transition-colors"
            title="Edit Note"
            aria-label="Edit Note"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-1.5 border border-gray-200 dark:border-gray-600 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 hover:border-red-200 dark:hover:border-red-800 rounded-md transition-colors disabled:opacity-50"
            title="Delete Note"
            aria-label="Delete Note"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      
      <div 
        className="text-sm text-gray-600 dark:text-gray-300 flex-1 break-words line-clamp-4 mb-3 prose prose-sm dark:prose-invert max-w-none ql-editor"
        style={{ padding: 0 }}
        dangerouslySetInnerHTML={{ __html: note.content }}
      />
      
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {note.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-medium rounded-md">
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-end items-center text-[11px] text-gray-400 dark:text-gray-500">
        <span>{note.date}</span>
      </div>
    </div>
  );
}
