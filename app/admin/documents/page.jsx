"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [documents, setDocuments] = useState([]);

  // fetch documents depuis l'API
  const fetchDocuments = async () => {
    const res = await fetch("/api/documents");
    if (!res.ok) {
      console.error("Failed to fetch documents");
    }
    const data = await res.json();
    setDocuments(data);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // delete document
  const handleDelete = async (id) => {
    if (!confirm("Delete this document?")) return;
    await fetch("/api/documents", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchDocuments();
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Documents</h1>

        <Link
          href="/admin/documents/new"
          className="px-4 py-2 bg-black text-white rounded"
        >
          + New document
        </Link>
      </header>

      {/* List */}
      <section className="border rounded divide-y">
        {documents.map((p) => (
          <div
            key={p.id}
            className="p-4 flex justify-between gap-6 items-start"
          >
            {/* Left content */}
            <div className="space-y-2">
              <p className="font-semibold text-lg">{p.title}</p>

              <p className="text-sm text-gray-500">
                Type: <span className="font-mono">{p.display}</span>
              </p>

              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline text-blue-600 break-all"
                >
                  {p.url}
                </a>
              )}

              {p.description && (
                <p className="text-sm text-gray-700">{p.description}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 text-sm">
              <Link href={`/admin/documents/${p.id}`} className="underline">
                Edit
              </Link>

              <button
                onClick={() => handleDelete(p.id)}
                className="text-red-600 underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
