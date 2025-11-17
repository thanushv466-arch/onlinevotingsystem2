const router = require("express").Router();
const Election = require("../models/Election");

router.post("/", async (req, res) => {
  try {
    const election = await Election.create(req.body);
    res.json(election);
  } catch (err) {
    res.status(500).json({ msg: "Create error", error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const list = await Election.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ msg: "List error" });
  }
});

module.exports = router;