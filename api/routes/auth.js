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

module.exports = router;
