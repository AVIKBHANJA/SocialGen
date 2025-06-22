const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();

async function makeUserAdmin(email) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const user = await User.findOneAndUpdate(
      { email: email },
      { role: "admin" },
      { new: true }
    );

    if (user) {
      console.log(`User ${user.username} (${user.email}) is now an admin!`);
    } else {
      console.log(`User with email ${email} not found.`);
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

// Get email from command line argument
const email = process.argv[2];
if (!email) {
  console.log("Usage: node makeAdmin.js <user-email>");
  process.exit(1);
}

makeUserAdmin(email);
