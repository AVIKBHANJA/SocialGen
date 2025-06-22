"use client";

import React, { useState, useEffect } from "react";
import { useFirebaseAuth } from "@/context/FirebaseAuthContext";
import { usePost } from "@/context/PostContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">
            Welcome back, {user?.username}!
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`
                pb-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === "posts"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
              onClick={() => setActiveTab("posts")}
            >
              Your Posts
            </button>
            <button
              className={`
                pb-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === "templates"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
              onClick={() => setActiveTab("templates")}
            >
              Saved Templates
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="mt-6">
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading your content...</p>
            </div>
          ) : (
            <>
              {/* Posts Tab */}
              {activeTab === "posts" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">
                      Your Generated Posts
                    </h2>
                    <Link
                      href="/generator"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Create New Post
                    </Link>
                  </div>

                  {posts.length === 0 ? (
                    <div className="bg-white shadow overflow-hidden rounded-md p-6 text-center">
                      {" "}
                      <p className="text-gray-500">
                        You haven&apos;t created any posts yet.
                      </p>
                      <Link
                        href="/generator"
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
                      >
                        Generate your first post
                      </Link>
                    </div>
                  ) : (
                    <div className="bg-white shadow overflow-hidden rounded-md">
                      <ul className="divide-y divide-gray-200">
                        {posts.map((post) => (
                          <li key={post.id} className="px-6 py-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-xs text-gray-500 mb-1">
                                  {new Date(
                                    post.createdAt || ""
                                  ).toLocaleDateString()}{" "}
                                  •
                                  <span className="ml-1 font-medium text-blue-600">
                                    {post.platform}
                                  </span>
                                </p>
                                <div className="mt-1 text-sm text-gray-900">
                                  {post.content.split("\n").map((line, i) => (
                                    <p key={i} className="mb-1">
                                      {line}
                                    </p>
                                  ))}
                                </div>
                                <div className="mt-2">
                                  {post.promptData?.topic && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 mr-2">
                                      {post.promptData.topic}
                                    </span>
                                  )}
                                  {post.promptData?.audience && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                      {post.promptData.audience}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  className="text-gray-400 hover:text-gray-500"
                                  onClick={() =>
                                    navigator.clipboard.writeText(post.content)
                                  }
                                  title="Copy to clipboard"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                                    <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                                  </svg>
                                </button>
                                <button
                                  className="text-red-400 hover:text-red-500"
                                  onClick={() => deletePost(post.id || "")}
                                  title="Delete post"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Templates Tab */}
              {activeTab === "templates" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">
                      Your Saved Templates
                    </h2>
                    <Link
                      href="/generator"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Create New Template
                    </Link>
                  </div>

                  {savedPrompts.length === 0 ? (
                    <div className="bg-white shadow overflow-hidden rounded-md p-6 text-center">
                      {" "}
                      <p className="text-gray-500">
                        You haven&apos;t saved any templates yet.
                      </p>
                      <Link
                        href="/generator"
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
                      >
                        Create your first template
                      </Link>
                    </div>
                  ) : (
                    <div className="bg-white shadow overflow-hidden rounded-md">
                      <ul className="divide-y divide-gray-200">
                        {savedPrompts.map((prompt) => (
                          <li key={prompt.id} className="px-6 py-4">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="text-sm font-medium text-gray-900">
                                  {prompt.topic} •{" "}
                                  <span className="text-blue-600">
                                    {prompt.platform}
                                  </span>
                                </h3>
                                <div className="mt-2 text-xs text-gray-500">
                                  <p>
                                    <span className="font-medium">
                                      Audience:
                                    </span>{" "}
                                    {prompt.audience}
                                  </p>
                                  <p>
                                    <span className="font-medium">Tone:</span>{" "}
                                    {prompt.tone}
                                  </p>
                                  {prompt.additionalContext && (
                                    <p className="mt-1">
                                      <span className="font-medium">
                                        Context:
                                      </span>{" "}
                                      {prompt.additionalContext}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex space-x-3">
                                <Link
                                  href={{
                                    pathname: "/generator",
                                    query: {
                                      platform: prompt.platform,
                                      topic: prompt.topic,
                                      audience: prompt.audience,
                                      tone: prompt.tone,
                                      additionalContext:
                                        prompt.additionalContext,
                                    },
                                  }}
                                  className="text-blue-600 hover:text-blue-500"
                                  title="Use template"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </Link>
                                <button
                                  className="text-red-400 hover:text-red-500"
                                  onClick={() => deletePrompt(prompt.id || "")}
                                  title="Delete template"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
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
