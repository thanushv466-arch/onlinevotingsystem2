require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

const MONGO_URI = process.env.MONGODB_URI;

async function createAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoSDB Connected");

    // Remove old admins
    await Admin.deleteMany();

    const hashed = await bcrypt.hash("password123", 10);

    const admin = await Admin.create({
      name: "Main Admin",
      email: "admin@example.com",
      password: hashed
    });

    console.log("🎉 Admin Created Successfully");
    console.log("👉 Email: admin@example.com");
    console.log("👉 Password: password123");

    process.exit();
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

createAdmin();

