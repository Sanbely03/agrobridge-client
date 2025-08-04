"use strict";
// src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const test_route_1 = __importDefault(require("./routes/test.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
// import * as admin from 'firebase-admin';
// import serviceAccount from './serviceAccountKey.json';
// Initialize Firebase Admin SDK
// admin.initializeApp({
// credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
// });
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Mount routes
app.use('/api', test_route_1.default);
app.use('/api/auth', auth_route_1.default);
app.use('/api/products', product_routes_1.default);
// --- ADD THIS TEST ROUTE ---
app.get('/', (req, res) => {
    res.status(200).send('Agrobridge server is alive!');
});
// --- END TEST ROUTE ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
