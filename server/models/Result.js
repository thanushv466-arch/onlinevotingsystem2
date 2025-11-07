const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  votes: { type: Number, default: 0 },
  election: { type: String, required: true }
});

module.exports = mongoose.model('Result', resultSchema);