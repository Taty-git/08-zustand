import axios from 'axios';
import type { Note } from '../types/note';
import {NewNote} from '../types/note';

interface NotesHttpResponse {
    notes: Note[];
    totalPages: number;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";


export const fetchNotes = async(query: string, page: number, tag?: string): Promise<NotesHttpResponse> => {
    const param = new URLSearchParams({
        ...(query !== "" ? { search: query } : {}),
        ...(tag !== "" ? { tag } : {}),
        page: page.toString(),
    });
    const response = await axios.get<NotesHttpResponse>(`/notes?${param}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        },
    });
    
    return response.data;
};
export const fetchNoteById = async (id: number): Promise<Note> => {
    const response = await axios.get<Note>(`/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    });
    return response.data;
};
  
export const createNote = async(newNote: NewNote): Promise<Note> => {
    const response = await axios.post<Note>("/notes", newNote, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
            },
        }
    );
    return response.data;
};
export const deleteNote = async (id: number): Promise<Note> => {
    const response = await axios.delete<Note>(
        `/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        },
    }
    );
    return response.data;
};