// const mysql = require("mysql2");
// require("dotenv").config();

// const db = mysql.createConnection({
//   //   host: "host.docker.internal", // ✅ Use this instead
//   //   host: "DESKTOP-UPKIDK7\\SQLEXPRESS",
//   host: "localhost",
//   user: "nodeuser",
//   password: "admin@098",
//   database: "Ecom",
//   port: 3306,
// });

// async function connectToDB() {
//   try {
//     // await db.authenticate();
//     db.connect((err) => {
//       if (err) {
//         console.error("Database connection failed: " + err.stack);
//         return;
//       }
//       console.log("Connected to MySQL database.");
//     });
//   } catch (error) {
//     throw error;
//   }
// }

// module.exports = {db, connectToDB };

const sql = require("mssql");
require("dotenv").config();

const dbConfig = {
  user: process.env.DB_USER || "nodeuser",
  password: process.env.DB_PASS || "admin@098",
  server: process.env.DB_HOST || "DESKTOP-UPKIDK7\\SQLEXPRESS",
  database: process.env.DB_NAME || "Ecom",
  port: 1433,
  options: {
    encrypt: false, // ⚠️
    trustServerCertificate: true,
  },
};

async function connectToDB() {
  try {
    const pool = await sql.connect(dbConfig);
    console.log("✅ Connected to SQL Server database.");
    return pool;
  } catch (err) {
    console.error("❌ Database connection failed: " + err.message);
    process.exit(1);
  }
}

module.exports = { connectToDB, sql };
