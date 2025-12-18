import documents from "@/data/document.json"
import Link from "next/link"

export default function DocumentsPage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Documents</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <Link
            key={doc.id}
            href={`/documents/${doc.id}`}
            className="block border p-2 hover:bg-gray-50"
          >
            {/* IMAGE PREVIEW */}
            {doc.display === "EMBED" && (
              <img
                src={doc.url}
                alt={doc.title}
                className="w-full h-40 object-cover"
              />
            )}

            {/* TITLE */}
            <h2 className="mt-2 font-semibold text-sm">
              {doc.title}
            </h2>

            {/* DESCRIPTION (short) */}
            <p className="text-xs text-gray-600">
              {doc.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  )
}
