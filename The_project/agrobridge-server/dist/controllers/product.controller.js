"use strict";
// src/controllers/product.controller.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const client_1 = require("@prisma/client");
// --- Helper to check if a category is a 'crop' category ---
const isCropCategory = (category) => {
    const cropCategories = [
        client_1.ProductCategory.GRAINS,
        client_1.ProductCategory.FRUITS,
        client_1.ProductCategory.VEGETABLES,
        client_1.ProductCategory.SEEDS,
        client_1.ProductCategory.FERTILIZERS,
        client_1.ProductCategory.CHEMICALS,
        client_1.ProductCategory.FARM_TOOLS,
        client_1.ProductCategory.EQUIPMENT,
    ];
    return cropCategories.includes(category);
};
// --- Helper to check if a category is a 'livestock' category ---
const isLivestockCategory = (category) => {
    return category === client_1.ProductCategory.LIVESTOCK;
};
// --- Helper to check if a category is a 'supplier' category (inputs) ---
const isSupplierCategory = (category) => {
    const supplierCategories = [
        client_1.ProductCategory.FEEDS,
        client_1.ProductCategory.MEDICINE,
        client_1.ProductCategory.FARM_TOOLS,
        client_1.ProductCategory.EQUIPMENT,
        client_1.ProductCategory.CHEMICALS,
        client_1.ProductCategory.SEEDS,
        client_1.ProductCategory.FERTILIZERS,
        client_1.ProductCategory.OTHER,
    ];
    return supplierCategories.includes(category);
};
// --- Create Product --
const createProduct = async (req, res) => {
    if (!req.currentUser) {
        return res.status(401).json({ message: 'User not authenticated.' });
    }
    const { name, description, category, price, quantity, unit, imageUrls } = req.body;
    if (!name || !description || !category || !price || !quantity || !unit) {
        return res.status(400).json({ message: 'Missing required product fields.' });
    }
    try {
        const user = await prisma_1.default.user.findUnique({
            where: { firebaseUid: req.currentUser.uid },
            select: { id: true, role: true }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found in database.' });
        }
        const productCategory = category;
        if (user.role === client_1.UserRole.FARMER) {
            if (!isCropCategory(productCategory) && !isLivestockCategory(productCategory)) {
                return res.status(403).json({ message: 'Farmers can only create crop produce or livestock products.' });
            }
        }
        else if (user.role === client_1.UserRole.SUPPLIER) {
            if (!isSupplierCategory(productCategory)) {
                return res.status(403).json({ message: 'Suppliers can only create farm input products.' });
            }
        }
        else {
            return res.status(403).json({ message: 'Unauthorized: Only farmers or suppliers can create products.' });
        }
        const product = await prisma_1.default.product.create({
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
    }
    catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Failed to create product.', error: error.message });
    }
};
exports.createProduct = createProduct;
// --- Get All Products (Public, with optional filtering) ---
const getAllProducts = async (req, res) => {
    const { category, marketType } = req.query;
    let whereClause = {};
    if (category && Object.values(client_1.ProductCategory).includes(category)) {
        whereClause.category = category;
    }
    else if (marketType) {
        switch (marketType) {
            case 'CROPS':
                whereClause.category = { in: [
                        client_1.ProductCategory.GRAINS, client_1.ProductCategory.FRUITS, client_1.ProductCategory.VEGETABLES,
                        client_1.ProductCategory.SEEDS, client_1.ProductCategory.FERTILIZERS, client_1.ProductCategory.CHEMICALS,
                        client_1.ProductCategory.FARM_TOOLS, client_1.ProductCategory.EQUIPMENT
                    ] };
                break;
            case 'LIVESTOCK':
                whereClause.category = client_1.ProductCategory.LIVESTOCK;
                break;
            case 'SUPPLIES':
                whereClause.category = { in: [
                        client_1.ProductCategory.FEEDS, client_1.ProductCategory.MEDICINE, client_1.ProductCategory.FARM_TOOLS,
                        client_1.ProductCategory.EQUIPMENT, client_1.ProductCategory.CHEMICALS, client_1.ProductCategory.SEEDS,
                        client_1.ProductCategory.FERTILIZERS, client_1.ProductCategory.OTHER
                    ] };
                break;
            case 'ALL':
                break;
            default:
                console.warn(`Invalid marketType provided: ${marketType}`);
                break;
        }
    }
    try {
        const products = await prisma_1.default.product.findMany({
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
    }
    catch (error) {
        console.error('Error getting all products:', error);
        res.status(500).json({ message: 'Failed to retrieve products.', error: error.message });
    }
};
exports.getAllProducts = getAllProducts;
// --- Get Product by ID (Public) ---
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma_1.default.product.findUnique({
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
    }
    catch (error) {
        console.error('Error getting product by ID:', error);
        res.status(500).json({ message: 'Failed to retrieve product.', error: error.message });
    }
};
exports.getProductById = getProductById;
// --- Update Product (Protected by Seller) ---
const updateProduct = async (req, res) => {
    if (!req.currentUser) {
        return res.status(401).json({ message: 'User not authenticated.' });
    }
    const { id } = req.params;
    const { name, description, category, price, quantity, unit, imageUrls } = req.body;
    try {
        const product = await prisma_1.default.product.findUnique({
            where: { id },
            select: { sellerId: true }
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        const user = await prisma_1.default.user.findUnique({
            where: { firebaseUid: req.currentUser.uid },
            select: { id: true, role: true }
        });
        if (!user || user.id !== product.sellerId) {
            return res.status(403).json({ message: 'Unauthorized: You can only update your own products.' });
        }
        const productCategory = category;
        if (user.role === client_1.UserRole.FARMER && !isCropCategory(productCategory) && !isLivestockCategory(productCategory)) {
            return res.status(403).json({ message: 'Farmers can only update to crop produce or livestock product categories.' });
        }
        if (user.role === client_1.UserRole.SUPPLIER && !isSupplierCategory(productCategory)) {
            return res.status(403).json({ message: 'Suppliers can only update to farm input product categories.' });
        }
        const updatedProduct = await prisma_1.default.product.update({
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
    }
    catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Failed to update product.', error: error.message });
    }
};
exports.updateProduct = updateProduct;
// --- Delete Product (Protected by Seller) ---
const deleteProduct = async (req, res) => {
    if (!req.currentUser) {
        return res.status(401).json({ message: 'User not authenticated.' });
    }
    const { id } = req.params;
    try {
        const product = await prisma_1.default.product.findUnique({
            where: { id },
            select: { sellerId: true }
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        const user = await prisma_1.default.user.findUnique({
            where: { firebaseUid: req.currentUser.uid },
            select: { id: true, role: true }
        });
        if (!user || user.id !== product.sellerId) {
            return res.status(403).json({ message: 'Unauthorized: You can only delete your own products.' });
        }
        await prisma_1.default.product.delete({
            where: { id },
        });
        res.status(200).json({ message: 'Product deleted successfully!' });
    }
    catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Failed to delete product.', error: error.message });
    }
};
exports.deleteProduct = deleteProduct;
