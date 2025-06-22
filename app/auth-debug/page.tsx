"use client";

import React from "react";
import { useFirebaseAuth } from "@/context/FirebaseAuthContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function AuthDebug() {
  const { user, firebaseUser, loading, isAuthenticated, error } =
    useFirebaseAuth();

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-foreground">
          Authentication Debug
        </h1>

        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            Authentication State
          </h2>
          <div className="space-y-2">
            <p className="text-foreground">
              <strong>Loading:</strong> {loading ? "Yes" : "No"}
            </p>
            <p className="text-foreground">
              <strong>Is Authenticated:</strong>{" "}
              {isAuthenticated ? "Yes" : "No"}
            </p>
            <p className="text-foreground">
              <strong>Error:</strong> {error || "None"}
            </p>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            Backend User
          </h2>
          {user ? (
            <pre className="bg-muted p-4 rounded text-sm overflow-auto text-foreground">
              {JSON.stringify(user, null, 2)}
            </pre>
          ) : (
            <p className="text-muted-foreground">No backend user data</p>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            Firebase User
          </h2>
          {firebaseUser ? (
            <div className="space-y-2">
              <p className="text-foreground">
                <strong>UID:</strong> {firebaseUser.uid}
              </p>
              <p className="text-foreground">
                <strong>Email:</strong> {firebaseUser.email}
              </p>
              <p className="text-foreground">
                <strong>Display Name:</strong> {firebaseUser.displayName}
              </p>
              <p className="text-foreground">
                <strong>Email Verified:</strong>{" "}
                {firebaseUser.emailVerified ? "Yes" : "No"}
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground">No Firebase user data</p>
          )}
        </Card>

        <div className="mt-6">
          <Button onClick={() => window.location.reload()}>Refresh Page</Button>
        </div>
      </div>
    </div>
  );
}
