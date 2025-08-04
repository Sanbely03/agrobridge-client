    // src/index.ts

    import express from 'express';
    import cors from 'cors';
    import testRoute from './routes/test.route';
    import authRoute from './routes/auth.route';
    import productRoute from './routes/product.routes';
    // import * as admin from 'firebase-admin';
    // import serviceAccount from './serviceAccountKey.json';

    // Initialize Firebase Admin SDK
    // admin.initializeApp({
      // credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    // });

    const app = express();
    const PORT = process.env.PORT || 5000;

    app.use(cors());
    app.use(express.json());

    // Mount routes
    app.use('/api', testRoute);
    app.use('/api/auth', authRoute);
    app.use('/api/products', productRoute);

    // --- ADD THIS TEST ROUTE ---
    app.get('/', (req, res) => {
      res.status(200).send('Agrobridge server is alive!');
    });
    // --- END TEST ROUTE ---

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
    