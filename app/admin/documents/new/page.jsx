"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewDocumentPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [display, setDisplay] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: "d" + Date.now(),
        title,
        display,
        url,
        description,
      }),
    });

    router.push("/admin/documents");
  };

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Add new document</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name of the Document</label>
          <input
            type="text"
            required
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Type of Document</label>
          <select
            required
            className="w-full border p-2 rounded"
            value={display}
            onChange={(e) => setDisplay(e.target.value)}
          >
            <option value="">Select type</option>
            <option value="EMBED">EMBED</option>
            <option value="LINK">LINK</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Link to the document</label>
          <input
            type="url"
            className="w-full border p-2 rounded"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <label className="block font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full border rounded px-3 py-2"
        />

        <button className="px-4 py-2 bg-black text-white rounded">
          Create document
        </button>
      </form>
    </main>
  );
}
