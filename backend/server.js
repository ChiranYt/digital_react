const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173"]; // Default for dev

console.log("Allowed Origins (from env):", allowedOrigins); // Log for debugging

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        // Check against the array!
        callback(null, true);
      } else {
        console.error("CORS Error: Origin " + origin + " is not allowed."); // Log the rejected origin!
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"], // Add other headers if needed
    credentials: true, // If using cookies/auth
  })
);

app.options("*", cors()); // Before routes and cors middleware

app.use(express.json());
// MySQL connection and other logic

// Function to create a MySQL connection
function createConnection() {
  const db = mysql.createConnection({
    host: process.env.DB_HOST || "db4free.net",
    user: process.env.DB_USER || "react_dm",
    password: process.env.DB_PASSWORD || "react_dm",
    database: process.env.DB_NAME || "react_dm",
    multipleStatements: true, // Allow multiple queries
  });

  // Handle database connection errors & auto-reconnect
  db.connect((err) => {
    if (err) {
      console.error("❌ Database connection failed:", err);
      setTimeout(createConnection, 5000); // Retry connection in 5 sec
    } else {
      console.log("✅ Connected to MySQL database");
    }
  });

  db.on("error", (err) => {
    console.error("⚠️ Database error:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.log("🔄 Reconnecting to database...");
      createConnection(); // Reconnect on lost connection
    } else {
      throw err;
    }
  });

  return db;
}

// Global database connection instance
const db = createConnection();
// Handle POST request for saving buttons
app.post("/save-buttons", (req, res) => {
  const { ClientNeed } = req.body;

  if (!ClientNeed) {
    return res.status(400).json({ message: "ClientNeed is required." });
  }

  const sql = "INSERT INTO form1_client_need (client_need) VALUES (?)";
  const values = [ClientNeed]; // Will insert the labels as a string

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error during database query:", err);
      return res
        .status(500)
        .json({ message: "Failed to save buttons", error: err.message });
    }
    res.status(200).json({ message: "Buttons saved successfully!" });
  });
});

// Handle POST request for saving goals
app.post("/save-goals", (req, res) => {
  const { ClientGoal } = req.body;

  if (!ClientGoal) {
    return res.status(400).json({ message: "ClientGoal is required." });
  }

  const sql = "INSERT INTO form2_client_goal (client_goal) VALUES (?)";
  const values = [ClientGoal]; // Insert the goal labels as a string

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error during database query:", err);
      return res
        .status(500)
        .json({ message: "Failed to save goals", error: err.message });
    }
    res.status(200).json({ message: "Goals saved successfully!" });
  });
});

// Handle POST request for saving budget
app.post("/save-budget", (req, res) => {
  const { ClientBudget } = req.body;

  if (!ClientBudget) {
    return res.status(400).json({ message: "ClientBudget is required." });
  }

  const sql = "INSERT INTO form3_client_budget (client_budget) VALUES (?)";
  const values = [ClientBudget]; // Insert the selected budget as a string

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error during database query:", err);
      return res
        .status(500)
        .json({ message: "Failed to save budget", error: err.message });
    }
    res.status(200).json({ message: "Budget saved successfully!" });
  });
});

// Handle POST request for saving website URL
app.post("/save-website-url", (req, res) => {
  const { client_site_url } = req.body;

  if (!client_site_url) {
    return res.status(400).json({ message: "Website URL is required." });
  }

  const sql = "INSERT INTO form4_client_site (client_site_url) VALUES (?)";
  const values = [client_site_url]; // Insert the website URL

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error during database query:", err);
      return res
        .status(500)
        .json({ message: "Failed to save website URL", error: err.message });
    }
    res.status(200).json({ message: "Website URL saved successfully!" });
  });
});

// Handle POST request for saving personal information
app.post("/save-personal-info", (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).send({ error: "All fields are required." });
  }

  const query =
    "INSERT INTO form5_client_personal_info (name, email, phone) VALUES (?, ?, ?)";
  db.query(query, [name, email, phone], (err, results) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res
        .status(500)
        .send({ error: "An error occurred while saving the data." });
    }
    res.status(200).send({ message: "Data saved successfully!" });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
