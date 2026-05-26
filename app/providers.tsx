"use client";

import { CartProvider } from "@/context/CartContext";
import { PageTracker } from "@/components/PageTracker";
import { type ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <CartProvider>
      <PageTracker />
      {children}
    </CartProvider>
  );
};
