import db from "../db.js"; 

// READ
export function getAllMoments() {
  return db.prepare("SELECT * FROM moments ORDER BY personId").all();
}

export function getMomentById(id) {
  return db.prepare("SELECT * FROM moments WHERE id = ?").get(id);
}

// CREATE
export function createMoment({ id, personId,date,label }) {
  return db
    .prepare(
      `
      INSERT INTO moments (id, personId,date,label)
      VALUES (?, ?, ?, ?)
    `
    )
    .run(id, personId,date,label);
}

// UPDATE
export function updateMoment(moment) {
  const { id, personId,date,label} = moment;

  if (!id) {
    throw new Error("updateMoment: missing id");
  }

  db.prepare(
    `
    UPDATE moments
    SET
      personId = ?,
      date = ?,
      label = ?
    WHERE id = ?
  `
  ).run( personId, date, label, id);
}

// DELETE
export function deleteMoment(id) {
  return db.prepare("DELETE FROM moments WHERE id = ?").run(id);
}

//delete from Person
export function deleteMomentsByPersonId(personId) {
  return db
    .prepare("DELETE FROM moments WHERE personId = ?")
    .run(personId)
}
