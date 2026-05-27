"use client";

import Link from "next/link";
import { BookCover } from "@/components/BookCover";
import { trackCartItemAdded, trackWishlistItemAdded, trackWishlistItemRemoved } from "@/analytics/track";
import { useCart } from "@/context/CartContext";
import { Book } from "@/types";

export const BookCard = ({ book }: { book: Book }) => {
  const { dispatch, toggleWishlist, isWishlisted } = useCart();
  const saved = isWishlisted(book.id);

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

  const handleWishlistToggle = () => {
    toggleWishlist(book.id);
    if (saved) {
      trackWishlistItemRemoved({
        name: "wishlist_item_removed",
        path: window.location.pathname,
        source: "web",
        productId: book.id,
        title: book.title,
        genre: book.genre,
        price: book.price
      });
    } else {
      trackWishlistItemAdded({
        name: "wishlist_item_added",
        path: window.location.pathname,
        source: "web",
        productId: book.id,
        title: book.title,
        genre: book.genre,
        price: book.price
      });
    }
  };

  return (
    <article className="rounded-xl border border-fog bg-white p-4 shadow-card">
      <BookCover token={book.coverToken} title={book.title} />
      <p className="mt-4 text-xs uppercase tracking-widest text-moss">{book.genre}</p>
      <h3 className="mt-1 font-display text-xl text-ink">{book.title}</h3>
      <p className="text-sm text-ink/70">{book.author}</p>
      <p className="mt-3 text-sm text-ink/80">{book.synopsis}</p>
      <div className="mt-5 flex items-center justify-between">
        <p className="text-lg font-semibold text-ink">${book.price}</p>
        <div className="flex gap-2">
          <button
            type="button"
            aria-pressed={saved}
            aria-label={saved ? `Remove ${book.title} from wishlist` : `Save ${book.title} to wishlist`}
            onClick={handleWishlistToggle}
            className="rounded-md border border-fog px-3 py-2 text-sm"
          >
            {saved ? "Saved" : "Save"}
          </button>
          <Link href={`/book/${book.id}`} className="rounded-md border border-fog px-3 py-2 text-sm">
            Details
          </Link>
          <button
            type="button"
            onClick={handleAdd}
            className="rounded-md bg-ink px-3 py-2 text-sm text-parchment"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
};
