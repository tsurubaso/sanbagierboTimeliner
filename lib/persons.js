import db from "./db.js"

// PERSON
export function getPersonById(id) {
  return db
    .prepare("SELECT * FROM persons WHERE id = ?")
    .get(id)
}

// EVENTS pendant la vie
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

// MOMENTS (admin-defined)
export function getMomentsForPerson(personId) {
  return db
    .prepare(`
      SELECT *
      FROM moments
      WHERE personId = ?
      ORDER BY date
    `)
    .all(personId)
}

// DOCUMENTS
export function getDocumentsForPerson(personId) {
  return db
    .prepare(`
      SELECT d.*
      FROM documents d
      JOIN document_person dp ON dp.documentId = d.id
      WHERE dp.personId = ?
    `)
    .all(personId)
}
