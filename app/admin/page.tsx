"use client";

import React, { useEffect, useState } from "react";
import { useFirebaseAuth } from "@/context/FirebaseAuthContext";
import { useAdmin } from "@/context/AdminContext";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LoadingState, StatusMessage } from "@/components/ui";

export default function AdminDashboard() {
  const router = useRouter();
  const { isAuthenticated, user, loading: authLoading } = useFirebaseAuth();
  const {
    stats,
    users,
    loading,
    error,
    fetchDashboardStats,
    fetchUsers,
    updateUser,
  } = useAdmin();

  const [activeTab, setActiveTab] = useState("overview");
  const [userSearch, setUserSearch] = useState("");

  // Check admin access
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== "admin")) {
      router.push("/login");
    }
  }, [isAuthenticated, user, authLoading, router]);

  // Fetch initial data
  useEffect(() => {
    if (isAuthenticated && user?.role === "admin") {
      fetchDashboardStats();
      fetchUsers();
    }
  }, [isAuthenticated, user, fetchDashboardStats, fetchUsers]);
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingState text="Loading admin dashboard..." size="lg" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive">Access Denied</h1>{" "}
          <p className="mt-2 text-muted-foreground">
            You don&apos;t have admin privileges.
          </p>
        </div>
      </div>
    );
  }

  const handleUserToggle = async (userId: string, currentStatus: boolean) => {
    try {
      await updateUser(userId, { isActive: !currentStatus });
    } catch (err) {
      console.error("Failed to toggle user status:", err);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await updateUser(userId, { role: newRole });
    } catch (err) {
      console.error("Failed to change user role:", err);
    }
  };

  const handleUserSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers(1, userSearch);
  };
  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {" "}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            SocialGen Admin Dashboard
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Manage your SocialGen platform and monitor user activity
          </p>
        </div>
        {/* Navigation Tabs */}
        <div className="border-b border-border mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "overview"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "users"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
              }`}
              onClick={() => setActiveTab("users")}
            >
              Users
            </button>
            <button
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "analytics"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
              }`}
              onClick={() => setActiveTab("analytics")}
            >
              API Analytics
            </button>
          </nav>
        </div>{" "}
        {loading && <LoadingState text="Loading admin data..." size="md" />}
        {error && <StatusMessage type="error" message={error} />}{" "}
        {/* Overview Tab */}
        {activeTab === "overview" && stats && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-medium text-foreground">
                  Total Users
                </h3>
                <p className="text-3xl font-bold text-primary">
                  {stats.users.total}
                </p>
                <p className="text-sm text-muted-foreground">
                  {stats.users.active} active users
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-medium text-foreground">
                  New Users
                </h3>
                <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {stats.users.newThisMonth}
                </p>
                <p className="text-sm text-muted-foreground">This month</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-medium text-foreground">
                  API Calls
                </h3>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {stats.apiUsage.total}
                </p>
                <p className="text-sm text-muted-foreground">
                  {stats.apiUsage.today} today, {stats.apiUsage.thisMonth} this
                  month
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-medium text-foreground">
                  Error Rate
                </h3>
                <p className="text-3xl font-bold text-destructive">
                  {stats.apiUsage.errorRate}%
                </p>
                <p className="text-sm text-muted-foreground">API error rate</p>
              </Card>
            </div>

            {/* Top Users */}
            <Card>
              <div className="px-6 py-4 border-b border-border">
                <h3 className="text-lg font-medium text-foreground">
                  Most Active Users
                </h3>
              </div>
              <div className="px-6 py-4">
                <div className="space-y-4">
                  {stats.topUsers.map((user) => (
                    <div
                      key={user.email}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {user.username}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">
                          {user.requestCount}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          requests
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}{" "}
        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="space-y-6">
            {/* Search */}
            <form onSubmit={handleUserSearch} className="flex gap-4">
              <Input
                type="text"
                placeholder="Search users..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">Search</Button>
            </form>

            {/* Users Table */}
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        API Usage
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-border">
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {user.username}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </td>{" "}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={user.role}
                            onChange={(e) =>
                              handleRoleChange(user._id, e.target.value)
                            }
                            className="text-sm border border-input rounded px-2 py-1 bg-background text-foreground focus:ring-2 focus:ring-primary"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.isActive
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
                                : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                            }`}
                          >
                            {user.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          Total: {user.apiUsage?.totalRequests || 0}
                          <br />
                          Monthly: {user.apiUsage?.monthlyRequests || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <Button
                            onClick={() =>
                              handleUserToggle(user._id, user.isActive)
                            }
                            variant={user.isActive ? "destructive" : "default"}
                            size="sm"
                          >
                            {user.isActive ? "Deactivate" : "Activate"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}{" "}
        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium text-foreground mb-4">
                API Usage Analytics
              </h3>
              <p className="text-muted-foreground">
                Detailed analytics will be implemented here showing:
              </p>
              <ul className="mt-2 list-disc list-inside text-muted-foreground">
                <li>Daily API request trends</li>
                <li>Endpoint usage statistics</li>
                <li>Gemini API token consumption</li>
                <li>Error rate analysis</li>
                <li>Response time metrics</li>
              </ul>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
