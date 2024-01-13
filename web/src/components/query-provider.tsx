"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

interface SessionProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export const QueryProvider: React.FC<SessionProviderProps> = ({ children }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
};
