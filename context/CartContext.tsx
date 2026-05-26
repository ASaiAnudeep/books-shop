"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, type Dispatch, type ReactNode } from "react";
import { Book, CartItem, CustomerIdentity } from "@/types";

type CartState = {
  items: CartItem[];
  identity: CustomerIdentity;
};

type CartAction =
  | { type: "add"; payload: { book: Book; quantity?: number } }
  | { type: "remove"; payload: { bookId: string } }
  | { type: "updateQty"; payload: { bookId: string; quantity: number } }
  | { type: "setIdentity"; payload: CustomerIdentity }
  | { type: "clear" };

const initialState: CartState = {
  items: [],
  identity: {}
};

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "add": {
      const qty = action.payload.quantity ?? 1;
      const found = state.items.find((item) => item.book.id === action.payload.book.id);

      if (found) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.book.id === action.payload.book.id
              ? { ...item, quantity: item.quantity + qty }
              : item
          )
        };
      }

      return {
        ...state,
        items: [...state.items, { book: action.payload.book, quantity: qty }]
      };
    }
    case "remove":
      return { ...state, items: state.items.filter((item) => item.book.id !== action.payload.bookId) };
    case "updateQty":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.book.id === action.payload.bookId ? { ...item, quantity: action.payload.quantity } : item
          )
          .filter((item) => item.quantity > 0)
      };
    case "setIdentity":
      return { ...state, identity: { ...state.identity, ...action.payload } };
    case "clear":
      return { ...state, items: [] };
    default:
      return state;
  }
};

type CartContextValue = {
  state: CartState;
  dispatch: Dispatch<CartAction>;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const storageKey = "leaf-lantern-cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState,
    (seed): CartState => {
      if (typeof window === "undefined") {
        return seed;
      }

      const raw = window.localStorage.getItem(storageKey);
      if (!raw) {
        return seed;
      }

      try {
        return JSON.parse(raw) as CartState;
      } catch {
        return seed;
      }
    }
  );

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  const value = useMemo(() => {
    const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = state.items.reduce((sum, item) => sum + item.quantity * item.book.price, 0);

    return { state, dispatch, itemCount, subtotal };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};
