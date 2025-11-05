import { Router } from 'express';
import { BannerController } from '../controllers/banner.controller';
import { authenticate, isAdmin } from '../middlewares/auth.middleware';

const router = Router();
const bannerController = new BannerController();

// Rutas públicas
router.get('/', bannerController.getAllBanners.bind(bannerController));
router.get('/:id', bannerController.getBannerById.bind(bannerController));

// Rutas protegidas (admin)
router.post('/', authenticate, isAdmin, bannerController.createBanner.bind(bannerController));
router.put('/:id', authenticate, isAdmin, bannerController.updateBanner.bind(bannerController));
router.delete('/:id', authenticate, isAdmin, bannerController.deleteBanner.bind(bannerController));

export default router;