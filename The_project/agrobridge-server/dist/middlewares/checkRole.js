"use strict";
// src/middlewares/checkRole.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const checkRole = (roles) => {
    return (req, res, next) => {
        // Ensure authenticateToken has run and attached currentUser and user
        if (!req.currentUser || !req.user) {
            return res.status(401).json({ message: 'Unauthorized: User not authenticated.' });
        }
        // Check if the user's role is included in the allowed roles for this route
        if (!roles.includes(req.user.role)) { // Cast req.user.role to UserRole
            return res.status(403).json({ message: `Forbidden: Only ${roles.join(', ')} can access this resource.` });
        }
        next(); // User has the required role, proceed
    };
};
exports.checkRole = checkRole;
