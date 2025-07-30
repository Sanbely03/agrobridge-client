// src/controllers/product.controller.ts

import { Request, Response } from 'express';
import prisma from '../utils/prisma';

// --- Create Product ---
export const createProduct = async (req: Request, res: Response) => {
  // Ensure currentUser is available from authentication middleware
  if (!req.currentUser) {
    return res.status(401).json({ message: 'User not authenticated.' });
  }

  // Only FARMERs can create products
  const userRole = await prisma.user.findUnique({
    where: { firebaseUid: req.currentUser.uid },
    select: { role: true }
  });

  if (userRole?.role !== 'FARMER') {
    return res.status(403).json({ message: 'Only farmers can create products.' });
  }

  const { name, description, category, price, quantity, unit, imageUrls } = req.body;

  if (!name || !description || !category || !price || !quantity || !unit) {
    return res.status(400).json({ message: 'Missing required product fields.' });
  }

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        category,
        price,
        quantity,
        unit,
        imageUrls: imageUrls || [], // Allow empty array if no images
        farmerId: userRole.id, // Link product to the farmer's internal DB ID
      },
    });
    res.status(201).json({ message: 'Product created successfully!', product });
  } catch (error: any) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Failed to create product.', error: error.message });
  }
};

// --- Get All Products (Public) ---
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        farmer: { // Include farmer details
          select: {
            fullName: true,
            email: true,
            country: true,
            state: true,
            lga: true,
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
        farmer: {
          select: {
            fullName: true,
            email: true,
            country: true,
            state: true,
            lga: true,
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

// --- Update Product (Protected by Farmer) ---
export const updateProduct = async (req: Request, res: Response) => {
  if (!req.currentUser) {
    return res.status(401).json({ message: 'User not authenticated.' });
  }

  const { id } = req.params; // Product ID
  const { name, description, category, price, quantity, unit, imageUrls } = req.body;

  try {
    // Find the product and ensure the current user is its owner and a FARMER
    const product = await prisma.product.findUnique({
      where: { id },
      select: { farmerId: true } // Only need farmerId to check ownership
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    const user = await prisma.user.findUnique({
      where: { firebaseUid: req.currentUser.uid },
      select: { id: true, role: true }
    });

    if (!user || user.role !== 'FARMER' || user.id !== product.farmerId) {
      return res.status(403).json({ message: 'Unauthorized: You can only update your own products.' });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        category,
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

// --- Delete Product (Protected by Farmer) ---
export const deleteProduct = async (req: Request, res: Response) => {
  if (!req.currentUser) {
    return res.status(401).json({ message: 'User not authenticated.' });
  }

  const { id } = req.params; // Product ID

  try {
    // Find the product and ensure the current user is its owner and a FARMER
    const product = await prisma.product.findUnique({
      where: { id },
      select: { farmerId: true }
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    const user = await prisma.user.findUnique({
      where: { firebaseUid: req.currentUser.uid },
      select: { id: true, role: true }
    });

    if (!user || user.role !== 'FARMER' || user.id !== product.farmerId) {
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