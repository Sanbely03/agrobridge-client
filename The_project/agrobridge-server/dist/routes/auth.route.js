"use strict";
// src/routes/auth.route.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Public route for user registration
router.post('/register', auth_controller_1.registerUser);
// Protected route for fetching user profile
router.get('/profile', auth_middleware_1.authenticateFirebaseToken, auth_controller_1.getUserProfile);
// New public route to generate a custom token for a given firebaseUid
// This is for development/testing purposes only
router.post('/generate-token', auth_controller_1.generateCustomToken);
exports.default = router;
