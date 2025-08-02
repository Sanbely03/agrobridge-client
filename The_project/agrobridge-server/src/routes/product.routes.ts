    // src/routes/product.routes.ts

    import { Router } from 'express';
    import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/product.controller';
    import { authenticateFirebaseToken } from '../middlewares/auth.middleware'; // Assuming this path for middleware

    const router = Router();

    // Public routes for products
    router.get('/', getAllProducts); // GET /api/products (get all products)
    router.get('/:id', getProductById); // GET /api/products/:id (get product by ID)

    // Protected routes for products (requires authentication)
    router.post('/', authenticateFirebaseToken, createProduct); // POST /api/products (create a product)
    router.put('/:id', authenticateFirebaseToken, updateProduct); // PUT /api/products/:id (update a product)
    router.delete('/:id', authenticateFirebaseToken, deleteProduct); // DELETE /api/products/:id (delete a product)

    export default router;
    