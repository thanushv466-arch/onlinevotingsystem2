const mongoose = require("mongoose");

const VoterSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  election: { type: mongoose.Schema.Types.ObjectId, ref: "Election" }
});

module.exports = mongoose.model("Voter", VoterSchema);