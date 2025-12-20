import {
  getPersonById,
  getEventsForPerson,
  getMomentsForPerson,
  getDocumentsForPerson,
} from "@/lib/persons";

import TimelinePerson from "@/components/Timeline/TimelinePerson";
import Link from "next/link";

export default async function PersonPage({ params }) {
  let { id } = params;
  
  const person = getPersonById(id);
  if (!person) {
  return <div className="p-4">Person not found</div>;
}

  const relatedDocuments = getDocumentsForPerson(person.id);

  if (!person) {
    return <div className="p-4">Person not found</div>;
  }

  const birth = new Date(person.birthDate);
  const death = person.deathDate ? new Date(person.deathDate) : new Date();

  const relatedEvents = getEventsForPerson(person);

  const relatedMoments = getMomentsForPerson(person.id);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{person.name}</h1>

      <p>
        {person.birthDate} → {person.deathDate ?? "Present"}
      </p>

      <TimelinePerson
        person={person}
        events={relatedEvents}
        moments={relatedMoments}
      />

      <section>
        <h2 className="text-lg font-semibold">Moments</h2>
        <ul className="list-disc list-inside">
          {relatedMoments.map((m) => (
            <li key={m.id}>
              {m.date} — {m.label}
            </li>
          ))}
        </ul>
      </section>

      {relatedDocuments.length > 0 && (
        <section>
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

                <h3 className="mt-2 text-sm font-semibold">{doc.title}</h3>

                {person.summary && (
                  <p className="text-gray-700 max-w-prose">{person.summary}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
