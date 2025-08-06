// src/middlewares/authenticateToken.ts

import { Request, Response, NextFunction } from 'express';
import admin from '../config/firebaseAdmin';
import prisma from '../utils/prisma';
import { User } from '@prisma/client'; // Import User type from Prisma

// Extend the Request type to include currentUser (Firebase) and user (from DB)
export interface CustomRequest extends Request {
  currentUser?: admin.auth.DecodedIdToken;
  user?: User; // User from your PostgreSQL DB
}

export const authenticateToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication failed: No token provided or invalid format.' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.currentUser = decodedToken; // Store Firebase decoded token

    // Fetch user from your PostgreSQL database using firebaseUid
    const user = await prisma.user.findUnique({
      where: { firebaseUid: decodedToken.uid },
    });

    if (!user) {
      return res.status(404).json({ message: 'Authentication failed: User not found in database.' });
    }

    req.user = user; // Store user from DB

    next(); // Proceed to the next middleware/route handler
  } catch (error: any) {
    console.error('Error verifying Firebase ID token:', error);
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ message: 'Authentication failed: Token expired.' });
    }
    return res.status(401).json({ message: 'Authentication failed: Invalid token.', error: error.message });
  }
};
