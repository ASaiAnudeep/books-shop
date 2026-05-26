import { Book, Genre } from "@/types";

export const books: Book[] = [
  {
    id: "b001",
    title: "The Last Mapmaker",
    author: "Nora Bellamy",
    genre: "Fiction",
    price: 22,
    rating: 4.7,
    synopsis: "A cartographer rebuilds her life while tracing missing coastlines.",
    coverToken: "dawn"
  },
  {
    id: "b002",
    title: "Salt & Cedar",
    author: "Ibrahim Kline",
    genre: "Poetry",
    price: 17,
    rating: 4.4,
    synopsis: "A contemporary poetry collection shaped by shoreline towns.",
    coverToken: "coast"
  },
  {
    id: "b003",
    title: "Borrowed Latitude",
    author: "Mina Ortiz",
    genre: "History",
    price: 28,
    rating: 4.8,
    synopsis: "A vivid account of women who charted trade routes in secret.",
    coverToken: "atlas"
  },
  {
    id: "b004",
    title: "Quiet Signals",
    author: "Theo Wren",
    genre: "Science",
    price: 25,
    rating: 4.6,
    synopsis: "An approachable guide to how radio transformed modern science.",
    coverToken: "signal"
  },
  {
    id: "b005",
    title: "Rooms for Ideas",
    author: "Alina Mercer",
    genre: "Design",
    price: 31,
    rating: 4.5,
    synopsis: "A practical design book on creating spaces that support focus.",
    coverToken: "studio"
  },
  {
    id: "b006",
    title: "Ledger of Light",
    author: "Haruto Ames",
    genre: "Business",
    price: 29,
    rating: 4.3,
    synopsis: "Narrative lessons about ethical growth from founder memoirs.",
    coverToken: "ledger"
  },
  {
    id: "b007",
    title: "Midnight Conservatory",
    author: "Elise Rowan",
    genre: "Fiction",
    price: 24,
    rating: 4.9,
    synopsis: "A city violinist uncovers hidden letters in a closed conservatory.",
    coverToken: "midnight"
  },
  {
    id: "b008",
    title: "Field Notes on Time",
    author: "Dr. Samir Holt",
    genre: "Science",
    price: 26,
    rating: 4.2,
    synopsis: "A lucid primer on relativity written for curious general readers.",
    coverToken: "time"
  },
  {
    id: "b009",
    title: "The Fifth Courtyard",
    author: "Ari Menon",
    genre: "History",
    price: 27,
    rating: 4.1,
    synopsis: "A social history of marketplaces that shaped port cities.",
    coverToken: "courtyard"
  },
  {
    id: "b010",
    title: "Paper Lantern Economics",
    author: "June Okafor",
    genre: "Business",
    price: 23,
    rating: 4.0,
    synopsis: "How small shops scale sustainably without losing their identity.",
    coverToken: "lantern"
  },
  {
    id: "b011",
    title: "A Grammar of Color",
    author: "Lucia Fan",
    genre: "Design",
    price: 30,
    rating: 4.7,
    synopsis: "A color systems handbook for digital and editorial creators.",
    coverToken: "color"
  },
  {
    id: "b012",
    title: "Ink Between Seasons",
    author: "R. A. Bennett",
    genre: "Poetry",
    price: 19,
    rating: 4.6,
    synopsis: "Poems on migration, memory, and inherited family rituals.",
    coverToken: "ink"
  }
];

export const genres: Genre[] = ["Fiction", "History", "Science", "Design", "Business", "Poetry"];

export const getBookById = (id: string) => books.find((book) => book.id === id);

export const queryBooks = (search: string, genre: Genre | "All") => {
  const term = search.trim().toLowerCase();

  return books.filter((book) => {
    const matchesGenre = genre === "All" || book.genre === genre;
    const matchesTerm =
      term.length === 0 ||
      [book.title, book.author, book.genre].some((value) => value.toLowerCase().includes(term));

    return matchesGenre && matchesTerm;
  });
};
