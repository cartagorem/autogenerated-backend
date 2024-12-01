import express from "express";
import { createPool } from "mysql2/promise";
import { config } from "dotenv";
import bodyParser from "body-parser";

config();

const app = express();
app.use(bodyParser.json());

const pool = createPool({
  host: "localhost",  // host: "host.docker.internal",
  user: "cartagorem",
  password: "test123",
  database: "mangodb",
});

app.listen(process.env.NODE_LOCAL_PORT || 3000, () => {
  console.log("Server running on port", process.env.NODE_LOCAL_PORT || 3000);
  console.log({ host: "localhost" });
  console.log({ user: "cartagorem" });
  console.log({ password: "test123" });
  console.log({ database: "mangodb" });
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
app.get("/fruits", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Fruits");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data from the database");
    console.log("Error fetching data from the database");
  }
});