"use strict";
// src/controllers/test.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloAgrobridge = void 0;
const helloAgrobridge = (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Agrobridge backend API 🚜🌾',
    });
};
exports.helloAgrobridge = helloAgrobridge;
