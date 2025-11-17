const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
  name: String,
  party: String,
  election: { type: mongoose.Schema.Types.ObjectId, ref: "Election" }
});

module.exports = mongoose.model("Candidate", CandidateSchema);