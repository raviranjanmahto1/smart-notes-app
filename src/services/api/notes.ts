import { Note } from "@/types/note";

// Placeholder for future backend integration
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const notesApi = {
  /**
   * Fetches all notes from the backend.
   * Currently simulates network delay and returns an empty array to be populated by local state.
   */
  async fetchNotes(): Promise<Note[]> {
    await delay(500); // Simulate network latency
    // In the future, this will be: return fetch('/api/notes').then(res => res.json());
    return [];
  },

  /**
   * Creates a new note on the backend.
   * Currently simulates network delay and returns the created note.
   */
  async createNote(title: string, content: string): Promise<Note> {
    await delay(500); // Simulate network latency
    
    const newNote: Note = {
      id: crypto.randomUUID(),
      title,
      content,
      date: new Date().toLocaleDateString(),
    };
    
    // In the future, this will be: 
    // return fetch('/api/notes', { method: 'POST', body: JSON.stringify({ title, content }) }).then(res => res.json());
    
    return newNote;
  }
};
