const admin = require("firebase-admin");

// Initialize Firebase Admin SDK for free tier (no service account needed)
const initializeFirebaseAdmin = () => {
  if (!admin.apps.length) {
    try {
      // For free tier - use project ID only (limited functionality but works)
      admin.initializeApp({
        projectId:
          process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "socialgen-a0b25",
      });
      console.log("Firebase Admin initialized (basic mode)");
    } catch (error) {
      console.log(
        "Firebase Admin initialization failed, using client-side verification"
      );
    }
  }
  return admin;
};

module.exports = { admin: initializeFirebaseAdmin() };
