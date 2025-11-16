require('dotenv').config(); // load .env
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/Admin'); // make sure this file exists

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected!');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin);
      return process.exit(0);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create new admin
    const admin = new Admin({
      email: 'admin@example.com',
      password: hashedPassword,
    });

    await admin.save();
    console.log('Admin seeded:', admin);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin:', err);
    process.exit(1);
  }
};

seedAdmin();

