const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    unique: true,
    sparse: true, // Allows null values while maintaining uniqueness
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // Not required for Firebase users
    required: function () {
      return !this.firebaseUid; // Only required if not using Firebase
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Date,
  },
  authProvider: {
    type: String,
    enum: ["local", "firebase", "google"],
    default: "local",
  },
  apiUsage: {
    totalRequests: {
      type: Number,
      default: 0,
    },
    lastRequestDate: {
      type: Date,
    },
    monthlyRequests: {
      type: Number,
      default: 0,
    },
    monthlyResetDate: {
      type: Date,
      default: Date.now,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
