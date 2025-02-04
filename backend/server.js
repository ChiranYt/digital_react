const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// ✅ Allowed Origins (CORS)
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173"]; // Default for dev

console.log("Allowed Origins (from env):", allowedOrigins);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("CORS Error: Origin " + origin + " is not allowed.");
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "db4free.net",
  user: process.env.DB_USER || "react_dm",
  password: process.env.DB_PASSWORD || "react_dm",
  database: process.env.DB_NAME || "react_dm",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true, // Prevent idle connection timeout
  keepAliveInitialDelay: 10000, // 10s delay before keep-alive
}).promise();

console.log("✅ Connected to MySQL Database");

// ✅ Universal function to handle DB queries safely
const executeQuery = async (query, values, res, successMessage) => {
  let connection;
  try {
    connection = await pool.getConnection(); // Get fresh connection
    await connection.query(query, values);
    res.status(200).json({ message: successMessage });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ message: "Database operation failed", error: err.message });
  } finally {
    if (connection) connection.release(); // Release connection
  }
};

// ✅ Route: Save Buttons
app.post("/save-buttons", (req, res) => {
  const { ClientNeed } = req.body;
  if (!ClientNeed) return res.status(400).json({ message: "ClientNeed is required." });
  executeQuery("INSERT INTO form1_client_need (client_need) VALUES (?)", [ClientNeed], res, "Buttons saved successfully!");
});

// ✅ Route: Save Goals
app.post("/save-goals", (req, res) => {
  const { ClientGoal } = req.body;
  if (!ClientGoal) return res.status(400).json({ message: "ClientGoal is required." });
  executeQuery("INSERT INTO form2_client_goal (client_goal) VALUES (?)", [ClientGoal], res, "Goals saved successfully!");
});

// ✅ Route: Save Budget
app.post("/save-budget", (req, res) => {
  const { ClientBudget } = req.body;
  if (!ClientBudget) return res.status(400).json({ message: "ClientBudget is required." });
  executeQuery("INSERT INTO form3_client_budget (client_budget) VALUES (?)", [ClientBudget], res, "Budget saved successfully!");
});

// ✅ Route: Save Website URL
app.post("/save-website-url", (req, res) => {
  const { client_site_url } = req.body;
  if (!client_site_url) return res.status(400).json({ message: "Website URL is required." });
  executeQuery("INSERT INTO form4_client_site (client_site_url) VALUES (?)", [client_site_url], res, "Website URL saved successfully!");
});

// ✅ Route: Save Personal Info
app.post("/save-personal-info", (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) return res.status(400).json({ error: "All fields are required." });
  executeQuery("INSERT INTO form5_client_personal_info (name, email, phone) VALUES (?, ?, ?)", [name, email, phone], res, "Personal info saved successfully!");
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
