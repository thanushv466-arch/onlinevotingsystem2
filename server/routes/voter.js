const router = require("express").Router();
const Voter = require("../models/Voter");
const bcrypt = require("bcryptjs");

// REGISTER VOTER
router.post("/", async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);

    const voter = await Voter.create({
      name: req.body.name,
      email: req.body.email,
      password: hashed,
      election: req.body.election
    });

    res.json(voter);
  } catch (err) {
    res.status(400).json({ msg: "Voter creation failed", err: err.message });
  }
});

// LOGIN VOTER
router.post("/login", async (req, res) => {
  try {
    const voter = await Voter.findOne({ email: req.body.email });
    if (!voter) return res.status(400).json({ msg: "Voter not found" });

    const match = await bcrypt.compare(req.body.password, voter.password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });

    res.json(voter);
  } catch (err) {
    res.status(500).json({ msg: "Server error", err: err.message });
  }
});

// GET VOTERS BY ELECTION (required by frontend)
router.get("/:electionId", async (req, res) => {
  try {
    const voters = await Voter.find({ election: req.params.electionId });
    res.json(voters);
  } catch (err) {
    res.status(400).json({ msg: "Error fetching voters", err: err.message });
  }
});

module.exports = router;