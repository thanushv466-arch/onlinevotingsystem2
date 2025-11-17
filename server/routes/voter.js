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
    res.status(400).json({ msg: "Voter creation failed", err });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const voter = await Voter.findOne({ email: req.body.email });

  if (!voter) return res.status(400).json({ msg: "Voter not found" });

  const match = await bcrypt.compare(req.body.password, voter.password);

  if (!match) return res.status(400).json({ msg: "Wrong password" });

  res.json(voter);
});

// LIST VOTERS BY ELECTION
router.get("/:electionId", async (req, res) => {
  try {
    const list = await Voter.find({ election: req.params.electionId });
    res.json(list);
  } catch (err) {
    res.status(400).json({ msg: "Error loading voters" });
  }
});

module.exports = router;