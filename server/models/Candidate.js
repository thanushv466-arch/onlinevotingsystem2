const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: String,
  party: String,
  electionId: { type: mongoose.Schema.Types.ObjectId, ref: "Election" }
});
module.exports = mongoose.model("Candidate", schema);