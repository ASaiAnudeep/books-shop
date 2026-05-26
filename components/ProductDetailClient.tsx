"use client";

import { trackCartItemAdded, trackProductViewed } from "@/analytics/track";
import { BookCover } from "@/components/BookCover";
import { useCart } from "@/context/CartContext";
import { Book } from "@/types";
import { useEffect } from "react";

export const ProductDetailClient = ({ book }: { book: Book }) => {
  const { dispatch } = useCart();

  useEffect(() => {
    trackProductViewed({
      name: "product_viewed",
      path: window.location.pathname,
      source: "web",
      productId: book.id,
      title: book.title,
      genre: book.genre,
      price: book.price
    });
  }, [book]);

  const handleAdd = () => {
    dispatch({ type: "add", payload: { book } });
    trackCartItemAdded({
      name: "cart_item_added",
      path: window.location.pathname,
      source: "web",
      productId: book.id,
      title: book.title,
      quantity: 1,
      price: book.price
    });
  };

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1.1fr]">
      <BookCover token={book.coverToken} title={book.title} />
      <div>
        <p className="text-xs uppercase tracking-widest text-moss">{book.genre}</p>
        <h1 className="mt-2 font-display text-4xl text-ink">{book.title}</h1>
        <p className="mt-2 text-ink/80">{book.author}</p>
        <p className="mt-5 leading-relaxed text-ink/85">{book.synopsis}</p>
        <p className="mt-6 text-2xl font-semibold text-ink">${book.price}</p>
        <button
          type="button"
          onClick={handleAdd}
          className="mt-6 rounded-md bg-ink px-6 py-3 text-sm text-parchment"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};
