import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useMovieStore } from '@/store/movieStore';
import { Movie } from '@/types';


const STORAGE_KEY = 'sf-movies-data';

function getStoredMovies(): Movie[] | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

function setStoredMovies(movies: Movie[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
}

export function useMovies() {
  const setMovies = useMovieStore((state) => state.setMovies);
  
  const query = useQuery<Movie[], Error>({
    queryKey: ['movies'],
    queryFn: async () => {
      // Check local storage first
      const storedMovies = getStoredMovies();
      if (storedMovies) {
        console.log('Using movies from local storage');
        return storedMovies;
      }

      // If no stored data, fetch from API
      console.log('Fetching movies from API');
      const response = await fetch('/api/movies');
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      
      // Store the fetched data
      setStoredMovies(data.data);
      return data.data;
    },
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });

  useEffect(() => {
    if (query.data) {
      setMovies(query.data);
    }
  }, [query.data, setMovies]);

  return query;
}