    // src/types/express.d.ts

    // Extend the Express Request interface to include our custom properties
    declare namespace Express {
      export interface Request {
        currentUser?: import('firebase-admin/auth').DecodedIdToken; // Add currentUser property
      }
    }
    