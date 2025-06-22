"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { usePost } from "@/context/PostContext";
import { useFirebaseAuth } from "@/context/FirebaseAuthContext";
import {
  Button,
  Input,
  Select,
  TextArea,
  Card,
  StatusMessage,
  LoadingState,
} from "@/components/ui";
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
  // URL search parameters for auto-filling from templates
  const searchParams = useSearchParams();

  // Authentication context
  const { isAuthenticated } = useFirebaseAuth();

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

  // Auto-fill form from URL parameters (when using a template)
  useEffect(() => {
    const platformParam = searchParams.get("platform");
    const topicParam = searchParams.get("topic");
    const audienceParam = searchParams.get("audience");
    const toneParam = searchParams.get("tone");
    const additionalContextParam = searchParams.get("additionalContext");

    if (platformParam) setPlatform(platformParam);
    if (topicParam) setTopic(topicParam);
    if (audienceParam) setAudience(audienceParam);
    if (toneParam) setTone(toneParam);
    if (additionalContextParam) setAdditionalContext(additionalContextParam);
  }, [searchParams]);

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
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground">
            Social Media Post Generator
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Generate optimized content for your social media platforms using
            advanced AI
          </p>
        </div>{" "}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="h-fit">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">
                Enter Your Post Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Platform */}
                <Select
                  id="platform"
                  label="Platform"
                  value={platform}
                  options={PLATFORM_OPTIONS}
                  onChange={(e) => setPlatform(e.target.value)}
                  placeholder="Select platform"
                  required
                />
                {/* Topic */}
                <Input
                  id="topic"
                  label="Topic/Theme"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="What's your post about?"
                  required
                />
                {/* Target Audience */}
                <Input
                  id="audience"
                  label="Target Audience"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="Who is your target audience?"
                  required
                />
                {/* Tone */}
                <Select
                  id="tone"
                  label="Tone"
                  value={tone}
                  options={TONE_OPTIONS}
                  onChange={(e) => setTone(e.target.value)}
                />
                {/* Additional Context */}
                <TextArea
                  id="additionalContext"
                  label="Additional Context (Optional)"
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  placeholder="Any specific requirements or details?"
                  rows={4}
                />
                <div className="flex space-x-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    isLoading={loading}
                    size="lg"
                    className="flex-1"
                  >
                    {loading ? "Generating..." : "Generate Post"}
                  </Button>

                  <Button
                    type="button"
                    onClick={handleSavePrompt}
                    disabled={
                      !platform || !topic || !audience || loading || promptSaved
                    }
                    variant="outline"
                    size="lg"
                  >
                    {promptSaved ? "Saved!" : "Save Template"}
                  </Button>
                </div>{" "}
                {error && <StatusMessage type="error" message={error} />}
              </form>

              {/* Show login prompt for non-authenticated users */}
              {!isAuthenticated && (
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-foreground text-sm">
                    <Link
                      href="/login"
                      className="font-medium text-primary hover:underline"
                    >
                      Log in
                    </Link>{" "}
                    or{" "}
                    <Link
                      href="/register"
                      className="font-medium text-primary hover:underline"
                    >
                      create an account
                    </Link>{" "}
                    to save your posts and templates.
                  </p>
                </div>
              )}
            </div>
          </Card>{" "}
          {/* Generated Content */}
          <Card className="h-fit">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">
                Generated Post
              </h2>

              {result ? (
                <div className="space-y-6">
                  <div className="p-4 bg-muted rounded-lg border border-border">
                    <div className="mb-3 flex items-center">
                      {platform && (
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          {PLATFORM_OPTIONS.find((p) => p.value === platform)
                            ?.label || platform}
                        </span>
                      )}
                    </div>
                    <div className="prose max-w-none text-foreground">
                      {result.split("\n").map((line, i) => (
                        <p key={i} className="mb-2">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      onClick={handleSubmit}
                      disabled={loading}
                      variant="outline"
                      size="lg"
                    >
                      Regenerate
                    </Button>

                    <Button
                      onClick={handleSavePost}
                      disabled={
                        !isAuthenticated || !result || loading || isSaved
                      }
                      size="lg"
                      className="flex-1"
                    >
                      {isSaved ? "Saved!" : "Save Post"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-8 flex flex-col items-center justify-center text-center border-2 border-dashed border-border rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-muted-foreground mb-3"
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
                  </svg>
                  <p className="text-muted-foreground">
                    Fill in the details and click "Generate Post" to create your
                    content
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
