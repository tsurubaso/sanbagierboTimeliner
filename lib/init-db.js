import db from "../lib/db.js"

db.exec(`
  CREATE TABLE IF NOT EXISTS persons (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    birthDate TEXT NOT NULL,
    deathDate TEXT
  );

  CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    startDate TEXT NOT NULL,
    endDate TEXT
  );

  CREATE TABLE IF NOT EXISTS documents (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    display TEXT NOT NULL,
    url TEXT NOT NULL,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS moments (
    id TEXT PRIMARY KEY,
    personId TEXT NOT NULL,
    date TEXT NOT NULL,
    label TEXT NOT NULL,
    FOREIGN KEY (personId) REFERENCES persons(id)
  );

  CREATE TABLE IF NOT EXISTS document_person (
    documentId TEXT NOT NULL,
    personId TEXT NOT NULL,
    PRIMARY KEY (documentId, personId),
    FOREIGN KEY (documentId) REFERENCES documents(id),
    FOREIGN KEY (personId) REFERENCES persons(id)
  );

  CREATE TABLE IF NOT EXISTS document_event (
    documentId TEXT NOT NULL,
    eventId TEXT NOT NULL,
    PRIMARY KEY (documentId, eventId),
    FOREIGN KEY (documentId) REFERENCES documents(id),
    FOREIGN KEY (eventId) REFERENCES events(id)
  );
`)
