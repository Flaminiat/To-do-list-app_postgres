const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_test",
  password: "",
  port: 5432
});

const getList = (request, response) => {
  pool.query("SELECT * FROM todolist ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createItem = (request, response) => {
  const { name, status, date } = request.body;

  pool.query(
    "INSERT INTO todolist (name, status, date) VALUES ($1, $2, $3)",
    [name, status, date],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Item added`);
    }
  );
};

const deleteItem = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM todolist WHERE id=$1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Item deleted`);
  });
};

module.exports = {
  getList,
  createItem,
  deleteItem
};
