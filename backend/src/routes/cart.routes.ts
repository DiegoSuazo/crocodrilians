import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();
const cartController = new CartController();

// Todas las rutas requieren autenticación
router.use(authenticate);

router.get('/', cartController.getCart.bind(cartController));
router.post('/', cartController.addToCart.bind(cartController));
router.put('/:id', cartController.updateCartItem.bind(cartController));
router.delete('/:id', cartController.removeFromCart.bind(cartController));
router.delete('/', cartController.clearCart.bind(cartController));

export default router;