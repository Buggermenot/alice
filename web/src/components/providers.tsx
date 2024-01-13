"use client";

import { HydrationProvider } from "react-hydration-provider";

import { QueryProvider } from "@/components";
import { Toaster } from "@/components/ui/toast";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <HydrationProvider>
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </HydrationProvider>
    </>
  );
};
