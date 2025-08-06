// src/index.ts

// THIS MUST BE THE ABSOLUTE FIRST LINE TO ENSURE ENV VARS ARE LOADED BEFORE ANYTHING ELSE
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import loanRequestRoutes from './routes/loanRequest.routes';
import authRoutes from './routes/auth.routes';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route for testing server status
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Agrobridge API is running!' });
});

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/loan-requests', loanRequestRoutes);
app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
