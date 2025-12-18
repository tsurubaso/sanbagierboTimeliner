import fs from "fs"
import path from "path"
import db from "../lib/db.js"

const readJSON = (file) => {
  const filePath = path.join(process.cwd(), "data", file)
  return JSON.parse(fs.readFileSync(filePath, "utf-8"))
}

const persons = readJSON("persons.json")
const events = readJSON("events.json")
const documents = readJSON("document.json")
const moments = readJSON("moments.json")

console.log("🌱 Seeding database...")

db.transaction(() => {
  // CLEAN
  db.exec(`
    DELETE FROM document_person;
    DELETE FROM document_event;
    DELETE FROM moments;
    DELETE FROM documents;
    DELETE FROM events;
    DELETE FROM persons;
  `)

  // PERSONS
  const insertPerson = db.prepare(`
    INSERT INTO persons (id, name, birthDate, deathDate)
    VALUES (@id, @name, @birthDate, @deathDate)
  `)

  persons.forEach(p => insertPerson.run(p))

  // EVENTS
  const insertEvent = db.prepare(`
    INSERT INTO events (id, title, startDate, endDate)
    VALUES (@id, @title, @startDate, @endDate)
  `)

  events.forEach(e => insertEvent.run(e))

  // DOCUMENTS
  const insertDocument = db.prepare(`
    INSERT INTO documents (id, title, display, url, description)
    VALUES (@id, @title, @display, @url, @description)
  `)

  const insertDocPerson = db.prepare(`
    INSERT INTO document_person (documentId, personId)
    VALUES (?, ?)
  `)

  const insertDocEvent = db.prepare(`
    INSERT INTO document_event (documentId, eventId)
    VALUES (?, ?)
  `)

  documents.forEach(d => {
    insertDocument.run(d)

    d.personIds.forEach(pid => {
      insertDocPerson.run(d.id, pid)
    })

    d.eventIds.forEach(eid => {
      insertDocEvent.run(d.id, eid)
    })
  })

  // MOMENTS
  const insertMoment = db.prepare(`
    INSERT INTO moments (id, personId, date, label)
    VALUES (@id, @personId, @date, @label)
  `)

  moments.forEach(m => insertMoment.run(m))
})()

console.log("✅ Seed complete")
