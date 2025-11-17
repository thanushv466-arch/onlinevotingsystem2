const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  party: { type: String },
  // use field name "election" (ObjectId) — this matches backend queries & frontend POSTs
  election: { type: mongoose.Schema.Types.ObjectId, ref: "Election", required: true }
});

module.exports = mongoose.model("Candidate", schema);