const router = require("express").Router();
const Vote = require("../models/Vote");

// CAST VOTE - accepts ANY field name from frontend
router.post("/", async (req, res) => {
  try {
    // ACCEPT ALL POSSIBLE NAMES
    const election =
      req.body.election ||
      req.body.electionId ||
      req.body.election_id;

    const candidate =
      req.body.candidate ||
      req.body.candidateId ||
      req.body.candidate_id;

    const voter =
      req.body.voter ||
      req.body.voterId ||
      req.body.voter_id ||
      req.body.voterid;

    console.log("✔ FINAL VOTE PAYLOAD:", { election, candidate, voter });

    // VALIDATION
    if (!election || !candidate || !voter) {
      return res.status(400).json({
        msg: "Missing data (election, candidate, voter)",
        received: req.body
      });
    }

    // PREVENT DOUBLE VOTE
    const exists = await Vote.findOne({ election, voter });
    if (exists) return res.status(400).json({ msg: "You already voted" });

    // SAVE VOTE
    const vote = await Vote.create({ election, candidate, voter });

    res.json({ msg: "Vote saved", vote });

  } catch (err) {
    console.log("❌ VOTE ERROR:", err);
    res.status(500).json({ msg: "Server vote error", err });
  }
});

module.exports = router;