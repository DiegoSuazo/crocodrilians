import prisma from '../config/database';
import { AddToCartDTO, UpdateCartItemDTO } from '../types';
import { AppError } from '../middlewares/error.middleware';

export class CartService {
  async getCart(userId: string) {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: {
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            stock: true,
            imageUrl: true,
            isActive: true,
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Calcular total
    const total = cartItems.reduce((sum, item) => {
      return sum + Number(item.product.price) * item.quantity;
    }, 0);

    return {
      items: cartItems,
      total,
      itemCount: cartItems.length,
    };
  }

  async addToCart(userId: string, data: AddToCartDTO) {
    // Verificar que el producto existe y está activo
    const product = await prisma.product.findUnique({
      where: { id: data.productId },
    });

    if (!product) {
      throw new AppError('Producto no encontrado', 404);
    }

    if (!product.isActive) {
      throw new AppError('Producto no disponible', 400);
    }

    if (product.stock < data.quantity) {
      throw new AppError('Stock insuficiente', 400);
    }

    // Verificar si el producto ya está en el carrito
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        userId,
        productId: data.productId,
      },
    });

    let cartItem;

    if (existingItem) {
      // Actualizar cantidad
      const newQuantity = existingItem.quantity + data.quantity;

      if (product.stock < newQuantity) {
        throw new AppError('Stock insuficiente', 400);
      }

      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
        include: {
          product: {
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
    } else {
      // Crear nuevo item
      cartItem = await prisma.cartItem.create({
        data: {
          userId,
          productId: data.productId,
          quantity: data.quantity,
        },
        include: {
          product: {
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
    }

    return cartItem;
  }

  async updateCartItem(userId: string, itemId: string, data: UpdateCartItemDTO) {
    // Verificar que el item existe y pertenece al usuario
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        userId,
      },
      include: {
        product: true,
      },
    });

    if (!cartItem) {
      throw new AppError('Item del carrito no encontrado', 404);
    }

    // Verificar stock
    if (cartItem.product.stock < data.quantity) {
      throw new AppError('Stock insuficiente', 400);
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity: data.quantity },
      include: {
        product: {
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

    return updatedItem;
  }

  async removeFromCart(userId: string, itemId: string) {
    // Verificar que el item existe y pertenece al usuario
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        userId,
      },
    });

    if (!cartItem) {
      throw new AppError('Item del carrito no encontrado', 404);
    }

    await prisma.cartItem.delete({
      where: { id: itemId },
    });

    return { message: 'Item eliminado del carrito' };
  }

  async clearCart(userId: string) {
    await prisma.cartItem.deleteMany({
      where: { userId },
    });

    return { message: 'Carrito vaciado exitosamente' };
  }
}