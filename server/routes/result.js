const router = require("express").Router();
const Vote = require("../models/Vote");

// GET RESULTS FOR ELECTION
router.get("/:electionId", async (req, res) => {
  try {
    const electionId = req.params.electionId;

    const votes = await Vote.find({ election: electionId })
      .populate("candidate")
      .populate("voter");

    res.json(votes);

  } catch (err) {
    res.status(500).json({ msg: "Error loading results", err });
  }
});

module.exports = router;