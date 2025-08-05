import { notFound } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaDownload } from "react-icons/fa";

type PageProps = {
  params: {
    bookCategory: string;
  };
};

const categoryBooks: Record<string, { title: string; file: string }[]> = {
  story: [
    { title: "The Clever Fox", file: "/books/story/The Clever Fox.pdf" },
    {
      title: "The Lion and the Mouse",
      file: "/books/story/The Lion and the Mouse.pdf",
    },
    {
      title: "The Honest Woodcutter",
      file: "/books/story/The Honest Woodcutter.pdf",
    },
    {
      title: "The Ant and the Dove",
      file: "/books/story/The Ant and the Dove.pdf",
    },
    { title: "The Thirsty Crow", file: "/books/story/The Thirsty Crow.pdf" },
    {
      title: "The Boy Who Cried Wolf",
      file: "/books/story/The Boy Who Cried Wolf.pdf",
    },
    { title: "The Golden Egg", file: "/books/story/The Golden Egg.pdf" },
    {
      title: "The Hare and the Tortoise",
      file: "/books/story/The Hare and the Tortoise.pdf",
    },
  ],
  learn: [
    { title: "Alphabet Fun", file: "/books/learn/Alphabet Fun.pdf" },
    { title: "Basic English", file: "/books/learn/Basic English.pdf" },
    { title: "Phonics Practice", file: "/books/learn/Phonics Practice.pdf" },
    {
      title: "Sight Words Level 1",
      file: "/books/learn/Sight Words Level 1.pdf",
    },
    {
      title: "Building Sentences",
      file: "/books/learn/Building Sentences.pdf",
    },
    {
      title: "Everyday Vocabulary",
      file: "/books/learn/Everyday Vocabulary.pdf",
    },
    {
      title: "My First 100 Words",
      file: "/books/learn/My First 100 Words.pdf",
    },
  ],
  coloring: [
    { title: "Fruits Coloring", file: "/books/coloring/Fruits Coloring.pdf" },
    { title: "Animals Coloring", file: "/books/coloring/Animals Coloring.pdf" },
    {
      title: "Color Everyday Objects",
      file: "/books/coloring/Color Everyday Objects.pdf",
    },
    {
      title: "Transport Coloring Book",
      file: "/books/coloring/Transport Coloring Book.pdf",
    },
    { title: "Underwater World", file: "/books/coloring/Underwater World.pdf" },
    {
      title: "Color the Alphabets",
      file: "/books/coloring/Color the Alphabets.pdf",
    },
  ],
  grammar: [
    { title: "Practice Nouns", file: "/books/grammar/Practice Nouns.pdf" },
    { title: "Basic Verbs", file: "/books/grammar/Basic Verbs.pdf" },
    { title: "Simple Tenses", file: "/books/grammar/Simple Tenses.pdf" },
    {
      title: "Grammar Worksheets",
      file: "/books/grammar/Grammar Worksheets.pdf",
    },
    {
      title: "Adjectives for Kids",
      file: "/books/grammar/Adjectives for Kids.pdf",
    },
    {
      title: "Singular and Plural",
      file: "/books/grammar/Singular and Plural.pdf",
    },
  ],
  fun: [
    { title: "Matching Game Book", file: "/books/fun/Matching Game Book.pdf" },
    { title: "Maze Fun", file: "/books/fun/Maze Fun.pdf" },
    { title: "Connect the Dots", file: "/books/fun/Connect the Dots.pdf" },
    { title: "Count and Match", file: "/books/fun/Count and Match.pdf" },
    { title: "Shapes and Colors", file: "/books/fun/Shapes and Colors.pdf" },
    {
      title: "Find the Differences",
      file: "/books/fun/Find the Differences.pdf",
    },
  ],
};

// ✅ PAGE FUNCTION
export default function CategoryPage({ params }: PageProps) {
  const { bookCategory } = params;
  const books = categoryBooks[bookCategory];

  if (!books) return notFound();

  return (
    <main className="p-6 max-w-5xl mx-auto text-gray-800">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-[#66AF85] font-medium hover:underline text-sm"
        >
          <FaArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-[#66AF85] capitalize">
        {bookCategory} Books
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {books.map((book) => (
          <div
            key={book.title}
            className="border rounded-lg p-5 shadow hover:shadow-lg transition bg-white"
          >
            <h3 className="text-lg font-semibold mb-3 text-[#333]">
              {book.title}
            </h3>
            <a
              href={book.file}
              download
              className="inline-flex items-center text-white bg-[#66AF85] hover:bg-[#599f75] px-4 py-2 rounded text-sm font-medium transition"
            >
              <FaDownload className="mr-2" />
              Download PDF
            </a>
          </div>
        ))}
      </section>
    </main>
  );
}

// ✅ STATIC PARAM GENERATOR (important for dynamic routes)
export async function generateStaticParams() {
  return [
    { bookCategory: "story" },
    { bookCategory: "learn" },
    { bookCategory: "coloring" },
    { bookCategory: "grammar" },
    { bookCategory: "fun" },
  ];
}
// ✅ METADATA (for SEO)
// ✅ METADATA (for SEO)
export async function generateMetadata({
  params,
}: {
  params: { bookCategory: string };
}) {
  const { bookCategory } = params;
  return {
    title: `\${
      bookCategory.charAt(0).toUpperCase() + bookCategory.slice(1)
    } Books`,
    description: `Explore our collection of \${bookCategory} books for kids. Download engaging and educational PDFs to enhance learning.`,
  };
}
