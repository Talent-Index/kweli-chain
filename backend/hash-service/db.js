// db.js
const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'db.sqlite'));

db.exec(`
CREATE TABLE IF NOT EXISTS certificates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  original_filename TEXT,
  storage_path TEXT,
  sha256 TEXT UNIQUE,
  keccak256 TEXT UNIQUE,
  issuer TEXT,
  holder_name TEXT,
  cert_type TEXT,
  issued_date TEXT,
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  revoked INTEGER DEFAULT 0,
  meta_json TEXT
);

CREATE TABLE IF NOT EXISTS verifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cert_id INTEGER,
  verifier TEXT,
  result TEXT,
  checked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(cert_id) REFERENCES certificates(id)
);
`);

console.log('SQLite DB created/checked at ./db.sqlite');
db.close();
