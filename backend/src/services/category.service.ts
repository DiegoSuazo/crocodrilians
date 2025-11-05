import prisma from '../config/database';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../types';
import { AppError } from '../middlewares/error.middleware';

export class CategoryService {
  async getAllCategories(includeInactive = false) {
    const where = includeInactive ? {} : { isActive: true };

    const categories = await prisma.category.findMany({
      where,
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    return categories;
  }

  async getCategoryById(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          where: { isActive: true },
          select: {
            id: true,
            title: true,
            price: true,
            imageUrl: true,
            stock: true,
          },
        },
      },
    });

    if (!category) {
      throw new AppError('Categoría no encontrada', 404);
    }

    return category;
  }

  async getCategoryBySlug(slug: string) {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          where: { isActive: true },
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            imageUrl: true,
            stock: true,
            metadata: true,
          },
        },
      },
    });

    if (!category) {
      throw new AppError('Categoría no encontrada', 404);
    }

    return category;
  }

  async createCategory(data: CreateCategoryDTO) {
    // Verificar que el slug no exista
    const existingCategory = await prisma.category.findUnique({
      where: { slug: data.slug },
    });

    if (existingCategory) {
      throw new AppError('El slug ya está en uso', 400);
    }

    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        imageUrl: data.imageUrl,
      },
    });

    return category;
  }

  async updateCategory(id: string, data: UpdateCategoryDTO) {
    // Verificar que la categoría existe
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      throw new AppError('Categoría no encontrada', 404);
    }

    // Si se actualiza el slug, verificar que no exista
    if (data.slug && data.slug !== existingCategory.slug) {
      const slugExists = await prisma.category.findUnique({
        where: { slug: data.slug },
      });

      if (slugExists) {
        throw new AppError('El slug ya está en uso', 400);
      }
    }

    const category = await prisma.category.update({
      where: { id },
      data,
    });

    return category;
  }

  async deleteCategory(id: string) {
    // Verificar que la categoría existe
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (!category) {
      throw new AppError('Categoría no encontrada', 404);
    }

    // Verificar que no tenga productos
    if (category._count.products > 0) {
      throw new AppError(
        'No se puede eliminar una categoría con productos asociados',
        400
      );
    }

    await prisma.category.delete({
      where: { id },
    });

    return { message: 'Categoría eliminada exitosamente' };
  }
}