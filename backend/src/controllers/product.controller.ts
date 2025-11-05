import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { ProductService } from '../services/product.service';

const productService = new ProductService();

export class ProductController {
  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = {
        categoryId: req.query.categoryId as string,
        search: req.query.search as string,
        isActive: req.query.isActive !== 'false', // Default a true, solo false si explícitamente se pide
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 20,
      };

      const result = await productService.getAllProducts(filters);
      
      res.json({
        success: true,
        data: result.products, // Cambiar para que coincida con frontend
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.getProductById(req.params.id);
      
      res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const product = await productService.createProduct(req.body);
      
      res.status(201).json({
        success: true,
        data: product,
        message: 'Producto creado exitosamente',
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const product = await productService.updateProduct(req.params.id, req.body);
      
      res.json({
        success: true,
        data: product,
        message: 'Producto actualizado exitosamente',
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await productService.deleteProduct(req.params.id);
      
      res.json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }
}