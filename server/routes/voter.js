const router = require("express").Router();
const Voter = require("../models/Voter");

router.post("/", async (req, res) => {
  try {
    const v = await Voter.create(req.body);
    res.json(v);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/:electionId", async (req, res) => {
  try {
    const list = await Voter.find({ electionId: req.params.electionId });
    res.json(list);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;