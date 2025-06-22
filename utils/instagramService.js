const axios = require("axios");

class InstagramService {
  constructor(accessToken, businessAccountId) {
    this.accessToken = accessToken;
    this.businessAccountId = businessAccountId;
    this.baseURL = "https://graph.facebook.com/v18.0";
  }

  // Create and publish Instagram post
  async createPost(mediaUrl, caption, mediaType = "IMAGE") {
    try {
      // Step 1: Create media container
      const containerData = await this.createMediaContainer(
        mediaUrl,
        caption,
        mediaType
      );

      if (!containerData.id) {
        throw new Error("Failed to create media container");
      }

      // Step 2: Publish the post
      const publishedPost = await this.publishMedia(containerData.id);

      return {
        success: true,
        postId: publishedPost.id,
        containerId: containerData.id,
        url: `https://instagram.com/p/${publishedPost.id}`,
      };
    } catch (error) {
      console.error("Error posting to Instagram:", error);
      throw new Error(`Instagram posting failed: ${error.message}`);
    }
  }

  // Create media container
  async createMediaContainer(mediaUrl, caption, mediaType) {
    const payload = {
      caption: caption,
      access_token: this.accessToken,
      media_type: mediaType,
    };

    if (mediaType === "IMAGE") {
      payload.image_url = mediaUrl;
    } else if (mediaType === "VIDEO") {
      payload.video_url = mediaUrl;
      payload.media_type = "VIDEO";
    }

    const response = await axios.post(
      `${this.baseURL}/${this.businessAccountId}/media`,
      payload
    );

    return response.data;
  }

  // Publish media container
  async publishMedia(containerId) {
    const response = await axios.post(
      `${this.baseURL}/${this.businessAccountId}/media_publish`,
      {
        creation_id: containerId,
        access_token: this.accessToken,
      }
    );

    return response.data;
  }

  // Send Direct Message
  async sendDirectMessage(recipientId, message) {
    try {
      const response = await axios.post(`${this.baseURL}/me/messages`, {
        recipient: { id: recipientId },
        message: { text: message },
        access_token: this.accessToken,
      });

      return {
        success: true,
        messageId: response.data.message_id,
        recipientId: recipientId,
      };
    } catch (error) {
      console.error("Error sending Instagram DM:", error);
      throw new Error(`Instagram DM failed: ${error.message}`);
    }
  }

  // Get user info from username
  async getUserByUsername(username) {
    try {
      const response = await axios.get(`${this.baseURL}/${username}`, {
        params: {
          fields: "id,username",
          access_token: this.accessToken,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error getting user by username:", error);
      return null;
    }
  }

  // Get comments on a post
  async getPostComments(mediaId) {
    try {
      const response = await axios.get(`${this.baseURL}/${mediaId}/comments`, {
        params: {
          fields: "id,text,username,timestamp,from",
          access_token: this.accessToken,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error getting post comments:", error);
      throw error;
    }
  }

  // Reply to comment with DM
  async replyToCommentWithDM(commentData, dmMessage) {
    try {
      const { from, text } = commentData;

      // Get user info
      const user = await this.getUserByUsername(from.username);

      if (!user || !user.id) {
        throw new Error("Could not find user ID for DM");
      }

      // Send DM
      const dmResult = await this.sendDirectMessage(user.id, dmMessage);

      return {
        success: true,
        commentId: commentData.id,
        dmResult: dmResult,
        commentText: text,
        username: from.username,
      };
    } catch (error) {
      console.error("Error replying to comment with DM:", error);
      throw error;
    }
  }

  // Get user's Instagram media
  async getUserMedia() {
    try {
      const response = await axios.get(
        `${this.baseURL}/${this.businessAccountId}/media`,
        {
          params: {
            fields:
              "id,caption,media_type,media_url,permalink,timestamp,comments_count,like_count",
            access_token: this.accessToken,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error getting user media:", error);
      throw error;
    }
  }

  // Check if posting is allowed
  async validateAccount() {
    try {
      const response = await axios.get(
        `${this.baseURL}/${this.businessAccountId}`,
        {
          params: {
            fields: "id,username,name,profile_picture_url",
            access_token: this.accessToken,
          },
        }
      );

      return {
        valid: true,
        account: response.data,
      };
    } catch (error) {
      console.error("Error validating Instagram account:", error);
      return {
        valid: false,
        error: error.message,
      };
    }
  }
}

module.exports = InstagramService;
