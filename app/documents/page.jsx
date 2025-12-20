import Link from "next/link";

async function getDocuments() {
  const res = await fetch("http://localhost:3000/api/documents", {
    cache: "no-store",
  });

  return res.json();
}

export default async function DocumentsPage() {
  const documents = await getDocuments();

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Documents</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <Link
            key={doc.id}
            href={`/documents/${doc.id}`}
            className="block border p-2 hover:bg-gray-50 rounded"
          >
            {/* PREVIEW */}
            {doc.display === "EMBED" && doc.url && (
              <div className="w-full h-40 bg-gray-100 overflow-hidden rounded">
                <iframe
                  src={doc.url}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            )}

            {/* TITLE */}
            <h2 className="mt-2 font-semibold text-sm">
              {doc.title}
            </h2>

            {/* DESCRIPTION */}
            {doc.description && (
              <p className="text-xs text-gray-600 line-clamp-3">
                {doc.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
