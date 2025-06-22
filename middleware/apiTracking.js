const ApiUsage = require("../models/ApiUsage");
const User = require("../models/User");

// Middleware to track API usage
const trackApiUsage = async (req, res, next) => {
  // Skip tracking for auth routes to avoid validation errors
  if (
    req.originalUrl?.includes("/api/auth") ||
    req.originalUrl?.includes("/auth")
  ) {
    return next();
  }

  const startTime = Date.now();
  const originalJson = res.json;
  const originalSend = res.send;

  let responseBody = "";
  let requestSize = 0;
  let responseSize = 0;

  // Calculate request size
  if (req.body) {
    requestSize = JSON.stringify(req.body).length;
  }

  // Override res.json to capture response
  res.json = function (body) {
    responseBody = body;
    responseSize = JSON.stringify(body).length;
    return originalJson.call(this, body);
  };

  // Override res.send to capture response
  res.send = function (body) {
    if (typeof body === "string") {
      responseBody = body;
      responseSize = body.length;
    }
    return originalSend.call(this, body);
  };
  // Handle response finish
  res.on("finish", async () => {
    try {
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      // Extract user ID from request (if authenticated)
      const userId = req.user?.id || null; // Only track API usage for authenticated users
      // Skip tracking if no userId to avoid validation errors
      if (userId) {
        // Create usage record only for authenticated users
        const usageData = {
          userId,
          endpoint: req.originalUrl || req.url,
          method: req.method,
          ipAddress: req.ip || req.connection.remoteAddress,
          userAgent: req.get("User-Agent"),
          responseTime,
          statusCode: res.statusCode,
          requestSize,
          responseSize,
          timestamp: new Date(startTime),
        };

        // Add error if response indicates failure
        if (res.statusCode >= 400) {
          usageData.error = responseBody?.message || `HTTP ${res.statusCode}`;
        }

        // Save usage data
        await ApiUsage.create(usageData);

        // Update user's API usage statistics
        await updateUserApiStats(userId);
      }
    } catch (error) {
      console.error("Error tracking API usage:", error);
    }
  });

  next();
};

// Update user's API usage statistics
const updateUserApiStats = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Check if we need to reset monthly counter
    const lastResetDate = user.apiUsage?.monthlyResetDate || new Date(0);
    const lastResetMonth = lastResetDate.getMonth();
    const lastResetYear = lastResetDate.getFullYear();

    let monthlyRequests = user.apiUsage?.monthlyRequests || 0;

    // Reset monthly counter if it's a new month
    if (currentMonth !== lastResetMonth || currentYear !== lastResetYear) {
      monthlyRequests = 0;
    }

    // Update user statistics
    await User.findByIdAndUpdate(userId, {
      $inc: {
        "apiUsage.totalRequests": 1,
        "apiUsage.monthlyRequests":
          currentMonth !== lastResetMonth || currentYear !== lastResetYear
            ? 1
            : 1,
      },
      $set: {
        "apiUsage.lastRequestDate": now,
        "apiUsage.monthlyResetDate":
          currentMonth !== lastResetMonth || currentYear !== lastResetYear
            ? new Date(currentYear, currentMonth, 1)
            : user.apiUsage?.monthlyResetDate,
        lastLogin: now,
      },
    });
  } catch (error) {
    console.error("Error updating user API stats:", error);
  }
};

module.exports = { trackApiUsage };
