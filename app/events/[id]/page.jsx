import events from "@/data/events.json";
import persons from "@/data/persons.json";

import documents from "@/data/document.json";
import Link from "next/link";

export default async function EventPage({ params }) {
  let { id } = await params;
  const event = events.find((e) => e.id === id);

  const relatedDocuments = await documents.filter((d) =>
    d.eventIds.includes(event.id)
  );

  if (!event) {
    return (
      <div className="p-4">
        <h1>Event not found</h1>
      </div>
    );
  }

  // Persons vivantes pendant l'event
  const relatedPersons = persons.filter((p) => {
    const birth = new Date(p.birthDate);
    const death = p.deathDate ? new Date(p.deathDate) : new Date();

    const eventStart = new Date(event.startDate);
    return eventStart >= birth && eventStart <= death;
  });

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

      <section>
        {relatedDocuments.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">Documents</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {relatedDocuments.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/documents/${doc.id}`}
                  className="block border p-2 hover:bg-gray-50"
                >
                  {doc.display === "EMBED" && (
                    <img
                      src={doc.url}
                      alt={doc.title}
                      className="w-full h-32 object-cover"
                    />
                  )}

                  <h3 className="mt-2 text-sm font-semibold">{doc.title}</h3>

                  <p className="text-xs text-gray-600">{doc.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </section>
    </div>
  );
}
