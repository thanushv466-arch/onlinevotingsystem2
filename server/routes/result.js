const router = require("express").Router();
const Vote = require("../models/Vote");

router.get("/:electionId", async (req, res) => {
  try {
    const result = await Vote.aggregate([
      { $match: { electionId: require("mongoose").Types.ObjectId(req.params.electionId) } },
      { $group: { _id: "$candidateId", votes: { $sum: 1 } } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;