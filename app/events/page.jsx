import Link from "next/link";

async function getEvents() {
  const res = await fetch("http://localhost:3000/api/events", {
    cache: "no-store",
  });

  return res.json();
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Events</h1>
      {events.length === 0 && (
        <p className="text-sm text-gray-500">No events yet.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {events.map((p) => (
          <Link
            key={p.id}
            href={`/events/${p.id}`}
            className="block border p-3 hover:bg-gray-50 rounded"
          >
            <h2 className="font-semibold text-sm">{p.title}</h2>

            {p.startDate && (
              <p className="text-xs text-gray-600 mt-1">
                {p.startDate}
                {p.endDate && ` → ${p.endDate}`}
              </p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
