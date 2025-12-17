import Link from "next/link";

export default function Page() {
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

        {/* Person row */}
        <div className="p-4 flex justify-between items-center">
          <div>
            <p className="font-medium">Jean Dupont</p>
            <p className="text-sm text-gray-500">
              1950-01-01 → 2000-05-12
            </p>
          </div>

          <Link
            href="/admin/persons/p1"
            className="text-sm underline"
          >
            Edit
          </Link>
        </div>

        {/* Person row */}
        <div className="p-4 flex justify-between items-center">
          <div>
            <p className="font-medium">Marie Lefèvre</p>
            <p className="text-sm text-gray-500">
              1975-03-22 → —
            </p>
          </div>

          <Link
            href="/admin/persons/p2"
            className="text-sm underline"
          >
            Edit
          </Link>
        </div>

      </section>

    </main>
  );
}
