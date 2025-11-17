const router = require("express").Router();
const Vote = require("../models/Vote");

// GET RESULTS FOR AN ELECTION
router.get("/:electionId", async (req, res) => {
  try {
    const results = await Vote.aggregate([
      { $match: { election: require("mongoose").Types.ObjectId(req.params.electionId) }},
      { $group: { _id: "$candidate", votes: { $sum: 1 } } }
    ]);

    res.json(results);
  } catch (err) {
    res.status(400).json({ msg: "Error fetching results", err });
  }
});

module.exports = router;