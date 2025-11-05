import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { CategoryService } from '../services/category.service';

const categoryService = new CategoryService();

export class CategoryController {
  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const includeInactive = req.query.includeInactive === 'true';
      const categories = await categoryService.getAllCategories(includeInactive);
      
      res.json({
        success: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categoryService.getCategoryById(req.params.id);
      
      res.json({
        success: true,
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategoryBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categoryService.getCategoryBySlug(req.params.slug);
      
      res.json({
        success: true,
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const category = await categoryService.createCategory(req.body);
      
      res.status(201).json({
        success: true,
        data: category,
        message: 'Categoría creada exitosamente',
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const category = await categoryService.updateCategory(req.params.id, req.body);
      
      res.json({
        success: true,
        data: category,
        message: 'Categoría actualizada exitosamente',
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await categoryService.deleteCategory(req.params.id);
      
      res.json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }
}