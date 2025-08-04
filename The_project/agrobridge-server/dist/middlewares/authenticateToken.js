"use strict";
// src/middlewares/authenticateToken.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const firebaseAdmin_1 = __importDefault(require("../config/firebaseAdmin")); // Assuming you have firebaseAdmin config
const prisma_1 = __importDefault(require("../utils/prisma")); // Assuming prisma instance is imported from utils/prisma
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided or invalid format.' });
    }
    const idToken = authHeader.split(' ')[1]; // Extract the ID token
    try {
        // Verify the ID token using Firebase Admin SDK
        const decodedToken = await firebaseAdmin_1.default.auth().verifyIdToken(idToken);
        req.currentUser = decodedToken; // Attach decoded token to request
        // Fetch user from your database to get their internal ID and role
        const user = await prisma_1.default.user.findUnique({
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
    }
    catch (error) {
        console.error('Error verifying Firebase ID token:', error);
        if (error.code === 'auth/id-token-expired') {
            return res.status(401).json({ message: 'Unauthorized: Token expired.', error: error.message });
        }
        return res.status(401).json({ message: 'Unauthorized: Invalid token.', error: error.message });
    }
};
exports.authenticateToken = authenticateToken;
