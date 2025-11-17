const router = require("express").Router();
const Vote = require("../models/Vote");

// GET RESULTS + WINNER
router.get("/:electionId", async (req, res) => {
  try {
    const electionId = req.params.electionId;

    // fetch all votes for the election
    const votes = await Vote.find({ election: electionId })
      .populate("candidate")
      .populate("voter");

    if (votes.length === 0) {
      return res.json({
        winner: null,
        results: [],
        totalVotes: 0,
        msg: "No votes yet"
      });
    }

    // count votes per candidate
    const voteCount = {};

    votes.forEach(v => {
      const cId = v.candidate._id.toString();

      if (!voteCount[cId]) {
        voteCount[cId] = {
          candidate: v.candidate,
          count: 0
        };
      }

      voteCount[cId].count++;
    });

    // convert to array & sort by votes
    const sortedResults = Object.values(voteCount).sort(
      (a, b) => b.count - a.count
    );

    // winner is first item in sorted list
    const winner = sortedResults[0];

    res.json({
      winner,
      results: sortedResults,
      totalVotes: votes.length
    });

  } catch (err) {
    res.status(500).json({ msg: "Error loading results", err });
  }
});

module.exports = router;