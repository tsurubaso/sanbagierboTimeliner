"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default  function EditEventPage() {
  const { id } =  useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

useEffect(() => {
  if (!id) return;

  fetch(`/api/events?id=${id}`)
    .then((r) => r.json())
    .then((p) => {
      if (!p) return;

      setTitle(p.title ?? "");
      setStartDate(p.startDate ?? "");
      setEndDate(p.endDate ?? "");
      setLoading(false);
    });
}, [id]);


  if (loading) {
    return <div className="p-6">Loading…</div>;
  }

  const handleSave = async () => {
    await fetch("/api/events", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        title,
        startDate,
        endDate: endDate || null

      }),
    });

    router.push("/admin/events");
  };

  const handleDelete = async () => {
    if (!confirm("Delete this event?")) return;

    await fetch("/api/events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    router.push("/admin/events");
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-12">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Edit Event</h1>
        <p className="text-sm text-gray-500">
          Event ID: <span className="font-mono">{id}</span>
        </p>
      </header>

      {/* Identity */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Event Name</h2>
        <input
          className="w-full border rounded px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </section>

      {/* Dates */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Chronology of event</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            className="border rounded px-3 py-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="border rounded px-3 py-2"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </section>

      {/* Actions */}
      <section className="flex justify-between">
        <button
          type="button"
          onClick={handleDelete}
          className="text-red-600 underline"
        >
          Delete event
        </button>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.push("/admin/events")}
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
