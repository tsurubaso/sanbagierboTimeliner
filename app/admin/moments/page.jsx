"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [moments, setMoments] = useState([]);
  const [personsMap, setPersonsMap] = useState({});

  // fetch moments depuis l'API
  const fetchMoments = async () => {
    const res = await fetch("/api/moments");
    const data = await res.json();
    setMoments(data);
  };

  // fetch persons depuis l'API
  const fetchPersons = async () => {
    const res = await fetch("/api/persons");
    const data = await res.json();

    const map = {};
    data.forEach((p) => {
      map[p.id] = p.name;
    });

    setPersonsMap(map);
  };

  useEffect(() => {
    fetchPersons();
    fetchMoments();
  }, []);

  // delete moment
  const handleDelete = async (id) => {
    if (!confirm("Delete this moment?")) return;
    await fetch("/api/moments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchMoments();
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Moments</h1>

        <Link
          href="/admin/moments/new"
          className="px-4 py-2 bg-black text-white rounded"
        >
          + New moment
        </Link>
      </header>

      {/* List */}
      <section className="border rounded divide-y">
        {moments.map((p) => (
          <div key={p.id} className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">
                {personsMap[p.personId] ?? "Unknown person"}
              </p>
              <p className="text-sm text-gray-500">
                {p.date} {p.label ?? "—"}
              </p>
            </div>

            <div className="space-x-4">
              <Link
                href={`/admin/moments/${p.id}`}
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
