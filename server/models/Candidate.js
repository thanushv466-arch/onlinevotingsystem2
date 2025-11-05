const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  name: String,
  age: Number,
  election: { type: mongoose.Schema.Types.ObjectId, ref: 'Election' },
  party: { type: mongoose.Schema.Types.ObjectId, ref: 'Party' },
  constituency: String,
  affidavit: String
});

module.exports = mongoose.model('Candidate', CandidateSchema);