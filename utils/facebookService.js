const axios = require("axios");

class FacebookService {
  constructor(accessToken, pageId) {
    this.accessToken = accessToken;
    this.pageId = pageId;
    this.baseURL = "https://graph.facebook.com/v18.0";
  }

  // Post to Facebook Page
  async createPost(message, link = null, imageUrl = null) {
    try {
      const payload = {
        message: message,
        access_token: this.accessToken,
      };

      // Add link if provided
      if (link) {
        payload.link = link;
      }

      // Add image if provided
      if (imageUrl) {
        payload.url = imageUrl;
        payload.caption = message;

        // Use photos endpoint for image posts
        const response = await axios.post(
          `${this.baseURL}/${this.pageId}/photos`,
          payload
        );

        return {
          success: true,
          postId: response.data.id,
          url: `https://facebook.com/${response.data.id}`,
        };
      }

      // Regular text post
      const response = await axios.post(
        `${this.baseURL}/${this.pageId}/feed`,
        payload
      );

      return {
        success: true,
        postId: response.data.id,
        url: `https://facebook.com/${response.data.id}`,
      };
    } catch (error) {
      console.error("Error posting to Facebook:", error);
      throw new Error(`Facebook posting failed: ${error.message}`);
    }
  }

  // Post video to Facebook
  async createVideoPost(videoUrl, description) {
    try {
      const response = await axios.post(
        `${this.baseURL}/${this.pageId}/videos`,
        {
          file_url: videoUrl,
          description: description,
          access_token: this.accessToken,
        }
      );

      return {
        success: true,
        postId: response.data.id,
        url: `https://facebook.com/${response.data.id}`,
      };
    } catch (error) {
      console.error("Error posting video to Facebook:", error);
      throw error;
    }
  }

  // Get page information
  async getPageInfo() {
    try {
      const response = await axios.get(`${this.baseURL}/${this.pageId}`, {
        params: {
          fields: "id,name,username,picture,fan_count,access_token",
          access_token: this.accessToken,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error getting page info:", error);
      throw error;
    }
  }

  // Get page posts
  async getPagePosts(limit = 25) {
    try {
      const response = await axios.get(`${this.baseURL}/${this.pageId}/posts`, {
        params: {
          fields:
            "id,message,created_time,likes.summary(true),comments.summary(true),shares",
          limit: limit,
          access_token: this.accessToken,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error getting page posts:", error);
      throw error;
    }
  }

  // Send message (for pages with messaging enabled)
  async sendMessage(recipientId, message) {
    try {
      const response = await axios.post(
        `${this.baseURL}/${this.pageId}/messages`,
        {
          recipient: { id: recipientId },
          message: { text: message },
          access_token: this.accessToken,
        }
      );

      return {
        success: true,
        messageId: response.data.message_id,
        recipientId: recipientId,
      };
    } catch (error) {
      console.error("Error sending Facebook message:", error);
      throw error;
    }
  }

  // Get comments on a post
  async getPostComments(postId) {
    try {
      const response = await axios.get(`${this.baseURL}/${postId}/comments`, {
        params: {
          fields: "id,message,from,created_time,like_count",
          access_token: this.accessToken,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error getting Facebook post comments:", error);
      throw error;
    }
  }

  // Reply to a comment
  async replyToComment(commentId, message) {
    try {
      const response = await axios.post(
        `${this.baseURL}/${commentId}/comments`,
        {
          message: message,
          access_token: this.accessToken,
        }
      );

      return {
        success: true,
        replyId: response.data.id,
      };
    } catch (error) {
      console.error("Error replying to Facebook comment:", error);
      throw error;
    }
  }

  // Schedule a post (requires business account)
  async schedulePost(message, publishTime, link = null, imageUrl = null) {
    try {
      const payload = {
        message: message,
        published: false,
        scheduled_publish_time: Math.floor(
          new Date(publishTime).getTime() / 1000
        ),
        access_token: this.accessToken,
      };

      if (link) {
        payload.link = link;
      }

      if (imageUrl) {
        payload.url = imageUrl;
        payload.caption = message;
      }

      const endpoint = imageUrl
        ? `${this.baseURL}/${this.pageId}/photos`
        : `${this.baseURL}/${this.pageId}/feed`;

      const response = await axios.post(endpoint, payload);

      return {
        success: true,
        scheduledPostId: response.data.id,
        scheduledTime: publishTime,
      };
    } catch (error) {
      console.error("Error scheduling Facebook post:", error);
      throw error;
    }
  }

  // Validate page access
  async validatePage() {
    try {
      const pageInfo = await this.getPageInfo();

      return {
        valid: true,
        page: pageInfo,
      };
    } catch (error) {
      console.error("Error validating Facebook page:", error);
      return {
        valid: false,
        error: error.message,
      };
    }
  }
}

module.exports = FacebookService;
