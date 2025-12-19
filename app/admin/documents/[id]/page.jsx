"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditDocumentPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [display, setDisplay] = useState("LINK");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`/api/documents?id=${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (!d) return;

        setTitle(d.title ?? "");
        setDisplay(d.display ?? "LINK");
        setUrl(d.url ?? "");
        setDescription(d.description ?? "");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading…</div>;
  }

  const handleSave = async (e) => {
    e.preventDefault();

    await fetch("/api/documents", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        title,
        display,
        url: url || null,
        description,
      }),
    });

    router.push("/admin/documents");
  };

  const handleDelete = async () => {
    if (!confirm("Delete this document?")) return;

    await fetch("/api/documents", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    router.push("/admin/documents");
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-12">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Edit Document</h1>
        <p className="text-sm text-gray-500">
          Document ID: <span className="font-mono">{id}</span>
        </p>
      </header>

      <form onSubmit={handleSave} className="space-y-10">
        {/* Identity */}
        <section className="space-y-2">
          <label className="block text-sm font-medium">Title</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </section>

        {/* Type */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Document type</h2>

          <div className="grid grid-cols-2 gap-4">
            <select
              className="border rounded px-3 py-2"
              value={display}
              onChange={(e) => setDisplay(e.target.value)}
            >
              <option value="LINK">LINK</option>
              <option value="EMBED">EMBED</option>
            </select>

            <input
              type="url"
              className="border rounded px-3 py-2"
              placeholder={
                display === "EMBED" ? "Embed URL" : "External link"
              }
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </section>

        {/* Description */}
        <section className="space-y-2">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            rows={4}
            className="w-full border rounded px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </section>

        {/* Actions */}
        <section className="flex justify-between pt-6">
          <button
            type="button"
            onClick={handleDelete}
            className="text-red-600 underline"
          >
            Delete document
          </button>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push("/admin/documents")}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded"
            >
              Save changes
            </button>
          </div>
        </section>
      </form>
    </main>
  );
}
