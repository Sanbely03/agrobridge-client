// The_project/agrobridge-server/src/routes/product.routes.ts

import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller'; // Corrected import to singular name
import { authenticateToken } from '../middlewares/authenticateToken';
import { checkRole } from '../middlewares/checkRole';

const router = Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected routes (requires authentication)
router.post(
  '/',
  authenticateToken,
  checkRole(['FARMER', 'BUSINESS', 'SUPPLIER']),
  createProduct
);

// Protected routes for product management (requires authentication & ownership)
router.patch(
  '/:id',
  authenticateToken,
  updateProduct
);

router.delete(
  '/:id',
  authenticateToken,
  deleteProduct
);

export default router;
