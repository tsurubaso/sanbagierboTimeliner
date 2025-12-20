"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewMomentPage() {
  const router = useRouter();

  const [persons, setPersons] = useState([]);
  const [personId, setPersonId] = useState("");
  const [date, setDate] = useState("");
  const [label, setLabel] = useState("");

  useEffect(() => {
    fetch("/api/persons")
      .then((r) => r.json())
      .then((data) => {
        setPersons(data);
        if (data.length > 0) {
          setPersonId(data[0].id); // sélection par défaut
        }
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/moments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: "m" + Date.now(),
        personId,
        date,
        label: label || null,
      }),
    });

    router.push("/admin/moments");
  };

  if (persons.length === 0) {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <p className="text-red-600">
        You must create at least one person before adding moments.
      </p>
    </main>
  );
}
  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Add new moment</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Choose the person</label>

          <select
            required
            className="w-full border p-2 rounded"
            value={personId}
            onChange={(e) => setPersonId(e.target.value)}
          >
            {persons.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Date</label>
          <input
            type="date"
            required
            className="w-full border p-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Label</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>

        <button className="px-4 py-2 bg-black text-white rounded">
          Create moment
        </button>
      </form>
    </main>
  );
}
