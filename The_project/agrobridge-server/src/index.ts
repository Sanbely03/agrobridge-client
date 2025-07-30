// src/index.ts

import express from 'express';
import cors from 'cors';
import testRoute from './routes/test.route'; // Keep this for now
import authRoute from './routes/auth.route'; // Import the new auth routes
import * as admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json'; // Corrected path, since it's in the same directory as index.ts
// import './json.d.ts'; // Ensure this is imported if using json.d.ts for serviceAccountKey

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api', testRoute);
app.use('/api/auth', authRoute); // Mount the new auth routes under /api/auth

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});