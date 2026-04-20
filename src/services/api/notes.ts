import { Note } from "@/types/note";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const STORAGE_KEY = "smart-notes-app-data";

// Helper to safely access localStorage (avoid SSR issues)
const getStoredNotes = (): Note[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveNotes = (notes: Note[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }
};

export const notesApi = {
  /**
   * Fetches all notes from local storage.
   */
  async fetchNotes(): Promise<Note[]> {
    await delay(50); 
    return getStoredNotes();
  },

  /**
   * Creates a new note and saves to local storage.
   */
  async createNote(title: string, content: string, tags: string[] = []): Promise<Note> {
    await delay(50); 
    
    const newNote: Note = {
      id: crypto.randomUUID(),
      title,
      content,
      tags,
      date: new Date().toLocaleDateString(),
    };
    
    const notes = getStoredNotes();
    saveNotes([newNote, ...notes]);
    
    return newNote;
  },

  /**
   * Updates an existing note in local storage.
   */
  async updateNote(id: string, title: string, content: string, tags: string[] = []): Promise<Note> {
    await delay(50);
    
    const notes = getStoredNotes();
    const existingIndex = notes.findIndex(n => n.id === id);
    
    let updatedNote: Note;
    if (existingIndex !== -1) {
      updatedNote = {
        ...notes[existingIndex],
        title,
        content,
        tags,
        date: new Date().toLocaleDateString(),
      };
      notes[existingIndex] = updatedNote;
      saveNotes(notes);
    } else {
      throw new Error("Note not found");
    }
    
    return updatedNote;
  },

  /**
   * Deletes a note from local storage.
   */
  async deleteNote(id: string): Promise<void> {
    await delay(50);
    const notes = getStoredNotes();
    saveNotes(notes.filter(n => n.id !== id));
  }
};
