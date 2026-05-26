import Link from "next/link";

export default function SuccessPage({
  searchParams
}: {
  searchParams: { id?: string; total?: string; email?: string };
}) {
  return (
    <section className="rounded-xl border border-fog bg-white p-8 shadow-card">
      <h1 className="font-display text-4xl text-ink">Order confirmed</h1>
      <p className="mt-3 text-ink/80">Thanks for shopping with Leaf & Lantern Books.</p>
      <div className="mt-5 rounded-md bg-parchment p-4 text-sm text-ink/80">
        <p>Order ID: {searchParams.id ?? "-"}</p>
        <p>Total: ${searchParams.total ?? "-"}</p>
        <p>Email: {searchParams.email ?? "-"}</p>
      </div>
      <Link href="/" className="mt-6 inline-block rounded-md bg-ink px-4 py-2 text-sm text-parchment">
        Continue browsing
      </Link>
    </section>
  );
}
