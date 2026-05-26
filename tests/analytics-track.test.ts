import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  page: vi.fn(),
  track: vi.fn(),
  identify: vi.fn(),
  initRudder: vi.fn()
}));

vi.mock("@/analytics/client", () => ({
  initRudder: mocks.initRudder,
  getRudder: () => ({ page: mocks.page, track: mocks.track, identify: mocks.identify })
}));

import {
  trackCartItemAdded,
  trackCheckoutStarted,
  trackOrderCompleted,
  trackPageView,
  trackProductViewed
} from "@/analytics/track";

describe("analytics track helpers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("tracks all supported events with validated payloads", () => {
    trackPageView({ name: "page_view", path: "/", source: "web", pageName: "Storefront" });
    trackProductViewed({
      name: "product_viewed",
      path: "/book/b001",
      source: "web",
      productId: "b001",
      title: "Book",
      genre: "Fiction",
      price: 22
    });
    trackCartItemAdded({
      name: "cart_item_added",
      path: "/",
      source: "web",
      productId: "b001",
      title: "Book",
      quantity: 1,
      price: 22
    });
    trackCheckoutStarted({
      name: "checkout_started",
      path: "/checkout",
      source: "web",
      itemCount: 1,
      cartValue: 22,
      email: "reader@example.com"
    });
    trackOrderCompleted({
      name: "order_completed",
      path: "/success",
      source: "web",
      orderId: "ORD-1",
      itemCount: 1,
      total: 22,
      email: "reader@example.com"
    });

    expect(mocks.initRudder).toHaveBeenCalled();
    expect(mocks.page).toHaveBeenCalledTimes(1);
    expect(mocks.track).toHaveBeenCalledTimes(4);
    expect(mocks.identify).toHaveBeenCalledWith("reader@example.com", { email: "reader@example.com" });
  });

  it("throws when required fields are invalid", () => {
    expect(() =>
      trackOrderCompleted({
        name: "order_completed",
        path: "/success",
        source: "web",
        orderId: "",
        itemCount: 1,
        total: 22,
        email: "reader@example.com"
      })
    ).toThrow();
  });
});
