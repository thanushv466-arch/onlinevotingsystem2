const router = require("express").Router();
const Vote = require("../models/Vote");
const Voter = require("../models/Voter");

// CAST VOTE
router.post("/", async (req, res) => {
  try {
    const voter = await Voter.findById(req.body.voter);

    if (voter.hasVoted)
      return res.status(400).json({ msg: "Voter already voted!" });

    await Vote.create({
      voter: req.body.voter,
      candidate: req.body.candidate,
      election: req.body.election,
    });

    voter.hasVoted = true;
    await voter.save();

    res.json({ msg: "Vote submitted successfully" });
  } catch (err) {
    res.status(400).json({ msg: "Vote failed", err });
  }
});

module.exports = router;