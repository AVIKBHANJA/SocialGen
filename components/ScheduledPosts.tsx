import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface ScheduledPost {
  _id: string;
  post: {
    _id: string;
    content: string;
    platform: string;
  };
  platforms: string[];
  scheduledFor: string;
  status: "pending" | "processing" | "completed" | "failed" | "cancelled";
  publishResults?: Array<{
    platform: string;
    success: boolean;
    postId?: string;
    error?: string;
    publishedAt: string;
  }>;
  createdAt: string;
}

export default function ScheduledPosts() {
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchScheduledPosts();
  }, [filter]);

  const fetchScheduledPosts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const url =
        filter === "all" ? "/api/schedule" : `/api/schedule?status=${filter}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setScheduledPosts(data.scheduledPosts);
      }
    } catch (error) {
      console.error("Error fetching scheduled posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelScheduledPost = async (scheduledPostId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/schedule/${scheduledPostId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchScheduledPosts();
      }
    } catch (error) {
      console.error("Error cancelling scheduled post:", error);
      alert("Failed to cancel scheduled post. Please try again.");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <svg
            className="w-5 h-5 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "processing":
        return (
          <svg
            className="w-5 h-5 text-blue-500 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        );
      case "completed":
        return (
          <svg
            className="w-5 h-5 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "failed":
        return (
          <svg
            className="w-5 h-5 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "cancelled":
        return (
          <svg
            className="w-5 h-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "processing":
        return "Publishing...";
      case "completed":
        return "Published";
      case "failed":
        return "Failed";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return (
          <svg
            className="w-4 h-4 text-blue-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        );
      case "instagram":
        return (
          <svg
            className="w-4 h-4 text-pink-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.987 11.988 11.987 6.62 0 11.987-5.366 11.987-11.987C24.014 5.367 18.637.001 12.017.001z" />
          </svg>
        );
      case "twitter":
        return (
          <svg
            className="w-4 h-4 text-black dark:text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
          </svg>
        );
      case "linkedin":
        return (
          <svg
            className="w-4 h-4 text-blue-700"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const isPastScheduled = (scheduledFor: string) => {
    return new Date(scheduledFor) < new Date();
  };

  if (loading) {
    return (
      <Card>
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-muted rounded w-1/3"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            Scheduled Posts
          </h2>

          {/* Filter buttons */}
          <div className="flex space-x-2">
            {["all", "pending", "completed", "failed"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  filter === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {scheduledPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              No scheduled posts
            </h3>
            <p className="text-muted-foreground">
              {filter === "all"
                ? "You haven't scheduled any posts yet."
                : `No posts with status "${filter}".`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {scheduledPosts.map((scheduledPost) => (
              <div
                key={scheduledPost._id}
                className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    {/* Status and platforms */}
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(scheduledPost.status)}
                        <span className="text-sm font-medium text-foreground">
                          {getStatusText(scheduledPost.status)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-muted-foreground">
                          Platforms:
                        </span>
                        {scheduledPost.platforms.map((platform) => (
                          <div
                            key={platform}
                            className="flex items-center space-x-1"
                          >
                            {getPlatformIcon(platform)}
                            <span className="text-xs text-muted-foreground capitalize">
                              {platform}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Content preview */}
                    <div className="bg-accent/20 rounded-lg p-3 mb-3">
                      <p className="text-foreground text-sm line-clamp-3">
                        {scheduledPost.post.content}
                      </p>
                    </div>

                    {/* Schedule info */}
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>
                          {isPastScheduled(scheduledPost.scheduledFor)
                            ? "Was scheduled for"
                            : "Scheduled for"}{" "}
                          {formatDate(scheduledPost.scheduledFor)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-5 8h4m-4 0v4m0-4V8a1 1 0 011-1h2a1 1 0 011 1v3"
                          />
                        </svg>
                        <span>
                          Created {formatDate(scheduledPost.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Publish results */}
                    {scheduledPost.publishResults &&
                      scheduledPost.publishResults.length > 0 && (
                        <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                          <h4 className="text-sm font-medium text-foreground mb-2">
                            Publish Results:
                          </h4>
                          <div className="space-y-1">
                            {scheduledPost.publishResults.map(
                              (result, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-2 text-sm"
                                >
                                  {getPlatformIcon(result.platform)}
                                  <span className="capitalize">
                                    {result.platform}:
                                  </span>
                                  {result.success ? (
                                    <span className="text-green-600 dark:text-green-400">
                                      ✓ Published
                                    </span>
                                  ) : (
                                    <span className="text-red-600 dark:text-red-400">
                                      ✗ {result.error}
                                    </span>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    {scheduledPost.status === "pending" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => cancelScheduledPost(scheduledPost._id)}
                        className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/30"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
