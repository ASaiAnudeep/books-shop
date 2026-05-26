export type Genre =
  | "Fiction"
  | "History"
  | "Science"
  | "Design"
  | "Business"
  | "Poetry";

export type Book = {
  id: string;
  title: string;
  author: string;
  genre: Genre;
  price: number;
  rating: number;
  synopsis: string;
  coverToken: string;
};

export type CartItem = {
  book: Book;
  quantity: number;
};

export type CustomerIdentity = {
  name?: string;
  email?: string;
};

export type CheckoutPayload = {
  name: string;
  email: string;
  address: string;
};

export type OrderConfirmation = {
  orderId: string;
  total: number;
  itemCount: number;
  customerEmail: string;
  createdAt: string;
};
