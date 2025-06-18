'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeRegistry from './ThemeRegistry';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeRegistry>
        {children}
      </ThemeRegistry>
    </QueryClientProvider>
  );
} 