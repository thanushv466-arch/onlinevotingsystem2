const router = require("express").Router();
const Vote = require("../models/Vote");
const Candidate = require("../models/Candidate");

router.get("/:id", async (req, res) => {
  const electionId = req.params.id;
  const votes = await Vote.find({ election: electionId });

  if (votes.length === 0) return res.json([]);

  const map = {};

  for (let v of votes) {
    const cid = v.candidate.toString();
    map[cid] = (map[cid] || 0) + 1;
  }

  const results = [];

  for (let cid of Object.keys(map)) {
    const c = await Candidate.findById(cid);
    results.push({
      candidateName: c.name,
      count: map[cid]
    });
  }

  res.json(results);
});

module.exports = router;