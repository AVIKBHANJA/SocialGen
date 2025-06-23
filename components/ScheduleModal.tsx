import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  accountName?: string;
}

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  postContent: string;
  onSchedule: (platforms: string[], dateTime: string) => Promise<void>;
  connectedPlatforms: Array<{
    platform: string;
    isActive: boolean;
    platformAccountName?: string;
  }>;
}

export default function ScheduleModal({
  isOpen,
  onClose,
  postContent,
  onSchedule,
  connectedPlatforms,
}: ScheduleModalProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [isScheduling, setIsScheduling] = useState(false);

  // Available platforms with their icons
  const allPlatforms: Platform[] = [
    {
      id: "facebook",
      name: "Facebook",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      connected: connectedPlatforms.some((p) => p.platform === "facebook"),
      accountName: connectedPlatforms.find((p) => p.platform === "facebook")
        ?.platformAccountName,
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.987 11.988 11.987 6.62 0 11.987-5.366 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.611-3.132-1.551-.684-.939-.684-2.267 0-3.207.684-.939 1.835-1.55 3.132-1.55s2.448.611 3.132 1.55c.684.94.684 2.268 0 3.207-.684.94-1.835 1.551-3.132 1.551zm7.119 0c-1.297 0-2.448-.611-3.132-1.551-.684-.939-.684-2.267 0-3.207.684-.939 1.835-1.55 3.132-1.55s2.448.611 3.132 1.55c.684.94.684 2.268 0 3.207-.684.94-1.835 1.551-3.132 1.551z" />
        </svg>
      ),
      connected: connectedPlatforms.some((p) => p.platform === "instagram"),
      accountName: connectedPlatforms.find((p) => p.platform === "instagram")
        ?.platformAccountName,
    },
    {
      id: "twitter",
      name: "Twitter/X",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      connected: connectedPlatforms.some((p) => p.platform === "twitter"),
      accountName: connectedPlatforms.find((p) => p.platform === "twitter")
        ?.platformAccountName,
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      connected: connectedPlatforms.some((p) => p.platform === "linkedin"),
      accountName: connectedPlatforms.find((p) => p.platform === "linkedin")
        ?.platformAccountName,
    },
  ];

  // Set minimum date/time to current time
  useEffect(() => {
    const now = new Date();
    const currentDate = now.toISOString().split("T")[0];
    const currentTime = now.toTimeString().split(" ")[0].substring(0, 5);

    if (!scheduledDate) setScheduledDate(currentDate);
    if (!scheduledTime) setScheduledTime(currentTime);
  }, []);

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleSchedule = async () => {
    if (selectedPlatforms.length === 0) {
      alert("Please select at least one platform");
      return;
    }

    if (!scheduledDate || !scheduledTime) {
      alert("Please select date and time");
      return;
    }

    const dateTime = `${scheduledDate}T${scheduledTime}:00.000Z`;
    const scheduleDateTime = new Date(dateTime);

    if (scheduleDateTime <= new Date()) {
      alert("Please select a future date and time");
      return;
    }

    setIsScheduling(true);
    try {
      await onSchedule(selectedPlatforms, dateTime);
      onClose();
    } catch (error) {
      console.error("Error scheduling post:", error);
      alert("Failed to schedule post. Please try again.");
    } finally {
      setIsScheduling(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Schedule Post
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Post Preview */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Post Content
            </h3>
            <div className="bg-accent/20 rounded-lg p-4 border border-border">
              <p className="text-foreground whitespace-pre-wrap">
                {postContent}
              </p>
            </div>
          </div>

          {/* Platform Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Select Platforms
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {allPlatforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
                    platform.connected
                      ? selectedPlatforms.includes(platform.id)
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-border hover:border-primary/50 hover:bg-accent/50"
                      : "border-muted bg-muted/30 cursor-not-allowed opacity-60"
                  }`}
                  onClick={() =>
                    platform.connected && handlePlatformToggle(platform.id)
                  }
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`text-${
                        platform.connected ? "foreground" : "muted-foreground"
                      }`}
                    >
                      {platform.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">
                        {platform.name}
                      </div>
                      {platform.connected ? (
                        <div className="text-sm text-muted-foreground">
                          Connected as {platform.accountName}
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">
                          Not connected
                        </div>
                      )}
                    </div>
                    {platform.connected && (
                      <div
                        className={`w-5 h-5 rounded-full border-2 ${
                          selectedPlatforms.includes(platform.id)
                            ? "bg-primary border-primary"
                            : "border-border"
                        } flex items-center justify-center`}
                      >
                        {selectedPlatforms.includes(platform.id) && (
                          <svg
                            className="w-3 h-3 text-primary-foreground"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {allPlatforms.filter((p) => !p.connected).length > 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                Connect your social media accounts in Settings to schedule posts
              </p>
            )}
          </div>

          {/* Date and Time Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Schedule Date & Time
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose} disabled={isScheduling}>
              Cancel
            </Button>
            <Button
              onClick={handleSchedule}
              disabled={isScheduling || selectedPlatforms.length === 0}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isScheduling ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
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
                  Scheduling...
                </>
              ) : (
                <>
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Schedule Post
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
