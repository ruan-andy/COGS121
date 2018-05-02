// Node.js + Express server backend for petsapp
// v2 - use SQLite (https://www.sqlite.org/index.html) as a database
//
// COGS121 by Philip Guo
// https://github.com/pgbovine/COGS121

// run this once to create the initial database as the pets.db file
//   node create_database.js

// to clear the database, simply delete the pets.db file:
//   rm pets.db

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('users.db');

// run each database statement *serially* one after another
// (if you don't do this, then all statements will run in parallel,
//  which we don't want)
db.serialize(() => {
  // create a new database table:
  //db.run("CREATE TABLE users(name TEXT, id INTEGER)");
  //db.run("CREATE TABLE restaurants (name TEXT, id INTEGER, FOREIGN KEY (id) REFERENCES users)");
  // insert 3 rows of data:
  //db.run("INSERT INTO users VALUES ('John', 123");
  //db.run("INSERT INTO restaurants VALUES ('Andy's BBQ, 123");

  db.run("CREATE TABLE restaurants (name TEXT)");
  console.log('successfully created table in db');
  //db.run("INSERT INTO restaurants VALUES ('Andy BBQ')");
  // print them out to confirm their contents:
  db.each("SELECT name FROM restaurants", (err, row) => {
      console.log(row.name);
  });
});

db.close();