"use client";

import React from "react";
import { useFirebaseAuth } from "@/context/FirebaseAuthContext";

export default function AuthDebug() {
  const { user, firebaseUser, loading, isAuthenticated, error } =
    useFirebaseAuth();

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Authentication Debug</h1>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Authentication State</h2>
          <div className="space-y-2">
            <p>
              <strong>Loading:</strong> {loading ? "Yes" : "No"}
            </p>
            <p>
              <strong>Is Authenticated:</strong>{" "}
              {isAuthenticated ? "Yes" : "No"}
            </p>
            <p>
              <strong>Error:</strong> {error || "None"}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Backend User</h2>
          {user ? (
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          ) : (
            <p>No backend user data</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Firebase User</h2>
          {firebaseUser ? (
            <div className="space-y-2">
              <p>
                <strong>UID:</strong> {firebaseUser.uid}
              </p>
              <p>
                <strong>Email:</strong> {firebaseUser.email}
              </p>
              <p>
                <strong>Display Name:</strong> {firebaseUser.displayName}
              </p>
              <p>
                <strong>Email Verified:</strong>{" "}
                {firebaseUser.emailVerified ? "Yes" : "No"}
              </p>
            </div>
          ) : (
            <p>No Firebase user data</p>
          )}
        </div>

        <div className="mt-6">
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}
