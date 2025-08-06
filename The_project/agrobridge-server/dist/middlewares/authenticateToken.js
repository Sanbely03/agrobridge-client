"use strict";
// src/middlewares/authenticateToken.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const firebaseAdmin_1 = __importDefault(require("../config/firebaseAdmin"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication failed: No token provided or invalid format.' });
    }
    const idToken = authHeader.split('Bearer ')[1];
    try {
        // Verify the Firebase ID token
        const decodedToken = await firebaseAdmin_1.default.auth().verifyIdToken(idToken);
        req.currentUser = decodedToken; // Store Firebase decoded token
        // Fetch user from your PostgreSQL database using firebaseUid
        const user = await prisma_1.default.user.findUnique({
            where: { firebaseUid: decodedToken.uid },
        });
        if (!user) {
            return res.status(404).json({ message: 'Authentication failed: User not found in database.' });
        }
        req.user = user; // Store user from DB
        next(); // Proceed to the next middleware/route handler
    }
    catch (error) {
        console.error('Error verifying Firebase ID token:', error);
        if (error.code === 'auth/id-token-expired') {
            return res.status(401).json({ message: 'Authentication failed: Token expired.' });
        }
        return res.status(401).json({ message: 'Authentication failed: Invalid token.', error: error.message });
    }
};
exports.authenticateToken = authenticateToken;
