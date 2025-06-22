const express = require("express");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Prompt = require("../../models/Prompt");
const ApiUsage = require("../../models/ApiUsage");
const { requireAdmin } = require("../../middleware/adminAuth");
const router = express.Router();

// Get dashboard statistics
router.get("/dashboard", requireAdmin, async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    // User statistics
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const newUsersThisMonth = await User.countDocuments({
      createdAt: { $gte: startOfMonth },
    });

    // Post statistics
    const totalPosts = await Post.countDocuments();
    const postsThisMonth = await Post.countDocuments({
      createdAt: { $gte: startOfMonth },
    });

    // API usage statistics
    const totalApiCalls = await ApiUsage.countDocuments();
    const apiCallsToday = await ApiUsage.countDocuments({
      timestamp: { $gte: startOfDay },
    });
    const apiCallsThisWeek = await ApiUsage.countDocuments({
      timestamp: { $gte: startOfWeek },
    });
    const apiCallsThisMonth = await ApiUsage.countDocuments({
      timestamp: { $gte: startOfMonth },
    });

    // Error rate calculation
    const totalErrors = await ApiUsage.countDocuments({
      statusCode: { $gte: 400 },
    });
    const errorRate =
      totalApiCalls > 0 ? ((totalErrors / totalApiCalls) * 100).toFixed(2) : 0;

    // Most active users
    const topUsers = await ApiUsage.aggregate([
      {
        $match: {
          userId: { $ne: null },
          timestamp: { $gte: startOfMonth },
        },
      },
      {
        $group: {
          _id: "$userId",
          requestCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          username: "$user.username",
          email: "$user.email",
          requestCount: 1,
        },
      },
      {
        $sort: { requestCount: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    res.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        newThisMonth: newUsersThisMonth,
      },
      posts: {
        total: totalPosts,
        thisMonth: postsThisMonth,
      },
      apiUsage: {
        total: totalApiCalls,
        today: apiCallsToday,
        thisWeek: apiCallsThisWeek,
        thisMonth: apiCallsThisMonth,
        errorRate: parseFloat(errorRate),
      },
      topUsers,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Failed to fetch dashboard statistics" });
  }
});

// Get all users with pagination
router.get("/users", requireAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    const searchFilter = search
      ? {
          $or: [
            { username: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(searchFilter)
      .select("-password")
      .sort({ [sortBy]: sortOrder })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(searchFilter);

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Get user details with API usage
router.get("/users/:id", requireAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get user's recent API usage
    const recentUsage = await ApiUsage.find({ userId: req.params.id })
      .sort({ timestamp: -1 })
      .limit(20);

    // Get user's posts count
    const postsCount = await Post.countDocuments({ userId: req.params.id });

    // Get user's prompts count
    const promptsCount = await Prompt.countDocuments({ userId: req.params.id });

    res.json({
      user,
      recentUsage,
      postsCount,
      promptsCount,
    });
  } catch (error) {
    console.error("Get user details error:", error);
    res.status(500).json({ message: "Failed to fetch user details" });
  }
});

// Update user (activate/deactivate, change role)
router.patch("/users/:id", requireAdmin, async (req, res) => {
  try {
    const { isActive, role } = req.body;
    const allowedUpdates = {};

    if (typeof isActive === "boolean") {
      allowedUpdates.isActive = isActive;
    }

    if (role && ["user", "admin"].includes(role)) {
      allowedUpdates.role = role;
    }

    const user = await User.findByIdAndUpdate(req.params.id, allowedUpdates, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
});

// Get API usage analytics
router.get("/analytics/api-usage", requireAdmin, async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Daily API usage
    const dailyUsage = await ApiUsage.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: "$date",
          totalRequests: { $sum: 1 },
          successfulRequests: {
            $sum: {
              $cond: [{ $lt: ["$statusCode", 400] }, 1, 0],
            },
          },
          errors: {
            $sum: {
              $cond: [{ $gte: ["$statusCode", 400] }, 1, 0],
            },
          },
          avgResponseTime: { $avg: "$responseTime" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Endpoint popularity
    const endpointStats = await ApiUsage.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: "$endpoint",
          requests: { $sum: 1 },
          avgResponseTime: { $avg: "$responseTime" },
          errors: {
            $sum: {
              $cond: [{ $gte: ["$statusCode", 400] }, 1, 0],
            },
          },
        },
      },
      {
        $sort: { requests: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    res.json({
      dailyUsage,
      endpointStats,
    });
  } catch (error) {
    console.error("API analytics error:", error);
    res.status(500).json({ message: "Failed to fetch API analytics" });
  }
});

// Get Gemini API usage (requires Google Cloud Console integration)
router.get("/analytics/gemini-usage", requireAdmin, async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Aggregate Gemini token usage from our tracking
    const geminiUsage = await ApiUsage.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate },
          "geminiTokensUsed.totalTokens": { $gt: 0 },
        },
      },
      {
        $group: {
          _id: "$date",
          totalTokens: { $sum: "$geminiTokensUsed.totalTokens" },
          inputTokens: { $sum: "$geminiTokensUsed.inputTokens" },
          outputTokens: { $sum: "$geminiTokensUsed.outputTokens" },
          requests: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Calculate estimated costs (Gemini 2.0 Flash pricing)
    const estimatedCost = geminiUsage.reduce((total, day) => {
      const inputCost = (day.inputTokens / 1000000) * 0.075; // $0.075 per 1M input tokens
      const outputCost = (day.outputTokens / 1000000) * 0.3; // $0.30 per 1M output tokens
      return total + inputCost + outputCost;
    }, 0);

    res.json({
      geminiUsage,
      estimatedCost: estimatedCost.toFixed(4),
      totalTokens: geminiUsage.reduce((sum, day) => sum + day.totalTokens, 0),
      totalRequests: geminiUsage.reduce((sum, day) => sum + day.requests, 0),
    });
  } catch (error) {
    console.error("Gemini analytics error:", error);
    res.status(500).json({ message: "Failed to fetch Gemini analytics" });
  }
});

// Delete user (soft delete by deactivating)
router.delete("/users/:id", requireAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deactivated successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Failed to deactivate user" });
  }
});

module.exports = router;
