"use client";

import { useState, useEffect } from "react";
import { Note } from "@/types/note";
import { notesApi } from "@/services/api/notes";
import { NoteForm } from "@/components/NoteForm";
import { NoteCard } from "@/components/NoteCard";
import { EmptyState } from "@/components/EmptyState";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";
import { Search } from "lucide-react";
import { useRef } from "react";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initial fetch of notes
    notesApi.fetchNotes().then((fetchedNotes) => {
      setNotes(fetchedNotes);
      setIsLoading(false);
    });
  }, []);

  const handleCreateNote = async (title: string, content: string, tags?: string[]) => {
    try {
      const newNote = await notesApi.createNote(title, content, tags);
      setNotes((prev) => [newNote, ...prev]);
      setIsCreating(false);
      toast.success("Note created successfully");
    } catch (_error) {
      toast.error("Failed to create note");
    }
  };

  const handleUpdateNote = async (id: string, title: string, content: string, tags?: string[]) => {
    try {
      const updatedNote = await notesApi.updateNote(id, title, content, tags);
      setNotes((prev) => 
        prev.map((note) => (note.id === id ? updatedNote : note))
      );
      toast.success("Note updated successfully");
    } catch (_error) {
      toast.error("Failed to update note");
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await notesApi.deleteNote(id);
      setNotes((prev) => prev.filter((note) => note.id !== id));
      toast.success("Note deleted successfully");
    } catch (_error) {
      toast.error("Failed to delete note");
    }
  };

  const filteredNotes = notes.filter((note) => {
    const query = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query) ||
      note.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  });

  const toggleMobileSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex justify-between items-center w-full sm:w-auto gap-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight whitespace-nowrap">Smart Notes</h1>
            
            <div className="flex items-center gap-2 sm:hidden">
              <button
                onClick={toggleMobileSearch}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                aria-label="Toggle search"
              >
                <Search className="w-5 h-5" />
              </button>
              <ThemeToggle />
            </div>
          </div>
          
          <div className={`flex-1 max-w-md w-full ${isSearchOpen ? 'block' : 'hidden'} sm:block`}>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search notes or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>

          <div className="hidden sm:flex items-center gap-3 whitespace-nowrap">
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

      {/* Floating Add Note Button for Mobile */}
      <button
        onClick={() => setIsCreating(!isCreating)}
        className="fixed bottom-6 right-6 sm:hidden bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg font-medium transition-colors z-50"
        aria-label="Create New Note"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      </button>

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
        ) : filteredNotes.length === 0 ? (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            No notes found matching &quot;{searchQuery}&quot;
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredNotes.map((note) => (
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
