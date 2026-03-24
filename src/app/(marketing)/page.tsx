import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6">
      <Link
        href="/calculator"
        className="bg-primary text-white px-4 py-2 rounded-md"
      >
        Open Xp Calculator
      </Link>
    </main>
  );
}
