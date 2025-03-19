require("dotenv").config();
const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const { connectToDB, db } = require("./Config/ConfigDb");


const app = express();
app.use(cors());
app.use(bodyParser.json());



const initializeServer = async () => {
  try {
    await connectToDB();
    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error initializing server:", error);
  }
};

initializeServer();
