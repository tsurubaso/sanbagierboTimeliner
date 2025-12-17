import Link from "next/link";

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">

      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Events</h1>

        <Link
          href="/admin/events/new"
          className="px-4 py-2 bg-black text-white rounded"
        >
          + New event
        </Link>
      </header>

      <section className="border rounded divide-y">

        <div className="p-4 flex justify-between items-center">
          <div>
            <p className="font-medium">Révolution fictive</p>
            <p className="text-sm text-gray-500">
              1968-01-01 → 1970-01-01
            </p>
          </div>

          <Link href="/admin/events/e1" className="text-sm underline">
            Edit
          </Link>
        </div>

        <div className="p-4 flex justify-between items-center">
          <div>
            <p className="font-medium">Accord historique</p>
            <p className="text-sm text-gray-500">
              1989-11-09
            </p>
          </div>

          <Link href="/admin/events/e2" className="text-sm underline">
            Edit
          </Link>
        </div>

      </section>
    </main>
  );
}
