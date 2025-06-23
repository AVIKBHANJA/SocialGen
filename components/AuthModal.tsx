"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFirebaseAuth } from "@/context/FirebaseAuthContext";
import { Icon } from "@/components/ui";
import {
  validateLoginForm,
  validateRegisterForm,
} from "@/utils/formValidation";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = "login",
}) => {
  const router = useRouter();
  const { loginWithEmail, registerWithEmail, loginWithGoogle, loading, error } =
    useFirebaseAuth();

  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Reset form when modal opens/closes or mode changes
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setFormError("");
    }
  }, [isOpen, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError("");
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (mode === "login") {
      // Login validation
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
        onClose();
        router.push("/dashboard");
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Login failed";
        setFormError(errorMessage);
      }
    } else {
      // Signup validation
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
          formData.email,
          formData.password,
          formData.username
        );
        onClose();
        router.push("/dashboard");
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Registration failed";
        setFormError(errorMessage);
      }
    }
  };
  const handleGoogleAuth = async () => {
    setFormError("");
    try {
      await loginWithGoogle();
      onClose();
      router.push("/dashboard");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Google authentication failed";
      setFormError(errorMessage);
    }
  };

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm min-h-screen"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden mx-auto">
        {" "}
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors bg-white shadow-md border border-gray-200"
          aria-label="Close modal"
        >
          <Icon type="x" size="md" />
        </button>
        {/* Header with logo */}
        <div className="text-center pt-8 pb-6">
          <h1 className="text-2xl font-bold">
            <span className="text-blue-600">Social</span>
            <span className="text-red-500">Gen</span>
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mt-2"></div>
        </div>
        <div className="px-8 pb-8">
          {/* Mode Toggle */}
          <div className="flex mb-8">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-3 text-center font-medium border-b-2 transition-colors ${
                mode === "login"
                  ? "border-purple-600 text-purple-600"
                  : "border-gray-200 text-gray-500"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-3 text-center font-medium border-b-2 transition-colors ${
                mode === "signup"
                  ? "border-purple-600 text-purple-600"
                  : "border-gray-200 text-gray-500"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700 mb-6"
          >
            <Icon type="google" size="sm" />
            Sign {mode === "login" ? "in" : "up"} with Google
          </button>

          {/* OR Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Error Message */}
          {(formError || error) && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{formError || error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {mode === "signup" && (
              <div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors placeholder-gray-400"
                />
              </div>
            )}

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors placeholder-gray-400"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors pr-12 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {showPassword ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  ) : (
                    <>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </>
                  )}
                </svg>
              </button>
            </div>

            {mode === "signup" && (
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors placeholder-gray-400"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Sign In"
                : "Sign Up"}
            </button>
          </form>

          {/* Additional Links */}
          {mode === "login" && (
            <div className="text-center mt-6 space-y-3">
              <button
                type="button"
                className="text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                Forgot your password?
              </button>
              <div className="text-gray-500 text-sm">Login as Agent</div>
            </div>
          )}

          {/* Terms and Privacy for Signup */}
          {mode === "signup" && (
            <div className="text-xs text-gray-500 text-center mt-6 leading-relaxed">
              By creating an account, you agree to our{" "}
              <button
                type="button"
                onClick={() => router.push("/terms")}
                className="text-purple-600 hover:underline"
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                type="button"
                onClick={() => router.push("/privacy")}
                className="text-purple-600 hover:underline"
              >
                Privacy Policy
              </button>
              .
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
