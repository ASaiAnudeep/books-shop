import type { Metadata } from "next";
import "@/app/globals.css";
import { Providers } from "@/app/providers";
import { Header } from "@/components/Header";
import { type ReactNode } from "react";

export const metadata: Metadata = {
  title: "Leaf & Lantern Books",
  description: "A modern online bookstore for thoughtful readers."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
