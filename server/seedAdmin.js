require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

const MONGO_URI = process.env.MONGODB_URI;

async function createAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");

    // Remove old admins
    await Admin.deleteMany();

    const password1 = await bcrypt.hash("password123", 10);
    const password2 = await bcrypt.hash("admin456", 10);

    const admins = await Admin.insertMany([
      {
        name: "Main Admin",
        email: "admin@example.com",
        password: password1
      },
      {
        name: "Second Admin",
        email: "admin2@example.com",
        password: password2
      }
    ]);

    console.log("🎉 Admins Created Successfully");
    console.log("👉 Admin 1 Email: admin@example.com");
    console.log("👉 Admin 1 Password: password123\n");
    console.log("👉 Admin 2 Email: admin2@example.com");
    console.log("👉 Admin 2 Password: admin456\n");

    process.exit();
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

createAdmin();


