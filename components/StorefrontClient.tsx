"use client";

import { useMemo, useState } from "react";
import { BookCard } from "@/components/BookCard";
import { genres, queryBooks } from "@/lib/books";
import { Genre } from "@/types";

export const StorefrontClient = () => {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState<Genre | "All">("All");

  const filtered = useMemo(() => queryBooks(search, genre), [search, genre]);

  return (
    <section>
      <div className="mb-8 rounded-2xl border border-fog bg-gradient-to-r from-white to-parchment p-6 shadow-card">
        <h1 className="font-display text-4xl text-ink">Curated books for quiet evenings.</h1>
        <p className="mt-3 max-w-xl text-ink/75">
          Browse thoughtful titles across fiction, science, design, and history.
        </p>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-[2fr_1fr]">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by title, author, or genre"
          className="w-full rounded-lg border border-fog bg-white px-4 py-3 text-sm"
        />
        <select
          value={genre}
          onChange={(event) => setGenre(event.target.value as Genre | "All")}
          className="w-full rounded-lg border border-fog bg-white px-4 py-3 text-sm"
        >
          <option value="All">All genres</option>
          {genres.map((entry) => (
            <option key={entry} value={entry}>
              {entry}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {filtered.length === 0 ? <p className="mt-8 text-sm text-ink/70">No books found for this search.</p> : null}
    </section>
  );
};
