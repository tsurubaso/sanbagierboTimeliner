import db from "../db.js";

// READ
export function getAllDocuments() {
  return db.prepare("SELECT * FROM documents ORDER BY title").all();
}

export function getDocumentById(id) {
  return db.prepare("SELECT * FROM documents WHERE id = ?").get(id);
}

// CREATE
export function createDocument({ id, title, display, url, description }) {
  return db
    .prepare(
      `
      INSERT INTO documents (id, title, display, url, description)
      VALUES (?, ?, ?, ?, ?)
    `
    )
    .run(id, title, display, url, description);
}

// UPDATE
export function updateDocument(document) {
  const { id, title, display, url, description } = document;

  if (!id) {
    throw new Error("updateDocument: missing id");
  }

  db.prepare(
    `
    UPDATE documents
    SET
      title = ?,
      display = ?,
      url = ?,
      description = ?
    WHERE id = ?
  `
  ).run(title, display, url, description, id);
}

// DELETE
export function deleteDocument(id) {
  return db.prepare("DELETE FROM documents WHERE id = ?").run(id);
}
