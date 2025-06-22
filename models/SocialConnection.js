const mongoose = require("mongoose");

const SocialConnectionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  platform: {
    type: String,
    enum: ["facebook", "instagram", "twitter", "linkedin"],
    required: true,
  },
  platformAccountId: {
    type: String,
    required: true,
  },
  platformAccountName: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  tokenExpiresAt: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  permissions: [
    {
      type: String,
    },
  ],
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index to ensure one connection per platform per user
SocialConnectionSchema.index({ user: 1, platform: 1 }, { unique: true });

SocialConnectionSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("SocialConnection", SocialConnectionSchema);
