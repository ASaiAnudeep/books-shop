"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { trackCheckoutStarted, trackOrderCompleted } from "@/analytics/track";
import { useCart } from "@/context/CartContext";
import { OrderConfirmation } from "@/types";

export const CheckoutForm = () => {
  const { state, dispatch, subtotal, itemCount } = useCart();
  const router = useRouter();
  const [name, setName] = useState(state.identity.name ?? "");
  const [email, setEmail] = useState(state.identity.email ?? "");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!name || !email || !address || itemCount === 0) {
      setError("Please complete checkout details and cart items.");
      return;
    }

    setLoading(true);
    setError("");

    dispatch({ type: "setIdentity", payload: { name, email } });

    trackCheckoutStarted({
      name: "checkout_started",
      path: window.location.pathname,
      source: "web",
      itemCount,
      cartValue: subtotal,
      email
    });

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, address, items: state.items, total: subtotal })
    });

    if (!response.ok) {
      setLoading(false);
      setError("Unable to place order. Please try again.");
      return;
    }

    const order = (await response.json()) as OrderConfirmation;

    trackOrderCompleted({
      name: "order_completed",
      path: "/success",
      source: "web",
      orderId: order.orderId,
      itemCount: order.itemCount,
      total: order.total,
      email: order.customerEmail
    });

    dispatch({ type: "clear" });
    const params = new URLSearchParams({
      id: order.orderId,
      total: String(order.total),
      email: order.customerEmail
    });
    router.push(`/success?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-fog bg-white p-6 shadow-card">
      <h1 className="font-display text-3xl text-ink">Checkout</h1>
      <p className="mt-2 text-sm text-ink/70">Complete your order with delivery details.</p>

      <div className="mt-6 grid gap-4">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Full name"
          className="rounded-md border border-fog px-3 py-3"
        />
        <input
          value={email}
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          className="rounded-md border border-fog px-3 py-3"
        />
        <textarea
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          placeholder="Shipping address"
          rows={4}
          className="rounded-md border border-fog px-3 py-3"
        />
      </div>

      <div className="mt-4 rounded-md bg-parchment p-4 text-sm text-ink/80">
        Items: {itemCount} | Total: ${subtotal}
      </div>

      {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 rounded-md bg-ink px-4 py-3 text-sm text-parchment disabled:opacity-70"
      >
        {loading ? "Placing order..." : "Place order"}
      </button>
    </form>
  );
};
