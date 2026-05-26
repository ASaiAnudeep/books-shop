import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { getBookById } from "@/lib/books";

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const book = getBookById(params.id);

  if (!book) {
    notFound();
  }

  return (
    <section>
      <Link href="/" className="mb-5 inline-block text-sm text-ink/70">
        Back to shop
      </Link>
      <ProductDetailClient book={book} />
    </section>
  );
}
