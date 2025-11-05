const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  election: { type: mongoose.Schema.Types.ObjectId, ref: 'Election' },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
  totalVotes: Number,
  status: String
});

module.exports = mongoose.model('Result', ResultSchema);