
import documents from "@/data/document.json";
import {
  getEventById,
  getPersonsAliveDuringEvent,
  getDocumentsForEvent
} from "@/lib/events"

import Link from "next/link";

export default async function EventPage({ params }) {
  let { id } = await params;
  const event = getEventById(id);

const relatedDocuments = getDocumentsForEvent(event.id);

  if (!event) {
    return (
      <div className="p-4">
        <h1>Event not found</h1>
      </div>
    );
  }

  // Persons vivantes pendant l'event
  const relatedPersons = getPersonsAliveDuringEvent(event)

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{event.title}</h1>

      <p>
        {event.startDate}
        {event.endDate ? ` → ${event.endDate}` : ""}
      </p>

      <section>
        <h2 className="text-lg font-semibold">People alive at this time</h2>

        {relatedPersons.length === 0 ? (
          <p>No related persons.</p>
        ) : (
          <ul className="list-disc list-inside">
            {relatedPersons.map((p) => (
              <li key={p.id}>
                <a href={`/persons/${p.id}`} className="underline">
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      
{relatedDocuments.length > 0 && (
  <section className="space-y-2">
    <h2 className="text-lg font-semibold">Documents</h2>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {relatedDocuments.map((doc) => (
        <Link
          key={doc.id}
          href={`/documents/${doc.id}`}
          className="block border p-2"
        >
          {doc.display === "EMBED" && (
            <img
              src={doc.url}
              alt={doc.title}
              className="w-full h-32 object-cover"
            />
          )}

          <h3 className="mt-2 text-sm font-semibold">
            {doc.title}
          </h3>

          <p className="text-xs text-gray-600">
            {doc.description}
          </p>
        </Link>
      ))}
    </div>
  </section>
)}

      
    </div>
  );
}
