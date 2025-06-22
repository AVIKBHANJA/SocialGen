"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { apiService } from "@/utils/api";

// Define types
interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  firebaseUid?: string;
}

interface FirebaseAuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
  error: string | null;
}

// Create the context
const FirebaseAuthContext = createContext<FirebaseAuthContextType>({
  user: null,
  firebaseUser: null,
  loading: true,
  isAuthenticated: false,
  loginWithEmail: async () => {},
  registerWithEmail: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
  refetchUser: async () => {},
  error: null,
});

// Create provider component
export const FirebaseAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Sync Firebase user with backend user
  const syncUserWithBackend = useCallback(
    async (firebaseUser: FirebaseUser) => {
      try {
        console.log(
          "🔄 Syncing Firebase user with backend:",
          firebaseUser.email
        );

        // Get Firebase ID token
        const idToken = await firebaseUser.getIdToken();

        // Send to backend to verify and get/create user
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/firebase-verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idToken,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              uid: firebaseUser.uid,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("✅ Backend sync successful:", data.user);
          setUser(data.user);
          apiService.setToken(data.token);
        } else {
          const errorData = await response.json();
          console.error("❌ Failed to sync user with backend:", errorData);
        }
      } catch (error) {
        console.error("❌ Error syncing user with backend:", error);
        setError("Failed to sync with backend");
      }
    },
    []
  );
  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log(
        "🔄 Firebase auth state changed:",
        firebaseUser ? firebaseUser.email : "null"
      );
      setFirebaseUser(firebaseUser);

      if (firebaseUser) {
        await syncUserWithBackend(firebaseUser);
      } else {
        console.log("🚪 User logged out, clearing state");
        setUser(null);
        apiService.clearToken();
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [syncUserWithBackend]);

  // Email/Password Login
  const loginWithEmail = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true);
        setError(null);

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        // User sync will happen automatically through onAuthStateChanged
      } catch (err: any) {
        const errorMessage = err.message || "Login failed";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Email/Password Registration
  const registerWithEmail = useCallback(
    async (username: string, email: string, password: string) => {
      try {
        setLoading(true);
        setError(null);

        // Create Firebase user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Update Firebase profile with username
        await updateProfile(userCredential.user, {
          displayName: username,
        });

        // User sync will happen automatically through onAuthStateChanged
      } catch (err: any) {
        const errorMessage = err.message || "Registration failed";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Google Login
  const loginWithGoogle = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // User sync will happen automatically through onAuthStateChanged
    } catch (err: any) {
      const errorMessage = err.message || "Google login failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);
  // Logout
  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setUser(null);
      setFirebaseUser(null);
      apiService.clearToken();
    } catch (err: any) {
      console.error("Logout error:", err);
    }
  }, []);

  // Refetch user data
  const refetchUser = useCallback(async () => {
    if (firebaseUser) {
      await syncUserWithBackend(firebaseUser);
    }
  }, [firebaseUser, syncUserWithBackend]);

  return (
    <FirebaseAuthContext.Provider
      value={{
        user,
        firebaseUser,
        loading,
        isAuthenticated: !!user,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        logout,
        refetchUser,
        error,
      }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
};

// Custom hook for using the Firebase auth context
export const useFirebaseAuth = () => useContext(FirebaseAuthContext);
