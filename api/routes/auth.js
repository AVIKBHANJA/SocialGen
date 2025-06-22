const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    user = new User({
      username,
      email,
      password,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: { id: user.id, username: user.username, email: user.email },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get current user
router.get("/me", async (req, res) => {
  try {
    // Get token from header
    const token = req.header("x-auth-token");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user by id
      const user = await User.findById(decoded.user.id).select("-password");
      res.json(user);
    } catch (err) {
      res.status(401).json({ message: "Token is not valid" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Firebase Authentication - Verify Firebase token and create/login user
router.post("/firebase-verify", async (req, res) => {
  try {
    const { idToken, email, displayName, uid } = req.body;

    if (!idToken || !email || !uid) {
      return res
        .status(400)
        .json({ message: "Missing required Firebase data" });
    }

    // For free tier - we trust the frontend Firebase token
    // In production, you'd verify the token with Firebase Admin SDK

    // Find existing user by Firebase UID or email
    let user = await User.findOne({
      $or: [{ firebaseUid: uid }, { email: email }],
    });

    if (user) {
      // Update existing user with Firebase UID if not set
      if (!user.firebaseUid) {
        user.firebaseUid = uid;
        user.authProvider = "firebase";
        await user.save();
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save();
    } else {
      // Create new user
      const username = displayName || email.split("@")[0];

      user = new User({
        firebaseUid: uid,
        username: username,
        email: email,
        authProvider: "firebase",
        role: "user",
        isActive: true,
        lastLogin: new Date(),
      });

      await user.save();
    }

    // Generate JWT token for our backend
    const payload = {
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (err) {
    console.error("Firebase verify error:", err.message);
    res
      .status(500)
      .json({ message: "Server error during Firebase authentication" });
  }
});

// Update user profile
router.patch("/profile", require("../../middleware/auth"), async (req, res) => {
  try {
    const { username } = req.body;
    const userId = req.user.id;

    // Find and update user
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) {
      user.username = username;
    }

    await user.save();

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (err) {
    console.error("Profile update error:", err.message);
    res.status(500).json({ message: "Server error during profile update" });
  }
});

// Change user password
router.patch(
  "/change-password",
  require("../../middleware/auth"),
  async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user.id;

      // Find user with password
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if user has a password (not OAuth user)
      if (!user.password) {
        return res
          .status(400)
          .json({ message: "Cannot change password for OAuth users" });
      }

      // Verify current password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);

      await user.save();

      res.json({ message: "Password changed successfully" });
    } catch (err) {
      console.error("Password change error:", err.message);
      res.status(500).json({ message: "Server error during password change" });
    }
  }
);

// Delete user account
router.delete(
  "/account",
  require("../../middleware/auth"),
  async (req, res) => {
    try {
      const userId = req.user.id;

      // Find and delete user
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // TODO: Also delete user's posts, prompts, etc.
      // You may want to add cascade deletion here

      res.json({ message: "Account deleted successfully" });
    } catch (err) {
      console.error("Account deletion error:", err.message);
      res.status(500).json({ message: "Server error during account deletion" });
    }
  }
);

module.exports = router;
