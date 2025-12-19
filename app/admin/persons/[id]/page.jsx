"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default  function EditPersonPage() {
  const { id } =  useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [deathDate, setDeathDate] = useState("");
  const [summary, setSummary] = useState("");

useEffect(() => {
  if (!id) return;

  fetch(`/api/persons?id=${id}`)
    .then((r) => r.json())
    .then((p) => {
      if (!p) return;

      setName(p.name ?? "");
      setBirthDate(p.birthDate ?? "");
      setDeathDate(p.deathDate ?? "");
      setSummary(p.summary ?? "");
      setLoading(false);
    });
}, [id]);


  if (loading) {
    return <div className="p-6">Loading…</div>;
  }

  const handleSave = async () => {
    await fetch("/api/persons", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        name,
        birthDate,
        deathDate: deathDate || null,
        summary
      }),
    });

    router.push("/admin/persons");
  };

  const handleDelete = async () => {
    if (!confirm("Delete this person?")) return;

    await fetch("/api/persons", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    router.push("/admin/persons");
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-12">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Edit Person</h1>
        <p className="text-sm text-gray-500">
          Person ID: <span className="font-mono">{id}</span>
        </p>
      </header>

      {/* Identity */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Identity</h2>
        <input
          className="w-full border rounded px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </section>

      {/* Dates */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Life dates</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            className="border rounded px-3 py-2"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <input
            type="date"
            className="border rounded px-3 py-2"
            value={deathDate}
            onChange={(e) => setDeathDate(e.target.value)}
          />
        </div>
      </section>

      {/* Summary */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Summary</h2>
        <textarea
          rows={4}
          className="w-full border rounded px-3 py-2"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </section>

      {/* Actions */}
      <section className="flex justify-between">
        <button
          type="button"
          onClick={handleDelete}
          className="text-red-600 underline"
        >
          Delete person
        </button>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.push("/admin/persons")}
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
