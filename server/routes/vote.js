const router = require('express').Router();
const Candidate = require('../models/Candidate');

// Create candidate
router.post('/', async (req, res) => {
  const candidate = await Candidate.create(req.body);
  res.json(candidate);
});

// Get all candidates
router.get('/', async (req, res) => {
  const candidates = await Candidate.find().populate('party election');
  res.json(candidates);
});

module.exports = router;