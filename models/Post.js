const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  promptData: {
    platform: String,
    topic: String,
    audience: String,
    tone: String,
    additionalContext: String,
  },
  // Scheduling fields
  status: {
    type: String,
    enum: ["draft", "scheduled", "published", "failed"],
    default: "draft",
  },
  scheduledFor: {
    type: Date,
    default: null,
  },
  publishedAt: {
    type: Date,
    default: null,
  },
  socialMediaConnections: {
    facebook: {
      accessToken: String,
      pageId: String,
      enabled: { type: Boolean, default: false },
    },
    instagram: {
      accessToken: String,
      accountId: String,
      enabled: { type: Boolean, default: false },
    },
    twitter: {
      accessToken: String,
      accessTokenSecret: String,
      enabled: { type: Boolean, default: false },
    },
    linkedin: {
      accessToken: String,
      personId: String,
      enabled: { type: Boolean, default: false },
    },
  },
  publishResults: [
    {
      platform: String,
      success: Boolean,
      postId: String,
      error: String,
      publishedAt: Date,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
