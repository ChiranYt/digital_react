const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
  "https://digital-frontend.onrender.com", // Production
  "http://localhost:5173", // Development (or your local port)
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        // Allow requests without origin (e.g., Postman) or from allowed origins
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"], // Explicitly list allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Include any custom headers
    credentials: true, // If you're using cookies or authorization
  })
);

app.options("*", cors()); // Handle preflight requests FIRST

app.use(express.json());

// MySQL connection and other logic
const pool = mysql
  .createPool({
    host: process.env.DB_HOST || "db4free.net",
    user: process.env.DB_USER || "react_dm",
    password: process.env.DB_PASSWORD || "react_dm",
    database: process.env.DB_NAME || "react_dm",
    waitForConnections: true,
    connectionLimit: 5, // 🚀 Allows up to 10 simultaneous connections
    queueLimit: 0,
    enableKeepAlive: true, // Keep connection alive
  keepAliveInitialDelay: 10000,
  })
  .promise(); // Use promise-based API

console.log("✅ Connected to MySQL database");

// Test the database connection
pool
  .query("SELECT 1 + 1 AS solution")
  .then(([results]) => {
    console.log("Connected to the MySQL database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

// Handle POST request for saving buttons
app.post("/save-buttons", async (req, res) => {
  const { ClientNeed } = req.body;

  if (!ClientNeed) {
    return res.status(400).json({ message: "ClientNeed is required." });
  }

  const sql = "INSERT INTO form1_client_need (client_need) VALUES (?)";
  const values = [ClientNeed]; // Will insert the labels as a string

  try {
    const [result] = await pool.query(sql, values);
    res.status(200).json({ message: "Buttons saved successfully!" });
  } catch (err) {
    console.error("Error during database query:", err);
    res
      .status(500)
      .json({ message: "Failed to save buttons", error: err.message });
  }
});

// Handle POST request for saving goals
app.post("/save-goals", async (req, res) => {
  const { ClientGoal } = req.body;

  if (!ClientGoal) {
    return res.status(400).json({ message: "ClientGoal is required." });
  }

  const sql = "INSERT INTO form2_client_goal (client_goal) VALUES (?)";
  const values = [ClientGoal]; // Insert the goal labels as a string

  try {
    const [result] = await pool.query(sql, values);
    res.status(200).json({ message: "Goals saved successfully!" });
  } catch (err) {
    console.error("Error during database query:", err);
    res
      .status(500)
      .json({ message: "Failed to save goals", error: err.message });
  }
});

// Handle POST request for saving budget
app.post("/save-budget", async (req, res) => {
  const { ClientBudget } = req.body;

  if (!ClientBudget) {
    return res.status(400).json({ message: "ClientBudget is required." });
  }

  const sql = "INSERT INTO form3_client_budget (client_budget) VALUES (?)";
  const values = [ClientBudget]; // Insert the selected budget as a string

  try {
    const [result] = await pool.query(sql, values);
    res.status(200).json({ message: "Budget saved successfully!" });
  } catch (err) {
    console.error("Error during database query:", err);
    res
      .status(500)
      .json({ message: "Failed to save budget", error: err.message });
  }
});

// Handle POST request for saving website URL
app.post("/save-website-url", async (req, res) => {
  const { client_site_url } = req.body;

  if (!client_site_url) {
    return res.status(400).json({ message: "Website URL is required." });
  }

  const sql = "INSERT INTO form4_client_site (client_site_url) VALUES (?)";
  const values = [client_site_url]; // Insert the website URL

  try {
    const [result] = await pool.query(sql, values);
    res.status(200).json({ message: "Website URL saved successfully!" });
  } catch (err) {
    console.error("Error during database query:", err);
    res
      .status(500)
      .json({ message: "Failed to save website URL", error: err.message });
  }
});

// Handle POST request for saving personal information
app.post("/save-personal-info", async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).send({ error: "All fields are required." });
  }

  const query =
    "INSERT INTO form5_client_personal_info (name, email, phone) VALUES (?, ?, ?)";
  try {
    const [result] = await pool.query(query, [name, email, phone]);
    res.status(200).send({ message: "Data saved successfully!" });
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send({ error: "An error occurred while saving the data." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
