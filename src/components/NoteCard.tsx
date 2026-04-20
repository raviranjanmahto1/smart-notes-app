import { Note } from "@/types/note";

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow flex flex-col h-full">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
        {note.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 flex-1 whitespace-pre-wrap break-words line-clamp-4">
        {note.content}
      </p>
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-400 dark:text-gray-500 text-right">
        {note.date}
      </div>
    </div>
  );
}
