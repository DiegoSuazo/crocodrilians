import prisma from '../config/database';
import { CreateProductDTO, UpdateProductDTO } from '../types';
import { AppError } from '../middlewares/error.middleware';

export class ProductService {
  async getAllProducts(filters?: {
    categoryId?: string;
    search?: string;
    isActive?: boolean;
    page?: number;
    limit?: number;
  }) {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (filters?.categoryId) {
      where.categoryId = filters.categoryId;
    }

    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    if (filters?.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getProductById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!product) {
      throw new AppError('Producto no encontrado', 404);
    }

    return product;
  }

  async createProduct(data: CreateProductDTO) {
    // Verificar que la categoría existe
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      throw new AppError('Categoría no encontrada', 404);
    }

    const product = await prisma.product.create({
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId,
        imageUrl: data.imageUrl,
        images: data.images || [],
        metadata: data.metadata || {},
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return product;
  }

  async updateProduct(id: string, data: UpdateProductDTO) {
    // Verificar que el producto existe
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new AppError('Producto no encontrado', 404);
    }

    // Si se actualiza la categoría, verificar que existe
    if (data.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: data.categoryId },
      });

      if (!category) {
        throw new AppError('Categoría no encontrada', 404);
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return product;
  }

  async deleteProduct(id: string) {
    // Verificar que el producto existe
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new AppError('Producto no encontrado', 404);
    }

    await prisma.product.delete({
      where: { id },
    });

    return { message: 'Producto eliminado exitosamente' };
  }

  async updateStock(id: string, quantity: number) {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new AppError('Producto no encontrado', 404);
    }

    const newStock = product.stock + quantity;

    if (newStock < 0) {
      throw new AppError('Stock insuficiente', 400);
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { stock: newStock },
    });

    return updatedProduct;
  }
}