import { Router } from 'express';
import Dashboard from './dashboard.services';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = Router();
router.route('/dashboard/products').get(authenticateToken, Dashboard.prototype.getProducts);
router.route('/dashboard/categories').get(authenticateToken, Dashboard.prototype.getCategories);

export default router;
