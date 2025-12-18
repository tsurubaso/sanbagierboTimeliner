import events from "@/data/events.json"
import Link from "next/link"

export default function eventsPage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Events</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {events.map((doc) => (
          <Link
            key={doc.id}
            href={`/events/${doc.id}`}
            className="block border p-2 hover:bg-gray-50"
          >
            {/* NO IMAGE PREVIEW */}
            {/* TITLE */}
            <h2 className="mt-2 font-semibold text-sm">
              {doc.title}
            </h2>

            {/* DESCRIPTION (short) */}
            <p className="text-xs text-gray-600">
              {doc.summary}
            </p>
          </Link>
        ))}
      </div>
    </main>
  )
}
