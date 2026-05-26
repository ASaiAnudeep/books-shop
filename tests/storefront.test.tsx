import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { StorefrontClient } from "@/components/StorefrontClient";

vi.mock("@/analytics/client", () => ({
  initRudder: vi.fn(),
  getRudder: () => ({ page: vi.fn(), track: vi.fn(), identify: vi.fn() })
}));

describe("storefront interactions", () => {
  afterEach(() => {
    cleanup();
  });

  it("filters by search and genre", async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <StorefrontClient />
      </CartProvider>
    );

    await user.type(screen.getByPlaceholderText(/search by title/i), "mapmaker");
    expect(screen.getAllByText("The Last Mapmaker").length).toBeGreaterThan(0);
    expect(screen.queryByText("Midnight Conservatory")).not.toBeInTheDocument();

    await user.clear(screen.getByPlaceholderText(/search by title/i));
    await user.selectOptions(screen.getByRole("combobox"), "Poetry");
    expect(screen.getAllByText("Salt & Cedar").length).toBeGreaterThan(0);
    expect(screen.queryByText("The Last Mapmaker")).not.toBeInTheDocument();
  });

  it("adds to cart from storefront", async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <Header />
        <StorefrontClient />
      </CartProvider>
    );

    await user.click(screen.getAllByRole("button", { name: "Add" })[0]);

    expect(screen.getByRole("link", { name: /cart \(1\)/i })).toBeInTheDocument();
  });
});
