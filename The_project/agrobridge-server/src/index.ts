// src/index.ts

import express from 'express';
import cors from 'cors';
import testRoute from './routes/test.route';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api', testRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


