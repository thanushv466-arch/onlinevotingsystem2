const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  election: { type: mongoose.Schema.Types.ObjectId, ref: "Election" },
  winner: String,
  results: [
    {
      candidateName: String,
      count: Number
    }
  ],
  declaredAt: Date
});

module.exports = mongoose.model("Result", schema);