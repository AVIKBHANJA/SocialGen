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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
