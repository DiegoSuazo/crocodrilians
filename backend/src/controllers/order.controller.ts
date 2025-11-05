import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { OrderService } from '../services/order.service';

const orderService = new OrderService();

export class OrderController {
  async getAllOrders(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.isAdmin ? undefined : req.user!.id;
      const orders = await orderService.getAllOrders(userId, req.user!.isAdmin);
      
      res.json({
        success: true,
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOrderById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.isAdmin ? undefined : req.user!.id;
      const order = await orderService.getOrderById(
        req.params.id,
        userId,
        req.user!.isAdmin
      );
      
      res.json({
        success: true,
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }

  async createOrder(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const order = await orderService.createOrder(userId, req.body);
      
      res.status(201).json({
        success: true,
        data: order,
        message: 'Pedido creado exitosamente',
      });
    } catch (error) {
      next(error);
    }
  }

  async updateOrderStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { status } = req.body;
      const order = await orderService.updateOrderStatus(req.params.id, status);
      
      res.json({
        success: true,
        data: order,
        message: 'Estado del pedido actualizado',
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePaymentStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { paymentStatus } = req.body;
      const order = await orderService.updatePaymentStatus(req.params.id, paymentStatus);
      
      res.json({
        success: true,
        data: order,
        message: 'Estado de pago actualizado',
      });
    } catch (error) {
      next(error);
    }
  }

  async cancelOrder(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.isAdmin ? undefined : req.user!.id;
      const result = await orderService.cancelOrder(
        req.params.id,
        userId,
        req.user!.isAdmin
      );
      
      res.json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }
}