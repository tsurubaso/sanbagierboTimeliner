import Link from "next/link";

async function getPersons() {
  const res = await fetch("http://localhost:3000/api/persons", {
    cache: "no-store",
  });

  return res.json();
}

export default async function PersonsPage() {
  const persons = await getPersons();

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Persons</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {persons.map((p) => (
          <Link
            key={p.id}
            href={`/persons/${p.id}`}
            className="block border p-3 hover:bg-gray-50 rounded"
          >
            <h2 className="font-semibold text-sm">
              {p.name}
            </h2>

            {p.summary && (
              <p className="text-xs text-gray-600 mt-1 line-clamp-3">
                {p.summary}
              </p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
