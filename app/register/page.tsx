"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFirebaseAuth } from "@/context/FirebaseAuthContext";
import {
  Button,
  Input,
  StatusMessage,
  Icon,
  LoadingState,
} from "@/components/ui";
import { validateRegisterForm } from "@/utils/formValidation";

export default function Register() {
  const router = useRouter();
  const { registerWithEmail, loginWithGoogle, loading, error } =
    useFirebaseAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError("");
  };
  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // Use shared validation utilities
    const validationResult = validateRegisterForm(
      formData.username,
      formData.email,
      formData.password,
      formData.confirmPassword
    );

    if (!validationResult.isValid) {
      setFormError(validationResult.error || "Validation failed");
      return;
    }

    try {
      await registerWithEmail(
        formData.username,
        formData.email,
        formData.password
      );
      router.push("/dashboard");
    } catch (err: any) {
      setFormError(err.message || "Registration failed");
    }
  };

  const handleGoogleRegister = async () => {
    setFormError("");
    try {
      await loginWithGoogle();
      router.push("/dashboard");
    } catch (err: any) {
      setFormError(err.message || "Google registration failed");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-card border border-border rounded-2xl shadow-xl p-8 space-y-8">
          <div className="text-center">
            {" "}
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground font-bold text-lg">
                SocialGen
              </span>
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Create your account
            </h2>
            <p className="mt-2 text-muted-foreground">
              Or{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:text-primary/80 transition-colors"
              >
                sign in to your existing account
              </Link>
            </p>
          </div>
          {/* Google Registration Button */}{" "}
          <Button
            onClick={handleGoogleRegister}
            disabled={loading}
            variant="outline"
            size="lg"
            className="w-full"
          >
            <Icon type="google" className="w-5 h-5 mr-3" />
            {loading ? "Creating account..." : "Continue with Google"}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-card text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>
          {/* Email Registration Form */}
          <form className="space-y-4" onSubmit={handleEmailRegister}>
            <Input
              name="username"
              type="text"
              label="Username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              type="email"
              label="Email address"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="Enter password (min. 6 characters)"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Input
              name="confirmPassword"
              type="password"
              label="Confirm password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />{" "}
            {(formError || error) && (
              <StatusMessage
                type="error"
                message={(formError || error) as string}
              />
            )}{" "}
            <Button
              type="submit"
              disabled={loading}
              size="lg"
              className="w-full"
              isLoading={loading}
            >
              Create account
            </Button>
            <div className="text-center">
              <Link
                href="/login"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </form>
          <div className="text-xs text-muted-foreground text-center border-t border-border pt-4">
            By creating an account, you agree to our{" "}
            <Link
              href="/terms"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
