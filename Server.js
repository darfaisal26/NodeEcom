// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");

// const bodyParser = require("body-parser");
// const { connectToDB, db } = require("./Config/db");
// const { swaggerUi, swaggerSpec } = require("./Swagger");
// const userRoutes = require("./routes/userRoutes");
// const roleRoutes = require("./routes/roleRoutes");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Routes
// app.use("/users", userRoutes);
// app.use("/roles", roleRoutes);

// // Swagger docs route
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// const initializeServer = async () => {
//   try {
//     await connectToDB();
//     const PORT = 5000;
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("❌ Error initializing server:", error);
//   }
// };

// initializeServer();

// server.js or index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { connectToDB } = require("./Config/db"); // ✅ updated import
const { swaggerUi, swaggerSpec } = require("./Swagger");

const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Server init
const initializeServer = async () => {
  try {
    await connectToDB(); // ✅ ensures mssql connects before server starts
    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error initializing server:", error);
  }
};

initializeServer();
