import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { authenticate, isAdmin } from '../middlewares/auth.middleware';

const router = Router();
const productController = new ProductController();

// Rutas públicas
router.get('/', productController.getAllProducts.bind(productController));
router.get('/:id', productController.getProductById.bind(productController));

// Rutas protegidas (admin)
router.post('/', authenticate, isAdmin, productController.createProduct.bind(productController));
router.put('/:id', authenticate, isAdmin, productController.updateProduct.bind(productController));
router.delete('/:id', authenticate, isAdmin, productController.deleteProduct.bind(productController));

export default router;