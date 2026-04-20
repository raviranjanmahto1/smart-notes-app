"use client";

import { useState, useEffect } from "react";
import { Note } from "@/types/note";
import { notesApi } from "@/services/api/notes";
import { NoteForm } from "@/components/NoteForm";
import { NoteCard } from "@/components/NoteCard";
import { EmptyState } from "@/components/EmptyState";
import { ThemeToggle } from "@/components/ThemeToggle";

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

  const handleUpdateNote = async (id: string, title: string, content: string) => {
    const updatedNote = await notesApi.updateNote(id, title, content);
    setNotes((prev) => 
      prev.map((note) => (note.id === id ? updatedNote : note))
    );
  };

  const handleDeleteNote = async (id: string) => {
    await notesApi.deleteNote(id);
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Smart Notes</h1>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button 
              onClick={() => setIsCreating(!isCreating)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-sm rounded-md font-medium transition-colors"
            >
              {isCreating ? "Cancel" : "+ New Note"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {isCreating && (
          <div className="mb-6">
            <NoteForm 
              onSubmit={handleCreateNote} 
              onCancel={() => setIsCreating(false)} 
            />
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
        ) : notes.length === 0 ? (
          <EmptyState onCreateClick={() => setIsCreating(true)} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {notes.map((note) => (
              <NoteCard 
                key={note.id} 
                note={note} 
                onUpdate={handleUpdateNote}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
