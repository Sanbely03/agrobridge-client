    import * as admin from 'firebase-admin';

    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (!serviceAccountKey) {
      throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is not defined in the environment variables.");
    }

    let serviceAccount;
    try {
      serviceAccount = JSON.parse(serviceAccountKey);
    } catch (error) {
      console.error("Error parsing FIREBASE_SERVICE_ACCOUNT_KEY JSON:", error);
      throw new Error("Invalid JSON in FIREBASE_SERVICE_ACCOUNT_KEY environment variable.");
    }

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }

    export default admin;
    