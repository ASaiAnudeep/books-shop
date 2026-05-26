"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export const Header = () => {
  const { itemCount } = useCart();

  return (
    <header className="border-b border-fog/80 bg-parchment/70">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-display text-2xl text-ink">
          Leaf & Lantern Books
        </Link>
        <nav className="flex items-center gap-6 text-sm text-ink/80">
          <Link href="/">Shop</Link>
          <Link href="/cart">Cart ({itemCount})</Link>
        </nav>
      </div>
    </header>
  );
};
