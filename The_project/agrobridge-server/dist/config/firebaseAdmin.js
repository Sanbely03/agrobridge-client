"use strict";
// src/config/firebaseAdmin.ts
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
const admin = __importStar(require("firebase-admin"));
// Load your service account key from environment variable or a file
// For local development, you might load it from a file for convenience,
// but for production, use environment variables.
// const serviceAccount = require('../../serviceAccountKey.json'); // Adjust path as needed
// For production, it's safer to load from environment variable
// Ensure your serviceAccountKey.json content is base64 encoded and stored in an env var
// Or, if using Google Cloud Run/App Engine, it handles credentials automatically.
// For now, let's assume you'll load it from a file for local testing simplicity.
// Make sure serviceAccountKey.json is in the root of your server directory
// and is NOT committed to Git (as we discussed!).
// const serviceAccount = require('../../serviceAccountKey.json'); // Example if file is in server root
// If you prefer to use environment variables for the service account key JSON string:
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}
exports.default = admin;
