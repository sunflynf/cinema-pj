import SQLite from 'sqlite3';

const sqlite3 = SQLite.verbose();
const db = new sqlite3.Database('./db/cinema-pj.db');

db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)',
  );
});

export default db;
