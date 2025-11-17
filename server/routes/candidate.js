const router = require("express").Router();
const Candidate = require("../models/Candidate");

router.post("/", async (req, res) => {
  try {
    const c = await Candidate.create(req.body);
    res.json(c);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/:electionId", async (req, res) => {
  try {
    const list = await Candidate.find({ electionId: req.params.electionId });
    res.json(list);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;