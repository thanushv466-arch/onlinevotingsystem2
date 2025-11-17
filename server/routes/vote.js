const router = require("express").Router();
const Vote = require("../models/Vote");

// CAST VOTE
router.post("/", async (req, res) => {
  try {
    const { election, candidate, voter } = req.body;

    const exists = await Vote.findOne({ election, voter });
    if (exists)
      return res.status(400).json({ msg: "You already voted!" });

    const vote = await Vote.create({ election, candidate, voter });
    res.json({ msg: "Vote saved", vote });
  } catch (err) {
    res.status(400).json({ msg: "Vote error", err });
  }
});

// RESULTS
router.get("/:electionId", async (req, res) => {
  try {
    const votes = await Vote.find({ election: req.params.electionId })
      .populate("candidate")
      .populate("voter");

    res.json(votes);
  } catch (err) {
    res.status(400).json({ msg: "Results error", err });
  }
});

module.exports = router;