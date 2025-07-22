// src/routes/test.route.ts

import express from 'express';
import { helloAgrobridge } from '../controllers/test.controller';

const router = express.Router();

router.get('/test', helloAgrobridge);

export default router;
