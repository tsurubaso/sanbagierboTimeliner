import Link from "next/link";

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">

      <header>
        <h1 className="text-2xl font-bold">Admin</h1>
        <p className="text-sm text-gray-500">
          Manage persons, events, moments and documents
        </p>
      </header>

      <section className="grid gap-4">

        <Link
          href="/admin/persons"
          className="border rounded p-4 hover:bg-gray-50"
        >
          <h2 className="font-medium">Persons</h2>
          <p className="text-sm text-gray-500">
            People, life span, identity
          </p>
        </Link>

        <Link
          href="/admin/events"
          className="border rounded p-4 hover:bg-gray-50"
        >
          <h2 className="font-medium">Events</h2>
          <p className="text-sm text-gray-500">
            Historical events and periods
          </p>
        </Link>

        <Link
          href="/admin/moments"
          className="border rounded p-4 hover:bg-gray-50"
        >
          <h2 className="font-medium">Moments</h2>
          <p className="text-sm text-gray-500">
            Personal life moments (pins)
          </p>
        </Link>

        <Link
          href="/admin/documents"
          className="border rounded p-4 hover:bg-gray-50"
        >
          <h2 className="font-medium">Documents</h2>
          <p className="text-sm text-gray-500">
            External links & embeds
          </p>
        </Link>

      </section>

    </main>
  );
}
