// src/middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

// Extend the Request type to include currentUser
declare global {
  namespace Express {
    interface Request {
      currentUser?: admin.auth.DecodedIdToken;
    }
  }
}

export const authenticateFirebaseToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided or invalid format.' });
  }

  const idToken = authHeader.split(' ')[1];

  // --- TEMPORARY: Simplified bypass for local testing ---
  // If the token starts with our special prefix, we'll bypass Firebase verification
  // and manually set req.currentUser for testing purposes.
  if (idToken.startsWith('TEST_CUSTOM_TOKEN_')) {
    const firebaseUid = idToken.replace('TEST_CUSTOM_TOKEN_', '');
    // Provide a minimal currentUser object that your controllers expect.
    // This is a mock and should NOT be used in production.
    req.currentUser = {
      uid: firebaseUid,
      email: 'test@example.com', // Mock email
      role: 'FARMER', // Assuming the test user is a FARMER for product creation
      // Add other required properties for DecodedIdToken, even if mocked
      aud: 'mock-aud',
      auth_time: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60), // Expires in 1 hour
      firebase: {
        sign_in_provider: 'custom',
        identities: { email: ['test@example.com'] }
      },
      iat: Math.floor(Date.now() / 1000),
      iss: 'mock-issuer',
      sub: firebaseUid,
    } as admin.auth.DecodedIdToken; // Assert the type
    console.log('Bypassing Firebase token verification for TEST_CUSTOM_TOKEN_');
    return next(); // Crucially, call next() here and exit the try/catch block
  }
  // --- END TEMPORARY BLOCK ---

  // Original Firebase token verification (only runs if not a TEST_CUSTOM_TOKEN_)
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.currentUser = decodedToken;
    next();
  } catch (error: any) {
    console.error('Error verifying Firebase ID token:', error);
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ message: 'Invalid or expired token.', error: error.message });
    }
    return res.status(401).json({ message: 'Invalid token.', error: error.message });
  }
};
