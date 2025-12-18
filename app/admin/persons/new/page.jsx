"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPersonPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [deathDate, setDeathDate] = useState("");
  const [summary, setSummary] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/persons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: "p" + Date.now(),
        name,
        birthDate,
        deathDate: deathDate || null,
        summary,
      }),
    });

    router.push("/admin/persons");
  };

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Add new person</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            required
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Birth date</label>
          <input
            type="date"
            required
            className="w-full border p-2 rounded"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Death date</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={deathDate}
            onChange={(e) => setDeathDate(e.target.value)}
          />
        </div>

        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={4}
          className="w-full border rounded px-3 py-2"
        />

        <button className="px-4 py-2 bg-black text-white rounded">
          Create person
        </button>
      </form>
    </main>
  );
}
