const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  title: String,
  startDate: Date,
  endDate: Date,
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }],
});

module.exports = mongoose.model('Election', electionSchema);
