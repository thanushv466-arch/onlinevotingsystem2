const router = require("express").Router();
const Vote = require("../models/Vote");
const Candidate = require("../models/Candidate");
const Result = require("../models/Result");

// ⿡ Get LIVE results (not saved)
router.get("/:id", async (req, res) => {
  const electionId = req.params.id;
  const votes = await Vote.find({ election: electionId });

  if (votes.length === 0) return res.json([]);

  const map = {};
  for (let v of votes) {
    const cid = v.candidate.toString();
    map[cid] = (map[cid] || 0) + 1;
  }

  const resultArray = [];
  for (let cid of Object.keys(map)) {
    const candidate = await Candidate.findById(cid);
    resultArray.push({
      candidateId: cid,
      candidateName: candidate.name,
      count: map[cid]
    });
  }
 res.json(resultArray);
});

// ⿢ Declare winner + save result to DB
router.post("/declare/:id", async (req, res) => {
  const electionId = req.params.id;

  const exists = await Result.findOne({ election: electionId });
  if (exists)
    return res.status(400).json({ msg: "Result already declared" });

  const votes = await Vote.find({ election: electionId });
  if (votes.length === 0)
    return res.status(400).json({ msg: "No votes to declare" });

  const map = {};
  for (let v of votes) {
    const cid = v.candidate.toString();
    map[cid] = (map[cid] || 0) + 1;
  }

  let winner = "";
  let maxVotes = -1;
  const results = [];

  for (let cid of Object.keys(map)) {
    const candidate = await Candidate.findById(cid);
    results.push({
      candidateName: candidate.name,
      count: map[cid]
    });

    if (map[cid] > maxVotes) {
      maxVotes = map[cid];
      winner = candidate.name;
    }
  }
const saved = await Result.create({
    election: electionId,
    winner,
    results,
    declaredAt: new Date()
  });

  res.json(saved);
});

// ⿣ Fetch SAVED result
router.get("/saved/:id", async (req, res) => {
  const saved = await Result.findOne({ election: req.params.id });
  if (!saved) return res.status(404).json({ msg: "No saved result" });
  res.json(saved);
});

module.exports = router;
