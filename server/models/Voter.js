const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: String,
  email: String,
  voterId: String,
  electionId: { type: mongoose.Schema.Types.ObjectId, ref: "Election" }
});
module.exports = mongoose.model("Voter", schema);