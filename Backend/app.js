const express = require("express");
const mysql = require("mysql2");

const app = express();

const db = mysql.createConnection({
  host: process.env.DB_HOST,      // RDS endpoint
  user: process.env.DB_USER,      // RDS username
  password: process.env.DB_PASS,  // RDS password
  database: process.env.DB_NAME   // DB name
});

app.get("/message", (req, res) => {
  db.query("SELECT content FROM messages LIMIT 1", (err, rows) => {
    if (err) {
      console.error(err);
      return res.send("Database error");
    }
    res.send(rows[0]?.content || "No data found");
  });
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
