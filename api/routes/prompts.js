const express = require("express");
const router = express.Router();
const Prompt = require("../../models/Prompt");
const auth = require("../../middleware/auth");

// Get all prompts for a user
router.get("/", auth, async (req, res) => {
  try {
    const prompts = await Prompt.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(prompts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Create a new prompt
router.post("/", auth, async (req, res) => {
  try {
    const { platform, topic, audience, tone, additionalContext } = req.body;

    const newPrompt = new Prompt({
      user: req.user.id,
      platform,
      topic,
      audience,
      tone,
      additionalContext,
    });

    const prompt = await newPrompt.save();
    res.json(prompt);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update a prompt
router.put("/:id", auth, async (req, res) => {
  try {
    const { platform, topic, audience, tone, additionalContext } = req.body;

    // Build prompt object
    const promptFields = {};
    if (platform) promptFields.platform = platform;
    if (topic) promptFields.topic = topic;
    if (audience) promptFields.audience = audience;
    if (tone) promptFields.tone = tone;
    if (additionalContext) promptFields.additionalContext = additionalContext;

    // Find prompt by id
    let prompt = await Prompt.findById(req.params.id);

    // Check if prompt exists
    if (!prompt) return res.status(404).json({ message: "Prompt not found" });

    // Check if user owns prompt
    if (prompt.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Update prompt
    prompt = await Prompt.findByIdAndUpdate(
      req.params.id,
      { $set: promptFields },
      { new: true }
    );

    res.json(prompt);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a prompt
router.delete("/:id", auth, async (req, res) => {
  try {
    // Find prompt by id
    let prompt = await Prompt.findById(req.params.id);

    // Check if prompt exists
    if (!prompt) return res.status(404).json({ message: "Prompt not found" });

    // Check if user owns prompt
    if (prompt.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Delete prompt
    await Prompt.findByIdAndDelete(req.params.id);

    res.json({ message: "Prompt removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
