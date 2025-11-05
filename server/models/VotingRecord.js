const mongoose = require('mongoose');

const VotingRecordSchema = new mongoose.Schema({
  voter: { type: mongoose.Schema.Types.ObjectId, ref: 'Voter' },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
  election: { type: mongoose.Schema.Types.ObjectId, ref: 'Election' },
  timeStamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VotingRecord', VotingRecordSchema);