"use strict";
// src/services/product.service.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
// This service layer can be used for more complex business logic
// or simply to abstract Prisma calls from controllers.
const createProduct = async (data) => {
    return prisma_1.default.product.create({ data });
};
exports.createProduct = createProduct;
const getProducts = async (whereClause = {}) => {
    return prisma_1.default.product.findMany({
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
                    // Include basic profile info for relevant roles
                    businessProfile: { select: { businessName: true } },
                    supplierProfile: { select: { companyName: true } },
                    deliveryPartnerProfile: { select: { companyName: true } },
                    vetProfile: { select: { fullName: true, specialization: true } },
                    overseerProfile: { select: { fullName: true, expertise: true } },
                },
            },
        },
    });
};
exports.getProducts = getProducts;
const getProductById = async (id) => {
    return prisma_1.default.product.findUnique({
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
                    businessProfile: { select: { businessName: true } },
                    supplierProfile: { select: { companyName: true } },
                    deliveryPartnerProfile: { select: { companyName: true } },
                    vetProfile: { select: { fullName: true, specialization: true } },
                    overseerProfile: { select: { fullName: true, expertise: true } },
                },
            },
        },
    });
};
exports.getProductById = getProductById;
const updateProduct = async (id, data) => {
    return prisma_1.default.product.update({
        where: { id },
        data,
    });
};
exports.updateProduct = updateProduct;
const deleteProduct = async (id) => {
    return prisma_1.default.product.delete({
        where: { id },
    });
};
exports.deleteProduct = deleteProduct;
