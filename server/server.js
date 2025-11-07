// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load .env file

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ Error: MONGODB_URI is not defined in environment variables!");
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});

// Load routes (only the ones you have)
try {
  const voteRoutes = require('./routes/vote');
  app.use('/vote', voteRoutes);
  console.log("✅ Route loaded: /vote");
} catch (err) {
  console.warn("⚠️ Route not found, skipping /vote");
}

try {
  const resultRoutes = require('./routes/result');
  app.use('/result', resultRoutes);
  console.log("✅ Route loaded: /result");
} catch (err) {
  console.warn("⚠️ Route not found, skipping /result");
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});






