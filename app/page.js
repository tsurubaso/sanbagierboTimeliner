import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Historical & Fictional Timeline</h1>

      <p>Explore intertwined lives, events, and documents through time.</p>

      <nav className="space-y-2">
        <ul className="list-disc list-inside">
          <li>
            <a href="/timeline" className="underline">
              Global Timeline
            </a>
          </li>
          <li>
            <Link href="/persons" className="underline">
              Example Persons
            </Link>
          </li>
          <li>
            <Link href="/events" className="underline">
              Example Events
            </Link>
          </li>
          <li>
            <Link href="/documents" className="underline">
              Documents Gallery
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
