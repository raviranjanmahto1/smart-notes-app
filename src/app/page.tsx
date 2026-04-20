"use client";

import { useState, useEffect } from "react";
import { Note } from "@/types/note";
import { notesApi } from "@/services/api/notes";
import { NoteForm } from "@/components/NoteForm";
import { NoteCard } from "@/components/NoteCard";
import { EmptyState } from "@/components/EmptyState";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial fetch of notes
    notesApi.fetchNotes().then((fetchedNotes) => {
      setNotes(fetchedNotes);
      setIsLoading(false);
    });
  }, []);

  const handleCreateNote = async (title: string, content: string) => {
    const newNote = await notesApi.createNote(title, content);
    setNotes((prev) => [newNote, ...prev]);
    setIsCreating(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Smart Notes</h1>
          <button 
            onClick={() => setIsCreating(!isCreating)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            {isCreating ? "Cancel" : "+ New Note"}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {isCreating && (
          <NoteForm 
            onSubmit={handleCreateNote} 
            onCancel={() => setIsCreating(false)} 
          />
        )}

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : notes.length === 0 ? (
          <EmptyState onCreateClick={() => setIsCreating(true)} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
