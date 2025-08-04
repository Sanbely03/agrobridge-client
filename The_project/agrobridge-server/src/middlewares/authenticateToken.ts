// src/middlewares/authenticateToken.ts

import { Request, Response, NextFunction } from 'express';
import admin from '../config/firebaseAdmin'; // Assuming you have firebaseAdmin config
import prisma from '../utils/prisma'; // Assuming prisma instance is imported from utils/prisma

// Extend the Express Request type to include a currentUser property
// This allows us to attach the decoded Firebase user to the request
export interface CustomRequest extends Request {
  currentUser?: admin.auth.DecodedIdToken;
  user?: { // Also include a 'user' property with Prisma User model fields if needed
    id: string;
    uid: string;
    role: string;
    // Add other relevant user fields you might need in controllers
  };
}

export const authenticateToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided or invalid format.' });
  }

  const idToken = authHeader.split(' ')[1]; // Extract the ID token

  try {
    // Verify the ID token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.currentUser = decodedToken; // Attach decoded token to request

    // Fetch user from your database to get their internal ID and role
    const user = await prisma.user.findUnique({
      where: { firebaseUid: decodedToken.uid },
      select: { id: true, role: true } // Select only necessary fields
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found in database.' });
    }

    // Attach a simplified user object to the request for easier access in controllers
    req.user = {
      id: user.id,
      uid: decodedToken.uid,
      role: user.role,
    };

    next(); // Proceed to the next middleware or route handler
  } catch (error: any) {
    console.error('Error verifying Firebase ID token:', error);
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ message: 'Unauthorized: Token expired.', error: error.message });
    }
    return res.status(401).json({ message: 'Unauthorized: Invalid token.', error: error.message });
  }
};
