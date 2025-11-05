const router = require('express').Router();
const Election = require('../models/Election');

// Create election
router.post('/', async (req, res) => {
  const election = await Election.create(req.body);
  res.json(election);
});

// Get all elections
router.get('/', async (req, res) => {
  const elections = await Election.find();
  res.json(elections);
});

module.exports = router;