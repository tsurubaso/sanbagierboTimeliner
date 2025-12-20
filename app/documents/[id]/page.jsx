import {
  getDocumentById,
  getPersonsForDocument,
  getEventsForDocument,
} from "@/lib/documents";

import Link from "next/link";

export default async function DocumentPage({ params }) {
  const { id } = await params;

  const document = getDocumentById(id);

  if (!document) {
    return <div className="p-4">Document not found</div>;
  }

  const relatedPersons = getPersonsForDocument(id);
  const relatedEvents = getEventsForDocument(id);

  return (
    <div className="p-6 space-y-6">
      {/* TITLE */}
      <h1 className="text-2xl font-bold">{document.title}</h1>

      {/* DESCRIPTION */}
      {document.description && (
        <p className="text-gray-700">{document.description}</p>
      )}

      {/* DOCUMENT DISPLAY */}
      {document.display === "EMBED" && (
        <img
          src={document.url}
          alt={document.title}
          className="w-full max-h-96 object-cover border"
        />
      )}

      {document.display === "LINK" && (
        <a
          href={document.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Open document
        </a>
      )}

      {/* RELATED PERSONS */}
      <section>
        <h2 className="text-lg font-semibold">Related Persons</h2>

        {relatedPersons.length === 0 ? (
          <p>None</p>
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

      {/* RELATED EVENTS */}
      <section>
        <h2 className="text-lg font-semibold">Related Events</h2>

        {relatedEvents.length === 0 ? (
          <p>None</p>
        ) : (
          <ul className="list-disc list-inside">
            {relatedEvents.map((e) => (
              <li key={e.id}>
                <Link href={`/events/${e.id}`} className="underline">
                  {e.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
