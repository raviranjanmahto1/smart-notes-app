import { Note } from "@/types/note";

// Placeholder for future backend integration
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const notesApi = {
  /**
   * Fetches all notes from the backend.
   */
  async fetchNotes(): Promise<Note[]> {
    await delay(300); 
    return [];
  },

  /**
   * Creates a new note on the backend.
   */
  async createNote(title: string, content: string): Promise<Note> {
    await delay(300); 
    
    const newNote: Note = {
      id: crypto.randomUUID(),
      title,
      content,
      date: new Date().toLocaleDateString(),
    };
    
    return newNote;
  },

  /**
   * Updates an existing note on the backend.
   */
  async updateNote(id: string, title: string, content: string): Promise<Note> {
    await delay(300);
    
    return {
      id,
      title,
      content,
      date: new Date().toLocaleDateString(), // update date
    };
  },

  /**
   * Deletes a note from the backend.
   */
  async deleteNote(_id: string): Promise<void> {
    await delay(300);
  }
};
