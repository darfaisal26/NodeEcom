// Config/db.js
const sql = require("mssql");
require("dotenv").config();

const config = {
  user: "nodeuser",
  password: "admin@098",
  server: "DESKTOP-UPKIDK7\\SQLEXPRESS",
  database: "ServiceBookingDb",
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

pool.on("error", (err) => {
  console.error("SQL Pool Error:", err);
});

// This mimics connectToDB function from Sequelize
async function connectToDB() {
  try {
    await poolConnect;
    console.log("✅ Connected to SQL Server");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw error;
  }
}

module.exports = {
  sql,
  poolConnect,
  connectToDB,
};
