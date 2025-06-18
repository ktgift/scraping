import { create } from 'zustand';

interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (total: number) => void;
  setItemsPerPage: (perPage: number) => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 12,
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (total) => set({ totalPages: total }),
  setItemsPerPage: (perPage) => set({ itemsPerPage: perPage }),
})); 