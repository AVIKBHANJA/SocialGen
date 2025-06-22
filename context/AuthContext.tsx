"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { apiService } from "../utils/api";

// Define types
interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  error: string | null;
}

// Create the context
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  error: null,
});

// Create provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user on initial render
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await apiService.getCurrentUser();
        if (userData) {
          setUser(userData);
        }
      } catch (err) {
        console.error("Error loading user:", err);
        // Token might be invalid, clear it
        apiService.clearToken();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);
  // Login function
  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.login(email, password);
      setUser(data.user);
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Register function
  const register = useCallback(
    async (username: string, email: string, password: string) => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.register(username, email, password);
        // After registration, login automatically
        await login(email, password);
      } catch (err: any) {
        setError(err.response?.data?.message || "Registration failed");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [login]
  );

  // Logout function
  const logout = useCallback(() => {
    apiService.clearToken();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);
