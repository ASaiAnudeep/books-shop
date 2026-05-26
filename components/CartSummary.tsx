"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export const CartSummary = () => {
  const { state, dispatch, subtotal, itemCount } = useCart();

  if (state.items.length === 0) {
    return (
      <section className="rounded-xl border border-fog bg-white p-8 shadow-card">
        <h1 className="font-display text-3xl text-ink">Your cart is empty</h1>
        <p className="mt-2 text-ink/70">Discover your next read in the storefront.</p>
        <Link href="/" className="mt-4 inline-block rounded-md bg-ink px-4 py-2 text-sm text-parchment">
          Return to shop
        </Link>
      </section>
    );
  }

  return (
    <section className="grid gap-6 md:grid-cols-[1.7fr_1fr]">
      <div className="rounded-xl border border-fog bg-white p-5 shadow-card">
        <h1 className="font-display text-3xl text-ink">Cart</h1>
        <ul className="mt-4 divide-y divide-fog">
          {state.items.map((item) => (
            <li key={item.book.id} className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="font-medium text-ink">{item.book.title}</p>
                <p className="text-sm text-ink/70">{item.book.author}</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(event) =>
                    dispatch({
                      type: "updateQty",
                      payload: { bookId: item.book.id, quantity: Number(event.target.value) }
                    })
                  }
                  className="w-16 rounded-md border border-fog px-2 py-1"
                />
                <p className="w-16 text-right text-sm text-ink">${item.book.price * item.quantity}</p>
                <button
                  type="button"
                  onClick={() => dispatch({ type: "remove", payload: { bookId: item.book.id } })}
                  className="text-sm text-ink/70"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <aside className="rounded-xl border border-fog bg-white p-5 shadow-card">
        <h2 className="font-display text-2xl text-ink">Order summary</h2>
        <p className="mt-4 text-sm text-ink/70">Items: {itemCount}</p>
        <p className="mt-2 text-sm text-ink/70">Subtotal: ${subtotal}</p>
        <Link href="/checkout" className="mt-6 inline-block w-full rounded-md bg-ink px-4 py-3 text-center text-sm text-parchment">
          Continue to checkout
        </Link>
      </aside>
    </section>
  );
};
