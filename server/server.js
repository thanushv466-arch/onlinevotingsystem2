// server.js
// ============================
// ONLINE VOTING SYSTEM SERVER
// ============================

// Only load dotenv for local development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const adminRoutes = require("./routes/admin");
const voterRoutes = require("./routes/voter");
const voteRoutes = require("./routes/vote");
const resultRoutes = require("./routes/result");

app.use("/api/admin", adminRoutes);
app.use("/api/voter", voterRoutes);
app.use("/api/vote", voteRoutes);
app.use("/api/result", resultRoutes);

// MongoDB connection
const dbURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/onlinevotingsystem";

if (!dbURI) {
  console.error("❌ Error: MONGODB_URI is not defined!");
  process.exit(1);
}

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Serve client in production (optional if you have React frontend)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});






