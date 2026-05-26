import { describe, expect, it } from "vitest";
import { cartReducer } from "@/context/CartContext";
import { books } from "@/lib/books";

describe("cartReducer", () => {
  const seed = { items: [], identity: {} };

  it("adds a new item and increments existing item quantity", () => {
    const once = cartReducer(seed, { type: "add", payload: { book: books[0] } });
    const twice = cartReducer(once, { type: "add", payload: { book: books[0], quantity: 2 } });

    expect(twice.items).toHaveLength(1);
    expect(twice.items[0].quantity).toBe(3);
  });

  it("updates quantity and removes when quantity goes to zero", () => {
    const withItem = cartReducer(seed, { type: "add", payload: { book: books[1], quantity: 2 } });
    const updated = cartReducer(withItem, {
      type: "updateQty",
      payload: { bookId: books[1].id, quantity: 1 }
    });
    const removed = cartReducer(updated, {
      type: "updateQty",
      payload: { bookId: books[1].id, quantity: 0 }
    });

    expect(updated.items[0].quantity).toBe(1);
    expect(removed.items).toHaveLength(0);
  });

  it("clears items but keeps identity", () => {
    const withState = {
      items: [{ book: books[2], quantity: 1 }],
      identity: { name: "Reader", email: "reader@example.com" }
    };
    const cleared = cartReducer(withState, { type: "clear" });

    expect(cleared.items).toHaveLength(0);
    expect(cleared.identity.email).toBe("reader@example.com");
  });
});
