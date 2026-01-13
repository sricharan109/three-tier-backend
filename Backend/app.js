const express = require("express");
const mysql = require("mysql2");

const app = express();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: "admin",
  password: "password",
  database: "appdb"
});

app.get("/message", (req, res) => {
  db.query("SELECT content FROM messages LIMIT 1", (err, result) => {
    if (err) return res.send("DB error");
    res.send(result[0]?.content || "No data");
  });
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
