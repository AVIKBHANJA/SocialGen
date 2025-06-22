const mongoose = require("mongoose");

const PromptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  audience: {
    type: String,
    required: true,
  },
  tone: {
    type: String,
    required: true,
  },
  additionalContext: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Prompt", PromptSchema);
