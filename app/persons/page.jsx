import persons from "@/data/persons.json"
import Link from "next/link"

export default function personsPage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Persons</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {persons.map((doc) => (
          <Link
            key={doc.id}
            href={`/persons/${doc.id}`}
            className="block border p-2 hover:bg-gray-50"
          >
            {/* NO IMAGE PREVIEW */}
            {/* TITLE */}
            <h2 className="mt-2 font-semibold text-sm">
              {doc.name}
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
