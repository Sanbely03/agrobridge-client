"use strict";
// src/routes/product.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware"); // Assuming this path for middleware
const router = (0, express_1.Router)();
// Public routes for products
router.get('/', product_controller_1.getAllProducts); // GET /api/products (get all products)
router.get('/:id', product_controller_1.getProductById); // GET /api/products/:id (get product by ID)
// Protected routes for products (requires authentication)
router.post('/', auth_middleware_1.authenticateFirebaseToken, product_controller_1.createProduct); // POST /api/products (create a product)
router.put('/:id', auth_middleware_1.authenticateFirebaseToken, product_controller_1.updateProduct); // PUT /api/products/:id (update a product)
router.delete('/:id', auth_middleware_1.authenticateFirebaseToken, product_controller_1.deleteProduct); // DELETE /api/products/:id (delete a product)
exports.default = router;
