const mongoose = require('mongoose');

const ElectionSchema = new mongoose.Schema({
  name: String,
  date: Date,
  type: String,
  constituency: String,
  status: { type: String, default: 'Upcoming' } // Upcoming / Ongoing / Completed
});

module.exports = mongoose.model('Election', ElectionSchema);