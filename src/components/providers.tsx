'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: { staleTime: 1000 * 60, retry: 1 },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1E293B',
            color: '#E2E8F0',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            fontFamily: 'DM Sans, sans-serif',
          },
          success: { iconTheme: { primary: '#10B981', secondary: '#1E293B' } },
          error: { iconTheme: { primary: '#EF4444', secondary: '#1E293B' } },
        }}
      />
    </QueryClientProvider>
  );
}
