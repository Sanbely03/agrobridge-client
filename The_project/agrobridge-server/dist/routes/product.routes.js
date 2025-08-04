"use strict";
// The_project/agrobridge-server/src/routes/product.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller"); // Corrected import to singular name
const authenticateToken_1 = require("../middlewares/authenticateToken");
const checkRole_1 = require("../middlewares/checkRole");
const router = (0, express_1.Router)();
// Public routes
router.get('/', product_controller_1.getAllProducts);
router.get('/:id', product_controller_1.getProductById);
// Protected routes (requires authentication)
router.post('/', authenticateToken_1.authenticateToken, (0, checkRole_1.checkRole)(['FARMER', 'BUSINESS', 'SUPPLIER']), product_controller_1.createProduct);
// Protected routes for product management (requires authentication & ownership)
router.patch('/:id', authenticateToken_1.authenticateToken, product_controller_1.updateProduct);
router.delete('/:id', authenticateToken_1.authenticateToken, product_controller_1.deleteProduct);
exports.default = router;
