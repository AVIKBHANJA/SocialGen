const schedule = require("node-schedule");
const ScheduledPost = require("../models/ScheduledPost");
const SocialConnection = require("../models/SocialConnection");
const Post = require("../models/Post");
const SocialMediaPublisher = require("./socialMediaPublisher");

class SchedulingService {
  constructor() {
    this.publisher = new SocialMediaPublisher();
    this.scheduledJobs = new Map();
    this.initializeScheduler();
  }

  async initializeScheduler() {
    // Run every minute to check for pending posts
    schedule.scheduleJob("* * * * *", async () => {
      await this.processPendingPosts();
    });

    // Load existing scheduled posts on startup
    await this.loadExistingScheduledPosts();
  }

  async loadExistingScheduledPosts() {
    try {
      const pendingPosts = await ScheduledPost.find({
        status: "pending",
        scheduledFor: { $gte: new Date() },
      }).populate("post user");

      for (const scheduledPost of pendingPosts) {
        this.schedulePost(scheduledPost);
      }

      console.log(`Loaded ${pendingPosts.length} existing scheduled posts`);
    } catch (error) {
      console.error("Error loading existing scheduled posts:", error);
    }
  }

  async schedulePost(scheduledPost) {
    const jobId = scheduledPost._id.toString();

    // Cancel existing job if it exists
    if (this.scheduledJobs.has(jobId)) {
      this.scheduledJobs.get(jobId).cancel();
    }

    // Schedule the new job
    const job = schedule.scheduleJob(scheduledPost.scheduledFor, async () => {
      await this.publishScheduledPost(scheduledPost._id);
      this.scheduledJobs.delete(jobId);
    });

    this.scheduledJobs.set(jobId, job);
    console.log(`Scheduled post ${jobId} for ${scheduledPost.scheduledFor}`);
  }

  async createScheduledPost(userId, postId, platforms, scheduledFor) {
    try {
      const scheduledPost = new ScheduledPost({
        user: userId,
        post: postId,
        platforms,
        scheduledFor: new Date(scheduledFor),
      });

      await scheduledPost.save();
      await scheduledPost.populate("post user");

      // Schedule the job
      this.schedulePost(scheduledPost);

      return scheduledPost;
    } catch (error) {
      console.error("Error creating scheduled post:", error);
      throw error;
    }
  }

  async publishScheduledPost(scheduledPostId) {
    try {
      const scheduledPost = await ScheduledPost.findById(
        scheduledPostId
      ).populate("post user");

      if (!scheduledPost || scheduledPost.status !== "pending") {
        console.log(
          `Scheduled post ${scheduledPostId} not found or not pending`
        );
        return;
      }

      // Update status to processing
      scheduledPost.status = "processing";
      scheduledPost.attempts += 1;
      scheduledPost.lastAttemptAt = new Date();
      await scheduledPost.save();

      // Get user's social connections for the specified platforms
      const connections = await SocialConnection.find({
        user: scheduledPost.user._id,
        platform: { $in: scheduledPost.platforms },
        isActive: true,
      });

      if (connections.length === 0) {
        throw new Error("No active social media connections found");
      }

      // Validate connections before publishing
      const validConnections = [];
      for (const connection of connections) {
        const isValid = await this.publisher.validateConnection(connection);
        if (isValid) {
          validConnections.push(connection);
        } else {
          console.warn(`Invalid connection for ${connection.platform}`);
        }
      }

      if (validConnections.length === 0) {
        throw new Error("No valid social media connections found");
      }

      // Publish to all platforms
      const publishResults = await this.publisher.publishToAllPlatforms(
        scheduledPost.post.content,
        validConnections,
        scheduledPost.post._id
      );

      // Update scheduled post with results
      scheduledPost.publishResults = publishResults;

      const hasSuccessfulPublish = publishResults.some(
        (result) => result.success
      );
      scheduledPost.status = hasSuccessfulPublish ? "completed" : "failed";

      await scheduledPost.save();

      // Update the original post
      const post = await Post.findById(scheduledPost.post._id);
      if (post) {
        post.status = hasSuccessfulPublish ? "published" : "failed";
        post.publishedAt = hasSuccessfulPublish ? new Date() : null;
        post.publishResults = publishResults;
        await post.save();
      }

      console.log(
        `Published scheduled post ${scheduledPostId} with ${
          publishResults.filter((r) => r.success).length
        }/${publishResults.length} successful publishes`
      );
    } catch (error) {
      console.error(
        `Error publishing scheduled post ${scheduledPostId}:`,
        error
      );

      // Update scheduled post with error
      const scheduledPost = await ScheduledPost.findById(scheduledPostId);
      if (scheduledPost) {
        if (scheduledPost.attempts >= scheduledPost.maxAttempts) {
          scheduledPost.status = "failed";
        } else {
          scheduledPost.status = "pending";
          // Retry in 5 minutes
          const retryTime = new Date(Date.now() + 5 * 60 * 1000);
          scheduledPost.scheduledFor = retryTime;
          this.schedulePost(scheduledPost);
        }
        await scheduledPost.save();
      }
    }
  }

  async processPendingPosts() {
    try {
      const now = new Date();
      const pendingPosts = await ScheduledPost.find({
        status: "pending",
        scheduledFor: { $lte: now },
      });

      for (const scheduledPost of pendingPosts) {
        await this.publishScheduledPost(scheduledPost._id);
      }
    } catch (error) {
      console.error("Error processing pending posts:", error);
    }
  }

  async cancelScheduledPost(scheduledPostId) {
    try {
      const scheduledPost = await ScheduledPost.findById(scheduledPostId);
      if (!scheduledPost) {
        throw new Error("Scheduled post not found");
      }

      // Cancel the job
      const jobId = scheduledPostId.toString();
      if (this.scheduledJobs.has(jobId)) {
        this.scheduledJobs.get(jobId).cancel();
        this.scheduledJobs.delete(jobId);
      }

      // Update status
      scheduledPost.status = "cancelled";
      await scheduledPost.save();

      return scheduledPost;
    } catch (error) {
      console.error("Error cancelling scheduled post:", error);
      throw error;
    }
  }
  async getUserScheduledPosts(userId, status = null) {
    try {
      const query = { user: userId };
      if (status) {
        query.status = status;
      }

      const scheduledPosts = await ScheduledPost.find(query)
        .populate("post")
        .sort({ scheduledFor: 1 });

      return scheduledPosts;
    } catch (error) {
      console.error("Error getting user scheduled posts:", error);
      throw error;
    }
  }
}

// Create singleton instance
const schedulingService = new SchedulingService();

module.exports = schedulingService;
