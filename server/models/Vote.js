const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  voter: { type: mongoose.Schema.Types.ObjectId, ref: "Voter" },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
  election: { type: mongoose.Schema.Types.ObjectId, ref: "Election" }
});

module.exports = mongoose.model("Vote", schema);