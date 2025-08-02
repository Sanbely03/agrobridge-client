    // src/controllers/product.controller.ts

    import { Request, Response } from 'express';
    import prisma from '../utils/prisma';
    import { UserRole, ProductCategory } from '@prisma/client';

    // --- Helper to check if a category is a 'crop' category ---
    const isCropCategory = (category: ProductCategory): boolean => {
      const cropCategories: ProductCategory[] = [
        ProductCategory.GRAINS,
        ProductCategory.FRUITS,
        ProductCategory.VEGETABLES,
        ProductCategory.SEEDS,
        ProductCategory.FERTILIZERS,
        ProductCategory.CHEMICALS,
        ProductCategory.FARM_TOOLS,
        ProductCategory.EQUIPMENT,
      ];
      return (cropCategories as any[]).includes(category);
    };

    // --- Helper to check if a category is a 'livestock' category ---
    const isLivestockCategory = (category: ProductCategory): boolean => {
      return category === ProductCategory.LIVESTOCK;
    };

    // --- Helper to check if a category is a 'supplier' category (inputs) ---
    const isSupplierCategory = (category: ProductCategory): boolean => {
      const supplierCategories: ProductCategory[] = [
        ProductCategory.FEEDS,
        ProductCategory.MEDICINE,
        ProductCategory.FARM_TOOLS,
        ProductCategory.EQUIPMENT,
        ProductCategory.CHEMICALS,
        ProductCategory.SEEDS,
        ProductCategory.FERTILIZERS,
        ProductCategory.OTHER,
      ];
      return (supplierCategories as any[]).includes(category);
    };


    // --- Create Product --
    export const createProduct = async (req: Request, res: Response) => {
      if (!req.currentUser) {
        return res.status(401).json({ message: 'User not authenticated.' });
      }
    

      const { name, description, category, price, quantity, unit, imageUrls } = req.body;

      if (!name || !description || !category || !price || !quantity || !unit) {
        return res.status(400).json({ message: 'Missing required product fields.' });
      }

      try {
        const user = await prisma.user.findUnique({
          where: { firebaseUid: req.currentUser.uid },
          select: { id: true, role: true }
        });

        if (!user) {
          return res.status(404).json({ message: 'User not found in database.' });
        }

        const productCategory = category as ProductCategory;

        if (user.role === UserRole.FARMER) {
          if (!isCropCategory(productCategory) && !isLivestockCategory(productCategory)) {
            return res.status(403).json({ message: 'Farmers can only create crop produce or livestock products.' });
          }
        } else if (user.role === UserRole.SUPPLIER) {
          if (!isSupplierCategory(productCategory)) {
            return res.status(403).json({ message: 'Suppliers can only create farm input products.' });
          }
        } else {
          return res.status(403).json({ message: 'Unauthorized: Only farmers or suppliers can create products.' });
        }

        const product = await prisma.product.create({
          data: {
            name,
            description,
            category: productCategory,
            price,
            quantity,
            unit,
            imageUrls: imageUrls || [],
            sellerId: user.id,
          },
        });
        res.status(201).json({ message: 'Product created successfully!', product });
      } catch (error: any) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Failed to create product.', error: error.message });
      }
    };

    // --- Get All Products (Public, with optional filtering) ---
    export const getAllProducts = async (req: Request, res: Response) => {
      const { category, marketType } = req.query;

      let whereClause: any = {};

      if (category && Object.values(ProductCategory).includes(category as ProductCategory)) {
        whereClause.category = category as ProductCategory;
      } else if (marketType) {
        switch (marketType) {
          case 'CROPS':
            whereClause.category = { in: [
              ProductCategory.GRAINS, ProductCategory.FRUITS, ProductCategory.VEGETABLES,
              ProductCategory.SEEDS, ProductCategory.FERTILIZERS, ProductCategory.CHEMICALS,
              ProductCategory.FARM_TOOLS, ProductCategory.EQUIPMENT
            ]};
            break;
          case 'LIVESTOCK':
            whereClause.category = ProductCategory.LIVESTOCK;
            break;
          case 'SUPPLIES':
            whereClause.category = { in: [
              ProductCategory.FEEDS, ProductCategory.MEDICINE, ProductCategory.FARM_TOOLS,
              ProductCategory.EQUIPMENT, ProductCategory.CHEMICALS, ProductCategory.SEEDS,
              ProductCategory.FERTILIZERS, ProductCategory.OTHER
            ]};
            break;
          case 'ALL':
            break;
          default:
            console.warn(`Invalid marketType provided: ${marketType}`);
            break;
        }
      }

      try {
        const products = await prisma.product.findMany({
          where: whereClause,
          include: {
            seller: {
              select: {
                fullName: true,
                email: true,
                country: true,
                state: true,
                lga: true,
                role: true,
                supplierProfile: { select: { companyName: true } },
                businessProfile: { select: { businessName: true } },
              },
            },
          },
        });
        res.status(200).json({ message: 'Products retrieved successfully!', products });
      } catch (error: any) {
        console.error('Error getting all products:', error);
        res.status(500).json({ message: 'Failed to retrieve products.', error: error.message });
      }
    };

    // --- Get Product by ID (Public) ---
    export const getProductById = async (req: Request, res: Response) => {
      const { id } = req.params;

      try {
        const product = await prisma.product.findUnique({
          where: { id },
          include: {
            seller: {
              select: {
                fullName: true,
                email: true,
                country: true,
                state: true,
                lga: true,
                role: true,
                supplierProfile: { select: { companyName: true } },
                businessProfile: { select: { businessName: true } },
              },
            },
          },
        });

        if (!product) {
          return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(200).json({ message: 'Product retrieved successfully!', product });
      } catch (error: any) {
        console.error('Error getting product by ID:', error);
        res.status(500).json({ message: 'Failed to retrieve product.', error: error.message });
      }
    };

    // --- Update Product (Protected by Seller) ---
    export const updateProduct = async (req: Request, res: Response) => {
      if (!req.currentUser) {
        return res.status(401).json({ message: 'User not authenticated.' });
      }

      const { id } = req.params;
      const { name, description, category, price, quantity, unit, imageUrls } = req.body;

      try {
        const product = await prisma.product.findUnique({
          where: { id },
          select: { sellerId: true }
        });

        if (!product) {
          return res.status(404).json({ message: 'Product not found.' });
        }

        const user = await prisma.user.findUnique({
          where: { firebaseUid: req.currentUser.uid },
          select: { id: true, role: true }
        });

        if (!user || user.id !== product.sellerId) {
          return res.status(403).json({ message: 'Unauthorized: You can only update your own products.' });
        }

        const productCategory = category as ProductCategory;
        if (user.role === UserRole.FARMER && !isCropCategory(productCategory) && !isLivestockCategory(productCategory)) {
            return res.status(403).json({ message: 'Farmers can only update to crop produce or livestock product categories.' });
        }
        if (user.role === UserRole.SUPPLIER && !isSupplierCategory(productCategory)) {
            return res.status(403).json({ message: 'Suppliers can only update to farm input product categories.' });
        }


        const updatedProduct = await prisma.product.update({
          where: { id },
          data: {
            name,
            description,
            category: productCategory,
            price,
            quantity,
            unit,
            imageUrls,
            updatedAt: new Date(),
          },
        });
        res.status(200).json({ message: 'Product updated successfully!', product: updatedProduct });
      } catch (error: any) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Failed to update product.', error: error.message });
      }
    };

    // --- Delete Product (Protected by Seller) ---
    export const deleteProduct = async (req: Request, res: Response) => {
      if (!req.currentUser) {
        return res.status(401).json({ message: 'User not authenticated.' });
      }

      const { id } = req.params;

      try {
        const product = await prisma.product.findUnique({
          where: { id },
          select: { sellerId: true }
        });

        if (!product) {
          return res.status(404).json({ message: 'Product not found.' });
        }

        const user = await prisma.user.findUnique({
          where: { firebaseUid: req.currentUser.uid },
          select: { id: true, role: true }
        });

        if (!user || user.id !== product.sellerId) {
          return res.status(403).json({ message: 'Unauthorized: You can only delete your own products.' });
        }

        await prisma.product.delete({
          where: { id },
        });
        res.status(200).json({ message: 'Product deleted successfully!' });
      } catch (error: any) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Failed to delete product.', error: error.message });
      }
    };
    