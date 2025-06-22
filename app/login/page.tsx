"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFirebaseAuth } from "@/context/FirebaseAuthContext";
import { Button, Input, StatusMessage, Icon } from "@/components/ui";
import { validateLoginForm } from "@/utils/formValidation";

export default function Login() {
  const router = useRouter();
  const { loginWithEmail, loginWithGoogle, loading, error } = useFirebaseAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError("");
  };
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // Use shared validation utilities
    const validationResult = validateLoginForm(
      formData.email,
      formData.password
    );

    if (!validationResult.isValid) {
      setFormError(validationResult.error || "Validation failed");
      return;
    }

    try {
      await loginWithEmail(formData.email, formData.password);
      router.push("/dashboard");
    } catch (err: any) {
      setFormError(err.message || "Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    setFormError("");
    try {
      await loginWithGoogle();
      router.push("/dashboard");
    } catch (err: any) {
      setFormError(err.message || "Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}{" "}
        <div className="text-center">
          <div className="mx-auto h-16 w-auto bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center px-4">
            <span className="text-white font-bold text-xl">SocialGen</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>
        <div className="space-y-6">
          {/* Google Login Button */}{" "}
          <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            variant="outline"
            size="lg"
            fullWidth
            className="relative"
          >
            <Icon type="google" size="sm" className="mr-3" />
            {loading ? "Signing in..." : "Continue with Google"}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>
          {/* Email Login Form */}
          <form className="space-y-4" onSubmit={handleEmailLogin}>
            <Input
              name="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />{" "}
            {(formError || error) && (
              <StatusMessage
                type="error"
                message={(formError || error) as string}
              />
            )}
            <Button
              type="submit"
              disabled={loading}
              size="lg"
              fullWidth
              isLoading={loading}
            >
              Sign in
            </Button>
          </form>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Get started
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
