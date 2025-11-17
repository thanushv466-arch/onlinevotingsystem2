const mongoose = require("mongoose");

const ElectionSchema = new mongoose.Schema({
  name: String,
  date: Date,
  type: String,
  constituency: String,
  status: { type: String, default: "Ongoing" },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", default: null }
});

module.exports = mongoose.model("Election", ElectionSchema);
