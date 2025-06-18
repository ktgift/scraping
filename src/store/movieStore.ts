import { Movie, MovieDetail } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MovieState {
  movies: Movie[];
  movieDetails: Record<string, MovieDetail>;
  setMovies: (movies: Movie[]) => void;
  setMovieDetail: (ref: string, detail: MovieDetail) => void;
  getMovieDetail: (ref: string) => MovieDetail | undefined;
}

export const useMovieStore = create<MovieState>()(
  persist(
    (set, get) => ({
      movies: [],
      movieDetails: {},
      setMovies: (movies) => set({ movies }),
      setMovieDetail: (ref, detail) => 
        set((state) => ({
          movieDetails: { ...state.movieDetails, [ref]: detail }
        })),
      getMovieDetail: (ref) => get().movieDetails[ref],
    }),
    {
      name: 'movie-storage',
    }
  )
); 