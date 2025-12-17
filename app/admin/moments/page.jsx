import Link from "next/link";

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-8">

      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Moments</h1>

        <Link
          href="/admin/moments/new"
          className="px-4 py-2 bg-black text-white rounded"
        >
          + New moment
        </Link>
      </header>

      <section className="border rounded divide-y">

        <div className="p-4 flex justify-between items-center">
          <div>
            <p className="font-medium">
              Jean Dupont — BIRTH
            </p>
            <p className="text-sm text-gray-500">
              1950-01-01 · Born in Paris
            </p>
          </div>

          <Link href="/admin/moments/m1" className="text-sm underline">
            Edit
          </Link>
        </div>

        <div className="p-4 flex justify-between items-center">
          <div>
            <p className="font-medium">
              Jean Dupont — MARRIAGE
            </p>
            <p className="text-sm text-gray-500">
              1975-06-20 · Marriage with Anne
            </p>
          </div>

          <Link href="/admin/moments/m2" className="text-sm underline">
            Edit
          </Link>
        </div>

      </section>
    </main>
  );
}
