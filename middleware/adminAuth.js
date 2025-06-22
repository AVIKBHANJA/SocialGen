const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to check if user is admin
const requireAdmin = async (req, res, next) => {
  try {
    // Get token from header (support both formats)
    const token =
      req.header("x-auth-token") ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user?.id || decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid token. User not found." });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: "Account is deactivated." });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = { requireAdmin };
