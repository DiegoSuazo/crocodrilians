import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { authenticate, isAdmin } from '../middlewares/auth.middleware';

const router = Router();
const categoryController = new CategoryController();

// Rutas públicas
router.get('/', categoryController.getAllCategories.bind(categoryController));
router.get('/:id', categoryController.getCategoryById.bind(categoryController));
router.get('/slug/:slug', categoryController.getCategoryBySlug.bind(categoryController));

// Rutas protegidas (admin)
router.post('/', authenticate, isAdmin, categoryController.createCategory.bind(categoryController));
router.put('/:id', authenticate, isAdmin, categoryController.updateCategory.bind(categoryController));
router.delete('/:id', authenticate, isAdmin, categoryController.deleteCategory.bind(categoryController));

export default router;