import prisma from '../config/database';
import { CreateOrderDTO } from '../types';
import { AppError } from '../middlewares/error.middleware';

export class OrderService {
  async getAllOrders(userId?: string, isAdmin = false) {
    const where = isAdmin ? {} : { userId };

    const orders = await prisma.order.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                title: true,
                imageUrl: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return orders;
  }

  async getOrderById(orderId: string, userId?: string, isAdmin = false) {
    const where: any = { id: orderId };
    
    if (!isAdmin && userId) {
      where.userId = userId;
    }

    const order = await prisma.order.findFirst({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                title: true,
                imageUrl: true,
                category: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!order) {
      throw new AppError('Pedido no encontrado', 404);
    }

    return order;
  }

  async createOrder(userId: string, data: CreateOrderDTO) {
    // Obtener items del carrito
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true,
      },
    });

    if (cartItems.length === 0) {
      throw new AppError('El carrito está vacío', 400);
    }

    // Verificar stock y calcular total
    let totalAmount = 0;
    const orderItems: any[] = [];

    for (const item of cartItems) {
      if (!item.product.isActive) {
        throw new AppError(`El producto ${item.product.title} no está disponible`, 400);
      }

      if (item.product.stock < item.quantity) {
        throw new AppError(
          `Stock insuficiente para ${item.product.title}`,
          400
        );
      }

      const itemTotal = Number(item.product.price) * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.product.price,
        totalPrice: itemTotal,
        productSnapshot: {
          title: item.product.title,
          description: item.product.description,
          imageUrl: item.product.imageUrl,
          metadata: item.product.metadata,
        },
      });
    }

    // Generar número de orden único
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Crear orden en una transacción
    const order = await prisma.$transaction(async (tx) => {
      // Crear orden
      const newOrder = await tx.order.create({
        data: {
          userId,
          orderNumber,
          totalAmount,
          shippingAddress: data.shippingAddress,
          paymentMethod: data.paymentMethod,
          notes: data.notes,
          orderItems: {
            create: orderItems,
          },
        },
        include: {
          orderItems: {
            include: {
              product: {
                select: {
                  id: true,
                  title: true,
                  imageUrl: true,
                },
              },
            },
          },
        },
      });

      // Actualizar stock de productos
      for (const item of cartItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      // Limpiar carrito
      await tx.cartItem.deleteMany({
        where: { userId },
      });

      return newOrder;
    });

    return order;
  }

  async updateOrderStatus(orderId: string, status: string) {
    const validStatuses = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

    if (!validStatuses.includes(status)) {
      throw new AppError('Estado de pedido inválido', 400);
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: status as any },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                title: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });

    return order;
  }

  async updatePaymentStatus(orderId: string, paymentStatus: string) {
    const validStatuses = ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED'];

    if (!validStatuses.includes(paymentStatus)) {
      throw new AppError('Estado de pago inválido', 400);
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { paymentStatus: paymentStatus as any },
    });

    return order;
  }

  async cancelOrder(orderId: string, userId?: string, isAdmin = false) {
    const where: any = { id: orderId };
    
    if (!isAdmin && userId) {
      where.userId = userId;
    }

    const order = await prisma.order.findFirst({
      where,
      include: {
        orderItems: true,
      },
    });

    if (!order) {
      throw new AppError('Pedido no encontrado', 404);
    }

    if (order.status === 'DELIVERED' || order.status === 'CANCELLED') {
      throw new AppError('No se puede cancelar este pedido', 400);
    }

    // Restaurar stock en una transacción
    await prisma.$transaction(async (tx) => {
      // Actualizar estado del pedido
      await tx.order.update({
        where: { id: orderId },
        data: {
          status: 'CANCELLED',
          paymentStatus: 'REFUNDED',
        },
      });

      // Restaurar stock
      for (const item of order.orderItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        });
      }
    });

    return { message: 'Pedido cancelado exitosamente' };
  }
}