import {
  getEventById,
  getPersonsAliveDuringEvent
} from "@/lib/events";

import Link from "next/link";

export default async function EventPage({ params }) {
  const { id } = await params;

  const event = getEventById(id);

  if (!event) {
    return (
      <div className="p-4">
        <h1>Event not found</h1>
      </div>
    );
  }

  const relatedPersons = getPersonsAliveDuringEvent(event);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{event.title}</h1>

      <p>
        {event.startDate}
        {event.endDate ? ` → ${event.endDate}` : ""}
      </p>

      <section>
        <h2 className="text-lg font-semibold">
          People alive at this time
        </h2>

        {relatedPersons.length === 0 ? (
          <p>No related persons.</p>
        ) : (
          <ul className="list-disc list-inside">
            {relatedPersons.map((p) => (
              <li key={p.id}>
                <Link href={`/persons/${p.id}`} className="underline">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
