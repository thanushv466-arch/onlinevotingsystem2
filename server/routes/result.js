const router = require("express").Router();
const Vote = require("../models/Vote");
const Candidate = require("../models/Candidate");
const Election = require("../models/Election");

// GET RESULTS
router.get("/:id", async (req, res) => {
  const electionId = req.params.id;

  const votes = await Vote.find({ election: electionId }).populate("candidate");
  if (!votes.length) return res.json({ results: [], winner: null });

  // Count votes
  const tally = {};
  votes.forEach(v => {
    const cid = v.candidate._id.toString();
    tally[cid] = (tally[cid] || 0) + 1;
  });

  // Build result list
  const candidates = await Candidate.find({ election: electionId });

  const results = candidates.map(c => ({
    _id: c._id,
    name: c.name,
    party: c.party,
    votes: tally[c._id] || 0
  }));

  // Sort highest votes first
  results.sort((a, b) => b.votes - a.votes);

  // Winner (top candidate)
  const winner = results[0];

  res.json({ results, winner });
});

// DECLARE WINNER
router.post("/declare/:id", async (req, res) => {
  const electionId = req.params.id;

  const votes = await Vote.find({ election: electionId }).populate("candidate");
  if (!votes.length)
    return res.status(400).json({ msg: "No votes to declare winner" });

  const tally = {};
  votes.forEach(v => {
    const cid = v.candidate._id.toString();
    tally[cid] = (tally[cid] || 0) + 1;
  });

  const candidates = await Candidate.find({ election: electionId });

  const results = candidates.map(c => ({
    _id: c._id,
    name: c.name,
    party: c.party,
    votes: tally[c._id] || 0
  }));

  results.sort((a, b) => b.votes - a.votes);

  const winner = results[0];

  // Save in Election collection
  await Election.findByIdAndUpdate(electionId, {
    winner: winner._id,
    status: "Completed"
  });

  res.json({ msg: "Winner declared successfully!", winner });
});

module.exports = router;