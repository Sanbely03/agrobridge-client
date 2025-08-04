// src/middlewares/checkRole.ts

import { Response, NextFunction } from 'express';
import { UserRole } from '@prisma/client'; // Import UserRole enum from Prisma
import { CustomRequest } from './authenticateToken'; // Import CustomRequest interface

export const checkRole = (roles: UserRole[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    // Ensure authenticateToken has run and attached currentUser and user
    if (!req.currentUser || !req.user) {
      return res.status(401).json({ message: 'Unauthorized: User not authenticated.' });
    }

    // Check if the user's role is included in the allowed roles for this route
    if (!roles.includes(req.user.role as UserRole)) { // Cast req.user.role to UserRole
      return res.status(403).json({ message: `Forbidden: Only ${roles.join(', ')} can access this resource.` });
    }

    next(); // User has the required role, proceed
  };
};
