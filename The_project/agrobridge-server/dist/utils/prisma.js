"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/utils/prisma.ts
const client_1 = require("@prisma/client"); // This is the standard and correct import
const prisma = global.prisma || new client_1.PrismaClient();
if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}
exports.default = prisma;
