const router = require('express').Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(400).json({ msg: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  res.json({ token, admin: { email: admin.email, name: admin.name } });
});

module.exports = router;