import { Router } from 'express';
import { bySku, getCategories, getProducts } from './products.controller';

const router = Router();
router.route('/products').get(getProducts);
router.route('/products/:sku').get(bySku);
router.route('/categories').get(getCategories);

export default router;
