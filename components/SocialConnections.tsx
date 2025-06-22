import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface SocialConnection {
  _id: string;
  platform: string;
  platformAccountName: string;
  platformAccountId: string;
  isActive: boolean;
  createdAt: string;
}

interface SocialConnectionsProps {
  onConnectionsChange: () => void;
}

export default function SocialConnections({
  onConnectionsChange,
}: SocialConnectionsProps) {
  const [connections, setConnections] = useState<SocialConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState<string | null>(null);

  const platforms = [
    {
      id: "facebook",
      name: "Facebook",
      color: "from-blue-600 to-blue-700",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      description: "Post to your Facebook pages and timeline",
    },
    {
      id: "instagram",
      name: "Instagram",
      color: "from-pink-500 to-orange-500",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.987 11.988 11.987 6.62 0 11.987-5.366 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.611-3.132-1.551-.684-.939-.684-2.267 0-3.207.684-.939 1.835-1.55 3.132-1.55s2.448.611 3.132 1.55c.684.94.684 2.268 0 3.207-.684.94-1.835 1.551-3.132 1.551zm7.119 0c-1.297 0-2.448-.611-3.132-1.551-.684-.939-.684-2.267 0-3.207.684-.939 1.835-1.55 3.132-1.55s2.448.611 3.132 1.55c.684.94.684 2.268 0 3.207-.684.94-1.835 1.551-3.132 1.551z" />
        </svg>
      ),
      description: "Share posts to your Instagram account",
    },
    {
      id: "twitter",
      name: "Twitter/X",
      color: "from-gray-800 to-gray-900",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      description: "Tweet to your Twitter/X timeline",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      color: "from-blue-700 to-blue-800",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      description: "Share posts on your LinkedIn profile",
    },
  ];

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("/api/social-connections", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setConnections(data.connections);
      }
    } catch (error) {
      console.error("Error fetching connections:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (platform: string) => {
    setConnecting(platform);

    try {
      // This would typically open OAuth flow
      // For demo purposes, we'll show instructions
      alert(
        `To connect ${platform}:\n\n1. Go to ${platform} Developer Console\n2. Create an app and get API keys\n3. Set up OAuth redirect URLs\n4. Configure permissions\n\nThis is a demo - actual OAuth integration would happen here.`
      );

      // Simulate successful connection (in real app, this would come from OAuth callback)
      // const mockConnection = {
      //   platform,
      //   accessToken: 'demo_token',
      //   platformAccountId: 'demo_id',
      //   platformAccountName: `Demo ${platform} Account`,
      //   metadata: {},
      // };

      // const token = localStorage.getItem('token');
      // const response = await fetch('/api/social-connections', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`,
      //   },
      //   body: JSON.stringify(mockConnection),
      // });

      // if (response.ok) {
      //   await fetchConnections();
      //   onConnectionsChange();
      // }
    } catch (error) {
      console.error(`Error connecting to ${platform}:`, error);
      alert(`Failed to connect to ${platform}. Please try again.`);
    } finally {
      setConnecting(null);
    }
  };

  const handleDisconnect = async (platform: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `/api/social-connections?platform=${platform}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        await fetchConnections();
        onConnectionsChange();
      }
    } catch (error) {
      console.error(`Error disconnecting from ${platform}:`, error);
      alert(`Failed to disconnect from ${platform}. Please try again.`);
    }
  };

  const isConnected = (platform: string) => {
    return connections.some(
      (conn) => conn.platform === platform && conn.isActive
    );
  };

  const getConnection = (platform: string) => {
    return connections.find(
      (conn) => conn.platform === platform && conn.isActive
    );
  };

  if (loading) {
    return (
      <Card>
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-muted rounded w-1/3"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Social Media Connections
          </h2>
          <p className="text-muted-foreground">
            Connect your social media accounts to schedule and publish posts
            directly from SocialGen.
          </p>
        </div>

        <div className="space-y-4">
          {platforms.map((platform) => {
            const connected = isConnected(platform.id);
            const connection = getConnection(platform.id);
            const isConnectingThis = connecting === platform.id;

            return (
              <div
                key={platform.id}
                className={`relative p-4 border rounded-lg transition-all ${
                  connected
                    ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-r ${platform.color} text-white`}
                    >
                      {platform.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {platform.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {platform.description}
                      </p>
                      {connected && connection && (
                        <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                          Connected as {connection.platformAccountName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {connected ? (
                      <>
                        <div className="flex items-center text-green-600 dark:text-green-400 mr-3">
                          <svg
                            className="w-5 h-5 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Connected
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDisconnect(platform.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/30"
                        >
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => handleConnect(platform.id)}
                        disabled={isConnectingThis}
                        className={`bg-gradient-to-r ${platform.color} hover:opacity-90`}
                      >
                        {isConnectingThis ? (
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
                            Connecting...
                          </>
                        ) : (
                          "Connect"
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start space-x-3">
            <svg
              className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                Setup Required
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                To enable social media publishing, you'll need to set up OAuth
                applications for each platform and configure the appropriate API
                keys in your environment variables.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
