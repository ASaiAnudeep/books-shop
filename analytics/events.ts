export type BaseContext = {
  path: string;
  source: "web";
};

export type PageViewEvent = BaseContext & {
  name: "page_view";
  pageName: string;
};

export type ProductViewedEvent = BaseContext & {
  name: "product_viewed";
  productId: string;
  title: string;
  genre: string;
  price: number;
};

export type CartItemAddedEvent = BaseContext & {
  name: "cart_item_added";
  productId: string;
  title: string;
  quantity: number;
  price: number;
};

export type CheckoutStartedEvent = BaseContext & {
  name: "checkout_started";
  itemCount: number;
  cartValue: number;
  email?: string;
};

export type OrderCompletedEvent = BaseContext & {
  name: "order_completed";
  orderId: string;
  itemCount: number;
  total: number;
  email: string;
};

export type WishlistItemAddedEvent = BaseContext & {
  name: "wishlist_item_added";
  productId: string;
  title: string;
  genre: string;
  price: number;
};

export type WishlistItemRemovedEvent = BaseContext & {
  name: "wishlist_item_removed";
  productId: string;
  title: string;
  genre: string;
  price: number;
};

export type TrackEvent =
  | PageViewEvent
  | ProductViewedEvent
  | CartItemAddedEvent
  | CheckoutStartedEvent
  | OrderCompletedEvent
  | WishlistItemAddedEvent
  | WishlistItemRemovedEvent;
