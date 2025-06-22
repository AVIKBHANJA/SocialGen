"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { apiService } from "../utils/api";
import { geminiService, PostParams } from "../utils/gemini";

// Define types
interface Post {
  id?: string;
  platform: string;
  content: string;
  promptData: PostParams;
  createdAt?: string;
}

interface PostContextType {
  posts: Post[];
  savedPrompts: PostParams[];
  generatedContent: string | null;
  loading: boolean;
  error: string | null;
  generatePost: (params: PostParams) => Promise<string>;
  savePost: (post: Post) => Promise<void>;
  savePrompt: (prompt: PostParams) => Promise<void>;
  fetchPosts: () => Promise<void>;
  fetchPrompts: () => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  deletePrompt: (id: string) => Promise<void>;
}

// Create the context
const PostContext = createContext<PostContextType>({
  posts: [],
  savedPrompts: [],
  generatedContent: null,
  loading: false,
  error: null,
  generatePost: async () => "",
  savePost: async () => {},
  savePrompt: async () => {},
  fetchPosts: async () => {},
  fetchPrompts: async () => {},
  deletePost: async () => {},
  deletePrompt: async () => {},
});

// Create provider component
export const PostProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [savedPrompts, setSavedPrompts] = useState<PostParams[]>([]);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // Generate post content
  const generatePost = useCallback(
    async (params: PostParams): Promise<string> => {
      setLoading(true);
      setError(null);
      try {
        // Use gemini service to generate content
        const content = await geminiService.generatePost(params);
        setGeneratedContent(content);
        return content;
      } catch (err: any) {
        const errorMessage = err.message || "Failed to generate post";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Save post to database
  const savePost = useCallback(async (post: Post): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const savedPost = await apiService.savePost(post);
      setPosts((prevPosts) => [savedPost, ...prevPosts]);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save post");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Save prompt template to database
  const savePrompt = useCallback(async (prompt: PostParams): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const savedPrompt = await apiService.createPrompt(prompt);
      setSavedPrompts((prevPrompts) => [savedPrompt, ...prevPrompts]);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save prompt");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  // Fetch user's posts
  const fetchPosts = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const fetchedPosts = await apiService.getPosts();
      setPosts(fetchedPosts);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch posts");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch user's saved prompts
  const fetchPrompts = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const fetchedPrompts = await apiService.getPrompts();
      setSavedPrompts(fetchedPrompts);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch prompts");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  // Delete post
  const deletePost = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await apiService.deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete post");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete prompt
  const deletePrompt = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await apiService.deletePrompt(id);
      setSavedPrompts((prevPrompts) =>
        prevPrompts.filter((prompt) => prompt.id !== id)
      );
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete prompt");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        savedPrompts,
        generatedContent,
        loading,
        error,
        generatePost,
        savePost,
        savePrompt,
        fetchPosts,
        fetchPrompts,
        deletePost,
        deletePrompt,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

// Custom hook for using the post context
export const usePost = () => useContext(PostContext);
