// src/controllers/test.controller.ts

import { Request, Response } from 'express';

export const helloAgrobridge = (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to the Agrobridge backend API 🚜🌾',
  });
};
