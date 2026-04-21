import { Note } from "@/types/note";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/notes';

export const notesApi = {
  /**
   * Fetches all notes from the backend database.
   */
  async fetchNotes(): Promise<Note[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch notes');
    }
    return response.json();
  },

  /**
   * Creates a new note in the backend database.
   */
  async createNote(title: string, content: string, tags: string[] = []): Promise<Note> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, tags }),
    });

    if (!response.ok) {
      throw new Error('Failed to create note');
    }

    return response.json();
  },

  /**
   * Updates an existing note in the backend database.
   */
  async updateNote(id: string, title: string, content: string, tags: string[] = []): Promise<Note> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, tags }),
    });

    if (!response.ok) {
      throw new Error('Failed to update note');
    }

    return response.json();
  },

  /**
   * Deletes a note from the backend database.
   */
  async deleteNote(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete note');
    }
  }
};
