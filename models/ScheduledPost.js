const mongoose = require("mongoose");

const ScheduledPostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  platforms: [
    {
      type: String,
      enum: ["facebook", "instagram", "twitter", "linkedin"],
      required: true,
    },
  ],
  scheduledFor: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "completed", "failed", "cancelled"],
    default: "pending",
  },
  attempts: {
    type: Number,
    default: 0,
  },
  maxAttempts: {
    type: Number,
    default: 3,
  },
  lastAttemptAt: {
    type: Date,
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
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ScheduledPostSchema.index({ scheduledFor: 1, status: 1 });
ScheduledPostSchema.index({ user: 1, status: 1 });

ScheduledPostSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("ScheduledPost", ScheduledPostSchema);
