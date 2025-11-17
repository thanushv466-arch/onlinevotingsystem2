const router = require("express").Router();
const Vote = require("../models/Vote");
const Candidate = require("../models/Candidate");

// GET RESULTS FOR AN ELECTION
router.get("/:electionId", async (req, res) => {
  try {
    const electionId = req.params.electionId;

    // Count votes grouped by candidate
    const votes = await Vote.aggregate([
      { $match: { election: electionId } },
      { $group: { _id: "$candidate", count: { $sum: 1 } } }
    ]);

    // Populate candidate name + party
    const result = [];
    for (let v of votes) {
      const c = await Candidate.findById(v._id);
      if (c) {
        result.push({
          candidateId: c._id,
          name: c.name,
          party: c.party,
          votes: v.count
        });
      }
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ msg: "Results fetch failed", err: err.message });
  }
});

module.exports = router;