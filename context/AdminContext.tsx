"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { apiService } from "../utils/api";

// Define types for admin functionality
interface AdminStats {
  users: {
    total: number;
    active: number;
    newThisMonth: number;
  };
  posts: {
    total: number;
    thisMonth: number;
  };
  apiUsage: {
    total: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
    errorRate: number;
  };
  topUsers: Array<{
    username: string;
    email: string;
    requestCount: number;
  }>;
}

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  apiUsage?: {
    totalRequests: number;
    monthlyRequests: number;
    lastRequestDate?: string;
  };
}

interface AdminContextType {
  stats: AdminStats | null;
  users: User[];
  loading: boolean;
  error: string | null;
  fetchDashboardStats: () => Promise<void>;
  fetchUsers: (page?: number, search?: string) => Promise<void>;
  updateUser: (
    id: string,
    updates: { isActive?: boolean; role?: string }
  ) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

// Create the context
const AdminContext = createContext<AdminContextType>({
  stats: null,
  users: [],
  loading: false,
  error: null,
  fetchDashboardStats: async () => {},
  fetchUsers: async () => {},
  updateUser: async () => {},
  deleteUser: async () => {},
});

// Create provider component
export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // Fetch dashboard statistics
  const fetchDashboardStats = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getAdminDashboard();
      setStats(data);
    } catch (err: any) {
      const errorMessage =
        err.message || "Failed to fetch dashboard statistics";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch users list
  const fetchUsers = useCallback(
    async (page: number = 1, search: string = ""): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiService.getAdminUsers(page, search);
        setUsers(data.users);
      } catch (err: any) {
        const errorMessage = err.message || "Failed to fetch users";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Update user
  const updateUser = useCallback(
    async (
      id: string,
      updates: { isActive?: boolean; role?: string }
    ): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        await apiService.updateAdminUser(id, updates);

        // Update local users list
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === id ? { ...user, ...updates } : user
          )
        );
      } catch (err: any) {
        const errorMessage = err.message || "Failed to update user";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Delete (deactivate) user
  const deleteUser = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await apiService.deleteAdminUser(id);

      // Update local users list
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, isActive: false } : user
        )
      );
    } catch (err: any) {
      const errorMessage = err.message || "Failed to delete user";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AdminContext.Provider
      value={{
        stats,
        users,
        loading,
        error,
        fetchDashboardStats,
        fetchUsers,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook for using the admin context
export const useAdmin = () => useContext(AdminContext);
