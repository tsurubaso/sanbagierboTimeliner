import documents from "@/data/document.json";
import persons from "@/data/persons.json";
import events from "@/data/events.json";
import Link from "next/link";

export default async function DocumentPage({ params }) {
  let { id } = await params;
  

  const document = await documents.find((d) => d.id === id);
  console.log(document.url);

  if (!document) {
    return <div className="p-4">Document not found</div>;
  }

  const relatedPersons = persons.filter((p) =>
    document.personIds.includes(p.id)
  );

  const relatedEvents = events.filter((e) => document.eventIds.includes(e.id));

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{document.title}</h1>

      {/* DOCUMENT DISPLAY */}
      {document.display === "EMBED" && (
        <div>
          <img
            src={document.url}
            alt={document.title}
            className="max-w-md border"
          />
        </div>
      )}

      {document.display === "LINK" && (
        <div>
          <a
            href={document.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Open document
          </a>
        </div>
      )}

      {/* DESCRIPTION */}
      <p>{document.description}</p>

      {/* RELATED PERSONS */}
      {relatedPersons.length > 0 && (
        <section>
          <h2 className="font-semibold">Related Persons</h2>
          <ul className="list-disc list-inside">
            {relatedPersons.map((p) => (
              <li key={p.id}>
                <Link href={`/persons/${p.id}`} className="underline">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* RELATED EVENTS */}
      {relatedEvents.length > 0 && (
        <section>
          <h2 className="font-semibold">Related Events</h2>
          <ul className="list-disc list-inside">
            {relatedEvents.map((e) => (
              <li key={e.id}>
                <Link href={`/events/${e.id}`} className="underline">
                  {e.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
