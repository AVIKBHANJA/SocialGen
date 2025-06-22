"use client";

import React, { useState, useEffect } from "react";
import { usePost } from "@/context/PostContext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

// Platform options for selection
const PLATFORM_OPTIONS = [
  { value: "instagram", label: "Instagram" },
  { value: "twitter", label: "Twitter/X" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "facebook", label: "Facebook" },
  { value: "tiktok", label: "TikTok" },
  { value: "pinterest", label: "Pinterest" },
];

// Tone options for selection
const TONE_OPTIONS = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "friendly", label: "Friendly" },
  { value: "humorous", label: "Humorous" },
  { value: "informative", label: "Informative" },
  { value: "inspirational", label: "Inspirational" },
];

export default function GeneratorPage() {
  // Authentication context
  const { isAuthenticated } = useAuth();

  // Post generation context
  const {
    generatePost,
    savePost,
    savePrompt,
    generatedContent,
    loading,
    fetchPrompts,
    error,
  } = usePost();

  // Form state
  const [platform, setPlatform] = useState("");
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("professional");
  const [additionalContext, setAdditionalContext] = useState("");
  const [result, setResult] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [promptSaved, setPromptSaved] = useState(false);

  // Load saved prompts when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchPrompts();
    }
  }, [isAuthenticated, fetchPrompts]);

  // Update result when content is generated
  useEffect(() => {
    if (generatedContent) {
      setResult(generatedContent);
      setIsSaved(false);
    }
  }, [generatedContent]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!platform || !topic || !audience) {
      return;
    }

    try {
      const content = await generatePost({
        platform,
        topic,
        audience,
        tone,
        additionalContext,
      });

      setResult(content);
      setIsSaved(false);
      setPromptSaved(false);
    } catch (error) {
      console.error("Failed to generate content", error);
    }
  };

  // Handle saving the generated post
  const handleSavePost = async () => {
    if (!isAuthenticated) {
      // Redirect or show login modal
      return;
    }

    if (!result) return;

    try {
      await savePost({
        platform,
        content: result,
        promptData: {
          platform,
          topic,
          audience,
          tone,
          additionalContext,
        },
      });
      setIsSaved(true);
    } catch (error) {
      console.error("Failed to save post", error);
    }
  };

  // Handle saving the prompt template
  const handleSavePrompt = async () => {
    if (!isAuthenticated) {
      // Redirect or show login modal
      return;
    }

    try {
      await savePrompt({
        platform,
        topic,
        audience,
        tone,
        additionalContext,
      });
      setPromptSaved(true);
    } catch (error) {
      console.error("Failed to save prompt", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-65px)]">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Social Media Post Generator
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Generate optimized content for your social media platforms using
            advanced AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Enter Your Post Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Platform */}
              <div>
                <label
                  htmlFor="platform"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Platform <span className="text-red-500">*</span>
                </label>
                <select
                  id="platform"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  required
                >
                  <option value="">Select platform</option>
                  {PLATFORM_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Topic */}
              <div>
                <label
                  htmlFor="topic"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Topic/Theme <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="What's your post about?"
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  required
                />
              </div>

              {/* Target Audience */}
              <div>
                <label
                  htmlFor="audience"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Target Audience <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="audience"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="Who is your target audience?"
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  required
                />
              </div>

              {/* Tone */}
              <div>
                <label
                  htmlFor="tone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tone
                </label>
                <select
                  id="tone"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                >
                  {TONE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Additional Context */}
              <div>
                <label
                  htmlFor="additionalContext"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Additional Context (Optional)
                </label>
                <textarea
                  id="additionalContext"
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  placeholder="Add any additional details or specific requirements"
                  rows={3}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500 resize-y"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Generating..." : "Generate Post"}
                </button>

                <button
                  type="button"
                  onClick={handleSavePrompt}
                  disabled={
                    !platform || !topic || !audience || loading || promptSaved
                  }
                  className="py-2 px-4 border border-blue-300 hover:border-blue-400 text-blue-600 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {promptSaved ? "Saved!" : "Save Template"}
                </button>
              </div>

              {error && (
                <div className="text-red-500 mt-2 text-sm">{error}</div>
              )}
            </form>

            {/* Show login prompt for non-authenticated users */}
            {!isAuthenticated && (
              <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-100">
                <p className="text-blue-800 text-sm">
                  <Link href="/login" className="font-medium underline">
                    Log in
                  </Link>{" "}
                  or{" "}
                  <Link href="/register" className="font-medium underline">
                    create an account
                  </Link>{" "}
                  to save your posts and templates.
                </p>
              </div>
            )}
          </div>

          {/* Generated Content */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Generated Post
            </h2>

            {result ? (
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="mb-3 flex items-center">
                    {platform && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {PLATFORM_OPTIONS.find((p) => p.value === platform)
                          ?.label || platform}
                      </span>
                    )}
                  </div>
                  <div className="prose max-w-none">
                    {result.split("\n").map((line, i) => (
                      <p key={i} className="mb-2">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="py-2 px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Regenerate
                  </button>

                  <button
                    onClick={handleSavePost}
                    disabled={!isAuthenticated || !result || loading || isSaved}
                    className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaved ? "Saved!" : "Save Post"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col items-center justify-center text-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-400 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>{" "}
                <p>
                  Fill in the details and click &quot;Generate Post&quot; to
                  create your content
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
