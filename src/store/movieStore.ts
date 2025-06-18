import { Movie } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MovieState {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
}

export const useMovieStore = create<MovieState>()(
  persist(
    (set, get) => ({
      movies: [],
      setMovies: (movies) => set({ movies })
    }),
    {
      name: 'movie-storage',
    }
  )
); 