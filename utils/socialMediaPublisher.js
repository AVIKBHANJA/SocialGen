const { TwitterApi } = require("twitter-api-v2");
const axios = require("axios");
const InstagramService = require("./instagramService");
const FacebookService = require("./facebookService");

class SocialMediaPublisher {
  constructor() {
    this.platforms = {
      twitter: this.publishToTwitter.bind(this),
      facebook: this.publishToFacebook.bind(this),
      instagram: this.publishToInstagram.bind(this),
      linkedin: this.publishToLinkedIn.bind(this),
    };
  }

  async publishToAllPlatforms(content, connections, postId) {
    const results = [];

    for (const connection of connections) {
      try {
        const result = await this.publishToPlatform(
          content,
          connection,
          postId
        );
        results.push({
          platform: connection.platform,
          success: true,
          postId: result.postId,
          publishedAt: new Date(),
        });
      } catch (error) {
        console.error(`Failed to publish to ${connection.platform}:`, error);
        results.push({
          platform: connection.platform,
          success: false,
          error: error.message,
          publishedAt: new Date(),
        });
      }
    }

    return results;
  }

  async publishToPlatform(content, connection, postId) {
    const publisher = this.platforms[connection.platform];
    if (!publisher) {
      throw new Error(`Unsupported platform: ${connection.platform}`);
    }

    return await publisher(content, connection, postId);
  }

  async publishToTwitter(content, connection, postId) {
    try {
      const client = new TwitterApi({
        appKey: process.env.TWITTER_API_KEY,
        appSecret: process.env.TWITTER_API_SECRET,
        accessToken: connection.accessToken,
        accessSecret: connection.metadata.accessTokenSecret,
      });

      // Twitter has a character limit, so we might need to truncate or thread
      const tweetContent = this.truncateForTwitter(content);

      const tweet = await client.v2.tweet(tweetContent);

      return {
        postId: tweet.data.id,
        url: `https://twitter.com/user/status/${tweet.data.id}`,
      };
    } catch (error) {
      console.error("Twitter publishing error:", error);
      throw new Error(`Twitter API error: ${error.message}`);
    }
  }
  async publishToFacebook(content, connection, postId) {
    try {
      const facebookService = new FacebookService(
        connection.accessToken,
        connection.metadata.pageId
      );

      const result = await facebookService.createPost(content);

      return {
        postId: result.postId,
        url: result.url,
      };
    } catch (error) {
      console.error("Facebook publishing error:", error);
      throw new Error(`Facebook API error: ${error.message}`);
    }
  }

  async publishToInstagram(content, connection, postId) {
    try {
      const instagramService = new InstagramService(
        connection.accessToken,
        connection.metadata.businessAccountId
      );

      // For text-only posts, we'll need to create a simple image with text
      // This is a placeholder - in production, you'd generate an image or require media upload
      const placeholderImageUrl = this.generateTextImage(content);

      const result = await instagramService.createPost(
        placeholderImageUrl,
        content,
        "IMAGE"
      );

      return {
        postId: result.postId,
        url: result.url,
      };
    } catch (error) {
      console.error("Instagram publishing error:", error);
      throw new Error(`Instagram API error: ${error.message}`);
    }
  }

  async publishToLinkedIn(content, connection, postId) {
    try {
      const response = await axios.post(
        "https://api.linkedin.com/v2/ugcPosts",
        {
          author: `urn:li:person:${connection.metadata.personId}`,
          lifecycleState: "PUBLISHED",
          specificContent: {
            "com.linkedin.ugc.ShareContent": {
              shareCommentary: {
                text: content,
              },
              shareMediaCategory: "NONE",
            },
          },
          visibility: {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${connection.accessToken}`,
            "Content-Type": "application/json",
            "X-Restli-Protocol-Version": "2.0.0",
          },
        }
      );

      return {
        postId: response.data.id,
        url: `https://linkedin.com/feed/update/${response.data.id}`,
      };
    } catch (error) {
      console.error("LinkedIn publishing error:", error);
      throw new Error(
        `LinkedIn API error: ${error.response?.data?.message || error.message}`
      );
    }
  }

  truncateForTwitter(content) {
    const maxLength = 280;
    if (content.length <= maxLength) {
      return content;
    }

    // Truncate and add ellipsis
    return content.substring(0, maxLength - 3) + "...";
  }

  // Utility method to validate connections before publishing
  async validateConnection(connection) {
    try {
      switch (connection.platform) {
        case "twitter":
          const client = new TwitterApi({
            appKey: process.env.TWITTER_API_KEY,
            appSecret: process.env.TWITTER_API_SECRET,
            accessToken: connection.accessToken,
            accessSecret: connection.metadata.accessTokenSecret,
          });
          await client.v2.me();
          return true;

        case "facebook":
          const fbResponse = await axios.get(
            `https://graph.facebook.com/me?access_token=${connection.accessToken}`
          );
          return fbResponse.data.id === connection.platformAccountId;

        case "linkedin":
          const liResponse = await axios.get("https://api.linkedin.com/v2/me", {
            headers: {
              Authorization: `Bearer ${connection.accessToken}`,
            },
          });
          return liResponse.data.id === connection.platformAccountId;

        default:
          return false;
      }
    } catch (error) {
      console.error(
        `Connection validation failed for ${connection.platform}:`,
        error
      );
      return false;
    }
  }
}

module.exports = SocialMediaPublisher;
