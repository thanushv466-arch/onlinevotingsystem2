const mongoose = require('mongoose');

const votingRecordSchema = new mongoose.Schema({
  voter: { type: mongoose.Schema.Types.ObjectId, ref: 'Voter', required: true },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  votedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VotingRecord', votingRecordSchema);
