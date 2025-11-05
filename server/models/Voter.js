const mongoose = require('mongoose');

const VoterSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  phone: String,
  address: String,
  email: { type: String, unique: true },
  password: String,
  constituency: String,
  hasVoted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Voter', VoterSchema);