"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Page() {
  const [persons, setPersons] = useState([])

  // fetch persons depuis l'API
  const fetchPersons = async () => {
    const res = await fetch("/api/persons")
    const data = await res.json()
    setPersons(data)
  }

  useEffect(() => {
    fetchPersons()
  }, [])

  // delete person
  const handleDelete = async (id) => {
    if (!confirm("Delete this person?")) return
    await fetch("/api/persons", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    fetchPersons()
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Persons</h1>

        <Link
          href="/admin/persons/new"
          className="px-4 py-2 bg-black text-white rounded"
        >
          + New person
        </Link>
      </header>

      {/* List */}
      <section className="border rounded divide-y">
        {persons.map((p) => (
          <div key={p.id} className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-gray-500">
                {p.birthDate} → {p.deathDate ?? "—"}
              </p>
            </div>

            <div className="space-x-4">
              <Link
                href={`/admin/persons/${p.id}`}
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
  )
}
