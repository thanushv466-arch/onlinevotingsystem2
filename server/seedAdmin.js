require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Admin.deleteMany({});
  const hashed = await bcrypt.hash("12345", 10);
  await Admin.create({ email: "admin@gmail.com", password: hashed, name: "Main Admin" });
  console.log("✅ Admin created successfully! (email: admin@gmail.com / pass: 12345)");
  process.exit(0);
});