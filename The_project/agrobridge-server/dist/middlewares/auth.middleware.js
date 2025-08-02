"use strict";
// src/middlewares/auth.middleware.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateFirebaseToken = void 0;
const admin = __importStar(require("firebase-admin"));
const authenticateFirebaseToken = async (req, res, next) => {
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
        }; // Assert the type
        console.log('Bypassing Firebase token verification for TEST_CUSTOM_TOKEN_');
        return next(); // Crucially, call next() here and exit the try/catch block
    }
    // --- END TEMPORARY BLOCK ---
    // Original Firebase token verification (only runs if not a TEST_CUSTOM_TOKEN_)
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.currentUser = decodedToken;
        next();
    }
    catch (error) {
        console.error('Error verifying Firebase ID token:', error);
        if (error.code === 'auth/id-token-expired') {
            return res.status(401).json({ message: 'Invalid or expired token.', error: error.message });
        }
        return res.status(401).json({ message: 'Invalid token.', error: error.message });
    }
};
exports.authenticateFirebaseToken = authenticateFirebaseToken;
