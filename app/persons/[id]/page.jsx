import persons from "@/data/persons.json"
import events from "@/data/events.json"
import TimelinePerson from "@/components/Timeline/TimelinePerson"

export default async function PersonPage({ params }) {
  let {id}=await params
  const person = persons.find((p) => p.id === id)

  if (!person) {
    return (
      <div className="p-4">
        <h1>Person not found</h1>
      </div>
    )
  }

  const birth = new Date(person.birthDate)
  const death = person.deathDate ? new Date(person.deathDate) : new Date()

  const relatedEvents = events.filter((e) => {
    const eventStart = new Date(e.startDate)
    return eventStart >= birth && eventStart <= death
  })

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{person.name}</h1>

      <p>
        {person.birthDate} → {person.deathDate ?? "Present"}
      </p>

      <TimelinePerson
        person={person}
        events={relatedEvents}
      />

      <section>
        <h2 className="text-lg font-semibold">Related Events</h2>

        {relatedEvents.length === 0 ? (
          <p>No related events.</p>
        ) : (
          <ul className="list-disc list-inside">
            {relatedEvents.map((e) => (
              <li key={e.id}>
                <a href={`/events/${e.id}`} className="underline">
                  {e.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
