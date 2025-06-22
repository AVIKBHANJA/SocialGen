import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-8 md:space-y-0">
          {/* Logo and Description */}{" "}
          <div className="md:order-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SocialGen
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-md">
              Transform your ideas into viral social media content with the
              power of AI. Create engaging posts that drive real results across
              all platforms.
            </p>
          </div>
          {/* Links */}
          <div className="md:order-2">
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Contact
              </Link>
              <Link
                href="/pricing"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Pricing
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} SocialGen. All rights reserved.
            Built with ❤️ for content creators.
          </p>
        </div>
      </div>
    </footer>
  );
};
