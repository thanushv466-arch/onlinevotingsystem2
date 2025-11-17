const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
  election: { type: mongoose.Schema.Types.ObjectId, ref: "Election", required: true },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true },
  voter: { type: mongoose.Schema.Types.ObjectId, ref: "Voter", required: true }
});

module.exports = mongoose.model("Vote", VoteSchema);