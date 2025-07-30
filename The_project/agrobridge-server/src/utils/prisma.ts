// src/utils/prisma.ts
import { PrismaClient } from '@prisma/client';

// Declare a global variable to store the PrismaClient instance
// This prevents multiple instances of PrismaClient in development,
// which can lead to performance issues or resource exhaustion.
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;