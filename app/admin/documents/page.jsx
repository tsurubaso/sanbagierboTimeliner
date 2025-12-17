import Link from "next/link";

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-8">

      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Documents</h1>

        <Link
          href="/admin/documents/new"
          className="px-4 py-2 bg-black text-white rounded"
        >
          + New document
        </Link>
      </header>

      <section className="border rounded divide-y">

        <div className="p-4 flex justify-between items-center">
          <div>
            <p className="font-medium">
              Wedding photo <span className="text-xs">(EMBED)</span>
            </p>
            <p className="text-sm text-gray-500">
              Moment: Marriage with Anne
            </p>
          </div>

          <Link href="/admin/documents/d1" className="text-sm underline">
            Edit
          </Link>
        </div>

        <div className="p-4 flex justify-between items-center">
          <div>
            <p className="font-medium">
              Marriage announcement <span className="text-xs">(LINK)</span>
            </p>
            <p className="text-sm text-gray-500">
              Moment: Marriage with Anne
            </p>
          </div>

          <Link href="/admin/documents/d2" className="text-sm underline">
            Edit
          </Link>
        </div>

      </section>
    </main>
  );
}
