import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { authenticate, isAdmin } from '../middlewares/auth.middleware';

const router = Router();
const orderController = new OrderController();

// Todas las rutas requieren autenticación
router.use(authenticate);

router.get('/', orderController.getAllOrders.bind(orderController));
router.get('/:id', orderController.getOrderById.bind(orderController));
router.post('/', orderController.createOrder.bind(orderController));
router.put('/:id/cancel', orderController.cancelOrder.bind(orderController));

// Rutas de admin
router.put('/:id/status', isAdmin, orderController.updateOrderStatus.bind(orderController));
router.put('/:id/payment', isAdmin, orderController.updatePaymentStatus.bind(orderController));

export default router;