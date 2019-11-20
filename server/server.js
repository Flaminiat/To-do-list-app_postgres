/*
const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "cyf_test",
  password: "",
  port: 5432
});

client
  .connect()
  .then(() => console.log("connected successfully"))
  .then(() => client.query("select * FROM customers"))
  .then(results => console.table(results.rows))
  .catch(e => console.log)
  .finally(() => client.end());
*/
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const db = require("./queries");
var cors = require("cors");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});
app.get("/todolist", db.getList);
app.post("/todolist", db.createItem);
app.delete("/todolist/:id", db.deleteItem);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
