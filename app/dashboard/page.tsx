"use client";

import React, { useState, useEffect } from "react";
import { useFirebaseAuth } from "@/context/FirebaseAuthContext";
import { usePost } from "@/context/PostContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, user, loading: authLoading } = useFirebaseAuth();
  const {
    posts,
    savedPrompts,
    fetchPosts,
    fetchPrompts,
    deletePost,
    deletePrompt,
    loading,
  } = usePost();

  const [activeTab, setActiveTab] = useState("posts");

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  // Fetch data on component mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
      fetchPrompts();
    }
  }, [isAuthenticated, fetchPosts, fetchPrompts]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Dashboard
              </h1>
              <p className="mt-2 text-muted-foreground">
                Welcome back,{" "}
                <span className="font-medium text-foreground">
                  {user?.username}
                </span>
                !
              </p>
            </div>{" "}
            <Link
              href="/generator"
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-4 py-2"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create New Post
            </Link>
          </div>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-primary/10">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Posts
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {posts.length}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-accent/10">
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Saved Templates
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {savedPrompts.length}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30">
                <svg
                  className="w-6 h-6 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  This Month
                </p>{" "}
                <p className="text-2xl font-bold text-foreground">
                  {
                    posts.filter((post) => {
                      if (!post.createdAt) return false;
                      const postDate = new Date(post.createdAt);
                      const currentMonth = new Date().getMonth();
                      return postDate.getMonth() === currentMonth;
                    }).length
                  }
                </p>
              </div>
            </div>
          </Card>
        </div>
        {/* Tabs */}
        <div className="border-b border-border mb-6">
          <nav className="flex space-x-8">
            <button
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "posts"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
              onClick={() => setActiveTab("posts")}
            >
              Your Posts ({posts.length})
            </button>
            <button
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "templates"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
              onClick={() => setActiveTab("templates")}
            >
              Saved Templates ({savedPrompts.length})
            </button>
          </nav>
        </div>{" "}
        {/* Content */}
        <div>
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">
                Loading your content...
              </p>
            </div>
          ) : (
            <>
              {/* Posts Tab */}
              {activeTab === "posts" && (
                <div className="space-y-6">
                  {posts.length === 0 ? (
                    <Card className="text-center py-12">
                      <div className="space-y-4">
                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
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
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-foreground">
                            No posts yet
                          </h3>
                          <p className="text-muted-foreground">
                            You haven&apos;t created any posts yet. Start
                            generating your first post!
                          </p>
                        </div>
                        <Link
                          href="/generator"
                          className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 px-6 py-3"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          Generate your first post
                        </Link>
                      </div>
                    </Card>
                  ) : (
                    <div className="grid gap-6">
                      {posts.map((post) => (
                        <Card
                          key={post.id}
                          className="group hover:shadow-lg transition-shadow"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs text-muted-foreground">
                                  {new Date(
                                    post.createdAt || ""
                                  ).toLocaleDateString()}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  •
                                </span>
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                  {post.platform}
                                </span>
                              </div>

                              <div className="prose prose-sm max-w-none text-foreground mb-4">
                                {post.content.split("\n").map((line, i) => (
                                  <p key={i} className="mb-2 last:mb-0">
                                    {line}
                                  </p>
                                ))}
                              </div>

                              {(post.promptData?.topic ||
                                post.promptData?.audience) && (
                                <div className="flex flex-wrap gap-2">
                                  {post.promptData?.topic && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground">
                                      Topic: {post.promptData.topic}
                                    </span>
                                  )}
                                  {post.promptData?.audience && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground">
                                      Audience: {post.promptData.audience}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>

                            <div className="flex items-center space-x-2 ml-4">
                              <button
                                className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                                onClick={() =>
                                  navigator.clipboard.writeText(post.content)
                                }
                                title="Copy to clipboard"
                              >
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                  />
                                </svg>
                              </button>
                              <button
                                className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors"
                                onClick={() => deletePost(post.id || "")}
                                title="Delete post"
                              >
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Templates Tab */}
              {activeTab === "templates" && (
                <div className="space-y-6">
                  {savedPrompts.length === 0 ? (
                    <Card className="text-center py-12">
                      <div className="space-y-4">
                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
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
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-foreground">
                            No templates saved
                          </h3>
                          <p className="text-muted-foreground">
                            You haven&apos;t saved any templates yet. Create and
                            save your first template!
                          </p>
                        </div>
                        <Link
                          href="/generator"
                          className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 px-6 py-3"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          Create your first template
                        </Link>
                      </div>
                    </Card>
                  ) : (
                    <div className="grid gap-6">
                      {savedPrompts.map((prompt) => (
                        <Card
                          key={prompt.id}
                          className="group hover:shadow-lg transition-shadow"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0">
                              {" "}
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs text-muted-foreground">
                                  Template
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  •
                                </span>
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                  {prompt.platform}
                                </span>
                              </div>
                              <h3 className="text-lg font-medium text-foreground mb-2">
                                {prompt.topic}
                              </h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-muted-foreground">
                                    Audience:
                                  </span>
                                  <span className="text-foreground">
                                    {prompt.audience}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-muted-foreground">
                                    Tone:
                                  </span>
                                  <span className="text-foreground">
                                    {prompt.tone}
                                  </span>
                                </div>
                                {prompt.additionalContext && (
                                  <div className="flex items-start gap-2">
                                    <span className="font-medium text-muted-foreground">
                                      Context:
                                    </span>
                                    <span className="text-foreground">
                                      {prompt.additionalContext}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 ml-4">
                              <Link
                                href={{
                                  pathname: "/generator",
                                  query: {
                                    platform: prompt.platform,
                                    topic: prompt.topic,
                                    audience: prompt.audience,
                                    tone: prompt.tone,
                                    additionalContext: prompt.additionalContext,
                                  },
                                }}
                                className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                title="Use template"
                              >
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                  />
                                </svg>
                              </Link>
                              <button
                                className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors"
                                onClick={() => deletePrompt(prompt.id || "")}
                                title="Delete template"
                              >
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
