const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  electionId: { type: mongoose.Schema.Types.ObjectId, ref: "Election" },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
  voterId: { type: String },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Vote", schema);
