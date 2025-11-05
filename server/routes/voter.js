const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Voter = require('../models/Voter');

// Register voter
router.post('/register', async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const voter = await Voter.create({ ...req.body, password: hashed });
    res.json(voter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login voter
router.post('/login', async (req, res) => {
  const voter = await Voter.findOne({ email: req.body.email });
  if (!voter) return res.status(400).json({ msg: 'Invalid credentials' });
  const match = await bcrypt.compare(req.body.password, voter.password);
  if (!match) return res.status(400).json({ msg: 'Invalid credentials' });
  res.json(voter);
});

module.exports = router;