const sql = require("mssql");
require("dotenv").config();

const dbConfig = {
  user: process.env.DB_USER || "nodeuser",
  password: process.env.DB_PASS || "admin@098",
  server: process.env.DB_HOST || "DESKTOP-UPKIDK7\\SQLEXPRESS",
  database: process.env.DB_NAME || "ServiceBookingDb",
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};
const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();

async function connectToDB() {
  try {
    await poolConnect;
    console.log("✅ Connected to SQL Server database.");
    return pool;
  } catch (err) {
    console.error("❌ Database connection failed: " + err.message);
    process.exit(1);
  }
}

module.exports = { connectToDB, sql, pool, poolConnect };
