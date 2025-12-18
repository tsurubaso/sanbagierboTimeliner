import Database from "better-sqlite3"
import path from "path"

const dbPath = path.join(process.cwd(), "data.db")

const db = new Database(dbPath)

// Sécurité & perfs
db.pragma("journal_mode = WAL")

export default db
