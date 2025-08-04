// src/config/firebaseAdmin.ts

import * as admin from 'firebase-admin';

// Load your service account key from environment variable or a file
// For local development, you might load it from a file for convenience,
// but for production, use environment variables.
// const serviceAccount = require('../../serviceAccountKey.json'); // Adjust path as needed

// For production, it's safer to load from environment variable
// Ensure your serviceAccountKey.json content is base64 encoded and stored in an env var
// Or, if using Google Cloud Run/App Engine, it handles credentials automatically.

// For now, let's assume you'll load it from a file for local testing simplicity.
// Make sure serviceAccountKey.json is in the root of your server directory
// and is NOT committed to Git (as we discussed!).
// const serviceAccount = require('../../serviceAccountKey.json'); // Example if file is in server root

// If you prefer to use environment variables for the service account key JSON string:
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
