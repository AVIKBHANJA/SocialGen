"use client";

import React, { useState, useEffect } from "react";
import { useFirebaseAuth } from "@/context/FirebaseAuthContext";
import {
  Card,
  Input,
  Button,
  StatusMessage,
  LoadingState,
} from "@/components/ui";
import { useRouter } from "next/navigation";
import {
  updateUserProfile,
  changeUserPassword,
  deleteUserAccount,
} from "@/utils/api";

export default function ProfilePage() {
  const { user, loading, firebaseUser, refetchUser } = useFirebaseAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [updateProfileMessage, setUpdateProfileMessage] = useState({
    type: "",
    text: "",
  });
  const [changePasswordMessage, setChangePasswordMessage] = useState({
    type: "",
    text: "",
  });
  const [deleteMessage, setDeleteMessage] = useState({ type: "", text: "" });

  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingState text="Loading Profile..." size="lg" />
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    setUpdateProfileMessage({ type: "", text: "" });
    try {
      await updateUserProfile({ username });
      await refetchUser();
      setUpdateProfileMessage({
        type: "success",
        text: "Profile updated successfully!",
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update profile.";
      setUpdateProfileMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setChangePasswordMessage({
        type: "error",
        text: "New passwords do not match.",
      });
      return;
    }
    if (newPassword.length < 6) {
      setChangePasswordMessage({
        type: "error",
        text: "Password must be at least 6 characters.",
      });
      return;
    }
    setIsChangingPassword(true);
    setChangePasswordMessage({ type: "", text: "" });
    try {
      await changeUserPassword(currentPassword, newPassword);
      setChangePasswordMessage({
        type: "success",
        text: "Password changed successfully!",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to change password.";
      setChangePasswordMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action is irreversible."
      )
    ) {
      setIsDeleting(true);
      setDeleteMessage({ type: "", text: "" });
      try {
        await deleteUserAccount();
        router.push("/");
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to delete account.";
        setDeleteMessage({
          type: "error",
          text: errorMessage,
        });
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="space-y-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground">Your Profile</h1>
            <p className="text-muted-foreground mt-2">
              Manage your account settings and personal information.
            </p>
          </div>

          {/* Update Profile Section */}
          <Card>
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Personal Information
              </h2>
              <p className="text-muted-foreground mt-1">
                Update your username and email address.
              </p>
            </div>
            <form onSubmit={handleProfileUpdate}>
              <div className="p-6 border-t border-border space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="font-medium text-foreground"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    disabled
                    onChange={() => {}}
                  />
                  <p className="text-sm text-muted-foreground">
                    Email cannot be changed.
                  </p>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="font-medium text-foreground"
                  >
                    Username
                  </label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>{" "}
                {updateProfileMessage.text && (
                  <StatusMessage
                    type={
                      updateProfileMessage.type === "error"
                        ? "error"
                        : "success"
                    }
                    message={updateProfileMessage.text}
                  />
                )}
              </div>
              <div className="p-6 bg-muted/50 border-t border-border flex justify-end">
                <Button type="submit" disabled={isUpdatingProfile}>
                  {isUpdatingProfile ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Card>

          {/* Change Password Section */}
          {firebaseUser &&
            firebaseUser.providerData.some(
              (p) => p.providerId === "password"
            ) && (
              <Card>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-foreground">
                    Change Password
                  </h2>
                  <p className="text-muted-foreground mt-1">
                    Update your password for better security.
                  </p>
                </div>
                <form onSubmit={handlePasswordChange}>
                  <div className="p-6 border-t border-border space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="currentPassword">Current Password</label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="newPassword">New Password</label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="confirmNewPassword">
                          Confirm New Password
                        </label>
                        <Input
                          id="confirmNewPassword"
                          type="password"
                          value={confirmNewPassword}
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>{" "}
                    {changePasswordMessage.text && (
                      <StatusMessage
                        type={
                          changePasswordMessage.type === "error"
                            ? "error"
                            : "success"
                        }
                        message={changePasswordMessage.text}
                      />
                    )}
                  </div>
                  <div className="p-6 bg-muted/50 border-t border-border flex justify-end">
                    <Button type="submit" disabled={isChangingPassword}>
                      {isChangingPassword ? "Updating..." : "Update Password"}
                    </Button>
                  </div>
                </form>
              </Card>
            )}

          {/* Delete Account Section */}
          <Card variant="destructive">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-destructive-foreground">
                Delete Account
              </h2>
              <p className="text-destructive-foreground/80 mt-1">
                Permanently delete your account and all associated data. This
                action cannot be undone.
              </p>
            </div>
            <div className="p-6 bg-destructive/20 border-t border-destructive/30 flex justify-between items-center">
              <p className="text-sm text-destructive-foreground/90">
                Proceed with caution.
              </p>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete My Account"}
              </Button>
            </div>{" "}
            {deleteMessage.text && (
              <div className="p-6 border-t border-destructive/30">
                <StatusMessage type="error" message={deleteMessage.text} />
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
