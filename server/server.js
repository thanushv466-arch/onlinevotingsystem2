// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// IMPORT ROUTES
const authRoutes = require("./routes/auth");
const electionRoutes = require("./routes/election");
const candidateRoutes = require("./routes/candidate");
const voterRoutes = require("./routes/voter");
const voteRoutes = require("./routes/vote");
const resultRoutes = require("./routes/result");

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API ROUTE MAPPING (FINAL)
app.use("/api/auth", authRoutes);             // Admin login
app.use("/api/election", electionRoutes);     // Create + list elections
app.use("/api/candidate", candidateRoutes);   // Add candidates
app.use("/api/voter", voterRoutes);           // Add voters
app.use("/api/vote", voteRoutes);             // Voting
app.use("/api/result", resultRoutes);         // Election results

// CONNECT MONGO DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// START SERVER
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("🚀 Server is running on port ${PORT}"));





