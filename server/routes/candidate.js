const router = require("express").Router();
const Candidate = require("../models/Candidate");

// CREATE CANDIDATE
router.post("/", async (req, res) => {
  try {
    const c = await Candidate.create(req.body);
    res.json(c);
  } catch (err) {
    res.status(400).json({ msg: "Error creating candidate", err: err.message });
  }
});

// GET CANDIDATES BY ELECTION
router.get("/:electionId", async (req, res) => {
  try {
    const list = await Candidate.find({ election: req.params.electionId });
    res.json(list);
  } catch (err) {
    res.status(400).json({ msg: "Error fetching candidates", err: err.message });
  }
});

module.exports = router;