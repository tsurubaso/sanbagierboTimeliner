import db from "../db.js"

// READ
export function getAllPersons() {
  return db.prepare("SELECT * FROM persons ORDER BY birthDate").all()
}

export function getPersonById(id) {
  return db.prepare("SELECT * FROM persons WHERE id = ?").get(id)
}

// CREATE
export function createPerson({ id, name, birthDate, deathDate,summary }) {
  return db
    .prepare(`
      INSERT INTO persons (id, name, birthDate, deathDate, summary)
      VALUES (?, ?, ?, ?, ?)
    `)
    .run(id, name, birthDate, deathDate, summary)
}

// UPDATE
export function updatePerson(person) {
  const { id, name, birthDate, deathDate, summary } = person;

  if (!id) {
    throw new Error("updatePerson: missing id");
  }

  db.prepare(`
    UPDATE persons
    SET
      name = ?,
      birthDate = ?,
      deathDate = ?,
      summary = ?
    WHERE id = ?
  `).run(
    name,
    birthDate,
    deathDate,
    summary,
    id
  );
}

// DELETE
export function deletePerson(id) {
  return db.prepare("DELETE FROM persons WHERE id = ?").run(id)
}
