import { useState } from "react";
import { Note } from "@/types/note";
import { Pencil, Trash2 } from "lucide-react";
import { NoteForm } from "./NoteForm";

interface NoteCardProps {
  note: Note;
  onUpdate: (id: string, title: string, content: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function NoteCard({ note, onUpdate, onDelete }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async (title: string, content: string) => {
    await onUpdate(note.id, title, content);
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
        <div className="flex items-center opacity-60 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors"
            title="Edit Note"
            aria-label="Edit Note"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors disabled:opacity-50"
            title="Delete Note"
            aria-label="Delete Note"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 flex-1 whitespace-pre-wrap break-words line-clamp-4 mb-3">
        {note.content}
      </p>
      
      <div className="pt-3 border-t border-gray-100 dark:border-gray-700 text-[11px] text-gray-400 dark:text-gray-500 text-right">
        {note.date}
      </div>
    </div>
  );
}
