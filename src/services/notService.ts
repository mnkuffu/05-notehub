import axios from 'axios';
import type { Note } from '../types/note';

export const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GOIT_TOKEN}`,
  },
});

export  interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = ''
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>('/notes',{
    params: {
      page,
      perPage,
      search,
    },
  });
  return response.data;
};

export const createNote = async (
  newNote: Omit<Note,
  'id' | 'createdAt' | 'updatedAt'>
): Promise<Note> => {
  const response = await api.post<Note>('/notes', newNote);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${noteId}`);
  return response.data;
};