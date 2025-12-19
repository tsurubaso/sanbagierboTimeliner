"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [events, setEvents] = useState([]);

  // fetch events depuis l'API
  const fetchEvents = async () => {
    const res = await fetch("/api/events");
    if (!res.ok) {
      console.error("Failed to fetch events");
    }
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // delete event
  const handleDelete = async (id) => {
    if (!confirm("Delete this event?")) return;
    await fetch("/api/events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchEvents();
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Events</h1>

        <Link
          href="/admin/events/new"
          className="px-4 py-2 bg-black text-white rounded"
        >
          + New event
        </Link>
      </header>

      {/* List */}
      <section className="border rounded divide-y">
        {events.map((p) => (
          <div key={p.id} className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">{p.title}</p>
              <p className="text-sm text-gray-500">
                {p.startDate} → {p.endDate ?? "—"}
              </p>
            </div>

            <div className="space-x-4">
              <Link
                href={`/admin/events/${p.id}`}
                className="text-sm underline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(p.id)}
                className="text-sm text-red-600 underline"
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
