import db from "./db.js"

// EVENT
export function getEventById(id) {
  return db
    .prepare("SELECT * FROM events WHERE id = ?")
    .get(id)
}

// PERSONS vivantes pendant l’event
export function getPersonsAliveDuringEvent(event) {
  return db
    .prepare(`
      SELECT *
      FROM persons
      WHERE birthDate <= ?
        AND (deathDate IS NULL OR deathDate >= ?)
      ORDER BY birthDate
    `)
    .all(event.startDate, event.startDate)
}

// DOCUMENTS liés à l’event
export function getDocumentsForEvent(eventId) {
  return db
    .prepare(`
      SELECT d.*
      FROM documents d
      JOIN document_event de ON de.documentId = d.id
      WHERE de.eventId = ?
    `)
    .all(eventId)
}
