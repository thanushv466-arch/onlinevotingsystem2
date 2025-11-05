const router = require('express').Router();
const VotingRecord = require('../models/VotingRecord');
const Result = require('../models/Result');

// Calculate & store result
router.post('/calculate', async (req, res) => {
  const { electionId } = req.body;
  const votes = await VotingRecord.find({ election: electionId });
  const count = {};

  votes.forEach(v => {
    const id = v.candidate.toString();
    count[id] = (count[id] || 0) + 1;
  });

  const winnerId = Object.keys(count).reduce((a, b) => (count[a] > count[b] ? a : b));
  const total = votes.length;

  const result = await Result.create({ election: electionId, winner: winnerId, totalVotes: total, status: 'Declared' });
  res.json(result);
});

// Get results
router.get('/', async (req, res) => {
  const results = await Result.find().populate('winner election');
  res.json(results);
});

module.exports = router;