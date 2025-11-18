const router = require("express").Router();
const Vote = require("../models/Vote");
const Candidate = require("../models/Candidate");
const Result = require("../models/Result");

// LIVE RESULTS for chart + list
router.get("/:id", async (req, res) => {
  const electionId = req.params.id;

  const votes = await Vote.find({ election: electionId });

  if (votes.length === 0)
    return res.json({ results: [], winner: null });

  // Count votes
  const voteCount = {};
  for (let v of votes) {
    const cid = v.candidate.toString();
    voteCount[cid] = (voteCount[cid] || 0) + 1;
  }

  const results = [];
  let winner = null;
  let maxVotes = -1;

  for (let cid of Object.keys(voteCount)) {
    const candidate = await Candidate.findById(cid);

    const entry = {
      _id: cid,
      name: candidate.name,
      party: candidate.party,
      votes: voteCount[cid]
    };

    results.push(entry);

    if (entry.votes > maxVotes) {
      maxVotes = entry.votes;
      winner = entry;
    }
  }

  res.json({ results, winner });
});

// SAVE FINAL RESULT (DECLARE WINNER)
router.post("/declare/:id", async (req, res) => {
  const electionId = req.params.id;

  const live = await Vote.find({ election: electionId });
  if (live.length === 0)
    return res.status(400).json({ msg: "No votes to declare result" });

  // prevent double declaration
  const exists = await Result.findOne({ election: electionId });
  if (exists)
    return res.status(400).json({ msg: "Result already declared" });

  // Count votes
  const voteCount = {};
  for (let v of live) {
    const cid = v.candidate.toString();
    voteCount[cid] = (voteCount[cid] || 0) + 1;
  }

  const results = [];
  let winner = null;
  let maxVotes = -1;

  for (let cid of Object.keys(voteCount)) {
    const candidate = await Candidate.findById(cid);

    const entry = {
      _id: cid,
      name: candidate.name,
      party: candidate.party,
      votes: voteCount[cid]
    };

    results.push(entry);

    if (entry.votes > maxVotes) {
      maxVotes = entry.votes;
      winner = entry;
    }
  }

  await Result.create({
    election: electionId,
    winner: winner,
    results: results,
    declaredAt: new Date()
  });

  res.json({
    msg: "Winner declared successfully!",
    winner,
    results
  });
});

module.exports = router;