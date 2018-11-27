const { Client } = require("pg");
const express = require("express");

const app = express();
app.use(express.json());
const client = new Client({
  database: "social-media"
});

app.get("/users", (req, res) => {
  client.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500);
      return res.send();
    }
    res.send(result.rows);
  });
});

app.post("/users", (req, res) => {
  const text = "INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *";
  const values = [req.body.username, req.body.bio];

  client.query(text, values, (err, result) => {
    console.log(result.rows[0]);
    res.status(201);
    res.send(result.rows[0]);
  });
});

app.get("/users/:id", (req, res) => {
  let id = req.params.id;
  const values = [id];
  client.query("SELECT * FROM users WHERE id=$1", values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500);
      return res.send();
    }
    if (result.rows.length === 0) {
      res.status(404);
      return res.send();
    }
    res.send(result.rows[0]);
  });
});

app.listen(3000, () => {
  client.connect();
});
