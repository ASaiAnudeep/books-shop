"use client";

import { z } from "zod";
import {
  CartItemAddedEvent,
  CheckoutStartedEvent,
  OrderCompletedEvent,
  PageViewEvent,
  ProductViewedEvent,
  WishlistItemAddedEvent,
  WishlistItemRemovedEvent
} from "@/analytics/events";
import { getRudder, initRudder } from "@/analytics/client";

const baseSchema = z.object({
  path: z.string().min(1),
  source: z.literal("web")
});

const pageViewSchema = baseSchema.extend({
  pageName: z.string().min(1)
});

const productViewedSchema = baseSchema.extend({
  productId: z.string().min(1),
  title: z.string().min(1),
  genre: z.string().min(1),
  price: z.number().positive()
});

const cartItemAddedSchema = baseSchema.extend({
  productId: z.string().min(1),
  title: z.string().min(1),
  quantity: z.number().int().positive(),
  price: z.number().positive()
});

const checkoutStartedSchema = baseSchema.extend({
  itemCount: z.number().int().positive(),
  cartValue: z.number().positive(),
  email: z.string().email().optional()
});

const orderCompletedSchema = baseSchema.extend({
  orderId: z.string().min(1),
  itemCount: z.number().int().positive(),
  total: z.number().positive(),
  email: z.string().email()
});

const wishlistItemAddedSchema = baseSchema.extend({
  productId: z.string().min(1),
  title: z.string().min(1),
  genre: z.string().min(1),
  price: z.number().positive()
});

const wishlistItemRemovedSchema = baseSchema.extend({
  productId: z.string().min(1),
  title: z.string().min(1),
  genre: z.string().min(1),
  price: z.number().positive()
});

const safeTrack = (event: string, payload: Record<string, unknown>) => {
  initRudder();
  const rudder = getRudder();
  rudder?.track(event, payload);
};

export const trackPageView = (payload: PageViewEvent) => {
  pageViewSchema.parse(payload);
  initRudder();
  const rudder = getRudder();
  rudder?.page(payload.pageName, payload);
};

export const trackProductViewed = (payload: ProductViewedEvent) => {
  productViewedSchema.parse(payload);
  safeTrack(payload.name, payload);
};

export const trackCartItemAdded = (payload: CartItemAddedEvent) => {
  cartItemAddedSchema.parse(payload);
  safeTrack(payload.name, payload);
};

export const trackCheckoutStarted = (payload: CheckoutStartedEvent) => {
  checkoutStartedSchema.parse(payload);
  safeTrack(payload.name, payload);

  if (payload.email) {
    const rudder = getRudder();
    rudder?.identify(payload.email, { email: payload.email });
  }
};

export const trackOrderCompleted = (payload: OrderCompletedEvent) => {
  orderCompletedSchema.parse(payload);
  safeTrack(payload.name, payload);
};

export const trackWishlistItemAdded = (payload: WishlistItemAddedEvent) => {
  wishlistItemAddedSchema.parse(payload);
  safeTrack(payload.name, payload);
};

export const trackWishlistItemRemoved = (payload: WishlistItemRemovedEvent) => {
  wishlistItemRemovedSchema.parse(payload);
  safeTrack(payload.name, payload);
};
