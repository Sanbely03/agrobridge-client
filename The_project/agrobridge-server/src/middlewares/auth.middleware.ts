// src/middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

// Extend the Request type to include currentUser
// This allows us to attach the decoded token to the request object
declare global {
  namespace Express {
    interface Request {
      currentUser?: admin.auth.DecodedIdToken;
    }
  }
}

export const authenticateFirebaseToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided or invalid format.' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.currentUser = decodedToken; // Attach decoded token to request
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    return res.status(403).json({ message: 'Invalid or expired token.', error: error.message });
  }
};