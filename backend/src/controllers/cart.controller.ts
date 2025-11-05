import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { CartService } from '../services/cart.service';

const cartService = new CartService();

export class CartController {
  async getCart(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const cart = await cartService.getCart(userId);
      
      res.json({
        success: true,
        data: cart,
      });
    } catch (error) {
      next(error);
    }
  }

  async addToCart(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const cartItem = await cartService.addToCart(userId, req.body);
      
      res.status(201).json({
        success: true,
        data: cartItem,
        message: 'Producto agregado al carrito',
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCartItem(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const cartItem = await cartService.updateCartItem(userId, req.params.id, req.body);
      
      res.json({
        success: true,
        data: cartItem,
        message: 'Carrito actualizado',
      });
    } catch (error) {
      next(error);
    }
  }

  async removeFromCart(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const result = await cartService.removeFromCart(userId, req.params.id);
      
      res.json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }

  async clearCart(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const result = await cartService.clearCart(userId);
      
      res.json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }
}