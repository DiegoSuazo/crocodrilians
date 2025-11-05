import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { BannerService } from '../services/banner.service';

const bannerService = new BannerService();

export class BannerController {
  async getAllBanners(req: Request, res: Response, next: NextFunction) {
    try {
      const includeInactive = req.query.includeInactive === 'true';
      const banners = await bannerService.getAllBanners(includeInactive);
      
      res.json({
        success: true,
        data: banners,
      });
    } catch (error) {
      next(error);
    }
  }

  async getBannerById(req: Request, res: Response, next: NextFunction) {
    try {
      const banner = await bannerService.getBannerById(req.params.id);
      
      res.json({
        success: true,
        data: banner,
      });
    } catch (error) {
      next(error);
    }
  }

  async createBanner(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const banner = await bannerService.createBanner(req.body);
      
      res.status(201).json({
        success: true,
        data: banner,
        message: 'Banner creado exitosamente',
      });
    } catch (error) {
      next(error);
    }
  }

  async updateBanner(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const banner = await bannerService.updateBanner(req.params.id, req.body);
      
      res.json({
        success: true,
        data: banner,
        message: 'Banner actualizado exitosamente',
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteBanner(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await bannerService.deleteBanner(req.params.id);
      
      res.json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }
}