import db from "../db.js"; 

// READ
export function getAllEvents() {
  return db.prepare("SELECT * FROM events ORDER BY startDate").all();
}

export function getEventById(id) {
  return db.prepare("SELECT * FROM events WHERE id = ?").get(id);
}

// CREATE
export function createEvent({ id, title, startDate, endDate }) {
  return db
    .prepare(
      `
      INSERT INTO events (id, title, startDate, endDate)
      VALUES (?, ?, ?, ?)
    `
    )
    .run(id, title, startDate, endDate);
}

// UPDATE
export function updateEvent(event) {
  const { id, title, startDate, endDate } = event;

  if (!id) {
    throw new Error("updateEvent: missing id");
  }

  db.prepare(
    `
    UPDATE events
    SET
      title = ?,
      startDate = ?,
      endDate = ?
    WHERE id = ?
  `
  ).run(title, startDate, endDate, id);
}

// DELETE
export function deleteEvent(id) {
  return db.prepare("DELETE FROM events WHERE id = ?").run(id);
}

//

export function getPersonsAliveDuringEvent(event) {
  const start = event.startDate;
  const end = event.endDate ?? event.startDate;

  return db
    .prepare(
      `
      SELECT *
      FROM persons
      WHERE birthDate <= ?
        AND (deathDate IS NULL OR deathDate >= ?)
      ORDER BY birthDate
    `
    )
    .all(end, start);
}

