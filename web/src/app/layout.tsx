import "./globals.css";
import clsx from "clsx";
import { Metadata } from "next";
import { Inter } from "next/font/google";

import { Header } from "../module";

import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SCSET Cabinet Portal",
  description:
    "School of Computer Science Engineering & Technology Cabinet Portal",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={clsx("dark", inter.className)}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
