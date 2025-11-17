const router = require("express").Router();
const Vote = require("../models/Vote");

router.post("/", async (req, res) => {
  try {
    // body: { electionId, candidateId, voterId }
    const existing = await Vote.findOne({ electionId: req.body.electionId, voterId: req.body.voterId });
    if (existing) return res.status(400).json({ msg: "Already voted" });
    const v = await Vote.create(req.body);
    res.json(v);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;