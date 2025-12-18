import db from "./db.js"

// Toutes les personnes (pour bande en bas)
export function getAllPersons() {
  return db.prepare("SELECT * FROM persons ORDER BY birthDate").all()
}

// Tous les événements
export function getAllEvents() {
  return db.prepare("SELECT * FROM events ORDER BY startDate").all()
}

// Pour une timeline individuelle (person)
export function getEventsForPerson(person) {
  return db
    .prepare(`
      SELECT *
      FROM events
      WHERE startDate >= ?
        AND startDate <= ?
      ORDER BY startDate
    `)
    .all(
      person.birthDate,
      person.deathDate ?? new Date().toISOString().slice(0, 10)
    )
}

// Optionnel : tous les documents pour timeline
export function getDocumentsForTimeline() {
  return db.prepare("SELECT * FROM documents").all()
}
