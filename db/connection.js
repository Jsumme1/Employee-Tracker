const mysql = require("mysql2");
// Connect to database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employees",
});

module.exports = db;
