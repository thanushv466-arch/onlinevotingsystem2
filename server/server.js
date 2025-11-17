require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ROUTES
const authRoutes = require("./routes/auth");
const electionRoutes = require("./routes/election");
const candidateRoutes = require("./routes/candidate");
const voterRoutes = require("./routes/voter");
const voteRoutes = require("./routes/vote");
const resultRoutes = require("./routes/result");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTE MAPPING
app.use("/api/auth", authRoutes);
app.use("/api/election", electionRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/voter", voterRoutes);
app.use("/api/vote", voteRoutes);
app.use("/api/result", resultRoutes);

// CONNECT MONGO
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// START SERVER
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));





