import db from "./db.js"

// DOCUMENT
export function getDocumentById(id) {
  return db
    .prepare("SELECT * FROM documents WHERE id = ?")
    .get(id)
}

// PERSONS liés au document
export function getPersonsForDocument(documentId) {
  return db
    .prepare(`
      SELECT p.*
      FROM persons p
      JOIN document_person dp ON dp.personId = p.id
      WHERE dp.documentId = ?
      ORDER BY p.name
    `)
    .all(documentId)
}

// EVENTS liés au document
export function getEventsForDocument(documentId) {
  return db
    .prepare(`
      SELECT e.*
      FROM events e
      JOIN document_event de ON de.eventId = e.id
      WHERE de.documentId = ?
      ORDER BY e.startDate
    `)
    .all(documentId)
}
