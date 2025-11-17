const router = require("express").Router();
const Vote = require("../models/Vote");

// CAST VOTE
router.post("/", async (req, res) => {
  try {
    const { election, candidate, voter } = req.body;

    console.log("Incoming vote payload:", req.body);

    // Prevent double vote
    const exists = await Vote.findOne({ election, voter });
    if (exists) {
      return res.status(400).json({ msg: "You already voted" });
    }

    const vote = await Vote.create({
      election,
      candidate,
      voter
    });

    res.json({ msg: "Vote saved successfully", vote });

  } catch (err) {
    console.log("Vote error:", err);
    res.status(400).json({ msg: "Vote error", err });
  }
});

module.exports = router;