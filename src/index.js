import express from "express";
import { createPool } from "mysql2/promise";
import { config } from "dotenv";
import bodyParser from "body-parser";

config();

const app = express();
app.use(bodyParser.json());

const pool = createPool({
  host: process.env.MYSQLDB_HOST,
  user: "root",
  password: process.env.MYSQLDB_ROOT_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
  port: process.env.MYSQLDB_DOCKER_PORT,
});

pool.on("connection", (req, res) => {
  try {
    console.log("DB Connected!");
  } catch (err) {
    console.log("Not Connected!!!!!");
  }
});

app.get("/ping", async (req, res) => {
  try {
    const [result] = await pool.query("SELECT NOW()");
    console.log("SELECT NOW()");
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to database");
    console.log("Error connecting to database");
  }
});

app.listen(process.env.NODE_LOCAL_PORT || 3000, () => {
  console.log("--------------------------------------------");
  console.log("Server running on port", process.env.NODE_LOCAL_PORT || 3000);
  console.log({ host: process.env.MYSQLDB_HOST });
  console.log({ user: "root" });
  console.log({ password: process.env.MYSQLDB_ROOT_PASSWORD });
  console.log({ database: process.env.MYSQLDB_DATABASE });
  console.log({ port: process.env.MYSQLDB_DOCKER_PORT });
  console.log("--------------------------------------------");
});

// Routes
app.get('/api/saludo', (req, res) => {
  try {
    res.status(201).send('Hola a todos!');
    console.log('Hola a todos!');
  } catch (err) {
    console.log('Error: /api/saludo');
  }
});


// GET Endpoint for fetching data from a table
app.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data from the database");
    console.log("Error fetching data from the database");
  }
});

// POST Endpoint for inserting data into the users table
// app.post("/users", async (req, res) => {
//   try {
//     const { name } = req.body;
//     const [result] = await pool.query("INSERT INTO users (name) VALUES (?)", [name]);
//     res.status(201).json({ result, name }); // por revisar
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error inserting data into the database");
//     console.log("Error inserting data into the database");
//   }
// });

