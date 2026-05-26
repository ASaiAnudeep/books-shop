import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CartProvider } from "@/context/CartContext";
import { CheckoutForm } from "@/components/CheckoutForm";
import { books } from "@/lib/books";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  usePathname: () => "/checkout"
}));

vi.mock("@/analytics/client", () => ({
  initRudder: vi.fn(),
  getRudder: () => ({ page: vi.fn(), track: vi.fn(), identify: vi.fn() })
}));

describe("checkout flow", () => {
  beforeEach(() => {
    push.mockReset();
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        orderId: "ORD-999999",
        total: 44,
        itemCount: 2,
        customerEmail: "reader@example.com",
        createdAt: new Date().toISOString()
      })
    } as Response);

    window.localStorage.setItem(
      "leaf-lantern-cart",
      JSON.stringify({
        items: [{ book: books[0], quantity: 2 }],
        identity: {}
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it("submits checkout and redirects to success", async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <CheckoutForm />
      </CartProvider>
    );

    await user.type(screen.getByPlaceholderText("Full name"), "A Reader");
    await user.type(screen.getByPlaceholderText("Email"), "reader@example.com");
    await user.type(screen.getByPlaceholderText("Shipping address"), "123 Leaf St");

    await user.click(screen.getByRole("button", { name: "Place order" }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/orders",
        expect.objectContaining({ method: "POST" })
      );
      expect(push).toHaveBeenCalledWith(expect.stringContaining("/success?"));
    });
  });
});
