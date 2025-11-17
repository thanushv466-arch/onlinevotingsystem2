const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: false },
  password: { type: String },          // hashed password stored on register
  hasVoted: { type: Boolean, default: false },
  // use "election" as ObjectId field (matches backend routes and frontend)
  election: { type: mongoose.Schema.Types.ObjectId, ref: "Election" }
});

module.exports = mongoose.model("Voter", schema);