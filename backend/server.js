const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173"];

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

app.options("*", cors());
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "db4free.net",
  user: process.env.DB_USER || "react_dm",
  password: process.env.DB_PASSWORD || "react_dm",
  database: process.env.DB_NAME || "react_dm",
  connectionLimit: 10,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
});

// Keep-alive route
app.get("/keepalive", (req, res) => res.send("OK"));

// Helper function for database queries (with retry logic)
function executeQuery(sql, values, res, successMessage = "Success!") {
  const maxRetries = 3;
  let retryCount = 0;

  function attemptQuery() {
    pool.query(sql, values, (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        if (err.code === "ECONNRESET" && retryCount < maxRetries) {
          retryCount++;
          const backoff = Math.pow(2, retryCount) * 1000;
          console.log(
            `Retrying query (attempt ${retryCount}) in ${
              backoff / 1000
            } seconds...`
          );
          setTimeout(attemptQuery, backoff);
        } else {
          res
            .status(500)
            .json({ message: "Database error", error: err.message });
        }
      } else {
        res.status(200).json({ message: successMessage });
      }
    });
  }
  attemptQuery();
}

// -------------------------
// NEW: Single route for all forms
// -------------------------
app.post("/save-all", (req, res) => {
  const { clientNeed, clientGoal, clientBudget, clientSiteURL, personalInfo } =
    req.body;

  if (
    !clientNeed?.trim() ||
    !clientGoal?.trim() ||
    !clientBudget?.trim() ||
    !clientSiteURL?.trim() ||
    !personalInfo?.name?.trim() ||
    !personalInfo?.email?.trim() ||
    !personalInfo?.phone?.trim()
  ) {
    return res.status(400).json({ message: "All form fields are required." });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Connection error:", err);
      return res.status(500).json({ message: "Database connection error" });
    }

    connection.beginTransaction((err) => {
      if (err) {
        connection.release();
        return res.status(500).json({ message: "Transaction error" });
      }

      const queries = [
        {
          sql: "INSERT INTO form1_client_need (client_need) VALUES (?)",
          values: [clientNeed],
        },
        {
          sql: "INSERT INTO form2_client_goal (client_goal) VALUES (?)",
          values: [clientGoal],
        },
        {
          sql: "INSERT INTO form3_client_budget (client_budget) VALUES (?)",
          values: [clientBudget],
        },
        {
          sql: "INSERT INTO form4_client_site (client_site_url) VALUES (?)",
          values: [clientSiteURL],
        },
        {
          sql: "INSERT INTO form5_client_personal_info (name, email, phone) VALUES (?, ?, ?)",
          values: [personalInfo.name, personalInfo.email, personalInfo.phone],
        },
      ];

      let index = 0;

      function runNextQuery() {
        if (index >= queries.length) {
          return connection.commit((err) => {
            connection.release();
            if (err) {
              return res.status(500).json({ message: "Commit error" });
            }
            res
              .status(200)
              .json({ message: "All form data saved successfully!" });
          });
        }

        const { sql, values } = queries[index];
        connection.query(sql, values, (err) => {
          if (err) {
            return connection.rollback(() => {
              connection.release();
              console.error("Transaction query error:", err);
              res
                .status(500)
                .json({ message: "Database error", error: err.message });
            });
          }
          index++;
          runNextQuery();
        });
      }

      runNextQuery();
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
