// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());

// Check MongoDB URI
const dbURI = process.env.MONGODB_URI;
if (!dbURI) {
  console.error("❌ Error: MONGODB_URI is not defined in environment variables!");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(dbURI)
  .then(() => console.log("✅ MongoDB connected!"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Import routes safely
try {
  const voteRoutes = require('./routes/vote');
  const resultRoutes = require('./routes/result');
  app.use('/vote', voteRoutes);
  app.use('/result', resultRoutes);
} catch (err) {
  console.error("❌ Failed to load routes:", err.message);
}

// Root route
app.get('/', (req, res) => {
  res.send('Online Voting System API is running!');
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});





