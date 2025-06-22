const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate a post using Gemini API
router.post("/generate", auth, async (req, res) => {
  try {
    const { platform, topic, audience, tone, additionalContext } = req.body;

    // Create prompt for Gemini
    const prompt = `Generate a social media post for ${platform} about "${topic}" targeting "${audience}" in a "${tone}" tone. ${
      additionalContext ? `Additional context: ${additionalContext}` : ""
    }`;

    // Generate content using Gemini 2.0 Flash
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 800,
      },
    });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    res.json({ content: text });
  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).send("Error generating content");
  }
});

// Save a generated post
router.post("/", auth, async (req, res) => {
  try {
    const { platform, content, promptData } = req.body;

    const newPost = new Post({
      user: req.user.id,
      platform,
      content,
      promptData,
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get all posts for a user
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a post
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user owns the post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
