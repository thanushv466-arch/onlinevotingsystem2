const mongoose = require('mongoose');

const PartySchema = new mongoose.Schema({
  name: String,
  symbol: String
});

module.exports = mongoose.model('Party', PartySchema);