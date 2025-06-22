const mongoose = require("mongoose");

const ApiUsageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  endpoint: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
  },
  userAgent: {
    type: String,
  },
  responseTime: {
    type: Number, // in milliseconds
  },
  statusCode: {
    type: Number,
  },
  geminiTokensUsed: {
    inputTokens: {
      type: Number,
      default: 0,
    },
    outputTokens: {
      type: Number,
      default: 0,
    },
    totalTokens: {
      type: Number,
      default: 0,
    },
  },
  requestSize: {
    type: Number, // in bytes
  },
  responseSize: {
    type: Number, // in bytes
  },
  error: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  date: {
    type: String, // YYYY-MM-DD format for easy querying
    default: function () {
      return new Date().toISOString().split("T")[0];
    },
  },
});

// Index for efficient querying
ApiUsageSchema.index({ userId: 1, timestamp: -1 });
ApiUsageSchema.index({ date: 1 });
ApiUsageSchema.index({ endpoint: 1, timestamp: -1 });

module.exports = mongoose.model("ApiUsage", ApiUsageSchema);
