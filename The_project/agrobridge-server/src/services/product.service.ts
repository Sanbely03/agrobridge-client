    // src/services/product.service.ts

    import prisma from '../utils/prisma';
    // CHANGE THIS LINE: Import ProductCategory and Prisma types directly from the generated client's index.d.ts
import { ProductCategory, Prisma } from '@prisma/client';

    // This service layer can be used for more complex business logic
    // or simply to abstract Prisma calls from controllers.

    export const createProduct = async (data: Prisma.ProductCreateInput) => {
      return prisma.product.create({ data });
    };

    export const getProducts = async (whereClause: Prisma.ProductWhereInput = {}) => {
      return prisma.product.findMany({
        where: whereClause,
        include: {
          seller: { // Ensure this relates to the 'seller' field in Product model
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

    export const getProductById = async (id: string) => {
      return prisma.product.findUnique({
        where: { id },
        include: {
          seller: { // Ensure this relates to the 'seller' field in Product model
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

    export const updateProduct = async (id: string, data: Prisma.ProductUpdateInput) => {
      return prisma.product.update({
        where: { id },
        data,
      });
    };

    export const deleteProduct = async (id: string) => {
      return prisma.product.delete({
        where: { id },
      });
    };
    