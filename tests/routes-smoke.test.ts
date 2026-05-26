import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";
import BookDetailPage from "@/app/book/[id]/page";
import CartPage from "@/app/cart/page";
import CheckoutPage from "@/app/checkout/page";
import SuccessPage from "@/app/success/page";

describe("route modules", () => {
  it("exports page components", () => {
    expect(typeof HomePage).toBe("function");
    expect(typeof BookDetailPage).toBe("function");
    expect(typeof CartPage).toBe("function");
    expect(typeof CheckoutPage).toBe("function");
    expect(typeof SuccessPage).toBe("function");
  });
});
