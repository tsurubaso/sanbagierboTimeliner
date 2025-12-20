"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditMomentPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [personId, setPersonId] = useState("");
  const [date, setDate] = useState("");
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`/api/moments?id=${id}`)
      .then((r) => r.json())
      .then((p) => {
        if (!p) return;

        setPersonId(p.personId ?? "");
        setDate(p.date ?? "");
        setLabel(p.label ?? "");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading…</div>;
  }

  const handleSave = async () => {
    await fetch("/api/moments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        personId,
        date,
        label: label || null,
      }),
    });

    router.push("/admin/moments");
  };

  const handleDelete = async () => {
    if (!confirm("Delete this moment?")) return;

    await fetch("/api/moments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    router.push("/admin/moments");
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-12">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Edit Moment</h1>
        <p className="text-sm text-gray-500">
          Moment ID: <span className="font-mono">{id}</span>
        </p>
      </header>

      {/* Perons ID */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Person ID</h2>
        <input
          className="w-full border rounded px-3 py-2"
          value={personId}
          onChange={(e) => setPersonId(e.target.value)}
        />
      </section>

      {/* Date */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">date of the Moment</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            className="border rounded px-3 py-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <h2 className="text-lg font-semibold">Label</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            className="border rounded px-3 py-2"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>
      </section>

      {/* Info */}
      <section className="flex justify-between">
        <button
          type="button"
          onClick={handleDelete}
          className="text-red-600 underline"
        >
          Delete moment
        </button>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.push("/admin/moments")}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Save changes
          </button>
        </div>
      </section>
    </main>
  );
}
